import { notifyOwner } from '@/lib/notify'

// The customer tells us they have paid, with the UPI reference (UTR) from their app.
// The owner still checks the UPI app before dispatching.
export async function POST(request: Request) {
  let body: { orderNumber?: string; total?: number; utr?: string; name?: string; phone?: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }
  const orderNumber = String(body.orderNumber || '')
  const utr = String(body.utr || '').trim()
  if (!/^DT-\d{6}-\d{4}$/.test(orderNumber)) return Response.json({ error: 'Invalid order number.' }, { status: 400 })
  if (utr && !/^[A-Za-z0-9]{6,30}$/.test(utr)) return Response.json({ error: 'Please check the UPI reference number.' }, { status: 400 })

  const text = [
    `Payment reported for ${orderNumber}`,
    body.total ? `Amount: ₹${Number(body.total)}` : '',
    utr ? `UPI reference (UTR): ${utr}` : 'No UPI reference given',
    body.name ? `Customer: ${String(body.name).slice(0, 80)}` : '',
    body.phone ? `Phone: +91 ${String(body.phone).replace(/\D/g, '').slice(-10)}` : '',
    '',
    'Check your UPI app for this payment before dispatching.',
  ].filter(Boolean).join('\n')

  const sent = await notifyOwner(`Payment reported · ${orderNumber}`, text)
  // Tell the page whether the owner was actually notified, so it never claims so falsely
  return Response.json({ ok: true, notified: Boolean(sent.email || sent.whatsapp) })
}
