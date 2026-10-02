export type Product = {
  id: string
  name: string
  slug: string
  category: string
  description: string
  long_description?: string
  origin?: string
  storage_info?: string
  images: string[]
  thumbnail?: string
  active: boolean
  featured: boolean
  bestseller: boolean
  badge?: string | null
  tags: string[]
  search_aliases?: string
  inventory_grams?: number
  inventory_mode?: 'packs' | 'bulk'
  created_at: string
  updated_at: string
  variants?: ProductVariant[]
}

export type ProductVariant = {
  id: string
  product_id: string
  weight_grams: number
  price: number | null
  price_not_configured: boolean
  auto_calculate: boolean
  inventory_mode: 'packs' | 'bulk'
  inventory_packs: number
  active: boolean
}

export type CartItem = {
  productId: string
  productName: string
  slug: string
  weight: number
  quantity: number
  price: number
  image?: string
  href?: string // link back to the item; defaults to /products/{slug}
}

export type Settings = {
  whatsapp_number?: string
  whatsapp_default_message?: string
  email?: string
  phone?: string
  address?: string
  business_name?: string
  tagline?: string
  payment_link?: string
  instagram_url?: string
  facebook_url?: string
  seo_title?: string
  seo_description?: string
}

export type Order = {
  id: string
  order_number: string
  customer_name?: string
  customer_phone?: string
  customer_email?: string
  items: CartItem[]
  subtotal: number
  total: number
  status: 'new' | 'confirmed' | 'packed' | 'dispatched' | 'completed' | 'cancelled'
  source: 'whatsapp' | 'website' | 'manual'
  notes?: string
  created_at: string
  updated_at: string
}

export const WEIGHT_OPTIONS = [100, 200, 250, 500, 1000] as const
export type WeightOption = typeof WEIGHT_OPTIONS[number]

export const CATEGORIES = [
  { slug: 'dry-fruits', name: 'Dry Fruits', emoji: '🌿' },
  { slug: 'nuts', name: 'Nuts', emoji: '🥜' },
  { slug: 'berries', name: 'Berries & Fruits', emoji: '🫐' },
  { slug: 'seeds', name: 'Seeds', emoji: '🌱' },
  { slug: 'makhana', name: 'Makhana', emoji: '⚪' },
  { slug: 'saffron', name: 'Saffron', emoji: '🌸' },
  { slug: 'wellness', name: 'Wellness', emoji: '🌿' },
  { slug: 'roasted', name: 'Roasted Collection', emoji: '🔥' },
] as const

export function formatWeight(grams: number): string {
  if (grams === 1000) return '1 kg'
  return `${grams} g`
}

export function formatPrice(price: number): string {
  return `₹${Math.round(price).toLocaleString('en-IN')}`
}
