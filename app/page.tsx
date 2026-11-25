import Link from 'next/link'
import { verticals } from '@/data/verticals'
import { organizationSchema } from '@/lib/schema'

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
      />

      <section className="relative overflow-hidden px-5 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,.20),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,.16),transparent_32%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200">
              Seattle &amp; Pacific Northwest · Verified Local Service Pros
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-tight md:text-7xl">
              Find verified local pros without lead-broker spam.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-zinc-300">
              Real plumbers, HVAC techs, roofers, painters, pressure washers, and portable restroom rentals across the Pacific Northwest. Every listed business is proof-checked so homeowners and AI assistants can trust who they call.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/directory"
                className="rounded-xl bg-emerald-400 px-6 py-3.5 text-center font-semibold text-zinc-950 hover:bg-emerald-300"
              >
                Browse verified trades
              </Link>
              <Link
                href="/programs"
                className="rounded-xl border border-white/25 px-6 py-3.5 text-center font-semibold text-white hover:bg-white/10"
              >
                Claim a Founding Pro spot
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl">
            <img
              src="/images/hero-ai-readable-directory.svg"
              alt="Verified Pacific Northwest contractor directory overview"
              className="rounded-2xl"
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight">
              Built for homeowners who want straight answers, and local pros who earn their reputation.
            </h2>
            <p className="mt-4 text-lg text-zinc-300">
              Most directories sell your phone number to five random contractors. We verify licenses, service areas, and real job proof once so buyers call the right pro directly.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              [
                'For Homeowners & Property Managers',
                'Clear service areas, real license and insurance checks, and direct contact with zero lead-broker spam.',
              ],
              [
                'For Local Contractors',
                'Get recommended by Google, ChatGPT, and Perplexity with clean verified pages, structured data, and real proof.',
              ],
              [
                'For Our Community',
                'Founding partner listings help fund local neighborhood cleanups and Pacific Northwest youth initiatives.',
              ],
            ].map(([title, body]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[.04] p-6"
              >
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-zinc-300">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-900/55 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-8">
            <div>
              <h2 className="text-4xl font-bold">Six urgent local trades across the PNW.</h2>
              <p className="mt-3 text-zinc-300">
                Pick a trade to view verification standards and open Seattle Founding Pro spots.
              </p>
            </div>
            <Link
              href="/directory"
              className="hidden rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold md:inline-flex"
            >
              View full directory
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {verticals.map((v) => (
              <Link
                href={`/directory/${v.slug}`}
                key={v.slug}
                className="group rounded-2xl border border-white/10 bg-zinc-950 p-5 transition hover:-translate-y-1 hover:border-emerald-300/40"
              >
                <img
                  src={v.image}
                  alt={`${v.name} verified profile preview`}
                  className="mb-5 rounded-xl"
                />
                <h3 className="text-xl font-bold">{v.name}</h3>
                <p className="mt-2 text-sm text-zinc-400">{v.buyerIntent}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-7xl rounded-3xl border border-emerald-400/25 bg-emerald-400/[0.06] p-8 md:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">
                Zero fake listings. Seattle Founding Pro verification is open now.
              </h2>
              <p className="mt-4 text-lg text-zinc-300">
                We never publish unverified demo companies as real businesses. We are onboarding our first verified Pacific Northwest pros across roofing, painting, plumbing, HVAC, pressure washing, and portable restroom rentals.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/programs"
                className="rounded-xl bg-emerald-400 px-6 py-3.5 text-center font-semibold text-zinc-950 hover:bg-emerald-300"
              >
                Apply as a Founding Pro
              </Link>
              <Link
                href="/blog"
                className="rounded-xl border border-white/25 px-6 py-3.5 text-center font-semibold text-white hover:bg-white/10"
              >
                Read local field guides
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
