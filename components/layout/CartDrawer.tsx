'use client'

import { useCart } from '@/lib/cart'
import { Settings } from '@/lib/types'
import { generateWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp'
import { QuantitySelector } from '@/components/products/QuantitySelector'
import { formatWeight, formatPrice } from '@/lib/types'

interface CartDrawerProps {
  settings: Settings
}

export function CartDrawer({ settings }: CartDrawerProps) {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal, clearCart } = useCart()

  // Compute total live from state — Zustand updates are synchronous
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleWhatsApp = () => {
    const message = generateWhatsAppMessage(items, settings, total)
    const phone = settings.whatsapp_number || '917082977350'
    const url = buildWhatsAppUrl(phone, message)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (!isOpen) return null

  return (
    <div
      className="cart-panel"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
      id="cart-panel"
    >
      {/* Header */}
      <div className="cart-panel-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--green)' }}>
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span className="cart-panel-title">Your Cart</span>
          {itemCount > 0 && (
            <span className="cart-panel-count">{itemCount}</span>
          )}
        </div>
        <button className="cart-panel-close" onClick={closeCart} aria-label="Close cart">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="cart-panel-body">
        {items.length === 0 ? (
          <div className="cart-panel-empty">
            <div style={{ fontSize: '2.5rem', opacity: 0.35 }}>🛒</div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-dark)' }}>Cart is empty</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Add products to get started</div>
            <button
              className="btn btn-primary btn-sm"
              onClick={closeCart}
              style={{ marginTop: '8px', fontSize: '0.8rem', padding: '6px 16px' }}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div>
            {items.map((item) => (
              <div key={`${item.productId}-${item.weight}`} className="cart-panel-item">
                {/* Thumbnail */}
                <div className="cart-panel-img">
                  {item.image ? (
                    <img src={item.image} alt={item.productName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', background: 'var(--ivory)' }}>
                      🥜
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="cart-panel-info">
                  <div className="cart-panel-name">{item.productName}</div>
                  <div className="cart-panel-meta">{formatWeight(item.weight)}</div>
                  <div className="cart-panel-controls">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(qty) => updateQuantity(item.productId, item.weight, qty)}
                    />
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, color: 'var(--green)', fontSize: '0.9rem' }}>
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      <button
                        className="cart-panel-remove"
                        onClick={() => removeItem(item.productId, item.weight)}
                        aria-label={`Remove ${item.productName}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="cart-panel-footer">
          <div className="cart-panel-total-row">
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-mid)' }}>Total</span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--green)' }}>
              {formatPrice(total)}
            </span>
          </div>

          <button
            className="btn btn-whatsapp"
            onClick={handleWhatsApp}
            id="cart-panel-whatsapp-btn"
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.875rem', padding: '10px 16px' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/>
            </svg>
            Order on WhatsApp
          </button>

          <button
            onClick={clearCart}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline', padding: '2px 0' }}
          >
            Clear cart
          </button>
        </div>
      )}
    </div>
  )
}
