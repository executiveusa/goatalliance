import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { getAllBlogPosts, getFeaturedBlogPosts } from "@/lib/blog"
import Link from "next/link"

export default async function BlogPage() {
  const [allPosts, featuredPosts] = await Promise.all([
    getAllBlogPosts(),
    getFeaturedBlogPosts()
  ])

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              G.O.A.T. Insights
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Expert insights, industry trends, and actionable advice for professionals and businesses.
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold">
              Subscribe to Newsletter
            </Button>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold mb-12">Featured Articles</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Main Featured Post */}
                <article className="lg:col-span-1">
                  <Link href={`/blog/${featuredPosts[0].slug}`}>
                    <div className="group cursor-pointer">
                      <div className="aspect-video bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-6 flex items-center justify-center">
                        <span className="text-6xl text-white">📝</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{featuredPosts[0].author}</span>
                          <span>•</span>
                          <time>{new Date(featuredPosts[0].publishedAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</time>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {featuredPosts[0].title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {featuredPosts[0].excerpt}
                        </p>
                        <div className="inline-flex items-center space-x-2 text-blue-600 font-medium group-hover:text-blue-700">
                          <span>Read more</span>
                          <span>→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>

                {/* Secondary Featured Posts */}
                <div className="space-y-8">
                  {featuredPosts.slice(1).map((post) => (
                    <article key={post.slug}>
                      <Link href={`/blog/${post.slug}`}>
                        <div className="group cursor-pointer flex space-x-4">
                          <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl text-white">📈</span>
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <span>{post.author}</span>
                              <span>•</span>
                              <time>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}</time>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">Latest Articles</h2>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm">All</Button>
                <Button variant="outline" size="sm">Business</Button>
                <Button variant="outline" size="sm">Technology</Button>
                <Button variant="outline" size="sm">Career</Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPosts.map((post) => (
                <article key={post.slug} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="group cursor-pointer">
                      <div className="aspect-video bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-4xl text-gray-500">📄</span>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{post.author}</span>
                          <span>•</span>
                          <time>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</time>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="inline-flex items-center space-x-2 text-blue-600 font-medium group-hover:text-blue-700">
                          <span>Read more</span>
                          <span>→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline">Load More Articles</Button>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Updated with G.O.A.T. Insights
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Get the latest industry insights, professional tips, and exclusive content delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-0 text-gray-900"
                />
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}