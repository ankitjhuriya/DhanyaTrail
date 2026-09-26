import { Metadata } from 'next'
import { Settings } from '@/lib/types'
import { getAllProducts, getSettings } from '@/lib/products'
import { ProductGrid } from '@/components/products/ProductGrid'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shop All Products | Dhanya Trail',
  description: 'Explore our complete collection of dry fruits, nuts, berries, seeds, makhana, saffron and wellness products. Sourced with care, delivered fresh.',
}

export const revalidate = 60

export default async function ShopPage() {
  const [products, settingsData] = await Promise.all([
    getAllProducts().catch(() => []),
    getSettings().catch(() => ({} as Settings)),
  ])
  const settings: Settings = settingsData

  const categories = [
    { slug: 'all', name: 'All Products' },
    { slug: 'dry-fruits', name: 'Dry Fruits' },
    { slug: 'nuts', name: 'Nuts' },
    { slug: 'berries', name: 'Berries & Fruits' },
    { slug: 'seeds', name: 'Seeds' },
    { slug: 'makhana', name: 'Makhana' },
    { slug: 'saffron', name: 'Saffron' },
    { slug: 'wellness', name: 'Wellness' },
    { slug: 'roasted', name: 'Roasted' },
  ]

  const whatsappNumber = settings.whatsapp_number || '917082977350'

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Header banner */}
      <section style={{ background: 'var(--ivory)', borderBottom: '1px solid var(--gold-light)', padding: 'var(--space-2xl) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-label">Complete Collection</span>
            <h1 className="section-title">Shop Dhanya Trail</h1>
            <div className="gold-divider gold-divider-center" />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Handpicked dry fruits, nuts, berries, seeds, makhana, saffron and wellness essentials.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container section">
        {/* Category Pills */}
        <div style={{
          display: 'flex',
          gap: 'var(--space-sm)',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 'var(--space-2xl)',
        }}>
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={cat.slug === 'all' ? '/shop' : `/${cat.slug}`}
              className={`weight-pill ${cat.slug === 'all' ? 'active' : ''}`}
              style={{ textDecoration: 'none' }}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Product Grid */}
        <ProductGrid products={products} whatsappNumber={whatsappNumber} />
      </div>
    </div>
  )
}
