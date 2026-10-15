import { Metadata } from 'next'
import Link from 'next/link'
import { FREE_DELIVERY_ABOVE, DELIVERY_RATES } from '@/lib/delivery'

export const metadata: Metadata = {
  title: 'Shipping Policy | Dhanya Trail',
  description: 'Shipping terms, dispatch timelines, and delivery details for Dhanya Trail.',
}

export default function ShippingPolicyPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <section style={{ background: 'var(--ivory)', borderBottom: '1px solid var(--gold-light)', padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <span className="section-label">Terms & Guidelines</span>
            <h1 className="section-title">Shipping Policy</h1>
            <div className="gold-divider gold-divider-center" />
          </div>
        </div>
      </section>

      <div className="container section" style={{ maxWidth: '800px', background: 'var(--ivory)', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gold-light)', marginTop: '40px', marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)' }}>1. Dispatch & Processing</h2>
        <p style={{ color: 'var(--text-mid)', lineHeight: 1.8 }}>
          All orders are carefully packed in our Hisar boutique facility and dispatched within 24–48 hours of confirmation.
        </p>

        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)', marginTop: '24px' }}>2. Estimated Delivery Timelines</h2>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-mid)', lineHeight: 1.8 }}>
          <li><strong>Haryana, Delhi NCR & Punjab:</strong> 2 to 3 business days.</li>
          <li><strong>Rest of North & Central India:</strong> 3 to 5 business days.</li>
          <li><strong>South & North-East India:</strong> 5 to 7 business days.</li>
        </ul>

        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)', marginTop: '24px' }}>3. Shipping Charges</h2>
        <p style={{ color: 'var(--text-mid)', lineHeight: 1.8 }}>
          The delivery charge is shown at checkout, before you pay, based on your order value and PIN code:
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-mid)', lineHeight: 1.8 }}>
          <li><strong>Free delivery</strong> on orders of ₹{FREE_DELIVERY_ABOVE.toLocaleString('en-IN')} and above, anywhere in India.</li>
          <li><strong>Hisar:</strong> always free.</li>
          <li><strong>Delhi NCR</strong> (Delhi, Gurugram, Faridabad, Noida, Ghaziabad): ₹{DELIVERY_RATES.ncr}.</li>
          <li><strong>Rest of India:</strong> ₹{DELIVERY_RATES.rest}.</li>
        </ul>

        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)', marginTop: '24px' }}>4. Payment and Dispatch</h2>
        <p style={{ color: 'var(--text-mid)', lineHeight: 1.8 }}>
          Orders are paid by UPI at checkout. We confirm your payment before dispatch, then pack and send your order from our Hisar store.
        </p>

        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)', marginTop: '24px' }}>5. Order Tracking</h2>
        <p style={{ color: 'var(--text-mid)', lineHeight: 1.8 }}>
          Once your package is handed over to the courier partner, tracking details will be shared with you via WhatsApp or SMS on the mobile number you gave at checkout.
        </p>

        <div style={{ marginTop: '32px' }}>
          <Link href="/shop" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}
