// Reads the catalogue from the "Dhanya Trail Catalogue" Google Sheet.
// The sheet must be shared as "Anyone with the link: Viewer". Edits show on the site within ~1 minute.
// Tabs and headers (header text is matched loosely: case, spaces and symbols are ignored):
//   Products:          Slug | Product title | Category | Active | Featured | Bestseller | Badge | Photo | Description | Origin
//   Packs:             Slug | Product | Pack size (g) | Offer price (₹) | MRP (₹) | In stock
//   Competitor prices: Slug | Product | Competitor | Competitor product | Pack size (g) | Price (₹) | Price per 100 g (₹) | Checked on | Link
// If the sheet can't be read or a tab is empty, callers fall back to Supabase / the built-in list.

import { Product, ProductVariant, CATEGORIES } from './types'
import { CompetitorPrice } from './competitors'

export const CATALOGUE_SHEET_ID = '1f2lfeG2Qs2_bT3IqKx_IYLCq6x99nUxHJULysKqaHxY'
const REVALIDATE_SECONDS = 60

type Row = Record<string, string>

export function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++ }
      else if (c === '"') inQuotes = false
      else field += c
    } else if (c === '"') inQuotes = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field); rows.push(row); row = []; field = ''
    } else field += c
  }
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row) }
  return rows.filter(r => r.some(cell => cell.trim() !== ''))
}

const headerKey = (h: string) => h.toLowerCase().replace(/[^a-z0-9]/g, '')

async function fetchTab(tab: string): Promise<Row[] | null> {
  const url = `https://docs.google.com/spreadsheets/d/${CATALOGUE_SHEET_ID}/gviz/tq?tqx=out:csv&headers=1&sheet=${encodeURIComponent(tab)}`
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } })
    // A private sheet redirects to a Google sign-in page instead of returning CSV
    if (!res.ok || !(res.headers.get('content-type') || '').includes('text/csv')) return null
    const [header, ...body] = parseCsv(await res.text())
    if (!header) return null
    const keys = header.map(headerKey)
    return body.map(cells => Object.fromEntries(keys.map((k, i) => [k, (cells[i] ?? '').trim()])))
  } catch {
    return null
  }
}

const yes = (v: string | undefined) => /^(yes|y|true|1)$/i.test((v || '').trim())
const num = (v: string | undefined): number | null => {
  const n = parseFloat((v || '').replace(/[₹,\s]/g, ''))
  return Number.isFinite(n) ? n : null
}
const slugify = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

function categorySlug(v: string): string | null {
  const key = headerKey(v)
  const match = CATEGORIES.find(c => headerKey(c.slug) === key || headerKey(c.name) === key)
  return match?.slug ?? null
}

function badgeValue(v: string): string | null {
  const b = v.trim().toLowerCase().replace(/\s+/g, '-')
  return ['premium', 'best-seller', 'handpicked', 'roasted', 'new'].includes(b) ? b : null
}

function photoPath(v: string): string | undefined {
  const p = v.trim()
  if (!p) return undefined
  if (/^https?:\/\//.test(p) || p.startsWith('/')) return p
  return `/images/${p}`
}

/** All products from the sheet (inactive ones included, with active=false), or null if unavailable. */
export async function getSheetProducts(): Promise<Product[] | null> {
  const [productRows, packRows] = await Promise.all([fetchTab('Products'), fetchTab('Packs')])
  if (!productRows || productRows.length === 0) return null

  const now = new Date().toISOString()
  const packsBySlug = new Map<string, ProductVariant[]>()
  for (const r of packRows || []) {
    const slug = r.slug || slugify(r.product || '')
    const grams = num(r.packsizeg)
    const price = num(r.offerprice)
    if (!slug || !grams || !price) continue
    const mrp = num(r.mrp)
    const list = packsBySlug.get(slug) || []
    list.push({
      id: `${slug}-${grams}`,
      product_id: slug,
      weight_grams: grams,
      price,
      mrp: mrp && mrp > price ? mrp : null,
      price_not_configured: false,
      auto_calculate: false,
      inventory_mode: 'packs',
      inventory_packs: r.instock === '' || yes(r.instock) ? 100 : 0,
      active: true,
    })
    packsBySlug.set(slug, list)
  }

  const products: Product[] = []
  for (const r of productRows) {
    const name = r.producttitle
    const category = categorySlug(r.category || '')
    if (!name || !category) continue
    const slug = r.slug || slugify(name)
    const photo = photoPath(r.photo || '')
    products.push({
      id: slug,
      name,
      slug,
      category,
      description: r.description || '',
      origin: r.origin || undefined,
      images: photo ? [photo] : [],
      thumbnail: photo,
      active: yes(r.active),
      featured: yes(r.featured),
      bestseller: yes(r.bestseller),
      badge: badgeValue(r.badge || ''),
      tags: [category],
      created_at: now,
      updated_at: now,
      variants: (packsBySlug.get(slug) || []).sort((a, b) => a.weight_grams - b.weight_grams),
    })
  }
  return products.length > 0 ? products : null
}

/** Competitor prices from the sheet, or null if the tab is unavailable or empty. */
export async function getSheetCompetitorPrices(): Promise<CompetitorPrice[] | null> {
  const rows = await fetchTab('Competitor prices')
  if (!rows) return null
  const prices: CompetitorPrice[] = []
  for (const r of rows) {
    const packGrams = num(r.packsizeg)
    const price = num(r.price)
    if (!r.slug || !r.competitor || !packGrams || !price) continue
    prices.push({
      slug: r.slug,
      competitor: r.competitor,
      product: r.competitorproduct || '',
      packGrams,
      price,
      checkedOn: r.checkedon || '',
      url: r.link || undefined,
    })
  }
  return prices.length > 0 ? prices : null
}
