export function BrandStory() {
  return (
    <section className="section" style={{ background: 'var(--ivory)' }}>
      <div className="container">
        <div className="brand-story">
          <div className="brand-story-image">
            <img
              src="/images/hero.jpg"
              alt="Dhanya Trail — premium dry fruits collection arranged beautifully"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <span className="section-label">Our Story</span>
            <h2 className="section-title">The Dhanya Trail</h2>
            <div className="gold-divider" />
            <blockquote className="brand-story-quote">
              A journey towards better choices.
            </blockquote>
            <p style={{ color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: 'var(--space-lg)' }}>
              Dhanya Trail brings together carefully selected dry fruits, nuts, berries, seeds and traditional wellness essentials under one warm and trustworthy brand.
            </p>
            <p style={{ color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: 'var(--space-xl)' }}>
              Our aim is simple — to make premium everyday nourishment easier to discover, choose and enjoy. We are proud to serve from Hisar, Haryana, bringing the finest products to your door.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
              <a href="/shop" className="btn btn-primary">Shop Now</a>
              <a href="/about" className="btn btn-outline">Our Story</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
