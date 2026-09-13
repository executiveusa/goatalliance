import { getAllPosts } from '@/lib/content'

export const metadata = { title: 'Field Notes' }

export default function BlogIndex() {
  const posts = getAllPosts()
  return (
    <main className="px-5 py-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[.2em] text-emerald-300">30-day field guide</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight">Useful local visibility content, backdated for the launch sprint.</h1>
        <p className="mt-5 max-w-3xl text-lg text-zinc-300">Every post is written for contractors, property managers, and AI assistants. The goal is useful local education first, lead capture second.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <article key={post.slug} className="rounded-3xl border border-white/10 bg-white/[.04] p-5">
              {post.image && <img src={post.image} alt="" className="mb-5 rounded-2xl" />}
              <p className="text-sm text-zinc-400">{post.date} · {post.vertical || 'strategy'}</p>
              <h2 className="mt-3 text-2xl font-bold"><a href={`/blog/${post.slug}`}>{post.title}</a></h2>
              <p className="mt-3 text-zinc-300">{post.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">{post.tags.map(tag => <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-300">{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
