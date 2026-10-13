'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import QRCode from 'qrcode'
import { useCart } from '@/lib/cart'
import { formatPrice, formatWeight } from '@/lib/types'
import { deliveryFee, deliveryZone, isValidPincode, FREE_DELIVERY_ABOVE, ZONE_LABELS } from '@/lib/delivery'
import { BUSINESS } from '@/lib/business'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

type PlacedOrder = {
  orderNumber: string
  lines: { name: string; pack: string; unitPrice: number; quantity: number; lineTotal: number }[]
  subtotal: number
  delivery: number
  deliveryZone: string
  total: number
  upiLink: string
  upiId: string
  customer: { name: string; phone: string; address: string }
}

const LAST_ORDER_KEY = 'dhanya-last-order'
const EMPTY_FORM = { name: '', phone: '', email: '', address: '', city: '', state: '', pincode: '', website: '' }

export function CheckoutClient() {
  const { items, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [placing, setPlacing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [order, setOrder] = useState<PlacedOrder | null>(null)

  useEffect(() => {
    // Restore a just-placed order (e.g. after a refresh) so the payment details stay on screen
    try {
      const saved = sessionStorage.getItem(LAST_ORDER_KEY)
      if (saved) setOrder(JSON.parse(saved))
    } catch {}
    setMounted(true)
  }, [])

  const subtotal = Math.round(items.reduce((s, i) => s + i.price * i.quantity, 0))
  const pinOk = isValidPincode(form.pincode)
  const delivery = pinOk ? deliveryFee(subtotal, form.pincode) : null
  const toFree = FREE_DELIVERY_ABOVE - subtotal

  const set = (k: keyof typeof EMPTY_FORM) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setPlacing(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ productId: i.productId, slug: i.slug, weight: i.weight, quantity: i.quantity })),
          customer: { name: form.name, phone: form.phone, email: form.email, address: form.address, city: form.city, state: form.state, pincode: form.pincode },
          website: form.website,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      setOrder(data)
      try { sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(data)) } catch {}
      clearCart()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setPlacing(false)
    }
  }

  if (!mounted) return <div className="checkout-loading">Loading checkout…</div>
  if (order) return <OrderPlaced order={order} onDone={() => { try { sessionStorage.removeItem(LAST_ORDER_KEY) } catch {}; setOrder(null) }} />

  if (items.length === 0) {
    return (
      <div className="checkout-empty">
        <h1 className="section-title">Your cart is empty</h1>
        <p>Add some dry fruits or a Diwali gift box to check out.</p>
        <Link href="/shop" className="btn btn-primary btn-lg">Browse products</Link>
      </div>
    )
  }

  return (
    <div className="checkout-grid">
      <form className="checkout-card" onSubmit={placeOrder} noValidate={false}>
        <h1 className="checkout-title">Checkout</h1>
        <p className="checkout-sub">Delivery details</p>

        <div className="checkout-fields">
          <label className="checkout-field checkout-span-2">
            <span>Full name</span>
            <input required value={form.name} onChange={set('name')} autoComplete="name" />
          </label>
          <label className="checkout-field">
            <span>Mobile number</span>
            <input required value={form.phone} onChange={set('phone')} inputMode="numeric" autoComplete="tel-national" placeholder="10-digit mobile" maxLength={14} />
          </label>
          <label className="checkout-field">
            <span>Email <small>(optional)</small></span>
            <input type="email" value={form.email} onChange={set('email')} autoComplete="email" />
          </label>
          <label className="checkout-field checkout-span-2">
            <span>Address</span>
            <textarea required value={form.address} onChange={set('address')} rows={3} autoComplete="street-address" placeholder="House / flat no., street, area, landmark" />
          </label>
          <label className="checkout-field">
            <span>City</span>
            <input required value={form.city} onChange={set('city')} autoComplete="address-level2" />
          </label>
          <label className="checkout-field">
            <span>State</span>
            <input required value={form.state} onChange={set('state')} autoComplete="address-level1" />
          </label>
          <label className="checkout-field">
            <span>PIN code</span>
            <input required value={form.pincode} onChange={set('pincode')} inputMode="numeric" autoComplete="postal-code" maxLength={6} />
          </label>
          {/* Hidden from people; bots tend to fill it in */}
          <input className="checkout-hp" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} aria-hidden="true" />
        </div>

        <div className="checkout-pay-note">
          <strong>Payment: UPI</strong>
          <span>After placing the order you&apos;ll see a QR code and a button to pay with Google Pay, PhonePe, Paytm or any UPI app.</span>
        </div>

        {error && <div className="checkout-error" role="alert">{error}</div>}

        <button type="submit" className="btn btn-primary btn-lg checkout-submit" disabled={placing}>
          {placing ? 'Placing order…' : `Place order${delivery !== null ? ` · ${formatPrice(subtotal + delivery)}` : ''}`}
        </button>
        <p className="checkout-fineprint">
          By placing the order you agree to our <Link href="/terms">terms</Link>, <Link href="/shipping-policy">shipping</Link> and <Link href="/return-policy">return</Link> policies.
        </p>
      </form>

      <aside className="checkout-card checkout-summary">
        <h2 className="checkout-summary-title">Order summary</h2>
        <ul className="checkout-lines">
          {items.map(i => (
            <li key={`${i.productId}-${i.weight}`}>
              {i.image ? <img src={i.image} alt="" /> : <span className="checkout-line-ph">ध</span>}
              <span className="checkout-line-name">
                {i.productName}
                <small>{formatWeight(i.weight)} × {i.quantity}</small>
              </span>
              <span className="checkout-line-price">{formatPrice(i.price * i.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="checkout-row"><span>Items</span><span>{formatPrice(subtotal)}</span></div>
        <div className="checkout-row">
          <span>Delivery{pinOk ? ` (${ZONE_LABELS[deliveryZone(form.pincode)]})` : ''}</span>
          <span>{delivery === null ? 'Enter PIN code' : delivery === 0 ? 'Free' : formatPrice(delivery)}</span>
        </div>
        {toFree > 0 && <div className="checkout-free-hint">Add {formatPrice(toFree)} more for free delivery</div>}
        <div className="checkout-row checkout-total">
          <span>Total</span>
          <span>{formatPrice(subtotal + (delivery ?? 0))}</span>
        </div>
        <ul className="checkout-trust">
          <li>Pay directly to Dhanya Trail by UPI</li>
          <li>FSSAI licensed store in Hisar · Lic. {BUSINESS.fssai}</li>
          <li>Free delivery above {formatPrice(FREE_DELIVERY_ABOVE)} · Free in Hisar</li>
        </ul>
      </aside>
    </div>
  )
}

function OrderPlaced({ order, onDone }: { order: PlacedOrder; onDone: () => void }) {
  const [qr, setQr] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [utr, setUtr] = useState('')
  const [reported, setReported] = useState<'idle' | 'sending' | 'done' | 'done-unnotified' | 'error'>('idle')

  useEffect(() => {
    QRCode.toString(order.upiLink, { type: 'svg', margin: 1, width: 220, color: { dark: '#1C3311', light: '#FFFFFF' } })
      .then(setQr)
      .catch(() => setQr(null))
  }, [order.upiLink])

  const copyUpi = async () => {
    try { await navigator.clipboard.writeText(order.upiId); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch {}
  }

  const reportPaid = async (e: React.FormEvent) => {
    e.preventDefault()
    setReported('sending')
    try {
      const res = await fetch('/api/orders/paid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber: order.orderNumber, total: order.total, utr, name: order.customer.name, phone: order.customer.phone }),
      })
      const data = await res.json().catch(() => ({}))
      setReported(!res.ok ? 'error' : data.notified ? 'done' : 'done-unnotified')
    } catch {
      setReported('error')
    }
  }

  const helpUrl = buildWhatsAppUrl(BUSINESS.whatsappNumber, `Hello Dhanya Trail, I have a question about my order ${order.orderNumber}.`)

  return (
    <div className="checkout-grid">
      <section className="checkout-card">
        <div className="placed-badge">✓ Order placed</div>
        <h1 className="checkout-title">Order {order.orderNumber}</h1>
        <p className="checkout-sub">Thank you, {order.customer.name.split(' ')[0]}! Complete your payment below to confirm the order.</p>

        <div className="upi-box">
          <div className="upi-amount">Pay <strong>{formatPrice(order.total)}</strong> by UPI</div>
          <div className="upi-qr" aria-label="UPI QR code">
            {qr ? <span dangerouslySetInnerHTML={{ __html: qr }} /> : <span className="upi-qr-ph">Loading QR…</span>}
          </div>
          <p className="upi-hint">Scan with Google Pay, PhonePe, Paytm or any UPI app</p>
          <a href={order.upiLink} className="btn btn-primary upi-app-btn">Pay with UPI app</a>
          <div className="upi-id">
            <span>UPI ID: <strong>{order.upiId}</strong></span>
            <button type="button" onClick={copyUpi}>{copied ? 'Copied' : 'Copy'}</button>
          </div>
          <p className="upi-hint">Please pay exactly {formatPrice(order.total)} and mention <strong>{order.orderNumber}</strong> in the payment note.</p>
        </div>

        {reported === 'done' ? (
          <div className="paid-thanks">
            <strong>Thank you! We&apos;ve been notified.</strong>
            <span>We&apos;ll confirm your payment and call or message you on +91 {order.customer.phone} before dispatch.</span>
          </div>
        ) : reported === 'done-unnotified' ? (
          <div className="paid-thanks">
            <strong>Thank you!</strong>
            <span>
              To help us confirm quickly, please{' '}
              <a href={buildWhatsAppUrl(BUSINESS.whatsappNumber, `Hello Dhanya Trail, I have paid ₹${order.total} for order ${order.orderNumber}.${utr ? ` UPI reference: ${utr}` : ''}`)} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', fontWeight: 600 }}>
                send us your payment reference on WhatsApp
              </a>.
            </span>
          </div>
        ) : (
          <form className="paid-form" onSubmit={reportPaid}>
            <label className="checkout-field">
              <span>Paid? Enter the UPI reference number <small>(optional, 12 digits, from your UPI app)</small></span>
              <input value={utr} onChange={e => setUtr(e.target.value.trim())} inputMode="numeric" maxLength={30} />
            </label>
            <button type="submit" className="btn btn-outline" disabled={reported === 'sending'}>
              {reported === 'sending' ? 'Sending…' : "I've paid"}
            </button>
            {reported === 'error' && <div className="checkout-error">Couldn&apos;t send that. Please check the reference number, or message us on WhatsApp.</div>}
          </form>
        )}

        <p className="checkout-fineprint">
          Need help? <a href={helpUrl} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a> or call {BUSINESS.phone}.
        </p>
      </section>

      <aside className="checkout-card checkout-summary">
        <h2 className="checkout-summary-title">Your order</h2>
        <ul className="checkout-lines">
          {order.lines.map((l, i) => (
            <li key={i}>
              <span className="checkout-line-name">{l.name}<small>{l.pack} × {l.quantity}</small></span>
              <span className="checkout-line-price">{formatPrice(l.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <div className="checkout-row"><span>Items</span><span>{formatPrice(order.subtotal)}</span></div>
        <div className="checkout-row"><span>Delivery ({order.deliveryZone})</span><span>{order.delivery ? formatPrice(order.delivery) : 'Free'}</span></div>
        <div className="checkout-row checkout-total"><span>Total</span><span>{formatPrice(order.total)}</span></div>
        <div className="placed-address">
          <strong>Delivering to</strong>
          <span>{order.customer.name} · +91 {order.customer.phone}</span>
          <span>{order.customer.address}</span>
        </div>
        <button type="button" className="btn btn-outline placed-done" onClick={onDone}>Continue shopping</button>
      </aside>
    </div>
  )
}
