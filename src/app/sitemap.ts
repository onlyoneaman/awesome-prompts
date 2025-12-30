import { MetadataRoute } from 'next'
import { getAllAuthors } from '@/lib/authors.server'
import { getAllPrompts } from '@/lib/content.server'
import { topCategories } from '@/lib/prompts'
import { links } from '@/lib/constants'

// Required for static export
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://promptsmint.com'
  
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
      url: `${baseUrl}${links.PROMPT}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}${links.AUTHOR}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${links.CATEGORY}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${links.SUBMIT}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Dynamic author routes
  const authors = getAllAuthors()
  const authorRoutes: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${baseUrl}${links.AUTHOR}/${author.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic prompt routes
  const prompts = getAllPrompts()
  const promptRoutes: MetadataRoute.Sitemap = prompts.map((prompt) => ({
    url: `${baseUrl}${links.PROMPT}/${prompt.slug}`,
    lastModified: prompt.updated_at || prompt.created_at,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Dynamic category routes
  const categoryRoutes: MetadataRoute.Sitemap = topCategories.map((category) => ({
    url: `${baseUrl}${links.CATEGORY}/${category.slug}`,
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