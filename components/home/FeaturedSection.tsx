import Link from 'next/link'
import { Product } from '@/lib/types'
import { ProductGrid } from '@/components/products/ProductGrid'

interface FeaturedSectionProps {
  products: Product[]
}

// Homepage "Bestsellers": the Featured and Bestseller products from the catalogue sheet, up to 6
export function FeaturedSection({ products }: FeaturedSectionProps) {
  return (
    <section className="section" style={{ background: 'var(--cream)' }}>
      <div className="container">
        <div className="section-head">
          <span className="section-label">Most Loved</span>
          <h2 className="section-title">Bestsellers</h2>
          <div className="gold-divider gold-divider-center" />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Our premium picks and the favourites customers keep coming back for.
          </p>
        </div>
        <div className="product-grid-3">
          <ProductGrid products={products} />
        </div>
        <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
          <Link href="/shop" className="btn btn-outline">View all products →</Link>
        </div>
      </div>
    </section>
  )
}
