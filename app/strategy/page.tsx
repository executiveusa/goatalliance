export const metadata = { title: 'Strategy' }

export default function StrategyPage() {
  return (
    <main className="px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[.2em] text-emerald-300">Operating strategy</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight">Hermes runs the daily operating loop. Paperclip keeps the company memory.</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-300">The product grows through contractor ingestion, profile verification, useful blog publishing, structured data generation, sponsor pages, and social-purpose proof. Every action writes back to company memory and every risky action waits for approval.</p>
        <ol className="mt-10 space-y-4 text-zinc-300">
          <li><strong className="text-white">1. Ingest.</strong> Gather candidate businesses from public web sources and human referrals.</li>
          <li><strong className="text-white">2. Score.</strong> Identify missing proof, weak service pages, review gaps, and AI-readability blockers.</li>
          <li><strong className="text-white">3. Publish.</strong> Create helpful niche/city content and clearly marked seed profiles.</li>
          <li><strong className="text-white">4. Verify.</strong> Move profiles from demo to claimed to verified only when proof is checked.</li>
          <li><strong className="text-white">5. Monetize.</strong> Sell audits, profiles, sponsor pages, data products, and done-for-you AI visibility upgrades.</li>
          <li><strong className="text-white">6. Give back.</strong> Convert a fixed share of premium revenue into community visibility and local cleanup projects.</li>
        </ol>
      </div>
    </main>
  )
}
