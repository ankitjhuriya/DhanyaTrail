import { createPublicClient } from './supabase/public'
import { Product, Settings } from './types'
import { BUSINESS } from './business'

export const FALLBACK_PRODUCTS: Product[] = [
  // ALMONDS
  {
    id: 'prod-1',
    name: 'California Almonds',
    slug: 'california-almonds',
    category: 'nuts',
    description: 'Plump, premium-grade California almonds — naturally sweet, rich in protein and healthy fats. Perfect for snacking, cooking, or soaking overnight.',
    origin: 'California, USA',
    storage_info: 'Store in a cool, dry place in an airtight container.',
    images: ['/images/almonds.jpg'],
    thumbnail: '/images/almonds.jpg',
    active: true,
    featured: false,
    bestseller: false,
    badge: 'premium',
    tags: ['nuts', 'almonds', 'badam'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v101', product_id: 'prod-1', weight_grams: 100, price: 110, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 50, active: true },
      { id: 'v102', product_id: 'prod-1', weight_grams: 200, price: 220, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 40, active: true },
      { id: 'v103', product_id: 'prod-1', weight_grams: 250, price: 275, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 30, active: true },
      { id: 'v104', product_id: 'prod-1', weight_grams: 500, price: 550, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v105', product_id: 'prod-1', weight_grams: 1000, price: 1100, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 10, active: true },
    ]
  },
  {
    id: 'prod-2',
    name: 'Kashmiri Badaam',
    slug: 'kashmiri-badaam',
    category: 'nuts',
    description: 'Prized Kashmiri badaam — smaller, oil-richer almonds with a distinctively aromatic flavour. A traditional favourite for milk preparations and gifting.',
    origin: 'Kashmir, India',
    storage_info: 'Store in a cool, dry place.',
    images: ['/images/almonds.jpg'],
    thumbnail: '/images/almonds.jpg',
    active: true,
    featured: true,
    bestseller: false,
    badge: 'premium',
    tags: ['nuts', 'almonds', 'kashmiri'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v201', product_id: 'prod-2', weight_grams: 100, price: 150, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v202', product_id: 'prod-2', weight_grams: 250, price: 375, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v203', product_id: 'prod-2', weight_grams: 500, price: 750, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 10, active: true },
      { id: 'v204', product_id: 'prod-2', weight_grams: 1000, price: 1500, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 5, active: true },
    ]
  },
  {
    id: 'prod-3',
    name: 'Mamra Almonds',
    slug: 'mamra',
    category: 'nuts',
    description: 'Authentic Mamra almonds — thin-skinned, lightweight and packed with oil. The gold standard of almonds in Indian households.',
    origin: 'India/Afghanistan',
    storage_info: 'Store in airtight container.',
    images: ['/images/almonds.jpg'],
    thumbnail: '/images/almonds.jpg',
    active: true,
    featured: true,
    bestseller: false,
    badge: 'premium',
    tags: ['nuts', 'almonds', 'mamra'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v301', product_id: 'prod-3', weight_grams: 100, price: 250, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v302', product_id: 'prod-3', weight_grams: 250, price: 625, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v303', product_id: 'prod-3', weight_grams: 500, price: 1250, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 10, active: true },
      { id: 'v304', product_id: 'prod-3', weight_grams: 1000, price: 2500, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 5, active: true },
    ]
  },
  {
    id: 'prod-4',
    name: 'Afghani Mamra',
    slug: 'afghani-mamra',
    category: 'nuts',
    description: 'Premium Afghani Mamra — hand-selected, extra-oily and deeply flavourful. Considered among the finest almonds available.',
    origin: 'Afghanistan',
    storage_info: 'Store dry.',
    images: ['/images/almonds.jpg'],
    thumbnail: '/images/almonds.jpg',
    active: true,
    featured: false,
    bestseller: false,
    badge: 'handpicked',
    tags: ['nuts', 'almonds', 'mamra'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v401', product_id: 'prod-4', weight_grams: 250, price: 625, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v402', product_id: 'prod-4', weight_grams: 500, price: 1250, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v403', product_id: 'prod-4', weight_grams: 1000, price: 2500, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
    ]
  },
  {
    id: 'prod-5',
    name: 'Badaam Roasted',
    slug: 'badaam-roasted',
    category: 'roasted',
    description: 'Freshly roasted California almonds — lightly salted, crunchy and irresistibly snackable. Made from select whole almonds.',
    origin: 'California, USA',
    storage_info: 'Keep tight.',
    images: ['/images/almonds.jpg'],
    thumbnail: '/images/almonds.jpg',
    active: true,
    featured: false,
    bestseller: false,
    badge: 'roasted',
    tags: ['nuts', 'almonds', 'roasted'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v501', product_id: 'prod-5', weight_grams: 250, price: 430, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v502', product_id: 'prod-5', weight_grams: 500, price: 860, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v503', product_id: 'prod-5', weight_grams: 1000, price: 1720, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
    ]
  },

  // ANJEER
  {
    id: 'prod-6',
    name: 'Anjeer Jumbo',
    slug: 'anjeer-jumbo',
    category: 'dry-fruits',
    description: 'Large, sun-dried figs with a naturally sweet honeyed taste. A time-honoured ingredient in Indian wellness routines.',
    origin: 'Afghanistan/Turkey',
    images: ['/images/anjeer.jpg'],
    thumbnail: '/images/anjeer.jpg',
    active: true,
    featured: false,
    bestseller: true,
    badge: 'premium',
    tags: ['dry-fruits', 'figs', 'anjeer'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v601', product_id: 'prod-6', weight_grams: 250, price: 362.5, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v602', product_id: 'prod-6', weight_grams: 500, price: 725, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 10, active: true },
      { id: 'v603', product_id: 'prod-6', weight_grams: 1000, price: 1450, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 5, active: true },
    ]
  },
  {
    id: 'prod-7',
    name: 'Anjeer Premium Afghani',
    slug: 'anjeer-premium-afghani',
    category: 'dry-fruits',
    description: 'Hand-selected jumbo Afghan figs — plump, tender and extraordinarily sweet. Among the finest dried figs available.',
    origin: 'Afghanistan',
    images: ['/images/anjeer.jpg'],
    thumbnail: '/images/anjeer.jpg',
    active: true,
    featured: true,
    bestseller: false,
    badge: 'handpicked',
    tags: ['dry-fruits', 'figs', 'anjeer'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v701', product_id: 'prod-7', weight_grams: 250, price: 412.5, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v702', product_id: 'prod-7', weight_grams: 500, price: 825, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 10, active: true },
      { id: 'v703', product_id: 'prod-7', weight_grams: 1000, price: 1650, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 5, active: true },
    ]
  },

  // RAISINS & MUNNAKA
  {
    id: 'prod-8',
    name: 'Kishmish Green',
    slug: 'kishmish-green',
    category: 'dry-fruits',
    description: 'Seedless green raisins with a bright, tangy-sweet flavour. A natural energy booster for everyday snacking and cooking.',
    origin: 'Afghanistan',
    images: ['/images/kishmish-green.jpg'],
    thumbnail: '/images/kishmish-green.jpg',
    active: true,
    featured: false,
    bestseller: false,
    badge: null,
    tags: ['dry-fruits', 'raisins', 'kishmish'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v801', product_id: 'prod-8', weight_grams: 250, price: 140, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 25, active: true },
      { id: 'v802', product_id: 'prod-8', weight_grams: 500, price: 280, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 15, active: true },
      { id: 'v803', product_id: 'prod-8', weight_grams: 1000, price: 560, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 8, active: true },
    ]
  },
  {
    id: 'prod-9',
    name: 'Kishmish Black',
    slug: 'kishmish-black',
    category: 'dry-fruits',
    description: 'Dark, plump black raisins with a rich, concentrated sweetness. Excellent for baking, desserts and traditional preparations.',
    origin: 'Afghanistan/Iran',
    images: ['/images/kishmish-black.jpg'],
    thumbnail: '/images/kishmish-black.jpg',
    active: true,
    featured: false,
    bestseller: false,
    badge: null,
    tags: ['dry-fruits', 'raisins', 'kishmish'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v901', product_id: 'prod-9', weight_grams: 250, price: 175, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v902', product_id: 'prod-9', weight_grams: 500, price: 350, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 12, active: true },
      { id: 'v903', product_id: 'prod-9', weight_grams: 1000, price: 700, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 6, active: true },
    ]
  },
  {
    id: 'prod-10',
    name: 'Munnaka',
    slug: 'munnaka',
    category: 'dry-fruits',
    description: 'Large, seeded Munnaka raisins — long revered in traditional wellness practices for their warm properties and rich, distinctive flavour.',
    origin: 'Afghanistan',
    images: ['/images/munnaka.jpg'],
    thumbnail: '/images/munnaka.jpg',
    active: true,
    featured: false,
    bestseller: true,
    badge: 'handpicked',
    tags: ['dry-fruits', 'raisins', 'munnaka'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v1001', product_id: 'prod-10', weight_grams: 250, price: 350, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 18, active: true },
      { id: 'v1002', product_id: 'prod-10', weight_grams: 500, price: 700, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 10, active: true },
      { id: 'v1003', product_id: 'prod-10', weight_grams: 1000, price: 1400, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 5, active: true },
    ]
  },

  // WALNUTS
  {
    id: 'prod-11',
    name: 'Shahi Akhrot',
    slug: 'shahi-akhrot',
    category: 'nuts',
    description: 'Premium Kashmiri Shahi Akhrot — whole walnuts with paper-thin shells and golden kernels. Celebrated for their superior flavour and nutrition.',
    origin: 'Kashmir, India',
    images: ['/images/walnuts.jpg'],
    thumbnail: '/images/walnuts.jpg',
    active: true,
    featured: true,
    bestseller: true,
    badge: 'premium',
    tags: ['nuts', 'walnuts', 'akhrot'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v1101', product_id: 'prod-11', weight_grams: 250, price: 450, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 18, active: true },
      { id: 'v1102', product_id: 'prod-11', weight_grams: 500, price: 900, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 10, active: true },
      { id: 'v1103', product_id: 'prod-11', weight_grams: 1000, price: 1800, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 5, active: true },
    ]
  },
  {
    id: 'prod-12',
    name: 'Walnuts Giri',
    slug: 'walnuts-giri',
    category: 'nuts',
    description: 'Premium walnut halves (giri) — ready to use, freshly extracted kernels with a satisfying crunch and rich, buttery taste.',
    origin: 'Kashmir, India',
    images: ['/images/walnuts.jpg'],
    thumbnail: '/images/walnuts.jpg',
    active: true,
    featured: false,
    bestseller: false,
    badge: null,
    tags: ['nuts', 'walnuts', 'akhrot'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v1201', product_id: 'prod-12', weight_grams: 250, price: 388, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v1202', product_id: 'prod-12', weight_grams: 500, price: 775, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v1203', product_id: 'prod-12', weight_grams: 1000, price: 1550, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
    ]
  },
  {
    id: 'prod-13',
    name: 'Kashmiri Kagazi Walnut Sabut',
    slug: 'kashmiri-kagazi-walnut-sabut',
    category: 'nuts',
    description: 'Kashmiri Kagazi (paper-shell) walnuts — whole, delicate shells that crack easily by hand. A prized variety known for full, meaty kernels.',
    origin: 'Kashmir, India',
    images: ['/images/walnuts.jpg'],
    thumbnail: '/images/walnuts.jpg',
    active: true,
    featured: false,
    bestseller: false,
    badge: 'premium',
    tags: ['nuts', 'walnuts', 'akhrot'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v1301', product_id: 'prod-13', weight_grams: 250, price: 188, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v1302', product_id: 'prod-13', weight_grams: 500, price: 375, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v1303', product_id: 'prod-13', weight_grams: 1000, price: 750, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
    ]
  },

  // MAKHANA
  {
    id: 'prod-14',
    name: 'Makhana 5 Sutta',
    slug: 'makhana-5-sutta',
    category: 'makhana',
    description: 'Grade 5 Sutta Makhana — lotus seeds that are light, crunchy and naturally low in calories. A wholesome snack for the entire family.',
    origin: 'Bihar, India',
    images: ['/images/makhana.jpg'],
    thumbnail: '/images/makhana.jpg',
    active: false, // hidden for now — not currently stocked
    featured: false,
    bestseller: false,
    badge: null,
    tags: ['makhana', 'lotus seeds'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v1401', product_id: 'prod-14', weight_grams: 200, price: 199, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 30, active: true },
      { id: 'v1402', product_id: 'prod-14', weight_grams: 500, price: 449, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
    ]
  },
  {
    id: 'prod-15',
    name: 'Makhana 6 Sutta – Handpicked',
    slug: 'makhana-6-sutta-handpicked',
    category: 'makhana',
    description: 'Premium Grade 6 Sutta Makhana — the largest, finest grade of lotus seeds. Handpicked for exceptional size and texture. A premium daily snack.',
    origin: 'Bihar, India',
    images: ['/images/makhana.jpg'],
    thumbnail: '/images/makhana.jpg',
    active: true,
    featured: true,
    bestseller: true,
    badge: 'handpicked',
    tags: ['makhana', 'lotus seeds'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v1501', product_id: 'prod-15', weight_grams: 100, price: 180, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v1502', product_id: 'prod-15', weight_grams: 200, price: 360, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v1503', product_id: 'prod-15', weight_grams: 500, price: 900, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
    ]
  },

  // CASHEWS
  {
    id: 'prod-16',
    name: 'Cashew W-320',
    slug: 'cashew-w320',
    category: 'nuts',
    description: 'W-320 cashews — the most popular premium grade. Whole, ivory-white kernels with a naturally creamy, buttery taste. Versatile for snacking and cooking.',
    origin: 'Kerala/Goa, India',
    images: ['/images/cashews.jpg'],
    thumbnail: '/images/cashews.jpg',
    active: true,
    featured: true,
    bestseller: true,
    badge: 'premium',
    tags: ['nuts', 'cashews', 'kaju'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v1601', product_id: 'prod-16', weight_grams: 250, price: 300, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v1602', product_id: 'prod-16', weight_grams: 500, price: 600, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 12, active: true },
      { id: 'v1603', product_id: 'prod-16', weight_grams: 1000, price: 1200, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 6, active: true },
    ]
  },
  {
    id: 'prod-17',
    name: 'Cashew W-180 (Jumbo)',
    slug: 'cashew-w180',
    category: 'nuts',
    description: 'W-180 cashews — the "Jumbo" grade. Noticeably larger kernels with a distinctly rich, full flavour. The premium choice for gifting.',
    origin: 'Kerala/Goa, India',
    images: ['/images/cashews.jpg'],
    thumbnail: '/images/cashews.jpg',
    active: true,
    featured: true,
    bestseller: false,
    badge: 'premium',
    tags: ['nuts', 'cashews', 'kaju'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v1701', product_id: 'prod-17', weight_grams: 250, price: 450, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 15, active: true },
      { id: 'v1702', product_id: 'prod-17', weight_grams: 500, price: 900, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 8, active: true },
      { id: 'v1703', product_id: 'prod-17', weight_grams: 1000, price: 1800, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 4, active: true },
    ]
  },
  {
    id: 'prod-18',
    name: 'Cashew W-320 – 8 Tukda',
    slug: 'cashew-w320-8-tukda',
    category: 'nuts',
    description: 'W-320 cashew pieces (8 tukda) — finely broken pieces at great value. Ideal for cooking, sweets and garnishing.',
    origin: 'Kerala/Goa, India',
    images: ['/images/cashews.jpg'],
    thumbnail: '/images/cashews.jpg',
    active: true,
    featured: false,
    bestseller: false,
    badge: null,
    tags: ['nuts', 'cashews', 'kaju'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v1801', product_id: 'prod-18', weight_grams: 250, price: 212.5, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v1802', product_id: 'prod-18', weight_grams: 500, price: 425, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 12, active: true },
      { id: 'v1803', product_id: 'prod-18', weight_grams: 1000, price: 850, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 6, active: true },
    ]
  },
  {
    id: 'prod-19',
    name: 'Kaju Roasted',
    slug: 'kaju-roasted',
    category: 'roasted',
    description: 'Premium whole cashews lightly dry-roasted for a satisfying crunch. A popular guilt-free snack.',
    origin: 'Kerala/Goa, India',
    images: ['/images/cashews.jpg'],
    thumbnail: '/images/cashews.jpg',
    active: true,
    featured: false,
    bestseller: false,
    badge: 'roasted',
    tags: ['nuts', 'cashews', 'kaju', 'roasted'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v1901', product_id: 'prod-19', weight_grams: 250, price: 420, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v1902', product_id: 'prod-19', weight_grams: 500, price: 840, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v1903', product_id: 'prod-19', weight_grams: 1000, price: 1680, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
    ]
  },

  // BERRIES & DRIED FRUITS — ACCURATE DISTINCT PRODUCT PHOTOS
  {
    id: 'prod-20',
    name: 'Sea Buckthorn Berry',
    slug: 'sea-buckthorn-berry',
    category: 'berries',
    description: 'Vibrant Sea Buckthorn berries — a rare Himalayan superfood with a unique tangy flavour, naturally rich in antioxidants and Vitamin C.',
    origin: 'Himalayas, India',
    images: ['/images/sea-buckthorn.jpg'],
    thumbnail: '/images/sea-buckthorn.jpg',
    active: true,
    featured: false,
    bestseller: false,
    badge: 'premium',
    tags: ['berries', 'superfood'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v2001', product_id: 'prod-20', weight_grams: 250, price: 800, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 12, active: true },
      { id: 'v2002', product_id: 'prod-20', weight_grams: 500, price: 1600, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 6, active: true },
    ]
  },
  {
    id: 'prod-21',
    name: 'Khumani (Apricot)',
    slug: 'khumani',
    category: 'berries',
    description: 'Sun-dried Kashmiri apricots (Khumani) — soft, naturally sweet and tangy. A beloved ingredient in traditional recipes and a wholesome snack.',
    origin: 'Kashmir, India',
    images: ['/images/apricot.jpg'],
    thumbnail: '/images/apricot.jpg',
    active: true,
    featured: false,
    bestseller: false,
    badge: null,
    tags: ['berries', 'apricot'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v2101', product_id: 'prod-21', weight_grams: 250, price: 187.5, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v2102', product_id: 'prod-21', weight_grams: 500, price: 375, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 12, active: true },
    ]
  },
  {
    id: 'prod-22',
    name: 'Blueberry',
    slug: 'blueberry',
    category: 'berries',
    description: 'Premium dried blueberries — plump, intensely flavoured and packed with natural goodness. Perfect for breakfast bowls, baking and snacking.',
    origin: 'USA',
    images: ['/images/blueberry.jpg'],
    thumbnail: '/images/blueberry.jpg',
    active: true,
    featured: true,
    bestseller: true,
    badge: 'premium',
    tags: ['berries', 'blueberry'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v2201', product_id: 'prod-22', weight_grams: 250, price: 562.5, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 15, active: true },
      { id: 'v2202', product_id: 'prod-22', weight_grams: 500, price: 1125, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 8, active: true },
    ]
  },
  {
    id: 'prod-23',
    name: 'Goji Berry',
    slug: 'goji-berry',
    category: 'berries',
    description: 'Vibrant red Goji berries — a celebrated wellness ingredient with a mildly sweet and tangy flavour. A popular addition to smoothies and trail mixes.',
    origin: 'China/Himalayas',
    images: ['/images/goji-berry.jpg'],
    thumbnail: '/images/goji-berry.jpg',
    active: true,
    featured: false,
    bestseller: false,
    badge: null,
    tags: ['berries', 'goji'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v2301', product_id: 'prod-23', weight_grams: 250, price: 500, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 15, active: true },
      { id: 'v2302', product_id: 'prod-23', weight_grams: 500, price: 1000, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 8, active: true },
    ]
  },
  {
    id: 'prod-24',
    name: 'Cranberry',
    slug: 'cranberry',
    category: 'berries',
    description: 'Sweetened dried cranberries — bright, tart and chewy. A versatile ingredient for snacking, baking and salads.',
    origin: 'USA',
    images: ['/images/cranberry.jpg'],
    thumbnail: '/images/cranberry.jpg',
    active: true,
    featured: false,
    bestseller: true,
    badge: null,
    tags: ['berries', 'cranberry'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v2401', product_id: 'prod-24', weight_grams: 250, price: 250, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v2402', product_id: 'prod-24', weight_grams: 500, price: 500, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 12, active: true },
    ]
  },

  // SEEDS — ACCURATE DISTINCT PRODUCT PHOTOS
  {
    id: 'prod-25',
    name: 'Flax Seeds',
    slug: 'flax-seeds',
    category: 'seeds',
    description: 'Whole flax seeds (alsi) — a rich plant source of Omega-3 fatty acids and dietary fibre. Easy to add to smoothies, curds, or rotis.',
    origin: 'India',
    images: ['/images/flax-seeds.jpg'],
    thumbnail: '/images/flax-seeds.jpg',
    active: true,
    featured: false,
    bestseller: false,
    badge: null,
    tags: ['seeds', 'flax'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v2501', product_id: 'prod-25', weight_grams: 250, price: 100, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 25, active: true },
      { id: 'v2502', product_id: 'prod-25', weight_grams: 500, price: 200, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 15, active: true },
    ]
  },
  {
    id: 'prod-26',
    name: 'Sunflower Seeds',
    slug: 'sunflower-seeds',
    category: 'seeds',
    description: 'Premium sunflower seeds — mild, nutty and naturally nourishing. A convenient everyday snack and nutritious topping.',
    origin: 'India',
    images: ['/images/sunflower-seeds.jpg'],
    thumbnail: '/images/sunflower-seeds.jpg',
    active: true,
    featured: false,
    bestseller: false,
    badge: null,
    tags: ['seeds', 'sunflower'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v2601', product_id: 'prod-26', weight_grams: 250, price: 112.5, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 25, active: true },
      { id: 'v2602', product_id: 'prod-26', weight_grams: 500, price: 225, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 15, active: true },
    ]
  },
  {
    id: 'prod-27',
    name: 'Pumpkin Seeds',
    slug: 'pumpkin-seeds',
    category: 'seeds',
    description: 'Hulled green pumpkin seeds (pepitas) — crunchy, flavourful and a great source of plant-based goodness. Ideal for snacking and salads.',
    origin: 'India/China',
    images: ['/images/pumpkin-seeds.jpg'],
    thumbnail: '/images/pumpkin-seeds.jpg',
    active: true,
    featured: true,
    bestseller: true,
    badge: 'handpicked',
    tags: ['seeds', 'pumpkin'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v2701', product_id: 'prod-27', weight_grams: 250, price: 281.25, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v2702', product_id: 'prod-27', weight_grams: 500, price: 562.5, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 12, active: true },
    ]
  },
  {
    id: 'prod-28',
    name: 'Chia Seeds',
    slug: 'chia-seeds',
    category: 'seeds',
    description: 'Premium chia seeds — tiny powerhouses that expand in liquid to create a satisfying texture. Great for puddings, smoothies and wellness routines.',
    origin: 'South America',
    images: ['/images/chia-seeds.jpg'],
    thumbnail: '/images/chia-seeds.jpg',
    active: true,
    featured: false,
    bestseller: true,
    badge: 'new',
    tags: ['seeds', 'chia'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v2801', product_id: 'prod-28', weight_grams: 250, price: 150, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 25, active: true },
      { id: 'v2802', product_id: 'prod-28', weight_grams: 500, price: 300, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 15, active: true },
    ]
  },
  {
    id: 'prod-29',
    name: 'Basil Seeds (Sabja)',
    slug: 'basil-seeds',
    category: 'seeds',
    description: 'Sabja (basil seeds) — gel-forming seeds traditionally enjoyed in drinks and desserts. A naturally cooling ingredient for warm months.',
    origin: 'India',
    images: ['/images/basil-seeds.jpg'],
    thumbnail: '/images/basil-seeds.jpg',
    active: true,
    featured: false,
    bestseller: false,
    badge: null,
    tags: ['seeds', 'basil'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v2901', product_id: 'prod-29', weight_grams: 250, price: 175, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 25, active: true },
      { id: 'v2902', product_id: 'prod-29', weight_grams: 500, price: 350, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 15, active: true },
    ]
  },

  // SAFFRON
  {
    id: 'prod-30',
    name: 'Kashmiri Kesar — Classic',
    slug: 'kesar-v1',
    category: 'saffron',
    description: 'Pure Kashmiri saffron with long, deep-crimson threads and a delicate aroma. Adds golden colour and distinctive flavour to milk, sweets and biryani. Sold in 1 g packs.',
    origin: 'Kashmir, India',
    images: ['/images/saffron.jpg'],
    thumbnail: '/images/saffron.jpg',
    active: true,
    featured: true,
    bestseller: true,
    badge: 'premium',
    tags: ['saffron', 'kesar'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v3001', product_id: 'prod-30', weight_grams: 1, price: 240, price_not_configured: false, auto_calculate: false, inventory_mode: 'packs', inventory_packs: 30, active: true },
    ]
  },
  {
    id: 'prod-31',
    name: 'Kashmiri Kesar — Royal',
    slug: 'kesar-v2',
    category: 'saffron',
    description: 'Our finest Kashmiri saffron. Hand-sorted threads, richer in crocin (colour) and safranal (aroma), for the deepest colour and fragrance. Sold in 1 g packs.',
    origin: 'Kashmir, India',
    images: ['/images/saffron.jpg'],
    thumbnail: '/images/saffron.jpg',
    active: true,
    featured: true,
    bestseller: false,
    badge: 'premium',
    tags: ['saffron', 'kesar'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v3101', product_id: 'prod-31', weight_grams: 1, price: 320, price_not_configured: false, auto_calculate: false, inventory_mode: 'packs', inventory_packs: 30, active: true },
    ]
  },

  // PISTA
  {
    id: 'prod-32',
    name: 'Pista – Jumbo Irani Roasted',
    slug: 'pista-jumbo-irani-roasted',
    category: 'nuts',
    description: 'XL Jumbo Irani Pistachios — roasted to perfection with a satisfying crunch and naturally rich flavour. Generously sized for an indulgent snacking experience.',
    origin: 'Iran',
    images: ['/images/pista.jpg'],
    thumbnail: '/images/pista.jpg',
    active: true,
    featured: true,
    bestseller: true,
    badge: 'premium',
    tags: ['nuts', 'pista', 'roasted'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v3201', product_id: 'prod-32', weight_grams: 250, price: 430, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v3202', product_id: 'prod-32', weight_grams: 500, price: 860, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v3203', product_id: 'prod-32', weight_grams: 1000, price: 1720, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
    ]
  },

  // WELLNESS
  {
    id: 'prod-33',
    name: 'Ashwagandha Powder',
    slug: 'ashwagandha',
    category: 'wellness',
    description: 'Pure Ashwagandha root powder — an ancient adaptogenic herb revered in Ayurvedic tradition. A wholesome botanical addition to warm milk, smoothies and daily wellness routines.',
    origin: 'Rajasthan, India',
    images: ['/images/ashwagandha.jpg'],
    thumbnail: '/images/ashwagandha.jpg',
    active: true,
    featured: false,
    bestseller: false,
    badge: 'new',
    tags: ['wellness', 'herbs', 'ayurveda'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      { id: 'v3301', product_id: 'prod-33', weight_grams: 100, price: 140, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v3302', product_id: 'prod-33', weight_grams: 250, price: 350, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
      { id: 'v3303', product_id: 'prod-33', weight_grams: 500, price: 700, price_not_configured: false, auto_calculate: true, inventory_mode: 'packs', inventory_packs: 20, active: true },
    ]
  }
]

