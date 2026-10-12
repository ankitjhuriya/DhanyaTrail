import { Product, ProductVariant } from './types'

// Crossed-out "compare at" price. The MRP column in the catalogue sheet sets it per pack.
// For data without an MRP field (Supabase / built-in list), it defaults to the selling
// price plus this markup, rounded up to the nearest ₹10.
export const COMPARE_AT_MARKUP = 0.2

// Pack size featured on product tiles. Products not sold in this size show their closest pack.
export const DISPLAY_WEIGHT_GRAMS = 250

export function isPriced(v: ProductVariant): boolean {
  return !v.price_not_configured && !!v.price && v.active !== false
}

export function getDisplayVariant(product: Product): ProductVariant | undefined {
  const priced = (product.variants || []).filter(isPriced)
  if (priced.length === 0) return undefined
  return [...priced].sort((a, b) =>
    Math.abs(a.weight_grams - DISPLAY_WEIGHT_GRAMS) - Math.abs(b.weight_grams - DISPLAY_WEIGHT_GRAMS) ||
    a.weight_grams - b.weight_grams
  )[0]
}

/** Crossed-out price for one pack, or null when none should be shown. */
export function getCompareAtPrice(variant: ProductVariant): number | null {
  if (!variant.price) return null
  if (variant.mrp !== undefined) return variant.mrp && variant.mrp > variant.price ? variant.mrp : null
  return Math.ceil((variant.price * (1 + COMPARE_AT_MARKUP)) / 10) * 10
}

// Price per 100 g, or null for small packs (e.g. 1 g saffron) where it would be misleading.
export function pricePer100g(variant: ProductVariant): number | null {
  if (!variant.price || variant.weight_grams < 100) return null
  return (variant.price * 100) / variant.weight_grams
}
