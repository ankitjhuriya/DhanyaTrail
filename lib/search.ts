// Search alias map for Hindi/common names to product search terms
export const SEARCH_ALIASES: Record<string, string[]> = {
  badam: ['california almonds', 'kashmiri badaam', 'mamra', 'afghani mamra', 'badaam roasted', 'almond'],
  badaam: ['california almonds', 'kashmiri badaam', 'mamra', 'afghani mamra', 'badaam roasted', 'almond'],
  almond: ['california almonds', 'kashmiri badaam', 'mamra', 'afghani mamra', 'badaam roasted'],
  kaju: ['cashew w-320', 'cashew w-180', 'cashew w-320 – 8 tukda', 'kaju roasted', 'cashew'],
  cashew: ['cashew w-320', 'cashew w-180', 'cashew w-320 – 8 tukda', 'kaju roasted'],
  akhrot: ['shahi akhrot', 'walnuts giri', 'kashmiri kagazi walnut sabut', 'walnut'],
  walnut: ['shahi akhrot', 'walnuts giri', 'kashmiri kagazi walnut sabut'],
  kishmish: ['kishmish green', 'kishmish black', 'munnaka', 'raisin'],
  raisin: ['kishmish green', 'kishmish black', 'munnaka'],
  kismis: ['kishmish green', 'kishmish black', 'munnaka'],
  munnaka: ['munnaka'],
  munakka: ['munnaka'],
  anjeer: ['anjeer jumbo', 'anjeer premium afghani'],
  fig: ['anjeer jumbo', 'anjeer premium afghani'],
  kesar: ['kesar v1', 'kesar v2'],
  saffron: ['kesar v1', 'kesar v2'],
  zafran: ['kesar v1', 'kesar v2'],
  pista: ['pista – jumbo irani roasted', 'pistachio'],
  pistachio: ['pista – jumbo irani roasted'],
  makhana: ['makhana 5 sutta', 'makhana 6 sutta – handpicked'],
  'fox nut': ['makhana 5 sutta', 'makhana 6 sutta – handpicked'],
  lotus: ['makhana 5 sutta', 'makhana 6 sutta – handpicked'],
  chia: ['chia seeds'],
  flax: ['flax seeds'],
  alsi: ['flax seeds'],
  sabja: ['basil seeds'],
  sunflower: ['sunflower seeds'],
  pumpkin: ['pumpkin seeds'],
  blueberry: ['blueberry'],
  goji: ['goji berry'],
  cranberry: ['cranberry'],
  khumani: ['khumani'],
  apricot: ['khumani'],
  buckthorn: ['sea buckthorn berry'],
  ashwagandha: ['ashwagandha'],
  aswagandha: ['ashwagandha'],
  mamra: ['mamra', 'afghani mamra'],
}

export function expandSearchQuery(query: string): string[] {
  const lower = query.toLowerCase().trim()
  const terms: string[] = [lower]

  // Check if query matches any alias key
  for (const [alias, expansions] of Object.entries(SEARCH_ALIASES)) {
    if (lower.includes(alias) || alias.includes(lower)) {
      terms.push(...expansions)
    }
  }

  return [...new Set(terms)]
}

export function searchProducts<T extends { name: string; search_aliases?: string; tags?: string[] }>(
  products: T[],
  query: string
): T[] {
  if (!query.trim()) return products

  const expandedTerms = expandSearchQuery(query)
  const lower = query.toLowerCase()

  return products.filter(product => {
    const productName = product.name.toLowerCase()
    const aliases = (product.search_aliases || '').toLowerCase()
    const tags = (product.tags || []).join(' ').toLowerCase()
    const searchText = `${productName} ${aliases} ${tags}`

    // Direct match
    if (searchText.includes(lower)) return true

    // Expanded term match
    for (const term of expandedTerms) {
      if (productName.includes(term) || aliases.includes(term) || tags.includes(term)) {
        return true
      }
    }

    return false
  })
}
