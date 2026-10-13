// Server-side order building: every price is re-calculated from the catalogue,
// never taken from the customer's browser.

import { getProductBySlug } from './products'
import { GIFT_PRODUCTS, GIFT_QTY_TIERS, giftTierPrice } from './gifting'
import { deliveryFee, deliveryZone, isValidPincode, ZONE_LABELS } from './delivery'
import { formatWeight } from './types'
import { BUSINESS } from './business'

export type CheckoutItemInput = { productId: string; slug: string; weight: number; quantity: number }

export type CustomerInput = {
  name: string
  phone: string
  email?: string
  address: string
  city: string
  state: string
  pincode: string
}

export type PricedLine = { name: string; pack: string; unitPrice: number; quantity: number; lineTotal: number }

export type BuiltOrder = {
  orderNumber: string
  customer: CustomerInput
  lines: PricedLine[]
  subtotal: number
  delivery: number
  deliveryZone: string
  total: number
  upiLink: string
}

const MAX_QTY = 50

async function priceLine(item: CheckoutItemInput): Promise<PricedLine | null> {
  const quantity = Math.floor(Number(item.quantity))
  if (!Number.isFinite(quantity) || quantity < 1 || quantity > MAX_QTY) return null

  // Diwali gift: productId looks like "<gift id>-<option id>-x<pack count>"
  const gift = GIFT_PRODUCTS.find(g => g.id === item.slug)
  if (gift) {
    const m = new RegExp(`^${gift.id}-(.+)-x(\\d+)$`).exec(item.productId)
    const option = gift.options.find(o => o.id === m?.[1])
    const tier = GIFT_QTY_TIERS.find(t => t.qty === Number(m?.[2]))
    if (!option || !tier) return null
    const unitPrice = giftTierPrice(option.price, tier.qty, tier.discount)
    const name = gift.options.length > 1 ? `${gift.name} (${option.label})` : gift.name
    return {
      name: tier.qty > 1 ? `${name}, pack of ${tier.qty}` : name,
      pack: formatWeight(option.netWeightGrams * tier.qty),
      unitPrice,
      quantity,
      lineTotal: unitPrice * quantity,
    }
  }

  const product = await getProductBySlug(item.slug)
  const variant = product?.variants?.find(v => v.weight_grams === Number(item.weight) && !v.price_not_configured && v.price)
  if (!product || !variant?.price) return null
  if (variant.inventory_packs === 0) return null
  return {
    name: product.name,
    pack: formatWeight(variant.weight_grams),
    unitPrice: variant.price,
    quantity,
    lineTotal: variant.price * quantity,
  }
}

export function validateCustomer(c: Partial<CustomerInput>): string | null {
  if (!c.name || c.name.trim().length < 2) return 'Please enter your full name.'
  if (!c.phone || !/^[6-9]\d{9}$/.test(c.phone.replace(/\D/g, '').slice(-10))) return 'Please enter a valid 10-digit mobile number.'
  if (c.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email.trim())) return 'Please enter a valid email address, or leave it empty.'
  if (!c.address || c.address.trim().length < 8) return 'Please enter your full delivery address.'
  if (!c.city || c.city.trim().length < 2) return 'Please enter your city.'
  if (!c.state || c.state.trim().length < 2) return 'Please enter your state.'
  if (!c.pincode || !isValidPincode(c.pincode)) return 'Please enter a valid 6-digit PIN code.'
  return null
}

export function newOrderNumber(): string {
  const d = new Date()
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  return `DT-${ymd}-${Math.floor(1000 + Math.random() * 9000)}`
}

export function upiPaymentLink(amount: number, orderNumber: string): string {
  // The UPI ID is left unencoded ("@" not "%40"): some UPI apps don't decode it
  return `upi://pay?pa=${BUSINESS.upiId}&pn=${encodeURIComponent(BUSINESS.name)}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(`Order ${orderNumber}`)}`
}

export async function buildOrder(items: CheckoutItemInput[], customer: CustomerInput): Promise<{ order?: BuiltOrder; error?: string }> {
  if (!Array.isArray(items) || items.length === 0 || items.length > 40) return { error: 'Your cart is empty.' }
  const lines: PricedLine[] = []
  for (const item of items) {
    const line = await priceLine(item)
    if (!line) return { error: 'One of the items in your cart is no longer available at that size. Please refresh your cart and try again.' }
    lines.push(line)
  }
  const clean: CustomerInput = {
    name: customer.name.trim(),
    phone: customer.phone.replace(/\D/g, '').slice(-10),
    email: customer.email?.trim() || undefined,
    address: customer.address.trim(),
    city: customer.city.trim(),
    state: customer.state.trim(),
    pincode: customer.pincode.trim(),
  }
  const subtotal = Math.round(lines.reduce((s, l) => s + l.lineTotal, 0))
  const delivery = deliveryFee(subtotal, clean.pincode)
  const total = subtotal + delivery
  const orderNumber = newOrderNumber()
  return {
    order: {
      orderNumber,
      customer: clean,
      lines,
      subtotal,
      delivery,
      deliveryZone: ZONE_LABELS[deliveryZone(clean.pincode)],
      total,
      upiLink: upiPaymentLink(total, orderNumber),
    },
  }
}

/** Plain-text summary used in notification emails and WhatsApp messages. */
export function orderSummaryText(o: BuiltOrder): string {
  const c = o.customer
  return [
    `New website order ${o.orderNumber}`,
    '',
    ...o.lines.map(l => `• ${l.name} — ${l.pack} × ${l.quantity} = ₹${Math.round(l.lineTotal)}`),
    '',
    `Items: ₹${o.subtotal}`,
    `Delivery (${o.deliveryZone}): ${o.delivery ? `₹${o.delivery}` : 'Free'}`,
    `TOTAL: ₹${o.total}`,
    `Payment: UPI to ${BUSINESS.upiId}. Check your UPI app before dispatching.`,
    '',
    `Customer: ${c.name}`,
    `Phone: +91 ${c.phone}`,
    c.email ? `Email: ${c.email}` : '',
    `Address: ${c.address}, ${c.city}, ${c.state} ${c.pincode}`,
  ].filter(line => line !== '').join('\n')
}
