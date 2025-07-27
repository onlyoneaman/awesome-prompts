import { MetadataRoute } from 'next'
import { getAllAuthors } from '@/lib/authors.server'
import { getAllPrompts } from '@/lib/content.server'
import { sampleCategories } from '@/lib/prompts'

// Required for static export
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://prompts.amankumar.ai'
  
  // Get current date for lastModified
  const currentDate = new Date()
  
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/prompts`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/authors`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/prompts/submit`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Dynamic author routes
  const authors = getAllAuthors()
  const authorRoutes: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${baseUrl}/authors/${author.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic prompt routes
  const prompts = getAllPrompts()
  const promptRoutes: MetadataRoute.Sitemap = prompts.map((prompt) => ({
    url: `${baseUrl}/prompts/${prompt.slug}`,
    lastModified: prompt.updated_at || prompt.created_at,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Dynamic category routes
  const categoryRoutes: MetadataRoute.Sitemap = sampleCategories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    ...staticRoutes,
    ...authorRoutes,
    ...promptRoutes,
    ...categoryRoutes,
  ]
} 