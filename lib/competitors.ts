// Competitor prices used for the "price per 100 g" comparison.
// One row per competitor per product: the competitor's single pack closest to 250 g,
// at the selling price on their own website on the date checked.
// The "Competitor prices" tab of the catalogue Google Sheet overrides this list when it has rows.

import { Product } from './types'
import { getDisplayVariant, pricePer100g } from './pricing'

export type CompetitorPrice = {
  slug: string          // our product's slug
  competitor: string
  product: string       // competitor's product name, as listed
  packGrams: number
  price: number         // competitor's selling price for that pack (₹)
  checkedOn: string     // e.g. "12 Oct 2026"
  url?: string
}

const CHECKED = '12 Oct 2026'

export const FALLBACK_COMPETITOR_PRICES: CompetitorPrice[] = [
  { slug: 'california-almonds', competitor: 'Nutraj', product: 'Premium California Almonds 250g', packGrams: 250, price: 429, checkedOn: CHECKED, url: 'https://www.nutraj.com/products/nutraj-premium-california-almonds-250g' },
  { slug: 'california-almonds', competitor: 'Happilo', product: '100% Natural Premium Californian Almonds 200g', packGrams: 200, price: 299, checkedOn: CHECKED, url: 'https://happilo.com/products/natural-premium-california-almonds' },

  { slug: 'mamra', competitor: 'Nutraj', product: 'Anmol Jumbo Size Mamra Almonds 500g', packGrams: 500, price: 3955, checkedOn: CHECKED, url: 'https://www.nutraj.com/products/nutraj-anmol-mamra-almond-kernel' },
  { slug: 'mamra', competitor: 'Happilo', product: 'Premium Raw Mamra Almonds 250g', packGrams: 250, price: 1032.75, checkedOn: CHECKED, url: 'https://happilo.com/products/happilo-premium-international-authentic-mamra-almond' },
  { slug: 'mamra', competitor: 'Urban Platter', product: 'Mamra Almonds 250g', packGrams: 250, price: 1264, checkedOn: CHECKED, url: 'https://www.urbanplatter.com/products/urban-platter-mamra-almonds-250g' },

  { slug: 'cashew-w320', competitor: 'Nutraj', product: 'Premium Cashew Nuts 250g (W320)', packGrams: 250, price: 429, checkedOn: CHECKED, url: 'https://www.nutraj.com/products/nutraj-premium-cashew-nuts-250gm-w320' },
  { slug: 'cashew-w320', competitor: 'Happilo', product: 'Premium Whole Cashew Nuts 200g', packGrams: 200, price: 335.75, checkedOn: CHECKED, url: 'https://happilo.com/products/premium-whole-cashew-nuts-online' },
  { slug: 'cashew-w320', competitor: 'Urban Platter', product: 'Goan Cashew Nuts (W320) 400g', packGrams: 400, price: 674, checkedOn: CHECKED, url: 'https://www.urbanplatter.com/products/urban-platter-goan-cashew-nuts-grade-w320-400g' },

  { slug: 'walnuts-giri', competitor: 'Nutraj', product: 'Classic Kashmiri Walnut Kernel 250g', packGrams: 250, price: 469, checkedOn: CHECKED, url: 'https://www.nutraj.com/products/classic-kashmiri-walnut-kernel' },
  { slug: 'walnuts-giri', competitor: 'Happilo', product: '100% Natural Kashmiri Walnut Kernels 200g', packGrams: 200, price: 386.75, checkedOn: CHECKED, url: 'https://happilo.com/products/natural-kashmiri-walnut-kernels' },
  { slug: 'walnuts-giri', competitor: 'Urban Platter', product: 'Kashmir Walnut Kernels 250g', packGrams: 250, price: 577, checkedOn: CHECKED, url: 'https://www.urbanplatter.com/products/urban-platter-kashmir-walnut-kernels-250g-product-of-kashmir-rich-in-fiber-protein-add-to-fruit-salads-oatmeal-trail-mixes-desserts-baked-goods' },

  { slug: 'kishmish-black', competitor: 'Nutraj', product: 'Black Raisins 200g', packGrams: 200, price: 220, checkedOn: CHECKED, url: 'https://www.nutraj.com/products/black-raisin-200gm' },
  { slug: 'kishmish-black', competitor: 'Happilo', product: 'Premium Seedless Afghani Black Raisins 250g', packGrams: 250, price: 267.75, checkedOn: CHECKED, url: 'https://happilo.com/products/happilo-premium-seedless-afghani-black-raisins' },

  { slug: 'anjeer-jumbo', competitor: 'Nutraj', product: 'Dried Figs 250g', packGrams: 250, price: 475, checkedOn: CHECKED, url: 'https://www.nutraj.com/products/nutraj-dried-figs' },
  { slug: 'anjeer-jumbo', competitor: 'Happilo', product: 'Premium Dried Afghani Anjeer 200g', packGrams: 200, price: 395.25, checkedOn: CHECKED, url: 'https://happilo.com/products/happilo-premium-dried-afghani-anjeer' },

  { slug: 'makhana-6-sutta-handpicked', competitor: 'Nutraj', product: 'Phool Classic Makhana 100g', packGrams: 100, price: 240, checkedOn: CHECKED, url: 'https://www.nutraj.com/products/nutraj-phool-makhana' },
  { slug: 'makhana-6-sutta-handpicked', competitor: 'Happilo', product: 'Premium Plain Prasadam Makhana 200g', packGrams: 200, price: 420.75, checkedOn: CHECKED, url: 'https://happilo.com/products/plain-prasadam-makhana-200g' },
  { slug: 'makhana-6-sutta-handpicked', competitor: 'Urban Platter', product: 'Makhana 150g', packGrams: 150, price: 299, checkedOn: CHECKED, url: 'https://www.urbanplatter.com/products/makhana-150g-popped-water-lily-seeds-source-of-protein-and-fiber-unroasted-and-unsalted' },
]

export const COMPETITORS = ['Nutraj', 'Happilo', 'Urban Platter'] as const

export function competitorPer100g(c: CompetitorPrice): number {
  return (c.price * 100) / c.packGrams
}

export type PriceComparison = {
  ourPer100g: number
  ourPackGrams: number
  rows: { competitor: string; per100g: number | null; product?: string; packGrams?: number; url?: string }[]
  maxSavingPct: number
  checkedOn: string
}

/**
 * Builds the per-100 g comparison for one product, using our pack closest to 250 g.
 * Returns null when there is nothing to compare, or when any competitor is cheaper,
 * so the site never shows a comparison we lose.
 */
export function buildPriceComparison(product: Product, prices: CompetitorPrice[]): PriceComparison | null {
  const variant = getDisplayVariant(product)
  const ours = variant ? pricePer100g(variant) : null
  const theirs = prices.filter(p => p.slug === product.slug)
  if (!variant || ours === null || theirs.length === 0) return null

  const per100 = theirs.map(competitorPer100g)
  if (per100.some(v => v <= ours)) return null

  return {
    ourPer100g: ours,
    ourPackGrams: variant.weight_grams,
    rows: COMPETITORS.map(name => {
      const c = theirs.find(t => t.competitor === name)
      return c
        ? { competitor: name, per100g: competitorPer100g(c), product: c.product, packGrams: c.packGrams, url: c.url }
        : { competitor: name, per100g: null }
    }),
    maxSavingPct: Math.round((1 - ours / Math.max(...per100)) * 100),
    checkedOn: theirs.map(t => t.checkedOn).find(Boolean) || '',
  }
}
