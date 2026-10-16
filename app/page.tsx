import { Metadata } from 'next'
import { Settings, Product } from '@/lib/types'
import { getAllProducts, getSettings, getFeaturedProducts, getBestsellerProducts, getCompetitorPrices } from '@/lib/products'
import { PriceComparisonSection } from '@/components/home/PriceComparisonSection'
import { ReviewsSection } from '@/components/home/ReviewsSection'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedSection } from '@/components/home/FeaturedSection'
import { CategoryStrip } from '@/components/home/CategoryStrip'
import { BrandStory } from '@/components/home/BrandStory'
import { DiwaliGiftingBanner } from '@/components/home/DiwaliGiftingBanner'

export const metadata: Metadata = {
  title: 'Dhanya Trail | Premium Dry Fruits, Nuts, Berries & Healthy Snacks',
  description: 'Shop premium dry fruits, nuts, berries, seeds, makhana, saffron and wellness essentials from Dhanya Trail, Hisar. Better prices per 100 g, Diwali gift boxes and secure UPI checkout.',
}

export const revalidate = 600 // 10 minutes

const BESTSELLER_COUNT = 6

export default async function HomePage() {
  const [settingsData, allProducts, featuredProducts, bestsellerProducts, competitorPrices] = await Promise.all([
    getSettings().catch(() => ({} as Settings)),
    getAllProducts().catch(() => []),
    getFeaturedProducts().catch(() => []),
    getBestsellerProducts().catch(() => []),
    getCompetitorPrices().catch(() => []),
  ])
  const settings: Settings = settingsData

  // One "Bestsellers" list: Featured first, then Bestsellers, without repeats
  const bestsellers: Product[] = []
  for (const p of [...featuredProducts, ...bestsellerProducts]) {
    if (!bestsellers.some(b => b.slug === p.slug)) bestsellers.push(p)
  }

  return (
    <>
      <HeroSection settings={settings} />
      <DiwaliGiftingBanner />
      {bestsellers.length > 0 && <FeaturedSection products={bestsellers.slice(0, BESTSELLER_COUNT)} />}
      <PriceComparisonSection products={allProducts} competitorPrices={competitorPrices} />
      <ReviewsSection />
      {allProducts.length > 0 && <CategoryStrip products={allProducts} />}
      <BrandStory />
    </>
  )
}
