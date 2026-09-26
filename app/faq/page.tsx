import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Dhanya Trail',
  description: 'Common questions about ordering, packaging, quality, and shipping dry fruits and nuts from Dhanya Trail.',
}

const FAQS = [
  {
    q: 'How do I place an order?',
    a: 'You can browse products on our website and order directly via WhatsApp or add items to your cart and checkout through WhatsApp with our team.'
  },
  {
    q: 'Where are your products sourced from?',
    a: 'We source premium dry fruits and nuts directly from trusted origins — including Kashmiri Mamra & Shahi Akhrot from Kashmir, California Almonds from the USA, and Super Premium Saffron from Pampore, Kashmir.'
  },
  {
    q: 'How is the packaging handled?',
    a: 'All our products are packed in food-grade, airtight resealable pouches and containers to maintain maximum crunch, freshness, and nutritional value.'
  },
  {
    q: 'How long does delivery take?',
    a: 'Orders are dispatched within 24–48 hours from Hisar, Haryana. Standard delivery across North India takes 2–4 business days, and 4–6 business days for the rest of India.'
  },
  {
    q: 'Can I customize gift boxes or bulk orders?',
    a: 'Yes! We specialize in custom festive gift hampers, wedding favors, and corporate gifting. Please message us on WhatsApp (+91 70829 77350) for custom curation.'
  }
]

export default function FAQPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <section style={{ background: 'var(--ivory)', borderBottom: '1px solid var(--gold-light)', padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <span className="section-label">Help Center</span>
            <h1 className="section-title">Frequently Asked Questions</h1>
            <div className="gold-divider gold-divider-center" />
            <p className="section-subtitle">
              Everything you need to know about our products, ordering, and delivery.
            </p>
          </div>
        </div>
      </section>

      <div className="container section" style={{ maxWidth: '800px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--ivory)',
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--gold-light)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green-dark)', fontSize: '1.25rem', marginBottom: '8px' }}>
                {faq.q}
              </h3>
              <p style={{ color: 'var(--text-mid)', lineHeight: 1.7, margin: 0 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Have more questions?</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/contact" className="btn btn-primary">Contact Us</Link>
            <a href="https://wa.me/917082977350" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
