import { verticals } from '@/data/verticals'
import { cities } from '@/data/cities'
import { contractorProfiles } from '@/data/profiles'

export const metadata = { title: 'Directory' }

export default function DirectoryPage() {
  return (
    <main className="px-5 py-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[.2em] text-emerald-300">Directory</p>
        <h1 className="mt-3 max-w-4xl text-5xl font-black tracking-tight">Find and improve AI-readable contractor profiles.</h1>
        <p className="mt-5 max-w-3xl text-lg text-zinc-300">This MVP shows the profile model, vertical pages, city coverage, and missing-proof audit logic. Real contractors should be ingested only after verification or explicit claim.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {verticals.map(v => <a key={v.slug} href={`/directory/${v.slug}`} className="rounded-3xl border border-white/10 bg-white/[.04] p-5 hover:border-emerald-300/40"><img src={v.image} alt="" className="mb-4 rounded-2xl"/><h2 className="text-xl font-bold">{v.name}</h2><p className="mt-3 text-sm text-zinc-400">{v.aiReadableAngle}</p></a>)}
        </div>
        <section className="mt-16">
          <h2 className="text-3xl font-bold">Launch cities</h2>
          <div className="mt-5 flex flex-wrap gap-3">{cities.map(city => <span key={city.slug} className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300">{city.name}, {city.state}</span>)}</div>
        </section>
        <section className="mt-16">
          <h2 className="text-3xl font-bold">Seed profile audit queue</h2>
          <div className="mt-5 grid gap-4">{contractorProfiles.map(p => <article key={p.id} className="rounded-2xl border border-white/10 bg-zinc-900 p-5"><p className="text-lg font-semibold">{p.businessName}</p><p className="mt-1 text-sm text-zinc-400">{p.city}, {p.state} · {p.vertical} · {p.status}</p><p className="mt-3 text-zinc-300">Social-purpose fit: {p.socialPurposeFit}</p></article>)}</div>
        </section>
      </div>
    </main>
  )
}
