import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/layout/CartDrawer'
import { StickyWhatsApp } from '@/components/layout/StickyWhatsApp'
import { getSettings } from '@/lib/products'
import { ToastProvider } from '@/components/ui/Toast'
import { BUSINESS, SITE_URL } from '@/lib/business'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Dhanya Trail | Premium Dry Fruits, Nuts, Berries & Healthy Snacks',
  description: 'Shop premium dry fruits, nuts, berries, seeds, makhana, saffron and wellness essentials from Dhanya Trail. Carefully selected products with easy WhatsApp ordering.',
  keywords: 'dry fruits, nuts, berries, seeds, makhana, saffron, kesar, almonds, cashews, walnuts, diwali gift box, dry fruits gift hamper, wellness, Hisar, Haryana',
  // './' resolves to each page's own URL, so every page gets its own canonical link
  alternates: { canonical: './' },
  openGraph: {
    type: 'website',
    url: './',
    title: 'Dhanya Trail | Premium Dry Fruits, Nuts, Berries & Healthy Snacks',
    description: 'Shop premium dry fruits, nuts, berries, seeds, makhana, saffron and wellness essentials from Dhanya Trail.',
    siteName: 'Dhanya Trail',
    locale: 'en_IN',
    images: [{ url: '/images/hero.jpg', alt: 'Premium dry fruits and nuts from Dhanya Trail' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/hero.jpg'],
  },
  other: {
    'geo.region': 'IN-HR',
    'geo.placename': 'Hisar, Haryana',
  },
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSettings().catch(() => ({}))

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Store',
              name: BUSINESS.name,
              description: 'Premium dry fruits, nuts, berries, seeds, makhana, saffron, wellness essentials and Diwali gift boxes',
              url: SITE_URL,
              image: `${SITE_URL}/images/hero.jpg`,
              telephone: BUSINESS.phone,
              email: BUSINESS.email,
              address: {
                '@type': 'PostalAddress',
                streetAddress: BUSINESS.streetAddress,
                addressLocality: BUSINESS.locality,
                addressRegion: BUSINESS.region,
                postalCode: BUSINESS.postalCode,
                addressCountry: 'IN',
              },
              hasMap: BUSINESS.mapsUrl,
              areaServed: 'India',
              priceRange: '₹₹',
            }),
          }}
        />
      </head>
      <body>
        <ToastProvider>
          <Navbar settings={settings} />
          <CartDrawer settings={settings} />
          <main>{children}</main>
          <Footer settings={settings} />
          <StickyWhatsApp settings={settings} />
        </ToastProvider>
      </body>
    </html>
  )
}
