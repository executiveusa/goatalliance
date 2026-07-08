import { MetadataRoute } from 'next'
import { verticals } from '@/data/verticals'
import { getAllPosts } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pnwaidirectory.com'
  const now = new Date()
  return [
    '', '/directory', '/blog', '/programs', '/strategy',
    ...verticals.map(v => `/directory/${v.slug}`),
    ...getAllPosts().map(p => `/blog/${p.slug}`)
  ].map(path => ({ url: `${baseUrl}${path}`, lastModified: now, changeFrequency: path.startsWith('/blog') ? 'weekly' : 'daily', priority: path === '' ? 1 : 0.7 }))
}
