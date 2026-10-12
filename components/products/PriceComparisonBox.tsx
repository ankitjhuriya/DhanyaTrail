import { PriceComparison } from '@/lib/competitors'
import { formatPrice } from '@/lib/types'

interface PriceComparisonBoxProps {
  comparison: PriceComparison
}

export function PriceComparisonBox({ comparison }: PriceComparisonBoxProps) {
  return (
    <section className="price-compare" aria-labelledby="price-compare-title">
      <div className="price-compare-head">
        <h2 id="price-compare-title" className="price-compare-title">Compare price per 100 g</h2>
        <span className="price-compare-save">Save up to {comparison.maxSavingPct}%</span>
      </div>
      <table className="price-compare-table">
        <tbody>
          <tr className="price-compare-ours">
            <th scope="row">Dhanya Trail</th>
            <td>{formatPrice(comparison.ourPer100g)}</td>
          </tr>
          {comparison.rows.map(r => (
            <tr key={r.competitor}>
              <th scope="row">{r.competitor}</th>
              <td>
                {r.per100g === null ? (
                  <span className="price-compare-na">Not sold</span>
                ) : r.url ? (
                  <a href={r.url} target="_blank" rel="noopener noreferrer nofollow" title={r.product}>
                    {formatPrice(r.per100g)}
                  </a>
                ) : (
                  formatPrice(r.per100g)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="price-compare-note">
        Selling prices on each brand&apos;s own website for the pack closest to 250 g
        {comparison.checkedOn && <>, checked on {comparison.checkedOn}</>}. Brand names belong to their owners.
      </p>
    </section>
  )
}
