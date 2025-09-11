import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import HeroSection from "@/components/sections/hero-section"
import FeaturesSection from "@/components/sections/features-section"
import DirectoryGrid from "@/app/components/DirectoryGrid"

// Sample data for directory preview
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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        
        {/* Directory Preview Section */}
        <section id="directory" className="py-16 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Meet Our G.O.A.T.s
              </h2>
              <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
                Browse our curated network of exceptional professionals who consistently deliver outstanding results
              </p>
            </div>
            
            <DirectoryGrid professionals={featuredProfessionals} className="mb-8" />
            
            <div className="text-center">
              <a 
                href="/directory"
                className="inline-flex items-center px-6 py-3 bg-charcoal text-cream font-semibold rounded-xl hover:bg-charcoal/90 transition-colors"
              >
                View All Professionals
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
