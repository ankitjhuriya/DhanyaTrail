import Link from 'next/link'
import { Product, CATEGORIES } from '@/lib/types'

// Compact "Shop by category" row: one small card per category that has products
export function CategoryStrip({ products }: { products: Product[] }) {
  const cards = CATEGORIES.map(c => {
    const items = products.filter(p => p.category === c.slug)
    // Prefer a bestseller or featured product's photo as the category picture
    const withImage = items.filter(p => p.thumbnail || p.images?.[0])
    const image = withImage.find(p => p.bestseller) || withImage.find(p => p.featured) || withImage[0]
    return { ...c, count: items.length, image: image?.thumbnail || image?.images?.[0] }
  }).filter(c => c.count > 0)

  return (
    <section className="section" style={{ background: 'var(--ivory)' }}>
      <div className="container">
        <div className="section-head">
          <span className="section-label">Explore</span>
          <h2 className="section-title">Shop by category</h2>
          <div className="gold-divider gold-divider-center" />
        </div>
        <div className="category-strip">
          {cards.map(c => (
            <Link key={c.slug} href={`/${c.slug}`} className="category-card">
              {c.image ? <img src={c.image} alt="" loading="lazy" /> : <span className="category-card-ph">ध</span>}
              <span className="category-card-text">
                <strong>{c.name}</strong>
                <small>{c.count} {c.count === 1 ? 'product' : 'products'}</small>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
