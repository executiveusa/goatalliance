import { notFound } from 'next/navigation'
import { getBlogPost, getAllBlogPosts } from '@/lib/blog'
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from 'next'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-6 py-16">
          <header className="mb-12 text-center">
            <div className="flex items-center justify-center space-x-2 text-blue-600 font-medium mb-6">
              <Link href="/blog" className="hover:text-blue-700">
                ← Back to Blog
              </Link>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-center space-x-6 text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {post.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{post.author}</div>
                  <div className="text-sm text-gray-500">Author</div>
                </div>
              </div>
              
              <div className="text-center">
                <time className="font-medium text-gray-900">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
                <div className="text-sm text-gray-500">Published</div>
              </div>
              
              <div className="text-center">
                <div className="font-medium text-gray-900">5 min</div>
                <div className="text-sm text-gray-500">Read time</div>
              </div>
            </div>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {post.excerpt}
            </p>
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-lg prose-blue max-w-none
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg
              prose-ul:text-gray-700 prose-ol:text-gray-700
              prose-li:text-gray-700
              prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Share this article:</span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">Twitter</Button>
                  <Button size="sm" variant="outline">LinkedIn</Button>
                  <Button size="sm" variant="outline">Facebook</Button>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                Subscribe to Newsletter
              </Button>
            </div>
          </footer>
        </article>

        {/* Related Articles */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Placeholder for related articles */}
              <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="aspect-video bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                  <span className="text-4xl text-white">💼</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Building Your Professional Network
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Learn how to effectively network and build meaningful professional relationships.
                  </p>
                  <Link href="#" className="text-blue-600 font-medium hover:text-blue-700">
                    Read more →
                  </Link>
                </div>
              </article>

              <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="aspect-video bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                  <span className="text-4xl text-white">💰</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Pricing Your Services Right
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Master the art of pricing to maximize your income while staying competitive.
                  </p>
                  <Link href="#" className="text-blue-600 font-medium hover:text-blue-700">
                    Read more →
                  </Link>
                </div>
              </article>

              <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="aspect-video bg-gradient-to-r from-yellow-400 to-red-500 flex items-center justify-center">
                  <span className="text-4xl text-white">🎯</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Client Acquisition Strategies
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Proven methods to find and attract your ideal clients consistently.
                  </p>
                  <Link href="#" className="text-blue-600 font-medium hover:text-blue-700">
                    Read more →
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join the G.O.A.T.s?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Apply to become a verified professional and start winning premium projects.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                Apply as Professional
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Browse Directory
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}