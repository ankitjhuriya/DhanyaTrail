import { Metadata } from 'next'
import { GIFT_PRODUCTS, GIFTING_DISCOUNT_THRESHOLD, GIFTING_FROM_PRICE } from '@/lib/gifting'
import { GiftCard } from '@/components/gifting/GiftCard'
import { getSettings } from '@/lib/products'
import { BUSINESS, SITE_URL } from '@/lib/business'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { formatPrice } from '@/lib/types'
import { Settings } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Diwali Dry Fruits Gift Boxes & Hampers 2026 | Dhanya Trail',
  description: `Handcrafted Diwali dry fruit gift boxes, thaalis and trays in Indian Heritage and Pichwai-art keepsake packaging. From ${formatPrice(GIFTING_FROM_PRICE)}. Corporate gifting and bulk orders from Hisar, Haryana.`,
  openGraph: {
    type: 'website',
    url: './',
    siteName: 'Dhanya Trail',
    title: 'Diwali Dry Fruits Gift Boxes & Hampers 2026 | Dhanya Trail',
    description: `Heritage and Pichwai-art keepsake boxes filled with premium dry fruits. From ${formatPrice(GIFTING_FROM_PRICE)}.`,
    images: [{ url: '/images/gifting/4-jar-box-peacock.jpg', alt: 'Dhanya Trail 4 Jar Diwali gift box with peacock artwork' }],
  },
}

export const revalidate = 60

const STEPS = [
  { title: 'Choose', text: 'Pick your gift box and quantity.' },
  { title: 'Share', text: 'Send your delivery address and preferred date.' },
  { title: 'Confirm', text: 'Confirm your order on WhatsApp. We pack it gift-ready.' },
]

const CORPORATE_POINTS = [
  { title: 'Fully customisable', text: '2, 3 or 4 jar boxes in Heritage, Pichwai or carry-bag styles. You choose the fillings.' },
  { title: 'Fillings to choose from', text: 'Almonds, cashews, pistachios, black kishmish, roasted nuts, date-almond and kunafa chocolates, berries and seed mixes.' },
  { title: 'Tailored quotation', text: 'Pricing based on packaging, fillings and quantity. Share your team size and budget.' },
]

export default async function GiftingPage() {
  const settings: Settings = await getSettings().catch(() => ({} as Settings))
  const whatsappNumber = settings.whatsapp_number || BUSINESS.whatsappNumber

  const customUrl = buildWhatsAppUrl(whatsappNumber, 'Hello Dhanya Trail! I would like a custom Diwali gift box. My preferred mix is:')
  const corporateUrl = buildWhatsAppUrl(whatsappNumber, 'Hello Dhanya Trail! I would like a quotation for Diwali corporate gifting.\n\nCompany:\nNumber of boxes:\nBudget per box:\nDelivery date:')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Diwali Dry Fruits Gift Boxes 2026',
    itemListElement: GIFT_PRODUCTS.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: g.name,
        description: g.tagline,
        image: `${SITE_URL}${g.options[0].image}`,
        brand: { '@type': 'Brand', name: 'Dhanya Trail' },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'INR',
          lowPrice: Math.min(...g.options.map(o => o.price)),
          highPrice: Math.max(...g.options.map(o => o.price)),
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}/gifting#${g.id}`,
        },
      },
    })),
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="gifting-hero">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}>
            <span className="section-label">Diwali Collection 2026</span>
            <h1 className="section-title">Diwali Dry Fruits Gift Boxes &amp; Hampers</h1>
            <div className="gold-divider gold-divider-center" />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Premium dry fruits in Indian Heritage and Pichwai-art keepsake boxes, thaalis and trays. Packed gift-ready in our Hisar store.
            </p>
            <div className="gifting-offer-strip">
              <span>From <strong>{formatPrice(GIFTING_FROM_PRICE)}</strong></span>
              <span aria-hidden="true">•</span>
              <span>Special discount on orders above <strong>{formatPrice(GIFTING_DISCOUNT_THRESHOLD)}</strong></span>
              <span aria-hidden="true">•</span>
              <span>Delivery across North India</span>
            </div>
          </div>
        </div>
      </section>

      {/* Collection */}
      <section className="section">
        <div className="container">
          <div className="gift-grid">
            {GIFT_PRODUCTS.map(gift => (
              <GiftCard key={gift.id} gift={gift} whatsappNumber={whatsappNumber} />
            ))}
          </div>

          <div className="gifting-custom">
            <div>
              <h2 className="gifting-h2">Prefer a different mix?</h2>
              <p>We can fill any box with your choice of dry fruits. Tell us what you would like and we will make it for you.</p>
            </div>
            <a href={customUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              Ask for a custom box
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section" style={{ background: 'var(--ivory)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
            <span className="section-label">How It Works</span>
            <h2 className="section-title">Order in three simple steps</h2>
            <div className="gold-divider gold-divider-center" />
          </div>
          <ol className="gifting-steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="gifting-step-num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="gifting-note">
            Home delivery at a small additional charge, based on weight and pin code. Prefer to see the boxes first? Visit our store in Hisar.
          </p>
        </div>
      </section>

      {/* Corporate */}
      <section className="section" id="corporate">
        <div className="container">
          <div className="gifting-corporate">
            <div>
              <span className="section-label">Corporate Gifting</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>Diwali gifts for your team &amp; clients</h2>
              <div className="gold-divider" />
              <p style={{ color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: 'var(--space-lg)' }}>
                Handpicked almonds, pistachios, cashews and kishmish, sourced directly from Kashmir and Jammu orchards and packed in heritage boxes that feel like a keepsake.
              </p>
              <a href={corporateUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                Get a corporate quotation
              </a>
            </div>
            <ul className="gifting-corporate-points">
              {CORPORATE_POINTS.map(p => (
                <li key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Visit store */}
      <section className="section" style={{ background: 'var(--ivory)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '680px' }}>
          <span className="section-label">Visit Us</span>
          <h2 className="section-title">See the collection in our Hisar store</h2>
          <div className="gold-divider gold-divider-center" />
          <p style={{ color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: 'var(--space-lg)' }}>
            {BUSINESS.address}
          </p>
          <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Get directions
          </a>
        </div>
      </section>
    </div>
  )
}
