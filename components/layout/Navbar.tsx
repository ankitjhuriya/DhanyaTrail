'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart'
import { Settings, CATEGORIES } from '@/lib/types'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { SearchOverlay, SearchItem } from './SearchOverlay'

interface NavbarProps {
  settings: Settings
  searchItems: SearchItem[]
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/gifting', label: 'Diwali Gifting' },
  { href: '/store', label: 'Offline Store' },
  { href: '/about', label: 'Our Story' },
  { href: '/blog', label: 'Blog' },
]

export function Navbar({ settings, searchItems }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const closeSearch = useCallback(() => setSearchOpen(false), [])
  const { getItemCount, openCart } = useCart()
  const itemCount = mounted ? getItemCount() : 0
  const waPhone = settings.whatsapp_number || '917082977350'
  const waUrl = buildWhatsAppUrl(waPhone, 'Hello Dhanya Trail!')

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <span>🪔 <Link href="/gifting">Diwali Gift Boxes now available</Link></span>
        <span className="announcement-sep announcement-secondary">•</span>
        <span className="announcement-secondary">
          📍 <Link href="/store">Offline Store, Hisar</Link>
        </span>
      </div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation" style={{ height: 'auto', padding: '12px 0' }}>
        <div className="container">
          <div className="nav-inner" style={{ justifyContent: 'space-between' }}>
            {/* Store logo (reversed version for the green header) */}
            <Link href="/" className="nav-logo" aria-label="Dhanya Trail - Home">
              <img
                src="/images/logo-header.png"
                alt="Dhanya Trail"
                className="nav-logo-img"
                width={268}
                height={112}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="nav-links" role="menubar">
              {NAV_LINKS.map(link => link.href === '/shop' ? (
                <div key={link.href} className="nav-dropdown">
                  <Link href="/shop" className="nav-link nav-dropdown-trigger" role="menuitem" aria-haspopup="true">
                    Shop
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                  </Link>
                  <div className="nav-dropdown-menu" role="menu" aria-label="Shop by category">
                    <Link href="/shop" className="nav-dropdown-item nav-dropdown-all" role="menuitem">All Products</Link>
                    {CATEGORIES.map(c => (
                      <Link key={c.slug} href={`/${c.slug}`} className="nav-dropdown-item" role="menuitem">{c.name}</Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link"
                  role="menuitem"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="nav-actions">
              {/* Offline store */}
              <Link href="/store" className="nav-icon-btn" aria-label="Our offline store in Hisar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </Link>

              {/* Search */}
              <button type="button" className="nav-icon-btn nav-search-btn" aria-label="Search products" onClick={() => setSearchOpen(true)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </button>

              {/* WhatsApp */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-icon-btn nav-whatsapp-btn"
                aria-label="Order on WhatsApp"
                style={{ color: '#25D366' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/>
                </svg>
              </a>

              {/* Cart */}
              <button
                className="nav-icon-btn"
                onClick={openCart}
                aria-label={`Shopping cart, ${itemCount} items`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                {itemCount > 0 && (
                  <span className="cart-badge" aria-hidden="true">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>

              {/* Hamburger */}
              <button
                className="hamburger"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {searchOpen && <SearchOverlay items={searchItems} onClose={closeSearch} />}

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Navigation menu">
        <div className="mobile-menu-backdrop" onClick={() => setMobileOpen(false)} />
        <div className="mobile-menu-panel">
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xl)' }}>
            <div>
              <img src="/images/logo-colour.png" alt="Dhanya Trail" className="mobile-menu-logo" width={268} height={112} />
              <div style={{ fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 2 }}>
                NUTS • DRY FRUITS • HEALTHY SNACKS
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-full)', background: 'var(--ivory)', cursor: 'pointer' }}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Links */}
          <nav>
            {NAV_LINKS.map(link => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.href === '/shop' && (
                  <div className="mobile-subnav">
                    {CATEGORIES.map(c => (
                      <Link key={c.slug} href={`/${c.slug}`} className="mobile-subnav-link" onClick={() => setMobileOpen(false)}>
                        {c.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ marginTop: 'var(--space-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" style={{ justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/>
              </svg>
              Order on WhatsApp
            </a>
            <button onClick={() => { openCart(); setMobileOpen(false) }} className="btn btn-outline" style={{ justifyContent: 'center' }}>
              View Cart
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
