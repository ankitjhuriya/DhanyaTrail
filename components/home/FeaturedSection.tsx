import { Product } from '@/lib/types'
import { ProductGrid } from '@/components/products/ProductGrid'

interface FeaturedSectionProps {
  products: Product[]
  whatsappNumber: string
}

export function FeaturedSection({ products, whatsappNumber }: FeaturedSectionProps) {
  return (
    <section className="section" style={{ background: 'var(--cream)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <span className="section-label">Curated for You</span>
          <h2 className="section-title">Our Finest Picks</h2>
          <div className="gold-divider gold-divider-center" />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Handpicked premium varieties that represent the very best of what Dhanya Trail has to offer.
          </p>
        </div>
        <ProductGrid products={products} whatsappNumber={whatsappNumber} />
      </div>
    </section>
  )
}
