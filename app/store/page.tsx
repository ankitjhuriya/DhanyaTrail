import { Metadata } from 'next'
import Link from 'next/link'
import { BUSINESS } from '@/lib/business'
import { STORE_PHOTOS, STORE_MAP_EMBED, STORE_HIGHLIGHTS } from '@/lib/store'
import { GOOGLE_RATING } from '@/lib/reviews'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Our Store in Hisar | Dhanya Trail',
  description: `Visit the Dhanya Trail dry fruits store in HTM Colony, Azad Nagar, Hisar. See our dry fruits and Diwali gift boxes in person. Rated ${GOOGLE_RATING.rating} on Google.`,
}

export default function StorePage() {
  const waUrl = buildWhatsAppUrl(BUSINESS.whatsappNumber, 'Hello Dhanya Trail! I would like to visit your store in Hisar.')

  return (
    <div style={{ background: 'var(--cream)' }}>
      <section className="store-hero">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
            <span className="section-label">Offline Store</span>
            <h1 className="section-title">Visit us in Hisar</h1>
            <div className="gold-divider gold-divider-center" />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Dhanya Trail is a real shop in Azad Nagar, Hisar. Drop by to see, taste and pick your dry fruits and gift boxes in person.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {STORE_PHOTOS.length > 0 ? (
            <div className={`store-gallery store-gallery-${Math.min(STORE_PHOTOS.length, 5)}`}>
              {STORE_PHOTOS.map((p, i) => (
                <img key={p.src} src={p.src} alt={p.alt} loading={i === 0 ? 'eager' : 'lazy'} />
              ))}
            </div>
          ) : (
            <div className="store-gallery-empty">Shop photos coming soon</div>
          )}

          <div className="store-grid">
            <div className="store-card">
              <h2 className="store-card-title">Find us</h2>
              <p className="store-address">
                <strong>Dhanya Trail</strong><br />
                {BUSINESS.streetAddress},<br />
                {BUSINESS.locality}, {BUSINESS.region} {BUSINESS.postalCode}
              </p>
              <div className="store-actions">
                <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">📍 Get directions</a>
                <a href={`tel:+${BUSINESS.whatsappNumber}`} className="btn btn-outline">📞 Call {BUSINESS.phone}</a>
              </div>
              <p className="store-note">
                <a href={GOOGLE_RATING.url} target="_blank" rel="noopener noreferrer">★ {GOOGLE_RATING.rating.toFixed(1)} on Google from {GOOGLE_RATING.count} reviews</a>
                {' · '}
                <a href={waUrl} target="_blank" rel="noopener noreferrer">Message us before you come</a>
              </p>
            </div>
            <div className="store-map">
              <iframe
                src={STORE_MAP_EMBED}
                title="Dhanya Trail store location on Google Maps"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--ivory)' }}>
        <div className="container">
          <div className="section-head">
            <span className="section-label">In Store</span>
            <h2 className="section-title">Why visit the shop</h2>
            <div className="gold-divider gold-divider-center" />
          </div>
          <ul className="story-promises store-highlights">
            {STORE_HIGHLIGHTS.map(h => (
              <li key={h.title}>
                <span className="story-promise-icon" aria-hidden="true">{h.icon}</span>
                <span><strong>{h.title}</strong><span>{h.text}</span></span>
              </li>
            ))}
          </ul>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
            <Link href="/shop" className="btn btn-outline">Or shop online →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