// Only active products are shown when Supabase is unavailable.
const ACTIVE_FALLBACK = FALLBACK_PRODUCTS.filter(p => p.active)

export const FALLBACK_SETTINGS: Settings = {
  whatsapp_number: BUSINESS.whatsappNumber,
  whatsapp_default_message: 'Hello Dhanya Trail, I would like to place an order.',
  email: BUSINESS.email,
  phone: BUSINESS.phone,
  address: BUSINESS.address,
  business_name: BUSINESS.name,
  tagline: 'NUTS • DRY FRUITS • HEALTHY SNACKS',
}

// ============================================================
// SETTINGS
// ============================================================
export async function getSettings(): Promise<Settings> {
  try {
    const supabase = createPublicClient()
    const { data } = await supabase.from('settings').select('key, value')
    if (data && data.length > 0) {
      return Object.fromEntries(data.map(({ key, value }) => [key, value])) as Settings
    }
  } catch {}
  return FALLBACK_SETTINGS
}

// ============================================================
// PRODUCTS
// ============================================================
export async function getAllProducts(): Promise<Product[]> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('products')
      .select(`*, variants:product_variants(*)`)
      .eq('active', true)
      .order('created_at', { ascending: true })

    if (!error && data && data.length > 0) {
      return data as Product[]
    }
  } catch {}
  return ACTIVE_FALLBACK
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('products')
      .select(`*, variants:product_variants(*)`)
      .eq('slug', slug)
      .eq('active', true)
      .single()

    if (!error && data) return data as Product
  } catch {}

  const fallback = ACTIVE_FALLBACK.find(p => p.slug === slug)
  return fallback || null
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('products')
      .select(`*, variants:product_variants(*)`)
      .eq('active', true)
      .eq('featured', true)
      .order('created_at', { ascending: true })
      .limit(8)

    if (!error && data && data.length > 0) return data as Product[]
  } catch {}

  return ACTIVE_FALLBACK.filter(p => p.featured)
}

