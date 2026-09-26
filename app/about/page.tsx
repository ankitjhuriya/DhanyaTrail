import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Story & Brand | Dhanya Trail',
  description: 'Learn about Dhanya Trail — bringing carefully selected dry fruits, nuts, seeds, makhana, saffron and wellness essentials from Hisar, Haryana.',
}

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <section style={{ background: 'var(--ivory)', borderBottom: '1px solid var(--gold-light)', padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <span className="section-label">About Us</span>
            <h1 className="section-title">The Dhanya Trail Story</h1>
            <div className="gold-divider gold-divider-center" />
            <p className="section-subtitle">
              A journey toward better choices — bringing nature's finest dry fruits, nuts and wellness products directly to your doorstep.
            </p>
          </div>
        </div>
      </section>

      <section className="section container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-3xl)', alignItems: 'center' }}>
          <div>
            <span className="section-label">Our Philosophy</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>Pure, Natural & Uncompromised</h2>
            <div className="gold-divider" />
            <p style={{ color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: '16px' }}>
              At <strong>Dhanya Trail</strong> (धन्य | Trail), we believe that simple, natural foods are the foundation of true wellness. From hand-picked Californian almonds and Shahi Kashmiri walnuts to aromatic Mongra saffron and roasted lotus seeds, every item in our boutique is chosen for its quality, freshness and taste.
            </p>
            <p style={{ color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: '24px' }}>
              Based in Hisar, Haryana, we serve health-conscious households with care, transparent pricing, and personal customer service.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link href="/shop" className="btn btn-primary">Shop Collection</Link>
              <Link href="/contact" className="btn btn-outline">Contact Us</Link>
            </div>
          </div>

          <div style={{ background: 'var(--ivory)', padding: 'var(--space-2xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gold-light)', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)', fontSize: '1.5rem', marginBottom: '16px' }}>Our Core Pillars</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', gap: '12px' }}>
                <span style={{ fontSize: '1.5rem' }}>🌿</span>
                <div>
                  <strong>Natural Goodness:</strong> No artificial additives or unnecessary chemicals.
                </div>
              </li>
              <li style={{ display: 'flex', gap: '12px' }}>
                <span style={{ fontSize: '1.5rem' }}>✨</span>
                <div>
                  <strong>Hand-picked Selection:</strong> Sourced directly from premier growing regions.
                </div>
              </li>
              <li style={{ display: 'flex', gap: '12px' }}>
                <span style={{ fontSize: '1.5rem' }}>💬</span>
                <div>
                  <strong>Personal Touch:</strong> Seamless WhatsApp ordering and dedicated support.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
