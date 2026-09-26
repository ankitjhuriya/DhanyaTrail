import { Metadata } from 'next'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | Dhanya Trail',
  description: 'Get in touch with Dhanya Trail in Hisar, Haryana. Contact us for orders, enquiries, bulk purchases and custom gifting options.',
}

export default function ContactPage() {
  const phone = '917082977350'
  const waUrl = buildWhatsAppUrl(phone, 'Hello Dhanya Trail! I would like to get in touch with you.')

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <section style={{ background: 'var(--ivory)', borderBottom: '1px solid var(--gold-light)', padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <span className="section-label">Get In Touch</span>
            <h1 className="section-title">Contact Dhanya Trail</h1>
            <div className="gold-divider gold-divider-center" />
            <p className="section-subtitle">
              We would love to hear from you. Reach out for product queries, custom orders or gift boxes.
            </p>
          </div>
        </div>
      </section>

      <section className="section container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-2xl)' }}>
          {/* Information cards */}
          <div style={{ background: 'var(--ivory)', padding: 'var(--space-2xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gold-light)' }}>
            <span className="section-label">Locate Us</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)', fontSize: '1.75rem', marginBottom: '16px' }}>Hisar Boutique</h2>
            <p style={{ color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: '24px' }}>
              <strong>Dhanya Trail</strong><br />
              Nuts • Dry Fruits • Healthy Snacks<br />
              Hisar, Haryana, India — 125001
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href={`tel:+${phone}`} style={{ color: 'var(--green-dark)', fontWeight: 600 }}>
                📞 +91 70829 77350
              </a>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ width: 'fit-content' }}>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Query Form */}
          <div style={{ background: 'var(--ivory)', padding: 'var(--space-2xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gold-light)' }}>
            <span className="section-label">Send Message</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)', fontSize: '1.75rem', marginBottom: '16px' }}>Enquiry Form</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
