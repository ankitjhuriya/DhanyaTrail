// Customer reviews from the Dhanya Trail Google Business Profile, quoted word for word.
// Reviewer names are shortened to first name + last initial.
// Update the rating and count when the Google listing changes.

import { BUSINESS } from './business'

export const GOOGLE_RATING = { rating: 4.9, count: 14, url: BUSINESS.mapsUrl }

export type Review = {
  name: string
  stars: number
  text: string
  localGuide?: boolean
}

export const REVIEWS: Review[] = [
  {
    name: 'Deep C.',
    stars: 5,
    localGuide: true,
    text: 'Best Price.\nSuberp quality.\nPacking is premium.\nShop owner genuinely recommends what is best for you.\nFully satisfied with product and price.\n\nHighly recommended.',
  },
  {
    name: 'Sindhuja S.',
    stars: 5,
    text: 'Serves the best quality of dry fruits. The honey tastes really good. Must try!',
  },
  {
    name: 'Ramnik J.',
    stars: 5,
    text: 'Bilkul natural taste h or bharpur oil k saath h mene inke pass s mene afghani mamara liye the bhut hi mithe badam the',
  },
]
