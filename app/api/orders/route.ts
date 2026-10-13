import { buildOrder, orderSummaryText, validateCustomer, newOrderNumber, upiPaymentLink, CheckoutItemInput, CustomerInput } from '@/lib/orders'
import { notifyOwner } from '@/lib/notify'
import { createPublicClient } from '@/lib/supabase/public'
import { BUSINESS } from '@/lib/business'

// Places a website order: re-prices the cart on the server, saves it to Supabase
// and notifies the owner. The customer then pays by UPI on the confirmation screen.
export async function POST(request: Request) {
  let body: { items?: CheckoutItemInput[]; customer?: Partial<CustomerInput>; website?: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Hidden form field that only bots fill in
  if (body.website) return Response.json({ error: 'Invalid request.' }, { status: 400 })

  const customerError = validateCustomer(body.customer || {})
  if (customerError) return Response.json({ error: customerError }, { status: 400 })

  const { order, error } = await buildOrder(body.items || [], body.customer as CustomerInput)
  if (!order) return Response.json({ error }, { status: 400 })

  // Save to Supabase (the orders table allows public inserts, not reads)
  let saved = false
  const supabase = createPublicClient()
  for (let attempt = 0; attempt < 2 && !saved; attempt++) {
    if (attempt > 0) {
      order.orderNumber = newOrderNumber()
      order.upiLink = upiPaymentLink(order.total, order.orderNumber)
    }
    const c = order.customer
    const { error: dbError } = await supabase.from('orders').insert({
      order_number: order.orderNumber,
      customer_name: c.name,
      customer_phone: c.phone,
      customer_email: c.email || null,
      items: order.lines,
      subtotal: order.subtotal,
      total: order.total,
      status: 'new',
      source: 'website',
      notes: [
        `Address: ${c.address}, ${c.city}, ${c.state} ${c.pincode}`,
        `Delivery: ${order.delivery ? `₹${order.delivery}` : 'Free'} (${order.deliveryZone})`,
        `Payment: UPI to ${BUSINESS.upiId}, awaiting confirmation`,
      ].join('\n'),
    })
    if (!dbError) saved = true
    else if (dbError.code !== '23505') break // retry only on a duplicate order number
  }

  const notified = await notifyOwner(`New order ${order.orderNumber} · ₹${order.total}`, orderSummaryText(order))

  if (!saved && !notified.email && !notified.whatsapp) {
    return Response.json(
      { error: 'We could not place your order right now. Please try again in a minute, or order on WhatsApp.' },
      { status: 503 },
    )
  }

  return Response.json({
    orderNumber: order.orderNumber,
    lines: order.lines,
    subtotal: order.subtotal,
    delivery: order.delivery,
    deliveryZone: order.deliveryZone,
    total: order.total,
    upiLink: order.upiLink,
    upiId: BUSINESS.upiId,
    customer: { name: order.customer.name, phone: order.customer.phone, address: `${order.customer.address}, ${order.customer.city}, ${order.customer.state} ${order.customer.pincode}` },
  })
}
