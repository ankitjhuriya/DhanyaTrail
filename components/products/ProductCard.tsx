'use client'

import Link from 'next/link'
import { Product } from '@/lib/types'
import { formatWeight, formatPrice } from '@/lib/types'
import { getDisplayVariant, compareAtPrice, pricePer100g } from '@/lib/pricing'
import { useCart } from '@/lib/cart'
import { useToast } from '@/components/ui/Toast'

interface ProductCardProps {
  product: Product
}

const BADGE_LABELS: Record<string, string> = {
  premium: 'Premium',
  'best-seller': 'Best Seller',
  handpicked: 'Handpicked',
  roasted: 'Roasted',
  new: 'New',
}

export function ProductCard({ product }: ProductCardProps) {
  const variant = getDisplayVariant(product)
  const price = variant?.price ?? null
  const isOutOfStock = !!variant && variant.inventory_packs === 0
  const per100g = variant ? pricePer100g(variant) : null
  const image = product.thumbnail || product.images?.[0]
  const href = `/products/${product.slug}`

  const { addItem } = useCart()
  const { addToast } = useToast()

  const handleAddToCart = () => {
    if (!variant || !price || isOutOfStock) return
    addItem({
      productId: product.id,
      productName: product.name,
      slug: product.slug,
      weight: variant.weight_grams,
      quantity: 1,
      price,
      image,
    })
    addToast(`${product.name} (${formatWeight(variant.weight_grams)}) added to cart`, 'success')
  }

  return (
    <article className="product-card" itemScope itemType="https://schema.org/Product">
      {/* Image */}
      <div className="product-card-image">
        <Link href={href} tabIndex={-1} aria-hidden="true">
          {image ? (
            <img
              src={image}
              alt={`${product.name} from Dhanya Trail`}
              loading="lazy"
              itemProp="image"
            />
          ) : (
            <div className="product-card-placeholder">ध</div>
          )}
        </Link>

        {product.badge && BADGE_LABELS[product.badge] && (
          <div className="product-card-badge">
            <span className={`badge badge-${product.badge.replace('-', '')}`}>
              {BADGE_LABELS[product.badge]}
            </span>
          </div>
        )}

        {isOutOfStock && (
          <div className="out-of-stock-overlay">Out of Stock</div>
        )}
      </div>

      {/* Body */}
      <div className="product-card-body">
        <Link href={href} style={{ textDecoration: 'none' }}>
          <h3 className="product-card-name" itemProp="name">{product.name}</h3>
        </Link>

        <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="product-card-pricing">
          {variant && price ? (
            <>
              <div className="product-card-price-row">
                <span className="product-card-price" itemProp="price" content={price.toString()}>
                  {formatPrice(price)}
                </span>
                <s className="product-card-mrp" aria-label={`Was ${formatPrice(compareAtPrice(price))}`}>
                  {formatPrice(compareAtPrice(price))}
                </s>
                <span className="product-card-weight">/ {formatWeight(variant.weight_grams)}</span>
              </div>
              {per100g !== null && (
                <div className="product-card-per100">({formatPrice(per100g)} per 100 g)</div>
              )}
              <meta itemProp="priceCurrency" content="INR" />
            </>
          ) : (
            <div className="price-not-configured">Price on request</div>
          )}
        </div>
      </div>

      {/* Action */}
      <div className="product-card-actions">
        <button
          className="btn btn-primary"
          onClick={handleAddToCart}
          disabled={!price || isOutOfStock}
          id={`add-to-cart-${product.slug}`}
          aria-label={`Add ${product.name}${variant ? ` ${formatWeight(variant.weight_grams)}` : ''} to cart`}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </article>
  )
}
