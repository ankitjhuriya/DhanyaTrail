'use client'

import { useState } from 'react'
import { GiftProduct, GIFT_QTY_TIERS, giftTierPrice } from '@/lib/gifting'
import { formatPrice, formatWeight } from '@/lib/types'
import { useCart } from '@/lib/cart'
import { useToast } from '@/components/ui/Toast'

interface GiftCardProps {
  gift: GiftProduct
}

export function GiftCard({ gift }: GiftCardProps) {
  const [optionId, setOptionId] = useState(gift.options[0].id)
  const [tierQty, setTierQty] = useState<number>(GIFT_QTY_TIERS[0].qty)
  const { addItem } = useCart()
  const { addToast } = useToast()

  const option = gift.options.find(o => o.id === optionId) || gift.options[0]
  const tier = GIFT_QTY_TIERS.find(t => t.qty === tierQty) || GIFT_QTY_TIERS[0]
  const hasChoice = gift.options.length > 1
  const displayName = hasChoice ? `${gift.name} (${option.label})` : gift.name
  const [unitOne, unitMany] = gift.unit
  const unitLabel = (n: number) => `${n} ${n === 1 ? unitOne : unitMany}`

  const total = giftTierPrice(option.price, tier.qty, tier.discount)
  const fullPrice = option.price * tier.qty

  const handleAddToCart = () => {
    // A multi-pack is one cart line priced as a bundle, so changing its quantity
    // in the cart adds whole bundles at the same discounted price.
    const bundleName = tier.qty === 1 ? displayName : `${displayName}, pack of ${tier.qty}`
    addItem({
      productId: `${gift.id}-${option.id}-x${tier.qty}`,
      productName: bundleName,
      slug: gift.id,
      href: `/gifting#${gift.id}`,
      weight: option.netWeightGrams * tier.qty,
      quantity: 1,
      price: total,
      image: option.image,
    })
    addToast(`${bundleName} added to cart`, 'success')
  }

  return (
    <article id={gift.id} className="product-card gift-card">
      <div className="gift-card-image">
        <img src={option.image} alt={`${displayName}, Diwali dry fruits gift from Dhanya Trail`} loading="lazy" />
        <div className="product-card-badge">
          <span className="badge badge-gold">Diwali 2026</span>
        </div>
      </div>

      <div className="product-card-body">
        <h3 className="product-card-name gift-card-name">{gift.name}</h3>
        <p className="gift-card-tagline">{gift.tagline}</p>

        {hasChoice && (
          <div>
            <div className="product-weight-label">{gift.optionLabel || 'Option'}</div>
            <div className="weight-pills">
              {gift.options.map(o => (
                <button
                  key={o.id}
                  className={`weight-pill ${o.id === option.id ? 'active' : ''}`}
                  onClick={() => setOptionId(o.id)}
                  aria-pressed={o.id === option.id}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="gift-card-contents">
          <div className="product-weight-label">What&apos;s inside · {gift.format}</div>
          <ul>
            {option.contents.map(c => (
              <li key={c.item}>
                <span>{c.item}</span>
                <span>{formatWeight(c.grams)}</span>
              </li>
            ))}
          </ul>
          <div className="gift-card-net">Net weight {formatWeight(option.netWeightGrams)}</div>
        </div>

        <div>
          <div className="product-weight-label">How many?</div>
          <div className="gift-tiers" role="radiogroup" aria-label="Quantity">
            {GIFT_QTY_TIERS.map(t => {
              const selected = t.qty === tier.qty
              return (
                <button
                  key={t.qty}
                  role="radio"
                  aria-checked={selected}
                  className={`gift-tier ${selected ? 'active' : ''}`}
                  onClick={() => setTierQty(t.qty)}
                >
                  <span className="gift-tier-qty">{unitLabel(t.qty)}</span>
                  <span className="gift-tier-price">{formatPrice(giftTierPrice(option.price, t.qty, t.discount))}</span>
                  {t.discount > 0 && <span className="gift-tier-off">{Math.round(t.discount * 100)}% off</span>}
                </button>
              )
            })}
          </div>
        </div>

        <div className="product-card-price gift-card-price">
          {formatPrice(total)}
          {tier.discount > 0 && (
            <>
              {' '}<s className="product-card-mrp">{formatPrice(fullPrice)}</s>
              <span className="product-card-price-sub"> for {unitLabel(tier.qty)} · {formatPrice(total / tier.qty)} each</span>
            </>
          )}
          {tier.discount === 0 && <span className="product-card-price-sub"> / {unitOne}</span>}
        </div>
      </div>

      <div className="product-card-actions">
        <button className="btn btn-primary" onClick={handleAddToCart} aria-label={`Add ${unitLabel(tier.qty)} of ${displayName} to cart`}>
          Add to Cart
        </button>
      </div>
    </article>
  )
}
