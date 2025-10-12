const partners = [
  "Amazon", "Microsoft", "Starbucks", "Seattle Seahawks", "Alaska Airlines", "Expedia"
]

export default function PartnersSection() {
  return (
    <section id="insights" className="bg-[#141B24] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-keppel">Trusted by regional leaders</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white">Backed by partners who demand excellence</h2>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-8 text-center text-white/70 sm:grid-cols-3 md:grid-cols-6">
          {partners.map((partner) => (
            <div key={partner} className="rounded-xl border border-white/5 bg-white/5 py-4 text-sm font-medium">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
