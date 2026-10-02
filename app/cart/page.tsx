'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart'
import { formatWeight, formatPrice } from '@/lib/types'
import { generateWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp'
import { QuantitySelector } from '@/components/products/QuantitySelector'

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCart()

  const total = getTotal()
  const whatsappNumber = '917082977350'

  const waMessage = generateWhatsAppMessage(items, {}, total)
  const waUrl = buildWhatsAppUrl(whatsappNumber, waMessage)

  if (items.length === 0) {
    return (
      <div style={{ background: 'var(--cream)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🛒</div>
          <h1 className="section-title" style={{ marginBottom: '12px' }}>Your Shopping Cart is Empty</h1>
          <p style={{ color: 'var(--text-mid)', marginBottom: '24px' }}>
            Discover our premium dry fruits, nuts, seeds & saffron.
          </p>
          <Link href="/shop" className="btn btn-primary btn-lg">
            Explore Collection
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', padding: 'var(--space-3xl) 0' }}>
      <div className="container">
        <h1 className="section-title" style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
          Your Cart
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-2xl)',
          alignItems: 'start',
        }}>
          {/* Item list */}
          <div style={{ background: 'var(--ivory)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gold-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--gold-light)', paddingBottom: '12px', marginBottom: '16px' }}>
              <span style={{ fontWeight: 700, color: 'var(--green)' }}>Product</span>
              <span style={{ fontWeight: 700, color: 'var(--green)' }}>Subtotal</span>
            </div>

            {items.map((item) => (
              <div
                key={`${item.productId}-${item.weight}`}
                style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: '1px solid var(--cream-dark)',
                }}
              >
                {/* Thumb */}
                <div style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'var(--cream)', flexShrink: 0 }}>
                  {item.image ? (
                    <img src={item.image} alt={item.productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🌿</div>
                  )}
                </div>

                {/* Details */}
                <div style={{ flex: 1 }}>
                  <Link href={item.href || `/products/${item.slug}`} className="hover-gold" style={{ fontWeight: 600, color: 'var(--green-dark)' }}>
                    {item.productName}
                  </Link>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Pack Weight: {formatWeight(item.weight)}
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(q) => updateQuantity(item.productId, item.weight, q)}
                    />
                  </div>
                </div>

                {/* Price & Remove */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, color: 'var(--green)', fontSize: '1.1rem' }}>
                    {formatPrice(item.price * item.quantity)}
                  </div>
                  <button
                    onClick={() => removeItem(item.productId, item.weight)}
                    style={{ background: 'none', border: 'none', color: '#c53030', fontSize: '0.85rem', cursor: 'pointer', marginTop: '8px' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div style={{ marginTop: '16px', textAlign: 'right' }}>
              <button
                onClick={clearCart}
                className="btn btn-outline"
                style={{ fontSize: '0.85rem', padding: '6px 16px' }}
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div style={{ background: 'var(--ivory)', padding: 'var(--space-2xl)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--gold-light)' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)', marginBottom: '16px' }}>Order Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--cream-dark)' }}>
              <span>Items Total ({items.reduce((s, i) => s + i.quantity, 0)})</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--cream-dark)' }}>
              <span>Delivery</span>
              <span style={{ color: 'var(--green-dark)', fontWeight: 600 }}>Calculated on Order</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', fontSize: '1.25rem', fontWeight: 700, color: 'var(--green-dark)' }}>
              <span>Estimated Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
                style={{ textAlign: 'center', justifyContent: 'center' }}
              >
                Complete Order via WhatsApp
              </a>
              <Link href="/shop" className="btn btn-outline btn-lg" style={{ textAlign: 'center' }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
