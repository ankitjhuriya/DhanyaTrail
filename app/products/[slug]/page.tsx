import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, getAllProducts, getSettings } from '@/lib/products'
import { Settings } from '@/lib/types'
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
      title: `${product.name} | Dhanya Trail`,
      description: product.description,
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
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
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
      whatsappNumber={whatsappNumber}
      settings={settings}
    />
  )
}
