import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Return & Refund Policy | Dhanya Trail',
  description: 'Learn about our return, replacement and cancellation guidelines.',
}

export default function ReturnPolicyPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <section style={{ background: 'var(--ivory)', borderBottom: '1px solid var(--gold-light)', padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <span className="section-label">Customer Assurance</span>
            <h1 className="section-title">Return & Refund Policy</h1>
            <div className="gold-divider gold-divider-center" />
          </div>
        </div>
      </section>

      <div className="container section" style={{ maxWidth: '800px', background: 'var(--ivory)', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gold-light)', marginTop: '40px', marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)' }}>Quality Guarantee</h2>
        <p style={{ color: 'var(--text-mid)', lineHeight: 1.8 }}>
          At Dhanya Trail, every batch of dry fruits and nuts undergoes thorough quality checks. Because our items are food and edible consumables, opened packs cannot be returned for hygiene and health safety reasons.
        </p>

        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)', marginTop: '24px' }}>Damaged or Incorrect Items</h2>
        <p style={{ color: 'var(--text-mid)', lineHeight: 1.8 }}>
          If you receive a package that was damaged during transit, leaked, or has incorrect items, please contact us within 48 hours of delivery with photos/unboxing video on WhatsApp at <strong>+91 70829 77350</strong>.
        </p>

        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)', marginTop: '24px' }}>Refunds & Replacements</h2>
        <p style={{ color: 'var(--text-mid)', lineHeight: 1.8 }}>
          Upon verification of damage or missing items, we will promptly issue a replacement or initiate a full refund back to your original payment mode within 3–5 business days.
        </p>

        <div style={{ marginTop: '32px' }}>
          <Link href="/contact" className="btn btn-primary">Contact Support</Link>
        </div>
      </div>
    </div>
  )
}
