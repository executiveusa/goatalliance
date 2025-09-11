import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import DirectoryGrid from "@/app/components/DirectoryGrid"

const categories = [
  { name: "Construction", icon: "🏗️", count: 234 },
  { name: "Web Development", icon: "💻", count: 189 },
  { name: "Design", icon: "🎨", count: 156 },
  { name: "Marketing", icon: "📈", count: 143 },
  { name: "Consulting", icon: "💼", count: 127 },
  { name: "Legal", icon: "⚖️", count: 98 },
  { name: "Finance", icon: "💰", count: 87 },
  { name: "Engineering", icon: "⚙️", count: 76 }
]

const featuredProfessionals = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Full-Stack Developer",
    location: "San Francisco, CA",
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: "$150",
    blurb: "10+ years building scalable web applications for startups and enterprises. Specialized in React, Node.js, and cloud architecture.",
    slug: "sarah-chen"
  },
  {
    id: 2,
    name: "Marcus Williams",
    title: "Licensed General Contractor",
    location: "Austin, TX",
    rating: 5.0,
    reviewCount: 89,
    hourlyRate: "$95",
    blurb: "Award-winning contractor specializing in sustainable construction practices. 15+ years of residential and commercial experience.",
    slug: "marcus-williams"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    title: "Brand Strategy Consultant",
    location: "New York, NY",
    rating: 4.8,
    reviewCount: 156,
    hourlyRate: "$200",
    blurb: "Helped 200+ brands increase their market presence and revenue through strategic positioning and digital marketing excellence.",
    slug: "elena-rodriguez"
  }
]

export default function DirectoryPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Directory
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Browse our curated network of 2,500+ vetted professionals across all industries
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by skill, location, or profession..."
                  className="w-full px-6 py-4 text-lg rounded-full border-0 text-gray-900 shadow-lg focus:ring-4 focus:ring-white/20 focus:outline-none"
                />
                <Button 
                  className="absolute right-2 top-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                  size="sm"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 hover:border-blue-200"
                >
                  <div className="text-3xl mb-3 text-center">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 text-center mb-1">{category.name}</h3>
                  <p className="text-gray-600 text-center text-sm">{category.count} professionals</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Professionals */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured G.O.A.T.s</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Meet some of our top-rated professionals who consistently deliver exceptional results
              </p>
            </div>

            <DirectoryGrid professionals={featuredProfessionals} />

            <div className="text-center mt-12">
              <Button size="lg" variant="outline">
                Load More Professionals
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join the G.O.A.T.s?
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Apply to become a verified professional and access premium features
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                Apply as Professional
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Post a Project
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}