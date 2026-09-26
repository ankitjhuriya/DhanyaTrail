import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/layout/CartDrawer'
import { StickyWhatsApp } from '@/components/layout/StickyWhatsApp'
import { getSettings } from '@/lib/products'
import { ToastProvider } from '@/components/ui/Toast'

export const metadata: Metadata = {
  title: 'Dhanya Trail | Premium Dry Fruits, Nuts, Berries & Healthy Snacks',
  description: 'Shop premium dry fruits, nuts, berries, seeds, makhana, saffron and wellness essentials from Dhanya Trail. Carefully selected products with easy WhatsApp ordering.',
  keywords: 'dry fruits, nuts, berries, seeds, makhana, saffron, kesar, almonds, cashews, walnuts, wellness, Hisar, Haryana',
  openGraph: {
    type: 'website',
    title: 'Dhanya Trail | Premium Dry Fruits, Nuts, Berries & Healthy Snacks',
    description: 'Shop premium dry fruits, nuts, berries, seeds, makhana, saffron and wellness essentials from Dhanya Trail.',
    siteName: 'Dhanya Trail',
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
        <link rel="canonical" href="https://dhanyatrail.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Dhanya Trail',
              description: 'Premium dry fruits, nuts, berries, seeds, makhana, saffron and wellness essentials',
              url: 'https://dhanyatrail.com',
              telephone: '+91-70829-77350',
              email: 'Dhanayatrail@gmail.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'HTML Colony, Azad Nagar',
                addressLocality: 'Hisar',
                addressRegion: 'Haryana',
                postalCode: '125001',
                addressCountry: 'IN',
              },
              areaServed: 'India',
              sameAs: [],
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
