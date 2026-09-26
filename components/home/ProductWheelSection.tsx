'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Product, Settings } from '@/lib/types'
import { formatWeight, formatPrice } from '@/lib/types'
import { useCart } from '@/lib/cart'
import { useToast } from '@/components/ui/Toast'
import { generateWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp'

interface ProductWheelSectionProps {
  products: Product[]
  settings: Settings
}

export function ProductWheelSection({ products, settings }: ProductWheelSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedWeight, setSelectedWeight] = useState<number | null>(null)
  const { addItem } = useCart()
  const { addToast } = useToast()

  if (!products || products.length === 0) return null

  const activeProduct = products[activeIndex % products.length]
  const variants = activeProduct.variants || []

  const currentWeight = selectedWeight && variants.some(v => v.weight_grams === selectedWeight)
    ? selectedWeight
    : variants[0]?.weight_grams || 250

  const activeVariant = variants.find(v => v.weight_grams === currentWeight) || variants[0]

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % products.length)
    setSelectedWeight(null)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length)
    setSelectedWeight(null)
  }

  const price = activeVariant?.price ?? 0

  const handleAddToCart = () => {
    if (!activeVariant || activeVariant.price_not_configured) return
    addItem({
      productId: activeProduct.id,
      productName: activeProduct.name,
      slug: activeProduct.slug,
      weight: currentWeight,
      quantity: 1,
      price: price,
      image: activeProduct.thumbnail || activeProduct.images?.[0],
    })
    addToast(`Added ${activeProduct.name} (${formatWeight(currentWeight)}) to cart!`, 'success')
  }

  const whatsappPhone = settings.whatsapp_number || '917082977350'
  const waMessage = activeVariant
    ? generateWhatsAppMessage(
        [{
          productId: activeProduct.id,
          productName: activeProduct.name,
          slug: activeProduct.slug,
          weight: currentWeight,
          quantity: 1,
          price: price,
          image: activeProduct.thumbnail || activeProduct.images?.[0],
        }],
        settings,
        price
      )
    : ''
  const directWaUrl = activeVariant ? buildWhatsAppUrl(whatsappPhone, waMessage) : '#'

  return (
    <section className="section" style={{ background: 'var(--cream-dark)', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
          <span className="section-label">Interactive Showcase</span>
          <h2 className="section-title">Experience Dhanya Trail</h2>
          <div className="gold-divider gold-divider-center" />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Explore our artisanal selection. Click any product or use controls to rotate through our signature collection.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-3xl)',
          alignItems: 'center',
          background: 'var(--ivory)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-2xl)',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--gold-light)'
        }}>
          {/* Left / Wheel Visual Section */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              position: 'relative',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--gold-light) 0%, transparent 70%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 0 20px rgba(184, 150, 46, 0.15)',
              margin: '20px 0'
            }}>
              {/* Product Image */}
              <div style={{
                width: '220px',
                height: '220px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid var(--gold)',
                boxShadow: 'var(--shadow-lg)',
                background: 'var(--cream)',
                transition: 'transform 0.4s ease, opacity 0.3s ease'
              }}>
                {activeProduct.thumbnail || activeProduct.images?.[0] ? (
                  <img
                    src={activeProduct.thumbnail || activeProduct.images[0]}
                    alt={activeProduct.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                    🌿
                  </div>
                )}
              </div>

              {/* Badge */}
              <span className="badge badge-gold" style={{ position: 'absolute', top: -10, right: 10 }}>
                {activeProduct.category}
              </span>
            </div>

            {/* Navigation Dots / Selector */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {products.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => { setActiveIndex(idx); setSelectedWeight(null); }}
                  aria-label={`Select ${p.name}`}
                  style={{
                    width: idx === activeIndex ? '28px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    background: idx === activeIndex ? 'var(--green)' : 'var(--gold-light)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            {/* Arrows */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
              <button
                onClick={handlePrev}
                className="btn btn-outline"
                aria-label="Previous product"
                style={{ padding: '8px 16px', borderRadius: '50px' }}
              >
                ← Prev
              </button>
              <button
                onClick={handleNext}
                className="btn btn-outline"
                aria-label="Next product"
                style={{ padding: '8px 16px', borderRadius: '50px' }}
              >
                Next →
              </button>
            </div>
          </div>

          {/* Right / Product Information */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gold-dark)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {activeProduct.category} • {activeProduct.origin || 'Selected Origin'}
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--green)', margin: '8px 0 12px' }}>
              <Link href={`/products/${activeProduct.slug}`} className="hover-gold">
                {activeProduct.name}
              </Link>
            </h3>

            <p style={{ color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: '20px' }}>
              {activeProduct.description || 'Premium quality, carefully selected for maximum nutritional value and rich authentic taste.'}
            </p>

            {/* Weight Pills */}
            <div style={{ marginBottom: '20px' }}>
              <div className="product-weight-label" style={{ marginBottom: '8px', fontWeight: 600 }}>Select Weight</div>
              <div className="weight-pills">
                {variants.map((v) => (
                  <button
                    key={v.weight_grams}
                    className={`weight-pill ${v.weight_grams === currentWeight ? 'active' : ''}`}
                    onClick={() => setSelectedWeight(v.weight_grams)}
                  >
                    {formatWeight(v.weight_grams)}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px' }}>
              {activeVariant?.price_not_configured || price === 0 ? (
                <span className="price-not-configured">Price on Request</span>
              ) : (
                <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--green-dark)' }}>
                  {formatPrice(price)}
                </span>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={handleAddToCart}
                className="btn btn-primary"
                disabled={activeVariant?.price_not_configured || price === 0}
              >
                Add to Cart
              </button>
              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                Order via WhatsApp
              </a>
              <Link href={`/products/${activeProduct.slug}`} className="btn btn-outline">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
