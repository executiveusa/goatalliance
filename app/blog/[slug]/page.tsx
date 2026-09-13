import { getAllPosts, getPost, renderMarkdown } from '@/lib/content'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  return { title: post?.title || 'Field Note', description: post?.summary }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return notFound()
  const contentHtml = await renderMarkdown(post.content)
  return (
    <main className="px-5 py-16">
      <article className="prose prose-invert prose-emerald mx-auto max-w-3xl prose-headings:tracking-tight prose-a:text-emerald-300">
        <a href="/blog" className="not-prose text-sm text-emerald-300">← Field Notes</a>
        <p className="not-prose mt-8 text-sm text-zinc-400">{post.date} · {post.vertical || 'strategy'}</p>
        <h1>{post.title}</h1>
        <p className="lead">{post.summary}</p>
        {post.image && <img src={post.image} alt="" />}
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </main>
  )
}
