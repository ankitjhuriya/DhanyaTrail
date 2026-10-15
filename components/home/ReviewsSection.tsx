import { GOOGLE_RATING, REVIEWS } from '@/lib/reviews'

function Stars({ count }: { count: number }) {
  return (
    <span className="review-stars" role="img" aria-label={`${count} out of 5 stars`}>
      {'★'.repeat(count)}
      <span className="review-stars-empty">{'★'.repeat(5 - count)}</span>
    </span>
  )
}

export function ReviewsSection() {
  return (
    <section className="section" style={{ background: 'var(--cream)' }}>
      <div className="container">
        <div className="section-head">
          <span className="section-label">What Our Customers Say</span>
          <h2 className="section-title">Loved by customers in Hisar</h2>
          <div className="gold-divider gold-divider-center" />
          <a href={GOOGLE_RATING.url} target="_blank" rel="noopener noreferrer" className="reviews-summary">
            <span className="reviews-summary-rating">{GOOGLE_RATING.rating.toFixed(1)}</span>
            <Stars count={Math.round(GOOGLE_RATING.rating)} />
            <span className="reviews-summary-count">from {GOOGLE_RATING.count} Google reviews</span>
          </a>
        </div>

        <div className="reviews-grid">
          {REVIEWS.map(r => (
            <figure key={r.name} className="review-card">
              <Stars count={r.stars} />
              <blockquote className="review-text">{r.text}</blockquote>
              <figcaption className="review-author">
                <span className="review-avatar" aria-hidden="true">{r.name.charAt(0)}</span>
                <span>
                  <strong>{r.name}</strong>
                  <span className="review-source">{r.localGuide ? 'Local Guide · ' : ''}Google review</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
          <a href={GOOGLE_RATING.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Read all reviews on Google
          </a>
        </div>
      </div>
    </section>
  )
}
