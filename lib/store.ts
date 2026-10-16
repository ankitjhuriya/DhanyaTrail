// The Hisar shop shown on the /store page. Add shop photos to public/images/store/ and list them here.

export type StorePhoto = { src: string; alt: string }

export const STORE_PHOTOS: StorePhoto[] = []

// Google Maps embed for the shop (official embed URL, no API key needed)
export const STORE_MAP_EMBED =
  'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1sDhanya+Trail,+HTM+Colony,+Azad+Nagar,+Hisar!6i16'

export const STORE_HIGHLIGHTS = [
  { icon: '🥜', title: 'See and taste before you buy', text: 'Check the size, colour and freshness of every dry fruit yourself.' },
  { icon: '🎁', title: 'Diwali gift boxes on display', text: 'See the Heritage and Pichwai boxes, thaalis and trays in person.' },
  { icon: '🧺', title: 'Custom hampers', text: 'Tell us your budget and preferred mix, and we will put it together for you.' },
  { icon: '🤝', title: 'Personal advice', text: 'Ask us what suits your family, from daily snacking to festive gifting.' },
]
