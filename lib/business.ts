// Single source of truth for business details used across the site.
// Values here are fallbacks — Supabase `settings` rows override email/phone/address at runtime.

export const SITE_URL = 'https://dhanyatrail.com'

export const BUSINESS = {
  name: 'Dhanya Trail',
  email: 'dhanyatrail@gmail.com',
  phone: '+91 70829 77350',
  whatsappNumber: '917082977350',
  streetAddress: 'Shop No. 2, Plot No. 3, Gali No. 1, HTM Colony, Azad Nagar',
  locality: 'Hisar',
  region: 'Haryana',
  postalCode: '125001',
  address: 'Shop No. 2, Plot No. 3, Gali No. 1, HTM Colony, Azad Nagar, Hisar, Haryana 125001',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dhanya+Trail+HTM+Colony+Azad+Nagar+Hisar+Haryana+125001',
  fssai: '20826007002929',
} as const
