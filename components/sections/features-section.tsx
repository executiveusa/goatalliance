import { Button } from "@/components/ui/button"

const features = [
  {
    icon: "🏆",
    title: "Elite Professionals",
    description: "Hand-picked contractors with proven track records and verified credentials."
  },
  {
    icon: "🔍",
    title: "Advanced Search",
    description: "Find the perfect professional with our intelligent matching system."
  },
  {
    icon: "💎",
    title: "Premium Quality",
    description: "Every professional goes through rigorous vetting and quality assurance."
  },
  {
    icon: "⚡",
    title: "Fast Matching",
    description: "Get connected with qualified professionals in minutes, not days."
  },
  {
    icon: "🛡️",
    title: "Guaranteed Work",
    description: "All projects backed by our quality guarantee and dispute resolution."
  },
  {
    icon: "📊",
    title: "Transparent Pricing",
    description: "Clear, upfront pricing with no hidden fees or surprise charges."
  }
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500">G.O.A.T.?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We don&apos;t just connect you with professionals – we connect you with the absolute best in their field.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 border border-gray-100 hover:border-yellow-200"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-8 py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Start Your Search Today
          </Button>
        </div>
      </div>
    </section>
  )
}