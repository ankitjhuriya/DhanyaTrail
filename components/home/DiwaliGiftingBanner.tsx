import Link from 'next/link'
import { GIFTING_DISCOUNT_THRESHOLD, GIFTING_FROM_PRICE } from '@/lib/gifting'
import { formatPrice } from '@/lib/types'

export function DiwaliGiftingBanner() {
  return (
    <section className="section" style={{ background: 'var(--cream)', paddingBottom: 0 }}>
      <div className="container">
        <div className="diwali-banner">
          <div className="diwali-banner-text">
            <span className="section-label">🪔 Diwali Collection 2026</span>
            <h2>Gift boxes that feel like a keepsake</h2>
            <p>
              Premium dry fruits in Indian Heritage and Pichwai-art boxes, thaalis and trays, from {formatPrice(GIFTING_FROM_PRICE)}.
              Special discount on orders above {formatPrice(GIFTING_DISCOUNT_THRESHOLD)}.
            </p>
            <div className="diwali-banner-actions">
              <Link href="/gifting" className="btn btn-gold">Shop Diwali Gifts</Link>
              <Link href="/gifting#corporate" className="btn btn-outline">Corporate Gifting</Link>
            </div>
          </div>
          <div className="diwali-banner-images">
            <img src="/images/gifting/4-jar-box-peacock.jpg" alt="4 Jar Diwali gift box with peacock artwork" loading="lazy" />
            <img src="/images/gifting/dry-fruits-thaali.jpg" alt="Decorated dry fruits thaali" loading="lazy" />
            <img src="/images/gifting/4-jar-carry-bag-box.jpg" alt="Pichwai-art 4 jar carry bag gift box" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}
