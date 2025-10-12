const features = [
  {
    title: "Vetted Network",
    description:
      "Every professional undergoes multi-step verification including licensing, insurance, and peer reviews before appearing in the directory."
  },
  {
    title: "Stripe-Powered Billing",
    description:
      "Offer one-time or subscription memberships with automated invoicing and Lovable Cloud webhooks keeping statuses in sync."
  },
  {
    title: "Group Accounts",
    description:
      "Invite entire teams to collaborate with shared permissions and onboarding flows tailored for enterprise partners."
  },
  {
    title: "Lovable Cloud Ready",
    description:
      "Supabase Auth, Postgres, and Edge Functions provide a secure backend that scales without managing infrastructure."
  }
]

export default function FeaturesSection() {
  return (
    <section id="directory" className="bg-[#1F2937] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-keppel">Why the Alliance works</p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-white">Trusted infrastructure from day one</h2>
          </div>
          <p className="max-w-xl text-base text-white/70">
            We blend rigorous vetting with modern tooling so members can showcase expertise while clients hire confidently.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-3xl border border-white/10 bg-charcoal/40 p-8 shadow-lg">
              <h3 className="font-display text-2xl font-semibold text-saffron">{feature.title}</h3>
              <p className="mt-3 text-sm text-white/70">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
