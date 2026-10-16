import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Story | Dhanya Trail',
  description: 'From a family of farmers and defence personnel: why we started Dhanya Trail in Hisar, Haryana, to bring genuine dry fruits, nuts and seeds without additives.',
}

const PILLARS = [
  { icon: '🌾', title: 'Rooted in farming', text: 'Our family started on the land. We know what genuine produce looks and tastes like.' },
  { icon: '💪', title: 'Fitness first', text: 'Sport and the forces taught us that good food is the base of a strong body.' },
  { icon: '🌿', title: 'Nothing added', text: 'No additives or unnecessary chemicals. Just the dry fruit, nut or seed itself.' },
  { icon: '🔁', title: 'Always evolving', text: 'We keep adding healthy snacking options to our range, guided by what you ask for.' },
]

const SOURCES = [
  {
    n: 1,
    text: 'Government figures for 2024-25 given in a written reply to the Lok Sabha by the Minister of State for Health and Family Welfare, February 2026 (as reported by IBTimes)',
    url: 'https://www.ibtimes.co.in/fake-milk-products-12057-cases-filed-against-adulterators-2024-25-898189',
  },
  {
    n: 2,
    text: 'FSSAI, National Milk Safety and Quality Survey 2018 (report released October 2019)',
    url: 'https://www.fssai.gov.in/upload/uploadfiles/files/Report_Milk_Survey_NMQS_18_10_2019.pdf',
  },
]

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <section style={{ background: 'var(--ivory)', borderBottom: '1px solid var(--gold-light)', padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <span className="section-label">Our Story</span>
            <h1 className="section-title">From the farm and the forces, to your table</h1>
            <div className="gold-divider gold-divider-center" />
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Why a family of farmers, soldiers and athletes started a dry fruits store in Hisar.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-story">
          <p>
            Our family&apos;s roots are in farming. My grandfather worked the land, and my father went on to serve in the
            Indian defence forces. I studied engineering, but my brothers and I were always drawn to sport. Some of us became
            athletes, and some joined the forces too.
          </p>
          <p>
            Through every generation, two things stayed the same: <strong>fitness and an honest diet</strong>. Dhanya Trail
            grew out of that.
          </p>
          <p>
            India&apos;s packaged food industry has grown fast, and so has how much we buy. Genuine quality has not always
            kept up. In 2024-25, government food-safety checks found that <strong>12,780 of the 33,405 milk and milk-product
            samples tested</strong>, about 38%, did not meet the standards.<sup><a href="#source-1">1</a></sup> An
            earlier national milk survey by FSSAI found that <strong>41% of samples fell short of at least one quality
            standard</strong>, even though most were safe to drink.<sup><a href="#source-2">2</a></sup> If that is true of
            something as basic as milk, it is worth knowing exactly what is in the rest of your food.
          </p>
          <p>
            That is our promise: <strong>genuine products, with no additives or unnecessary chemicals.</strong>
          </p>
          <p>
            Our grandparents knew exactly where their food came from. Most of us today don&apos;t have that connection to
            direct sourcing. We will keep growing our range, adding healthy snacking options along the way, to bring a little
            of that back.
          </p>
          <div className="about-actions">
            <Link href="/shop" className="btn btn-primary">Shop our range</Link>
            <Link href="/store" className="btn btn-outline">Visit our Hisar store</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--ivory)' }}>
        <div className="container">
          <div className="section-head">
            <span className="section-label">What We Stand For</span>
            <h2 className="section-title">Our pillars</h2>
            <div className="gold-divider gold-divider-center" />
          </div>
          <ul className="story-promises about-pillars">
            {PILLARS.map(p => (
              <li key={p.title}>
                <span className="story-promise-icon" aria-hidden="true">{p.icon}</span>
                <span><strong>{p.title}</strong><span>{p.text}</span></span>
              </li>
            ))}
          </ul>
          <ol className="about-sources">
            {SOURCES.map(s => (
              <li key={s.n} id={`source-${s.n}`}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">{s.text}</a>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}
