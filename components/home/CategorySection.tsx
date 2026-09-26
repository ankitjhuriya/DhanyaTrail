import Link from 'next/link'

const CATEGORIES = [
  { slug: 'dry-fruits', name: 'Dry Fruits', emoji: '🌿', href: '/dry-fruits' },
  { slug: 'nuts', name: 'Nuts', emoji: '🥜', href: '/nuts' },
  { slug: 'berries', name: 'Berries & Fruits', emoji: '🫐', href: '/berries' },
  { slug: 'seeds', name: 'Seeds', emoji: '🌱', href: '/seeds' },
  { slug: 'makhana', name: 'Makhana', emoji: '⚪', href: '/makhana' },
  { slug: 'saffron', name: 'Saffron', emoji: '🌸', href: '/saffron' },
  { slug: 'wellness', name: 'Wellness', emoji: '🌿', href: '/wellness' },
  { slug: 'roasted', name: 'Roasted', emoji: '🔥', href: '/roasted' },
]

export function CategorySection() {
  return (
    <section className="section-sm" style={{ background: 'var(--ivory)' }}>
      <div className="container">
        <div style={{ marginBottom: 'var(--space-2xl)' }} className="text-center">
          <span className="section-label">Browse By Type</span>
          <h2 className="section-title">Shop by Category</h2>
        </div>
        <div className="categories-grid">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="category-card"
              id={`cat-${cat.slug}`}
              aria-label={`Browse ${cat.name}`}
            >
              <div className="category-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                {cat.emoji}
              </div>
              <div className="category-name">{cat.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
