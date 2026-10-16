import Link from 'next/link'

// "Our Story" + "Why Dhanya Trail" in one compact section, placed just above the footer
const PROMISES = [
  { icon: '🌿', title: 'Carefully selected', text: 'Every product is chosen in our Hisar store for quality, freshness and taste.' },
  { icon: '✨', title: 'Premium varieties', text: 'Kashmiri walnuts, Mamra almonds, jumbo anjeer and more, from trusted origins.' },
  { icon: '🌱', title: 'Natural goodness', text: 'No artificial additives or unnecessary processing.' },
  { icon: '🔒', title: 'Easy, secure ordering', text: 'Checkout online and pay by UPI. Dispatched from Hisar within 24–48 hours.' },
]

export function BrandStory() {
  return (
    <section className="section" style={{ background: 'var(--cream)' }}>
      <div className="container">
        <div className="story">
          <div className="story-intro">
            <span className="section-label">Our Story</span>
            <h2 className="section-title">The Dhanya Trail</h2>
            <div className="gold-divider" />
            <p className="story-quote">From the farm and the forces, to your table.</p>
            <p className="story-text">
              We come from a family of farmers, soldiers and athletes, where fitness and an honest diet always came first.
              Dhanya Trail is our store in Hisar for genuine dry fruits, nuts and seeds, with no additives or unnecessary
              chemicals, now delivered across India.
            </p>
            <div className="story-actions">
              <Link href="/about" className="btn btn-primary">Read our story</Link>
              <Link href="/store" className="btn btn-outline">📍 Visit our Hisar store</Link>
            </div>
          </div>
          <ul className="story-promises" aria-label="Why Dhanya Trail">
            {PROMISES.map(p => (
              <li key={p.title}>
                <span className="story-promise-icon" aria-hidden="true">{p.icon}</span>
                <span>
                  <strong>{p.title}</strong>
                  <span>{p.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
