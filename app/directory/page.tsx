import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"

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
    image: "/api/placeholder/100/100",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    description: "10+ years building scalable web applications for startups and enterprises."
  },
  {
    id: 2,
    name: "Marcus Williams",
    title: "Licensed General Contractor",
    location: "Austin, TX",
    rating: 5.0,
    reviewCount: 89,
    hourlyRate: "$95",
    image: "/api/placeholder/100/100",
    skills: ["Residential", "Commercial", "Renovations", "Project Management"],
    description: "Award-winning contractor specializing in sustainable construction practices."
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    title: "Brand Strategy Consultant",
    location: "New York, NY",
    rating: 4.8,
    reviewCount: 156,
    hourlyRate: "$200",
    image: "/api/placeholder/100/100",
    skills: ["Brand Strategy", "Digital Marketing", "SEO", "Content Strategy"],
    description: "Helped 200+ brands increase their market presence and revenue."
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProfessionals.map((professional) => (
                <div 
                  key={professional.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {professional.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900">{professional.name}</h3>
                        <p className="text-gray-600 mb-1">{professional.title}</p>
                        <p className="text-gray-500 text-sm flex items-center">
                          📍 {professional.location}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="flex text-yellow-400">
                            {'★'.repeat(Math.floor(professional.rating))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {professional.rating} ({professional.reviewCount} reviews)
                          </span>
                        </div>
                        <span className="text-lg font-bold text-green-600">{professional.hourlyRate}/hr</span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4">{professional.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {professional.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                          View Profile
                        </Button>
                        <Button variant="outline" className="flex-1">
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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