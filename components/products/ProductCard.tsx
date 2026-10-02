'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Product, ProductVariant } from '@/lib/types'
import { formatWeight, formatPrice } from '@/lib/types'
import { WeightSelector } from './WeightSelector'
import { QuantitySelector } from './QuantitySelector'
import { useCart } from '@/lib/cart'
import { useToast } from '@/components/ui/Toast'
import { buildWhatsAppUrl, generateWhatsAppMessage } from '@/lib/whatsapp'

interface ProductCardProps {
  product: Product
  whatsappNumber?: string
}

const BADGE_LABELS: Record<string, string> = {
  premium: 'Premium',
  'best-seller': 'Best Seller',
  handpicked: 'Handpicked',
  roasted: 'Roasted',
  new: 'New',
}

export function ProductCard({ product, whatsappNumber = '917082977350' }: ProductCardProps) {
  const variants = product.variants || []
  const sortedVariants = [...variants].sort((a, b) => a.weight_grams - b.weight_grams)
  const defaultVariant = sortedVariants.find(v => !v.price_not_configured && v.price) || sortedVariants[0]

  const [selectedWeight, setSelectedWeight] = useState(defaultVariant?.weight_grams || 250)
  const [qty, setQty] = useState(1)
  const { addItem } = useCart()
  const { addToast } = useToast()

  const activeVariant = variants.find(v => v.weight_grams === selectedWeight)
  const price = activeVariant?.price || null
  const isUnconfigured = activeVariant?.price_not_configured

  const isOutOfStock = activeVariant && !isUnconfigured && activeVariant.inventory_packs === 0

  const handleAddToCart = () => {
    if (!price || isOutOfStock) return
    addItem({
      productId: product.id,
      productName: product.name,
      slug: product.slug,
      weight: selectedWeight,
      quantity: qty,
      price,
      image: product.thumbnail || product.images?.[0],
    })
    addToast(`${product.name} added to cart`, 'success')
  }

  const handleWhatsApp = () => {
    if (!price) return
    const message = generateWhatsAppMessage(
      [{ productId: product.id, productName: product.name, slug: product.slug, weight: selectedWeight, quantity: qty, price }],
      { whatsapp_default_message: 'Hello Dhanya Trail, I would like to order:' },
      price * qty
    )
    const url = buildWhatsAppUrl(whatsappNumber, message)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <article className="product-card" itemScope itemType="https://schema.org/Product">
      {/* Image */}
      <div className="product-card-image">
        <Link href={`/products/${product.slug}`} tabIndex={-1} aria-hidden="true">
          {product.thumbnail || product.images?.[0] ? (
            <img
              src={product.thumbnail || product.images[0]}
              alt={`${product.name} — premium ${product.category} from Dhanya Trail`}
              loading="lazy"
              itemProp="image"
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              color: 'var(--gold)',
              background: 'var(--ivory)',
            }}>
              ध
            </div>
          )}
        </Link>

        {/* Badge */}
        {product.badge && BADGE_LABELS[product.badge] && (
          <div className="product-card-badge">
            <span className={`badge badge-${product.badge.replace('-', '')}`}>
              {BADGE_LABELS[product.badge]}
            </span>
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="out-of-stock-overlay">Out of Stock</div>
        )}
      </div>

      {/* Body */}
      <div className="product-card-body">
        <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h3 className="product-card-name" itemProp="name">{product.name}</h3>
        </Link>

        {product.description && (
          <p className="product-card-desc">{product.description}</p>
        )}

        {/* Weight Selector */}
        {sortedVariants.length > 0 && (
          <WeightSelector
            variants={sortedVariants}
            selectedWeight={selectedWeight}
            onSelect={setSelectedWeight}
          />
        )}

        {/* Price */}
        <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
          {isUnconfigured ? (
            <div className="price-not-configured">Price not configured</div>
          ) : price ? (
            <div className="product-card-price">
              <span itemProp="price" content={price.toString()}>{formatPrice(price)}</span>
              <span className="product-card-price-sub"> / {formatWeight(selectedWeight)}</span>
              <meta itemProp="priceCurrency" content="INR" />
            </div>
          ) : null}
        </div>
      </div>

      {/* Actions */}
      <div className="product-card-actions">
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <QuantitySelector value={qty} onChange={setQty} />
          <button
            className="btn btn-primary btn-sm"
            onClick={handleAddToCart}
            disabled={!price || !!isOutOfStock || !!isUnconfigured}
            id={`add-to-cart-${product.slug}`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>

        {!isUnconfigured && price && (
          <a
            href={buildWhatsAppUrl(
              whatsappNumber,
              generateWhatsAppMessage(
                [{ productId: product.id, productName: product.name, slug: product.slug, weight: selectedWeight, quantity: qty, price }],
                { whatsapp_default_message: 'Hello Dhanya Trail, I would like to order:' },
                price * qty
              )
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-whatsapp btn-sm ${isOutOfStock ? 'disabled' : ''}`}
            id={`whatsapp-${product.slug}`}
            aria-label={`Order ${product.name} on WhatsApp`}
            style={{ textAlign: 'center', textDecoration: 'none' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/>
            </svg>
            Order on WhatsApp
          </a>
        )}
      </div>
    </article>
  )
}
