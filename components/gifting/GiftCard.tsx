'use client'

import { useState } from 'react'
import { GiftProduct } from '@/lib/gifting'
import { formatPrice, formatWeight } from '@/lib/types'
import { useCart } from '@/lib/cart'
import { useToast } from '@/components/ui/Toast'
import { QuantitySelector } from '@/components/products/QuantitySelector'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

interface GiftCardProps {
  gift: GiftProduct
  whatsappNumber: string
}

export function GiftCard({ gift, whatsappNumber }: GiftCardProps) {
  const [optionId, setOptionId] = useState(gift.options[0].id)
  const [qty, setQty] = useState(1)
  const { addItem } = useCart()
  const { addToast } = useToast()

  const option = gift.options.find(o => o.id === optionId) || gift.options[0]
  const hasChoice = gift.options.length > 1
  const displayName = hasChoice ? `${gift.name} (${option.label})` : gift.name

  const handleAddToCart = () => {
    addItem({
      productId: `${gift.id}-${option.id}`,
      productName: displayName,
      slug: gift.id,
      href: `/gifting#${gift.id}`,
      weight: option.netWeightGrams,
      quantity: qty,
      price: option.price,
      image: option.image,
    })
    addToast(`${displayName} added to cart`, 'success')
  }

  const waMessage = [
    'Hello Dhanya Trail, I would like to order a Diwali gift:',
    '',
    `${displayName} × ${qty}`,
    `Total: ${formatPrice(option.price * qty)}`,
    '',
    'Please share delivery details.',
  ].join('\n')

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

        <div className="product-card-price gift-card-price">
          {formatPrice(option.price)}
          <span className="product-card-price-sub"> / piece</span>
        </div>
      </div>

      <div className="product-card-actions">
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <QuantitySelector value={qty} onChange={setQty} max={50} />
          <button className="btn btn-primary btn-sm" onClick={handleAddToCart} aria-label={`Add ${displayName} to cart`}>
            Add to Cart
          </button>
        </div>
        <a
          href={buildWhatsAppUrl(whatsappNumber, waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp btn-sm"
          style={{ textAlign: 'center', textDecoration: 'none' }}
        >
          Order on WhatsApp
        </a>
      </div>
    </article>
  )
}
