const REASONS = [
  {
    icon: '🌿',
    title: 'Carefully Selected',
    text: 'Thoughtfully selected products for quality and taste — every item in our collection is chosen with care.',
  },
  {
    icon: '✨',
    title: 'Premium Quality',
    text: 'A collection built around premium varieties and everyday favourites, sourced from trusted origins.',
  },
  {
    icon: '🌱',
    title: 'Natural Goodness',
    text: 'Simple, wholesome ingredients for everyday snacking — no artificial additives or unnecessary processing.',
  },
  {
    icon: '💬',
    title: 'Easy Ordering',
    text: 'Choose your product, select your weight and order directly through WhatsApp. Simple and personal.',
  },
]

export function WhyDhanya() {
  return (
    <section className="section" style={{ background: 'var(--cream)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <span className="section-label">Why Choose Us</span>
          <h2 className="section-title">Why Dhanya Trail</h2>
          <div className="gold-divider gold-divider-center" />
        </div>
        <div className="why-grid">
          {REASONS.map(reason => (
            <div key={reason.title} className="why-card">
              <div className="why-icon">{reason.icon}</div>
              <h3 className="why-title">{reason.title}</h3>
              <p className="why-text">{reason.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
