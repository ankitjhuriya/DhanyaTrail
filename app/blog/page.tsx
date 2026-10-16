import { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS, formatDate, readMinutes } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog: Dry Fruits, Nuts and Healthy Snacking | Dhanya Trail',
  description: 'Honest, well-sourced guides on dry fruits, nuts and seeds: how to pick fresh almonds, how much to eat a day, Mamra vs California, and smarter healthy snacking.',
  alternates: { canonical: './' },
}

export default function BlogPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <section className="store-hero">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <span className="section-label">Blog</span>
            <h1 className="section-title">Know what you eat</h1>
            <div className="gold-divider gold-divider-center" />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Simple, honest guides to dry fruits, nuts and seeds, backed by real data.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="blog-grid">
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                <span className="blog-card-emoji" aria-hidden="true">{post.emoji}</span>
                <span className="blog-card-tag">{post.tag}</span>
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-desc">{post.description}</p>
                <span className="blog-card-meta">{formatDate(post.date)} · {readMinutes(post)} min read</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