export async function getBestsellerProducts(): Promise<Product[]> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('products')
      .select(`*, variants:product_variants(*)`)
      .eq('active', true)
      .eq('bestseller', true)
      .order('created_at', { ascending: true })
      .limit(8)

    if (!error && data && data.length > 0) return data as Product[]
  } catch {}

  return ACTIVE_FALLBACK.filter(p => p.bestseller)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('products')
      .select(`*, variants:product_variants(*)`)
      .eq('active', true)
      .eq('category', category)
      .order('created_at', { ascending: true })

    if (!error && data && data.length > 0) return data as Product[]
  } catch {}

  return ACTIVE_FALLBACK.filter(p => p.category === category)
}

export async function getRelatedProducts(productId: string, category: string, limit = 4): Promise<Product[]> {
  try {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('products')
      .select(`*, variants:product_variants(*)`)
      .eq('active', true)
      .eq('category', category)
      .neq('id', productId)
      .limit(limit)

    if (!error && data && data.length > 0) return data as Product[]
  } catch {}

  return ACTIVE_FALLBACK.filter(p => p.id !== productId && p.category === category).slice(0, limit)
}

export async function getAllProductsAdmin(): Promise<Product[]> {
  return getAllProducts()
}

export async function getAllProductSlugs(): Promise<string[]> {
  const products = await getAllProducts()
  return products.map(p => p.slug)
}

export async function getOrders(limit = 50) {
  return []
}

export async function getOrderStats() {
  const products = await getAllProducts()
  return {
    totalProducts: products.length,
    activeProducts: products.length,
    lowStock: 0,
    outOfStock: 0,
    totalOrders: 0,
  }
}
