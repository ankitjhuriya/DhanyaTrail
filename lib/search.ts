// Product search with Hindi / English synonyms, e.g. "badam" finds almonds and "kaju" finds cashews.
// Matches partial words too, so results appear while the customer is still typing.

const SYNONYM_GROUPS: string[][] = [
  ['badam', 'badaam', 'almond', 'almonds', 'mamra'],
  ['kaju', 'cashew', 'cashews'],
  ['akhrot', 'walnut', 'walnuts', 'giri'],
  ['kishmish', 'kismis', 'raisin', 'raisins', 'munakka', 'munnaka'],
  ['anjeer', 'fig', 'figs'],
  ['kesar', 'saffron', 'zafran'],
  ['pista', 'pistachio', 'pistachios'],
  ['makhana', 'fox nut', 'foxnut', 'lotus seed', 'phool makhana'],
  ['khumani', 'khubani', 'apricot', 'apricots'],
  ['sabja', 'basil', 'tukmaria'],
  ['alsi', 'flax', 'linseed'],
  ['kaddu', 'pumpkin'],
  ['buckthorn', 'sea buckthorn'],
  ['ashwagandha', 'aswagandha'],
  ['berry', 'berries'],
  ['seed', 'seeds', 'beej'],
  ['dry fruit', 'dry fruits', 'dryfruit', 'mewa', 'meva'],
]

export type SearchableProduct = {
  slug: string
  name: string
  category: string      // category display name
}

const normalize = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim()

/** All spellings a typed word could mean, e.g. "bad" -> badam, badaam, almond, almonds, mamra. */
function expandToken(token: string): string[] {
  const variants = new Set([token])
  for (const group of SYNONYM_GROUPS) {
    if (group.some(word => word.startsWith(token) || token.startsWith(word))) {
      group.forEach(word => variants.add(word))
    }
  }
  return [...variants]
}

/** Turns multi-word synonyms into a single word first, e.g. "fox nut" -> "makhana". */
function replacePhrases(query: string): string {
  let q = query
  for (const group of SYNONYM_GROUPS) {
    for (const word of group) {
      if (word.includes(' ') && q.includes(word)) q = q.replace(word, group[0].replace(/ /g, ''))
    }
  }
  return q
}

export function searchProducts<T extends SearchableProduct>(products: T[], query: string): T[] {
  const tokens = replacePhrases(normalize(query)).split(' ').filter(Boolean)
  if (tokens.length === 0) return []
  const expanded = tokens.map(expandToken)

  return products.filter(p => {
    const haystack = normalize(`${p.name} ${p.category} ${p.slug.replace(/-/g, ' ')}`)
    return expanded.every(variants => variants.some(v => haystack.includes(v)))
  })
}
