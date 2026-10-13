'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { searchProducts } from '@/lib/search'
import { formatPrice, formatWeight } from '@/lib/types'

export type SearchItem = {
  slug: string
  name: string
  category: string
  image?: string
  price?: number
  weight?: number
}

interface SearchOverlayProps {
  items: SearchItem[]
  onClose: () => void
}

const SUGGESTIONS = ['Badam', 'Kaju', 'Akhrot', 'Makhana', 'Kesar', 'Seeds']

export function SearchOverlay({ items, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const results = useMemo(() => searchProducts(items, query).slice(0, 8), [items, query])

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const goToFirst = (e: React.FormEvent) => {
    e.preventDefault()
    if (results[0]) {
      router.push(`/products/${results[0].slug}`)
      onClose()
    }
  }

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search products">
      <div className="search-backdrop" onClick={onClose} />
      <div className="search-panel">
        <form className="search-form" onSubmit={goToFirst} role="search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search badam, kaju, makhana…"
            aria-label="Search products"
            autoComplete="off"
          />
          <button type="button" className="search-close" onClick={onClose} aria-label="Close search">✕</button>
        </form>

        {query.trim() === '' ? (
          <div className="search-suggestions">
            <span>Popular:</span>
            {SUGGESTIONS.map(s => (
              <button key={s} type="button" onClick={() => setQuery(s)}>{s}</button>
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="search-empty">
            No products found for &ldquo;{query}&rdquo;.{' '}
            <Link href="/shop" onClick={onClose}>Browse all products</Link>
          </div>
        ) : (
          <ul className="search-results">
            {results.map(item => (
              <li key={item.slug}>
                <Link href={`/products/${item.slug}`} onClick={onClose} className="search-result">
                  {item.image ? <img src={item.image} alt="" loading="lazy" /> : <span className="search-result-ph">ध</span>}
                  <span className="search-result-text">
                    <strong>{item.name}</strong>
                    <span>{item.category}</span>
                  </span>
                  {item.price && item.weight && (
                    <span className="search-result-price">
                      {formatPrice(item.price)}<small> / {formatWeight(item.weight)}</small>
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
