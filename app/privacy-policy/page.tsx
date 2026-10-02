import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Dhanya Trail',
  description: 'Dhanya Trail Privacy Policy — how we protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <section style={{ background: 'var(--ivory)', borderBottom: '1px solid var(--gold-light)', padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <span className="section-label">Legal</span>
            <h1 className="section-title">Privacy Policy</h1>
            <div className="gold-divider gold-divider-center" />
          </div>
        </div>
      </section>

      <div className="container section" style={{ maxWidth: '800px', background: 'var(--ivory)', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gold-light)', marginTop: '40px', marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)' }}>Information Collection</h2>
        <p style={{ color: 'var(--text-mid)', lineHeight: 1.8 }}>
          Dhanya Trail collects contact information (name, phone number, delivery address) strictly for processing and delivering your orders.
        </p>

        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)', marginTop: '24px' }}>Data Security</h2>
        <p style={{ color: 'var(--text-mid)', lineHeight: 1.8 }}>
          We never sell, rent, or trade your personal information to third parties. Your order communications and address details are safeguarded and only shared with our shipping partners to complete delivery.
        </p>

        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)', marginTop: '24px' }}>Contact Regarding Privacy</h2>
        <p style={{ color: 'var(--text-mid)', lineHeight: 1.8 }}>
          If you have questions about your personal data, reach us at dhanyatrail@gmail.com or call +91 70829 77350.
        </p>

        <div style={{ marginTop: '32px' }}>
          <Link href="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
