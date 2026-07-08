import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export type BlogPost = {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  vertical?: string
  city?: string
  image?: string
  draft?: boolean
  content: string
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return []
  return fs.readdirSync(postsDirectory)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const slug = file.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(postsDirectory, file), 'utf8')
      const { data, content } = matter(raw)
      return {
        slug,
        title: data.title || slug,
        date: data.date || '2026-07-07',
        summary: data.summary || '',
        tags: data.tags || [],
        vertical: data.vertical,
        city: data.city,
        image: data.image,
        draft: Boolean(data.draft),
        content
      }
    })
    .filter(post => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(slug: string) {
  return getAllPosts().find(post => post.slug === slug)
}

export async function renderMarkdown(markdown: string) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}
