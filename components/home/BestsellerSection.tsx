import { Product } from '@/lib/types'
import { ProductGrid } from '@/components/products/ProductGrid'

interface BestsellerSectionProps {
  products: Product[]
  whatsappNumber: string
}

export function BestsellerSection({ products, whatsappNumber }: BestsellerSectionProps) {
  return (
    <section className="section" style={{ background: 'var(--ivory)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <span className="section-label">Most Loved</span>
          <h2 className="section-title">Customer Favourites</h2>
          <div className="gold-divider gold-divider-center" />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            The products our customers keep coming back to — trusted for quality, taste and everyday nourishment.
          </p>
        </div>
        <ProductGrid products={products} whatsappNumber={whatsappNumber} />
      </div>
    </section>
  )
}
