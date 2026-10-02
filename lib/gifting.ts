// Diwali 2026 gift boxes & hampers — from the Dhanya Trail Diwali retail catalogue.
// Prices are per piece. Edit here to update the /gifting page.

export type GiftOption = {
  id: string
  label: string        // design or size name shown on the selector
  image: string
  price: number
  netWeightGrams: number
  contents: { item: string; grams: number }[]
}

export type GiftProduct = {
  id: string
  name: string
  tagline: string
  format: string       // e.g. "3 × 350 ml jars"
  optionLabel?: string // heading for the selector, e.g. "Design" or "Size"
  options: GiftOption[]
}

const BASE_3_JAR = [
  { item: 'California Almonds', grams: 150 },
  { item: 'Cashew (W320)', grams: 150 },
  { item: 'Green Kishmish', grams: 200 },
]

const BASE_4_JAR = [...BASE_3_JAR, { item: 'Roasted Pistachio', grams: 150 }]

export const GIFT_PRODUCTS: GiftProduct[] = [
  {
    id: 'gift-3-jar-box',
    name: '3 Jar Gift Box',
    tagline: 'Indian Heritage design with a satin-lined interior and gold-tone handle.',
    format: '3 × 350 ml jars',
    optionLabel: 'Design',
    options: [
      { id: 'midnight-blue', label: 'Midnight Blue', image: '/images/gifting/3-jar-box-midnight-blue.jpg', price: 980, netWeightGrams: 500, contents: BASE_3_JAR },
      { id: 'cream', label: 'Cream', image: '/images/gifting/3-jar-box-cream.jpg', price: 980, netWeightGrams: 500, contents: BASE_3_JAR },
    ],
  },
  {
    id: 'gift-4-jar-box',
    name: '4 Jar Gift Box',
    tagline: 'Twin-peacock artwork in teal and blush, satin-lined with a gold-tone handle.',
    format: '4 × 350 ml jars',
    options: [
      { id: 'peacock', label: 'Peacock', image: '/images/gifting/4-jar-box-peacock.jpg', price: 1380, netWeightGrams: 650, contents: BASE_4_JAR },
    ],
  },
  {
    id: 'gift-4-jar-carry-bag',
    name: '4 Jar Carry Bag Box',
    tagline: 'Pichwai-inspired cow and lotus artwork on soft sage, with a matching carry bag.',
    format: '4 × 350 ml jars + carry bag',
    options: [
      { id: 'pichwai', label: 'Pichwai', image: '/images/gifting/4-jar-carry-bag-box.jpg', price: 1480, netWeightGrams: 650, contents: BASE_4_JAR },
    ],
  },
  {
    id: 'gift-thaali',
    name: 'Dry Fruits Thaali',
    tagline: 'A jewelled, hand-decorated thaali, ribbon-wrapped and ready to gift.',
    format: 'Decorated thaali',
    optionLabel: 'Size',
    options: [
      {
        id: '600g', label: '600 g', image: '/images/gifting/dry-fruits-thaali.jpg', price: 960, netWeightGrams: 600,
        contents: [
          { item: 'California Almonds', grams: 150 },
          { item: 'Cashew (W320)', grams: 150 },
          { item: 'Green Kishmish', grams: 150 },
          { item: 'Roasted Pistachio', grams: 150 },
        ],
      },
      {
        id: '1kg', label: '1 kg', image: '/images/gifting/dry-fruits-thaali.jpg', price: 1650, netWeightGrams: 1000,
        contents: [
          { item: 'California Almonds', grams: 250 },
          { item: 'Cashew (W320)', grams: 250 },
          { item: 'Green Kishmish', grams: 250 },
          { item: 'Roasted Pistachio', grams: 250 },
        ],
      },
    ],
  },
  {
    id: 'gift-tray',
    name: 'Dry Fruits Gift Tray',
    tagline: 'A floral-bordered keepsake tray with premium dry fruits, walnuts and date chocolates.',
    format: 'Keepsake tray',
    options: [
      {
        id: 'floral', label: 'Floral', image: '/images/gifting/dry-fruits-gift-tray.jpg', price: 1600, netWeightGrams: 900,
        contents: [
          { item: 'California Almonds', grams: 150 },
          { item: 'Cashew (W320)', grams: 150 },
          { item: 'Green Kishmish', grams: 150 },
          { item: 'Roasted Pistachio', grams: 150 },
          { item: 'Walnuts', grams: 150 },
          { item: 'Date Chocolates', grams: 150 },
        ],
      },
    ],
  },
]

export const GIFTING_DISCOUNT_THRESHOLD = 3000
export const GIFTING_FROM_PRICE = Math.min(...GIFT_PRODUCTS.flatMap(g => g.options.map(o => o.price)))
