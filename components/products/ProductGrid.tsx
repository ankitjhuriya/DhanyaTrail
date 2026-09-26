import { Product } from '@/lib/types'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  whatsappNumber?: string
  emptyMessage?: string
}

export function ProductGrid({ products, whatsappNumber, emptyMessage = 'No products found.' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: 'var(--space-4xl)',
        color: 'var(--text-muted)',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>🔍</div>
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          whatsappNumber={whatsappNumber}
        />
      ))}
    </div>
  )
}
