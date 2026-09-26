import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Dhanya Trail',
  description: 'Terms of service and purchasing guidelines for Dhanya Trail.',
}

export default function TermsPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <section style={{ background: 'var(--ivory)', borderBottom: '1px solid var(--gold-light)', padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <span className="section-label">Legal</span>
            <h1 className="section-title">Terms & Conditions</h1>
            <div className="gold-divider gold-divider-center" />
          </div>
        </div>
      </section>

      <div className="container section" style={{ maxWidth: '800px', background: 'var(--ivory)', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gold-light)', marginTop: '40px', marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)' }}>1. Acceptance of Terms</h2>
        <p style={{ color: 'var(--text-mid)', lineHeight: 1.8 }}>
          By accessing and placing orders through Dhanya Trail, you agree to these terms and conditions.
        </p>

        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)', marginTop: '24px' }}>2. Product Information & Pricing</h2>
        <p style={{ color: 'var(--text-mid)', lineHeight: 1.8 }}>
          We ensure all product descriptions, origin information, and pricing are accurate. Prices are subject to agricultural market variations and seasonal harvests.
        </p>

        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)', marginTop: '24px' }}>3. Order Confirmation</h2>
        <p style={{ color: 'var(--text-mid)', lineHeight: 1.8 }}>
          Orders placed via website or WhatsApp are confirmed upon review of inventory and delivery pin code feasibility.
        </p>

        <div style={{ marginTop: '32px' }}>
          <Link href="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
