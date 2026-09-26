import Link from 'next/link'
import { Product } from '@/lib/types'

const WELLNESS_DESCRIPTIONS: Record<string, string> = {
  'ashwagandha': 'A revered adaptogenic herb in Ayurvedic tradition.',
  'chia-seeds': 'Tiny seeds rich in Omega-3 and fibre.',
  'flax-seeds': 'A plant-based source of Omega-3 fatty acids.',
  'pumpkin-seeds': 'Crunchy seeds full of plant-based goodness.',
  'basil-seeds': 'Cooling sabja seeds for everyday wellness.',
  'sunflower-seeds': 'Mild, nutty seeds for everyday snacking.',
  'goji-berry': 'Vibrant berries beloved for their rich colour and taste.',
}

export function WellnessSection({ products }: { products: Product[] }) {
  return (
    <section className="section" style={{ background: 'var(--cream)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <span className="section-label">Nature's Best</span>
          <h2 className="section-title">Everyday Wellness</h2>
          <div className="gold-divider gold-divider-center" />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Simple, wholesome ingredients to nourish your everyday routine.
          </p>
        </div>
        <div className="wellness-grid">
          {products.map(product => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="wellness-card"
              aria-label={product.name}
            >
              <div className="wellness-card-image">
                {product.thumbnail || product.images?.[0] ? (
                  <img
                    src={product.thumbnail || product.images[0]}
                    alt={product.name}
                    loading="lazy"
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                    🌿
                  </div>
                )}
              </div>
              <div className="wellness-card-body">
                <div className="wellness-card-name">{product.name}</div>
                <div className="wellness-card-desc">
                  {WELLNESS_DESCRIPTIONS[product.slug] || product.description?.slice(0, 60) + '...'}
                </div>
                <div style={{ marginTop: '12px' }}>
                  <span className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center', pointerEvents: 'none' }}>
                    View & Order →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
