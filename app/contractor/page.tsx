import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"

export default function ContractorDashboard() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-yellow-500 to-red-500 text-black py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-black/10 rounded-full px-4 py-2 mb-6">
                  <span className="text-2xl">🏆</span>
                  <span className="font-bold">Premium G.O.A.T. Member</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-6">
                  Welcome Back, Champion!
                </h1>
                <p className="text-lg mb-8 opacity-90">
                  Your premium dashboard gives you access to exclusive features, priority placement, and advanced tools to grow your business.
                </p>
                <div className="flex space-x-4">
                  <Button className="bg-black text-yellow-400 hover:bg-gray-800 font-bold">
                    View My Profile
                  </Button>
                  <Button variant="outline" className="border-black text-black hover:bg-black hover:text-yellow-400 font-bold">
                    Edit Profile
                  </Button>
                </div>
              </div>
              <div className="lg:text-right">
                <div className="inline-block bg-white/20 rounded-2xl p-6 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-4">This Month&apos;s Performance</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold">24</div>
                      <div className="text-sm opacity-80">New Leads</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">$8.2K</div>
                      <div className="text-sm opacity-80">Revenue</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">4.9★</div>
                      <div className="text-sm opacity-80">Rating</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">89%</div>
                      <div className="text-sm opacity-80">Response Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">Quick Actions</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200">
                <span className="text-2xl">📨</span>
                <span className="font-medium">Messages</span>
                <span className="text-xs opacity-60">3 new</span>
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-green-50 text-green-600 hover:bg-green-100 border border-green-200">
                <span className="text-2xl">💼</span>
                <span className="font-medium">Projects</span>
                <span className="text-xs opacity-60">5 active</span>
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-200">
                <span className="text-2xl">📊</span>
                <span className="font-medium">Analytics</span>
                <span className="text-xs opacity-60">View insights</span>
              </Button>
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200">
                <span className="text-2xl">⚙️</span>
                <span className="font-medium">Settings</span>
                <span className="text-xs opacity-60">Manage account</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Premium Features */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Your Premium G.O.A.T. Benefits</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                As a Premium G.O.A.T. member, you get exclusive access to features that help you stand out and win more projects.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Featured Placement</h3>
                <p className="text-gray-600 mb-4">Your profile appears at the top of relevant search results, increasing visibility by 300%.</p>
                <div className="text-sm font-medium text-green-600">✓ Active</div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Advanced Analytics</h3>
                <p className="text-gray-600 mb-4">Track profile views, conversion rates, and optimize your performance with detailed insights.</p>
                <div className="text-sm font-medium text-green-600">✓ Active</div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl">💎</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Premium Badge</h3>
                <p className="text-gray-600 mb-4">Stand out with the exclusive G.O.A.T. Premium badge that builds instant credibility.</p>
                <div className="text-sm font-medium text-green-600">✓ Active</div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Direct Messaging</h3>
                <p className="text-gray-600 mb-4">Communicate directly with clients through our premium messaging system with read receipts.</p>
                <div className="text-sm font-medium text-green-600">✓ Active</div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl">🛟</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Priority Support</h3>
                <p className="text-gray-600 mb-4">Get priority customer support with dedicated account management and faster response times.</p>
                <div className="text-sm font-medium text-green-600">✓ Active</div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Portfolio Showcase</h3>
                <p className="text-gray-600 mb-4">Display unlimited portfolio items with high-resolution images and detailed project descriptions.</p>
                <div className="text-sm font-medium text-green-600">✓ Active</div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">Recent Activity</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">New project inquiry from TechStart Inc.</p>
                    <p className="text-sm text-gray-600">E-commerce website development • $15,000 budget</p>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Project completed: Brand Identity for Green Co.</p>
                    <p className="text-sm text-gray-600">Client rated you 5 stars ⭐⭐⭐⭐⭐</p>
                  </div>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Profile viewed 47 times this week</p>
                    <p className="text-sm text-gray-600">23% increase from last week</p>
                  </div>
                  <span className="text-sm text-gray-500">3 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upgrade CTA */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for Elite G.O.A.T. Status?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Upgrade to Elite G.O.A.T. for maximum visibility, custom branding, and priority placement in all categories.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                Upgrade to Elite G.O.A.T.
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}