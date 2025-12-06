import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content')

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  author: string
  publishedAt: string
  featured: boolean
  metaTitle?: string
  metaDescription?: string
  content: string
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        const { data, content } = matter(fileContents)
        const processedContent = await remark().use(html).process(content)
        const contentHtml = processedContent.toString()

        return {
          slug,
          title: data.title,
          excerpt: data.excerpt,
          author: data.author,
          publishedAt: data.publishedAt,
          featured: data.featured || false,
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          content: contentHtml,
        } as BlogPost
      })
  )

  return allPostsData.sort((a, b) => {
    if (new Date(a.publishedAt) < new Date(b.publishedAt)) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const { data, content } = matter(fileContents)
    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      author: data.author,
      publishedAt: data.publishedAt,
      featured: data.featured || false,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      content: contentHtml,
    } as BlogPost
  } catch {
    return null
  }
}

export async function getFeaturedBlogPosts(limit = 3): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts.filter(post => post.featured).slice(0, limit)
}