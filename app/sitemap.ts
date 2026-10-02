import type { MetadataRoute } from 'next'
import { getAllProductSlugs } from '@/lib/products'
import { CATEGORIES } from '@/lib/types'
import { SITE_URL } from '@/lib/business'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllProductSlugs().catch(() => [] as string[])
  const now = new Date()

  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/gifting`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/shop`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    ...CATEGORIES.map(c => ({
      url: `${SITE_URL}/${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...slugs.map(slug => ({
      url: `${SITE_URL}/products/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...['about', 'contact', 'faq'].map(p => ({
      url: `${SITE_URL}/${p}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
    ...['shipping-policy', 'return-policy', 'privacy-policy', 'terms'].map(p => ({
      url: `${SITE_URL}/${p}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ]

  return pages
}
