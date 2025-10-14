import Link from "next/link"
import { motion } from "framer-motion"
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
    <section className="relative py-24 bg-slate-950 text-slate-100 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.25),_transparent_45%)]" aria-hidden></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500">G.O.A.T.?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We don&apos;t just connect you with professionals – we connect you with the absolute best in their field.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              className="glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl hover:border-emerald-300/40 transition-colors"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-4xl mb-4" aria-hidden>{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </motion.article>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-500/90 hover:to-blue-600/90 text-white font-bold px-8 py-4 text-lg shadow-xl"
          >
            <Link href="/directory">Start Your Search Today</Link>
          </Button>
          <Button
            asChild
            variant="link"
            className="text-emerald-300 hover:text-emerald-200"
          >
            <Link href="/accessibility">Accessibility commitment</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
