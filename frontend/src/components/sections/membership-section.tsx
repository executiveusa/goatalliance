import { Button } from "@/components/ui/button"

const tiers = [
  {
    name: "Ally",
    price: "$249",
    cadence: "one-time",
    perks: ["Directory listing with contact CTA", "Lovable Cloud onboarding support", "Access to compliance resources"]
  },
  {
    name: "Pro",
    price: "$89",
    cadence: "per month",
    perks: [
      "Highlighted placement in premium categories",
      "Stripe-powered recurring billing",
      "Invite up to 5 teammates with shared CRM notes"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "per org",
    perks: ["Dedicated success manager", "Lovable Edge Function integrations", "Volume-based pricing"]
  }
]

export default function MembershipSection() {
  return (
    <section id="pricing" className="bg-charcoal py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-keppel">Memberships</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-white">Flexible plans for every team</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70">
            Keep using Stripe for one-time ally memberships or recurring subscriptions. Lovable webhooks keep your Supabase
            records updated in real time.
          </p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <article key={tier.name} className="flex flex-col rounded-3xl border border-white/10 bg-[#1F2937] p-8">
              <h3 className="font-display text-2xl font-semibold text-saffron">{tier.name}</h3>
              <p className="mt-2 text-3xl font-bold text-white">
                {tier.price}
                <span className="ml-2 text-sm font-normal text-white/60">{tier.cadence}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-white/70">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <span className="text-keppel">•</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 bg-keppel text-charcoal hover:bg-keppel/90" asChild>
                <a href="#join">Choose {tier.name}</a>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
