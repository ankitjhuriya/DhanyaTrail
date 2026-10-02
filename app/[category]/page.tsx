import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductsByCategory, getSettings } from '@/lib/products'
import { CATEGORIES, Settings } from '@/lib/types'
import { ProductGrid } from '@/components/products/ProductGrid'
import Link from 'next/link'

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params
  const cat = CATEGORIES.find(c => c.slug === slug)

  if (!cat) {
    return { title: 'Category Not Found | Dhanya Trail' }
  }

  return {
    title: `${cat.name} | Dhanya Trail`,
    description: `Shop premium ${cat.name} from Dhanya Trail. Handpicked quality, fresh packaging, fast dispatch from Hisar, Haryana.`,
  }
}

export async function generateStaticParams() {
  return CATEGORIES.map(c => ({
    category: c.slug,
  }))
}

export const revalidate = 60

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params
  const cat = CATEGORIES.find(c => c.slug === slug)

  if (!cat) {
    notFound()
  }

  const [products, settingsData] = await Promise.all([
    getProductsByCategory(slug).catch(() => []),
    getSettings().catch(() => ({} as Settings)),
  ])
  const settings: Settings = settingsData
  const whatsappNumber = settings.whatsapp_number || '917082977350'

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <section style={{ background: 'var(--ivory)', borderBottom: '1px solid var(--gold-light)', padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <span className="section-label">Shop by Category</span>
            <h1 className="section-title">{cat.name}</h1>
            <div className="gold-divider gold-divider-center" />
            <p className="section-subtitle">
              Explore our selection of premium {cat.name.toLowerCase()}. Sourced for purity and natural richness.
            </p>
          </div>
        </div>
      </section>

      <div className="container section">
        {/* Navigation pills */}
        <div style={{
          display: 'flex',
          gap: 'var(--space-sm)',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 'var(--space-2xl)',
        }}>
          <Link href="/shop" className="weight-pill" style={{ textDecoration: 'none' }}>
            All Products
          </Link>
          {CATEGORIES.map(c => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className={`weight-pill ${c.slug === slug ? 'active' : ''}`}
              style={{ textDecoration: 'none' }}
            >
              {c.name}
            </Link>
          ))}
        </div>

        <ProductGrid products={products} whatsappNumber={whatsappNumber} />
      </div>
    </div>
  )
}
