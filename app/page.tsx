import { verticals } from '@/data/verticals'
import { contractorProfiles } from '@/data/profiles'
import { organizationSchema } from '@/lib/schema'

export default function HomePage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
      <section className="relative overflow-hidden px-5 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,.22),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,.18),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200">Pacific Northwest launch: plumbers, HVAC, roofers, painters, pressure washers</p>
            <h1 className="max-w-4xl text-5xl font-black leading-[.95] tracking-tight md:text-7xl">The AI-readable contractor directory for the Pacific Northwest.</h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-zinc-300">We turn local contractor proof into clean pages, structured data, llms.txt files, and useful field content that humans and AI assistants can understand.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/directory" className="rounded-full bg-emerald-400 px-6 py-3 text-center font-semibold text-zinc-950 hover:bg-emerald-300">Audit my contractor profile</a>
              <a href="/blog" className="rounded-full border border-white/20 px-6 py-3 text-center font-semibold text-white hover:bg-white/10">Read the 30-day field guide</a>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl">
            <img src="/images/hero-ai-readable-directory.svg" alt="AI-readable directory system map for Pacific Northwest contractors" className="rounded-[1.5rem]" />
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-emerald-300">Black-swan insight</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight">The hidden buyer is not only the homeowner.</h2>
            <p className="mt-4 text-lg text-zinc-300">Property managers, insurance adjusters, real estate agents, utilities, climate programs, and AI assistants all need structured contractor data. Most directories sell attention. We sell verified clarity.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ['For contractors', 'A paid visibility profile that proves service area, specialties, proof assets, and availability.'],
              ['For AI search', 'llms.txt, JSON-LD, markdown mirrors, service-area pages, and clean profile feeds.'],
              ['For community', 'Premium profiles subsidize community cleanup, water-conscious work, and social-purpose local projects.']
            ].map(([title, body]) => <div key={title} className="rounded-3xl border border-white/10 bg-white/[.04] p-6"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 text-zinc-300">{body}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-zinc-900/55 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-8">
            <div><p className="text-sm font-semibold uppercase tracking-[.2em] text-emerald-300">Launch verticals</p><h2 className="mt-3 text-4xl font-bold">Five local service niches with urgent intent.</h2></div>
            <a href="/directory" className="hidden rounded-full border border-white/20 px-5 py-3 text-sm font-semibold md:inline-flex">View directory</a>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {verticals.map(v => (
              <a href={`/directory/${v.slug}`} key={v.slug} className="group rounded-3xl border border-white/10 bg-zinc-950 p-5 transition hover:-translate-y-1 hover:border-emerald-300/40">
                <img src={v.image} alt={`${v.name} AI-readable profile artwork`} className="mb-5 rounded-2xl" />
                <h3 className="text-xl font-bold">{v.name}</h3>
                <p className="mt-3 text-sm text-zinc-400">{v.buyerIntent}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[.2em] text-emerald-300">No fake claims</p>
              <h2 className="mt-3 text-4xl font-bold">Seed profiles are clearly marked until verified.</h2>
              <p className="mt-4 text-zinc-300">Trust is the product. The app separates demo data, claimed data, and verified data so the directory never pretends a contractor has proof we have not checked.</p>
            </div>
            <div className="grid gap-4">
              {contractorProfiles.map(profile => (
                <div key={profile.id} className="rounded-2xl border border-white/10 bg-white/[.04] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div><p className="font-semibold text-white">{profile.businessName}</p><p className="text-sm text-zinc-400">{profile.city}, {profile.state} · {profile.status}</p></div>
                    <span className="rounded-full bg-amber-300/15 px-3 py-1 text-xs text-amber-200">AI score {profile.aiReadinessScore}</span>
                  </div>
                  <p className="mt-3 text-sm text-zinc-300">Missing: {profile.missingData.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
