import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BLOG_POSTS, BlogBlock, formatDate, getPost, readMinutes } from '@/lib/blog'
import { SITE_URL } from '@/lib/business'
import { BlogText } from '@/components/blog/BlogText'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Article Not Found | Dhanya Trail' }

  return {
    title: `${post.title} | Dhanya Trail`,
    description: post.description,
    alternates: { canonical: './' },
    openGraph: {
      type: 'article',
      url: './',
      siteName: 'Dhanya Trail',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
  }
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'h2':
      return <h2>{block.text}</h2>
    case 'p':
      return <p><BlogText text={block.text} /></p>
    case 'note':
      return <p className="blog-note"><BlogText text={block.text} /></p>
    case 'ul':
      return <ul>{block.items.map((item, i) => <li key={i}><BlogText text={item} /></li>)}</ul>
    case 'table':
      return (
        <div className="blog-table-wrap">
          <table className="blog-table">
            {block.caption && <caption><BlogText text={block.caption} /></caption>}
            <thead><tr>{block.head.map((h, i) => <th key={i} scope="col">{h}</th>)}</tr></thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>{row.map((cell, c) => c === 0 ? <th key={c} scope="row">{cell}</th> : <td key={c}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const more = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 3)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    author: { '@type': 'Organization', name: 'Dhanya Trail', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Dhanya Trail', logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.png` } },
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="section">
        <div className="container blog-article">
          <nav className="blog-crumbs" aria-label="Breadcrumb">
            <Link href="/blog">← All articles</Link>
          </nav>
          <span className="blog-card-tag">{post.tag}</span>
          <h1 className="blog-title">{post.title}</h1>
          <p className="blog-meta">{formatDate(post.date)} · {readMinutes(post)} min read</p>
          <p className="blog-lede">{post.description}</p>

          <div className="blog-body">
            {post.body.map((block, i) => <Block key={i} block={block} />)}
          </div>

          {post.related && post.related.length > 0 && (
            <div className="blog-related">
              <strong>Shop this article</strong>
              <div>
                {post.related.map(r => <Link key={r.href} href={r.href} className="btn btn-outline btn-sm">{r.label}</Link>)}
              </div>
            </div>
          )}

          {post.sources.length > 0 && (
            <div className="blog-sources">
              <h2>Sources</h2>
              <ol>
                {post.sources.map((s, i) => (
                  <li key={i} id={`source-${i + 1}`}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">{s.text}</a>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </article>

      <section className="section" style={{ background: 'var(--ivory)' }}>
        <div className="container">
          <div className="section-head">
            <span className="section-label">Keep Reading</span>
            <h2 className="section-title">More from the blog</h2>
            <div className="gold-divider gold-divider-center" />
          </div>
          <div className="blog-grid">
            {more.map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-card">
                <span className="blog-card-emoji" aria-hidden="true">{p.emoji}</span>
                <span className="blog-card-tag">{p.tag}</span>
                <h3 className="blog-card-title">{p.title}</h3>
                <span className="blog-card-meta">{readMinutes(p)} min read</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
