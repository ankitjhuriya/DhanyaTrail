import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, getAllProducts, getSettings } from '@/lib/products'
import { Product, Settings } from '@/lib/types'
import { SITE_URL } from '@/lib/business'
import { ProductDetailClient } from './ProductDetailClient'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return { title: 'Product Not Found | Dhanya Trail' }
  }

  return {
    title: `${product.name} | Dhanya Trail`,
    description: product.description || `Buy premium ${product.name} from Dhanya Trail. Handpicked quality dry fruits, nuts, berries & wellness essentials.`,
    openGraph: {
      type: 'website',
      url: './',
      siteName: 'Dhanya Trail',
      title: `${product.name} | Dhanya Trail`,
      description: product.description,
      images: [{ url: product.thumbnail || product.images?.[0] || '/images/hero.jpg', alt: product.name }],
    },
  }
}

function productJsonLd(product: Product) {
  const prices = (product.variants || [])
    .filter(v => v.active !== false && !v.price_not_configured && v.price)
    .map(v => Number(v.price))
  const image = product.thumbnail || product.images?.[0]

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    ...(image && { image: `${SITE_URL}${image}` }),
    brand: { '@type': 'Brand', name: 'Dhanya Trail' },
    ...(prices.length > 0 && {
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'INR',
        lowPrice: Math.min(...prices),
        highPrice: Math.max(...prices),
        offerCount: prices.length,
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/products/${product.slug}`,
      },
    }),
  }
}

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map(product => ({
    slug: product.slug,
  }))
}

export const revalidate = 60

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params
  const [product, allProducts, settingsData] = await Promise.all([
    getProductBySlug(slug),
    getAllProducts().catch(() => []),
    getSettings().catch(() => ({} as Settings)),
  ])
  const settings: Settings = settingsData

  if (!product) {
    notFound()
  }

  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.tags?.some(t => product.tags?.includes(t))))
    .slice(0, 4)

  const whatsappNumber = settings.whatsapp_number || '917082977350'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
        whatsappNumber={whatsappNumber}
        settings={settings}
      />
    </>
  )
}
