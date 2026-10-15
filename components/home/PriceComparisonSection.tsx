import Link from 'next/link'
import { Product, formatPrice } from '@/lib/types'
import { CompetitorPrice, COMPETITORS, buildPriceComparison } from '@/lib/competitors'

interface PriceComparisonSectionProps {
  products: Product[]
  competitorPrices: CompetitorPrice[]
}

export function PriceComparisonSection({ products, competitorPrices }: PriceComparisonSectionProps) {
  const rows = products
    .map(product => ({ product, comparison: buildPriceComparison(product, competitorPrices) }))
    .filter((r): r is { product: Product; comparison: NonNullable<typeof r.comparison> } => r.comparison !== null)

  if (rows.length === 0) return null
  const checkedOn = rows.map(r => r.comparison.checkedOn).find(Boolean)

  return (
    <section className="section" style={{ background: 'var(--ivory)' }}>
      <div className="container">
        <div className="section-head">
          <span className="section-label">Honest Pricing</span>
          <h2 className="section-title">Better prices, per 100 g</h2>
          <div className="gold-divider gold-divider-center" />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            The same everyday dry fruits for less than the big online brands. Compare for yourself.
          </p>
        </div>

        <div className="price-compare-scroll">
          <table className="price-compare-grid">
            <thead>
              <tr>
                <th scope="col">Per 100 g</th>
                <th scope="col" className="price-compare-ours">Dhanya Trail</th>
                {COMPETITORS.map(c => <th scope="col" key={c}>{c}</th>)}
                <th scope="col">You save</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ product, comparison }) => (
                <tr key={product.slug}>
                  <th scope="row"><Link href={`/products/${product.slug}`}>{product.name}</Link></th>
                  <td className="price-compare-ours">{formatPrice(comparison.ourPer100g)}</td>
                  {comparison.rows.map(r => (
                    <td key={r.competitor}>{r.per100g === null ? <span className="price-compare-na">–</span> : formatPrice(r.per100g)}</td>
                  ))}
                  <td className="price-compare-save-cell">up to {comparison.maxSavingPct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="price-compare-note" style={{ textAlign: 'center', marginTop: 'var(--space-md)' }}>
          Selling prices on each brand&apos;s own website for the pack closest to 250 g
          {checkedOn && <>, checked on {checkedOn}</>}. &ldquo;–&rdquo; means the brand doesn&apos;t sell it. Brand names belong to their owners.
        </p>
      </div>
    </section>
  )
}
