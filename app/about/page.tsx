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
    text: 'USDA FoodData Central, SR Legacy: Nuts, almonds (FDC ID 170567). Per 100 g: 49.9 g fat, of which 31.6 g monounsaturated and 12.3 g polyunsaturated',
    url: 'https://fdc.nal.usda.gov/food-details/170567/nutrients',
  },
  {
    n: 2,
    text: 'FSSAI almond kernel standard (Third Amendment Regulations, 2020, in force from July 2021): oil content not less than 45%, as reported by FnB News',
    url: 'https://fssai.gov.in/upload/media/FSSAI_News_Gazette_FNB_25_08_2020.pdf',
  },
  {
    n: 3,
    text: 'Farmley Healthy Snacking Report 2026, a survey of 6,000+ consumers by a snack brand, as reported by Outlook Business',
    url: 'https://www.outlookbusiness.com/news/86-indians-prioritise-protein-while-choosing-snacks-report',
  },
  {
    n: 4,
    text: 'Passarelli S. et al., Global estimation of dietary micronutrient inadequacies, The Lancet Global Health, 2024',
    url: 'https://doi.org/10.1016/S2214-109X(24)00276-6',
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
            kept up. Take badam. A good almond is about <strong>half oil, and close to 90% of that oil is the healthy,
            unsaturated kind</strong>.<sup><a href="#source-1">1</a></sup> That is why India&apos;s food standard requires
            almond kernels to contain <strong>at least 45% oil</strong>.<sup><a href="#source-2">2</a></sup> Old, poorly
            stored or low-grade almonds lose that goodness as the oil goes stale, yet they can look much the same in a pack.
          </p>
          <p>
            Snacking has changed too. In one recent survey, <strong>86% of Indians said protein matters</strong> when they
            pick a snack.<sup><a href="#source-3">3</a></sup> Protein is important, but it is only one nutrient. Around
            <strong> two in three people worldwide do not get enough vitamin E</strong>, and in India intake of B vitamins
            such as riboflavin is especially low.<sup><a href="#source-4">4</a></sup> A handful of almonds brings protein
            along with vitamin E, riboflavin, magnesium and fibre, which a protein bar on its own often does not.
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
