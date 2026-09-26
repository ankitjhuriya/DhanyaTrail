import Link from 'next/link'
import { Settings } from '@/lib/types'

export function HeroSection({ settings }: { settings: Settings }) {
  return (
    <section style={{ background: 'var(--cream)', position: 'relative', overflow: 'hidden' }} aria-label="Hero">
      {/* Subtle botanical SVG background */}
      <svg
        style={{ position: 'absolute', right: 0, top: '10%', opacity: 0.04, width: 600, height: 600, pointerEvents: 'none' }}
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M100,10 C60,10 20,50 20,100 C20,150 60,190 100,190 C140,190 180,150 180,100 C180,50 140,10 100,10" fill="none" stroke="#2A4A1A" strokeWidth="1"/>
        <path d="M100,30 L100,170 M50,60 L150,140 M50,140 L150,60" stroke="#2A4A1A" strokeWidth="0.5" fill="none"/>
        <path d="M100,100 C100,70 70,50 50,50" stroke="#B8962E" strokeWidth="1" fill="none"/>
        <path d="M100,100 C100,70 130,50 150,50" stroke="#B8962E" strokeWidth="1" fill="none"/>
        <path d="M100,100 C70,100 50,130 50,150" stroke="#B8962E" strokeWidth="1" fill="none"/>
        <path d="M100,100 C130,100 150,130 150,150" stroke="#B8962E" strokeWidth="1" fill="none"/>
      </svg>

      <div className="container">
        <div className="hero">
          {/* Content */}
          <div className="hero-content">
            <div className="hero-tagline">
              Premium Dry Fruits & Wellness
            </div>
            <h1 className="hero-title">
              Nature's Finest,<br />
              <em>Carefully Chosen.</em>
            </h1>
            <p className="hero-subtitle">
              Premium dry fruits, nuts, berries, seeds and traditional wellness essentials — thoughtfully selected for everyday goodness.
            </p>
            <div className="hero-buttons">
              <Link href="/shop" className="btn btn-primary btn-lg" id="hero-shop-btn">
                Shop Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link href="/shop" className="btn btn-outline btn-lg" id="hero-explore-btn">
                Explore Collection
              </Link>
            </div>

            {/* Trust indicators */}
            <div style={{
              display: 'flex',
              gap: 'var(--space-xl)',
              marginTop: 'var(--space-2xl)',
              flexWrap: 'wrap',
            }}>
              {[
                { value: '33+', label: 'Premium Products' },
                { value: '100%', label: 'Natural & Pure' },
                { value: '⚡', label: 'WhatsApp Ordering' },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--green)' }}>
                    {item.value}
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 2 }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div style={{ position: 'relative' }}>
            <div className="hero-image-wrap">
              <img
                src="/images/hero.jpg"
                alt="Premium dry fruits, nuts, berries and seeds - Dhanya Trail collection"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Floating card */}
            <div className="hero-badge">
              <div className="hero-badge-label">Based in</div>
              <div className="hero-badge-value">Hisar, Haryana</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
