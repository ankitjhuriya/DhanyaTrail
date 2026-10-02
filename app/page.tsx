import { Metadata } from 'next'
import { Settings, Product } from '@/lib/types'
import { getAllProducts, getSettings, getFeaturedProducts, getBestsellerProducts } from '@/lib/products'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedSection } from '@/components/home/FeaturedSection'
import { BestsellerSection } from '@/components/home/BestsellerSection'
import { ProductWheelSection } from '@/components/home/ProductWheelSection'
import { WellnessSection } from '@/components/home/WellnessSection'
import { WhyDhanya } from '@/components/home/WhyDhanya'
import { BrandStory } from '@/components/home/BrandStory'
import { DiwaliGiftingBanner } from '@/components/home/DiwaliGiftingBanner'

export const metadata: Metadata = {
  title: 'Dhanya Trail | Premium Dry Fruits, Nuts, Berries & Healthy Snacks',
  description: 'Shop premium dry fruits, nuts, berries, seeds, makhana, saffron and wellness essentials from Dhanya Trail. Carefully selected products with easy WhatsApp ordering from Hisar, Haryana.',
}

export const revalidate = 60

export default async function HomePage() {
  const [settingsData, allProducts, featuredProducts, bestsellerProducts] = await Promise.all([
    getSettings().catch(() => ({} as Settings)),
    getAllProducts().catch(() => []),
    getFeaturedProducts().catch(() => []),
    getBestsellerProducts().catch(() => []),
  ])
  const settings: Settings = settingsData

  const wellnessProducts = allProducts.filter((p: Product) =>
    ['wellness', 'seeds'].includes(p.category) ||
    ['chia-seeds', 'flax-seeds', 'pumpkin-seeds', 'basil-seeds', 'sunflower-seeds', 'goji-berry', 'ashwagandha'].includes(p.slug)
  ).slice(0, 7)

  const whatsappNumber = settings.whatsapp_number || '917082977350'

  return (
    <>
      <HeroSection settings={settings} />
      <DiwaliGiftingBanner />
      {featuredProducts.length > 0 && (
        <FeaturedSection products={featuredProducts} whatsappNumber={whatsappNumber} />
      )}
      {allProducts.length > 0 && (
        <ProductWheelSection products={allProducts.slice(0, 12)} settings={settings} />
      )}
      {bestsellerProducts.length > 0 && (
        <BestsellerSection products={bestsellerProducts} whatsappNumber={whatsappNumber} />
      )}
      <WhyDhanya />
      {wellnessProducts.length > 0 && (
        <WellnessSection products={wellnessProducts} />
      )}
      <BrandStory />
    </>
  )
}
