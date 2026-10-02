'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Product, ProductVariant, Settings } from '@/lib/types'
import { formatWeight, formatPrice, CATEGORIES } from '@/lib/types'
import { useCart } from '@/lib/cart'
import { useToast } from '@/components/ui/Toast'
import { generateWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp'
import { WeightSelector } from '@/components/products/WeightSelector'
import { QuantitySelector } from '@/components/products/QuantitySelector'
import { ProductGrid } from '@/components/products/ProductGrid'

interface ProductDetailClientProps {
  product: Product
  relatedProducts: Product[]
  whatsappNumber: string
  settings: Settings
}

export function ProductDetailClient({
  product,
  relatedProducts,
  whatsappNumber,
  settings,
}: ProductDetailClientProps) {
  const variants = [...(product.variants || [])].sort((a, b) => a.weight_grams - b.weight_grams)
  const defaultVariant = variants.find(v => !v.price_not_configured && v.price) || variants[0]
  const [selectedWeight, setSelectedWeight] = useState<number>(
    defaultVariant?.weight_grams || 250
  )
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState<string>(
    product.images?.[0] || product.thumbnail || ''
  )

  const { addItem } = useCart()
  const { addToast } = useToast()

  const currentVariant = variants.find(v => v.weight_grams === selectedWeight) || variants[0]
  const price = currentVariant?.price ?? 0

  const handleAddToCart = () => {
    if (!currentVariant || currentVariant.price_not_configured || price === 0) return
    addItem({
      productId: product.id,
      productName: product.name,
      slug: product.slug,
      weight: selectedWeight,
      quantity,
      price,
      image: selectedImage || product.thumbnail || product.images?.[0],
    })
    addToast(`Added ${quantity}× ${product.name} (${formatWeight(selectedWeight)}) to cart!`, 'success')
  }

  const waMessage = generateWhatsAppMessage(
    [{
      productId: product.id,
      productName: product.name,
      slug: product.slug,
      weight: selectedWeight,
      quantity,
      price,
      image: selectedImage || product.thumbnail || product.images?.[0],
    }],
    settings,
    price * quantity
  )
  const directWaUrl = buildWhatsAppUrl(whatsappNumber, waMessage)

  const categoryName = CATEGORIES.find(c => c.slug === product.category)?.name || product.category

  const allImages = product.images?.length ? product.images : (product.thumbnail ? [product.thumbnail] : [])

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--ivory)', borderBottom: '1px solid var(--gold-light)', padding: '16px 0' }}>
        <div className="container">
          <nav style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            <Link href="/" className="hover-gold">Home</Link>
            {' / '}
            <Link href="/shop" className="hover-gold">Shop</Link>
            {' / '}
            <Link href={`/${product.category}`} className="hover-gold">
              {categoryName}
            </Link>
            {' / '}
            <span style={{ color: 'var(--green-dark)', fontWeight: 600 }}>{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container section">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-3xl)',
          alignItems: 'start',
        }}>
          {/* Gallery */}
          <div>
            <div style={{
              width: '100%',
              aspectRatio: '1',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              background: 'var(--ivory)',
              border: '1px solid var(--gold-light)',
              boxShadow: 'var(--shadow-md)',
              marginBottom: '16px',
            }}>
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--gold)' }}>
                  ध
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div style={{ display: 'flex', gap: '12px' }}>
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    style={{
                      width: '70px',
                      height: '70px',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      border: img === selectedImage ? '2px solid var(--gold)' : '1px solid var(--gold-light)',
                      cursor: 'pointer',
                      background: 'var(--ivory)',
                    }}
                  >
                    <img src={img} alt={`${product.name} preview ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Specs & Buying info */}
          <div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
              <span className="badge badge-gold">
                {categoryName}
              </span>
              {product.origin && (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Origin: {product.origin}
                </span>
              )}
            </div>

            <h1 className="section-title" style={{ margin: '8px 0 16px', textAlign: 'left' }}>
              {product.name}
            </h1>

            <p style={{ color: 'var(--text-mid)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '24px' }}>
              {product.description}
            </p>

            {/* Weight selector */}
            <div style={{ marginBottom: '24px' }}>
              <WeightSelector
                variants={variants}
                selectedWeight={selectedWeight}
                onSelect={(w) => setSelectedWeight(w)}
              />
            </div>

            {/* Quantity Selector */}
            <div style={{ marginBottom: '24px' }}>
              <div className="product-weight-label" style={{ marginBottom: '8px', fontWeight: 600 }}>Quantity</div>
              <QuantitySelector value={quantity} onChange={setQuantity} min={1} max={20} />
            </div>

            {/* Price display */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '32px' }}>
              {currentVariant?.price_not_configured || price === 0 ? (
                <span className="price-not-configured">Price on Request</span>
              ) : (
                <span style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--green-dark)', fontFamily: 'var(--font-serif)' }}>
                  {formatPrice(price * quantity)}
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <button
                onClick={handleAddToCart}
                className="btn btn-primary btn-lg"
                disabled={currentVariant?.price_not_configured || price === 0}
                style={{ flex: '1 1 200px' }}
              >
                Add to Cart
              </button>
              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
                style={{ flex: '1 1 200px' }}
              >
                Order via WhatsApp
              </a>
            </div>

            {/* Product attributes / features list */}
            <div style={{ background: 'var(--ivory)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gold-light)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)', fontSize: '1.1rem', marginBottom: '12px' }}>
                Why Dhanya Trail Quality Matters:
              </h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-mid)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                <li>100% pure & authentic natural quality</li>
                <li>Carefully selected & hygienic packaging</li>
                <li>Fast dispatch from Hisar, Haryana</li>
                <li>Easy direct support & re-ordering on WhatsApp</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: 'var(--space-3xl)' }}>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
              You May Also Like
            </h2>
            <ProductGrid products={relatedProducts} whatsappNumber={whatsappNumber} />
          </div>
        )}
      </div>
    </div>
  )
}
