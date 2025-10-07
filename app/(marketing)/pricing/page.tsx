import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"

const pricingPlans = [
  {
    name: "Explorer",
    price: "Free",
    period: "",
    description: "Perfect for clients looking to discover professionals",
    features: [
      "Browse professional directory",
      "View basic profiles",
      "Send up to 3 messages/month",
      "Access to reviews and ratings",
      "Basic search filters"
    ],
    buttonText: "Get Started Free",
    popular: false
  },
  {
    name: "Professional",
    price: "$29",
    period: "/month",
    description: "Ideal for active clients and growing businesses",
    features: [
      "Everything in Explorer",
      "Unlimited messaging",
      "Advanced search & filters",
      "Priority customer support",
      "Project posting tools",
      "Save favorite professionals",
      "Custom project requirements"
    ],
    buttonText: "Start Professional",
    popular: true
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For larger teams and organizations",
    features: [
      "Everything in Professional",
      "Team collaboration tools",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced analytics",
      "White-label options",
      "SLA guarantee",
      "Bulk hiring tools"
    ],
    buttonText: "Contact Sales",
    popular: false
  }
]

const contractorPlans = [
  {
    name: "Basic",
    price: "5%",
    period: " commission",
    description: "Start building your reputation on the platform",
    features: [
      "Basic profile listing",
      "Receive client inquiries",
      "Standard profile visibility",
      "Basic analytics",
      "Community support"
    ],
    buttonText: "Join as Basic",
    popular: false
  },
  {
    name: "Premium G.O.A.T.",
    price: "$49",
    period: "/month + 3% commission",
    description: "Stand out with enhanced features and visibility",
    features: [
      "Everything in Basic",
      "Featured profile placement",
      "Premium badge & verification",
      "Advanced portfolio showcase",
      "Priority in search results",
      "Direct messaging tools",
      "Detailed analytics dashboard",
      "Marketing support"
    ],
    buttonText: "Become Premium G.O.A.T.",
    popular: true
  },
  {
    name: "Elite G.O.A.T.",
    price: "$149",
    period: "/month + 2% commission",
    description: "Maximum exposure and premium features",
    features: [
      "Everything in Premium",
      "Top placement in categories",
      "Custom branded profile",
      "Lead generation tools",
      "1:1 marketing consultation",
      "Featured in newsletters",
      "Priority customer support",
      "API access for integrations"
    ],
    buttonText: "Go Elite",
    popular: false
  }
]

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Choose the perfect plan for your needs. No hidden fees, no surprises.
            </p>
            
            {/* Plan Type Toggle */}
            <div className="inline-flex bg-white rounded-full p-1 shadow-lg">
              <button className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium">
                For Clients
              </button>
              <button className="px-6 py-3 rounded-full text-gray-600 hover:text-gray-900 font-medium">
                For Professionals
              </button>
            </div>
          </div>
        </section>

        {/* Client Pricing */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Client Plans</h2>
              <p className="text-gray-600">Find and hire the perfect professionals for your projects</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div 
                  key={index}
                  className={`relative rounded-2xl border ${
                    plan.popular 
                      ? 'border-blue-500 shadow-xl scale-105' 
                      : 'border-gray-200 shadow-lg'
                  } bg-white p-8`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Pricing */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Professional Plans</h2>
              <p className="text-gray-600">Grow your business and reach more clients</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {contractorPlans.map((plan, index) => (
                <div 
                  key={index}
                  className={`relative rounded-2xl border ${
                    plan.popular 
                      ? 'border-yellow-500 shadow-xl scale-105' 
                      : 'border-gray-200 shadow-lg'
                  } bg-white p-8`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-yellow-500 to-red-500 text-black px-4 py-2 rounded-full text-sm font-bold">
                        🏆 Recommended
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-black font-bold' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-3">How does the commission structure work for professionals?</h3>
                <p className="text-gray-600">Professionals pay a small commission only when they successfully complete a project through our platform. This ensures our interests are aligned with your success.</p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-3">Can I change my plan at any time?</h3>
                <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated and reflected in your next billing cycle.</p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-3">What makes Premium G.O.A.T. professionals different?</h3>
                <p className="text-gray-600">Premium G.O.A.T.s undergo additional verification, showcase enhanced portfolios, and receive priority placement in search results, making them more visible to potential clients.</p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-3">Is there a free trial available?</h3>
                <p className="text-gray-600">Yes! All paid plans come with a 14-day free trial. Cancel anytime during the trial period and you won&apos;t be charged.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied clients and professionals on G.O.A.T. ALLIANCE
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-bold">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}