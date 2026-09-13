export const metadata = { title: 'Community Programs' }

export default function ProgramsPage() {
  return (
    <main className="px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-[.2em] text-emerald-300">Social purpose</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight">The community loop is built into the product, not added later.</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-300">Paid contractor profiles fund free or subsidized visibility for underrepresented contractors, neighborhood cleanup days, water-conscious pressure washing education, low-VOC paint education, weatherization content, and practical safe-housing resources.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            ['EcoWash Verified', 'Pressure washers can document runoff controls, detergent choices, and cleanup events.'],
            ['Safe Home Field Notes', 'Plumbers, roofers, and HVAC contractors contribute practical prevention guides.'],
            ['Neighborhood Beautification', 'Painters and pressure washers can sponsor small cleanup and repainting projects.'],
            ['Access Profiles', 'Premium revenue subsidizes profile audits for small local operators who cannot yet pay.']
          ].map(([title, body]) => <section key={title} className="rounded-3xl border border-white/10 bg-white/[.04] p-6"><h2 className="text-2xl font-bold">{title}</h2><p className="mt-3 text-zinc-300">{body}</p></section>)}
        </div>
      </div>
    </main>
  )
}
