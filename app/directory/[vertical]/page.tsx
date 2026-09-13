import { verticals, getVertical } from '@/data/verticals'
import { contractorProfiles } from '@/data/profiles'
import { verticalServiceSchema } from '@/lib/schema'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ vertical: string }> }

export function generateStaticParams() {
  return verticals.map(v => ({ vertical: v.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props) {
  const { vertical } = await params
  const v = getVertical(vertical)
  return { title: v ? `${v.name} Directory` : 'Directory' }
}

export default async function VerticalPage({ params }: Props) {
  const { vertical } = await params
  const v = getVertical(vertical)
  if (!v) return notFound()
  const profiles = contractorProfiles.filter(p => p.vertical === v.slug)
  return (
    <main className="px-5 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(verticalServiceSchema(v)) }} />
      <div className="mx-auto max-w-7xl">
        <a href="/directory" className="text-sm text-emerald-300">← Directory</a>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-emerald-300">{v.shortName}</p>
            <h1 className="mt-3 text-5xl font-black tracking-tight">AI-readable {v.name} profiles.</h1>
            <p className="mt-5 text-lg leading-8 text-zinc-300">{v.aiReadableAngle}</p>
            <p className="mt-4 text-lg leading-8 text-zinc-300">{v.socialPurposeAngle}</p>
            <a href="#audit" className="mt-8 inline-flex rounded-full bg-emerald-400 px-6 py-3 font-semibold text-zinc-950">{v.cta}</a>
          </div>
          <img src={v.image} alt={`${v.name} directory artwork`} className="rounded-[2rem] border border-white/10" />
        </div>
        <section className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[.04] p-6"><h2 className="text-xl font-semibold">Priority fields</h2><ul className="mt-4 space-y-2 text-zinc-300">{v.priorityFields.map(f => <li key={f}>• {f}</li>)}</ul></div>
          <div className="rounded-3xl border border-white/10 bg-white/[.04] p-6"><h2 className="text-xl font-semibold">Proof assets</h2><ul className="mt-4 space-y-2 text-zinc-300">{v.proofAssets.map(f => <li key={f}>• {f}</li>)}</ul></div>
          <div className="rounded-3xl border border-white/10 bg-white/[.04] p-6"><h2 className="text-xl font-semibold">Agent job</h2><p className="mt-4 text-zinc-300">Hermes checks missing fields, drafts outreach, creates profile copy, writes JSON-LD, updates llms.txt, and queues verification.</p></div>
        </section>
        <section id="audit" className="mt-16">
          <h2 className="text-3xl font-bold">Seed audit cards</h2>
          <div className="mt-6 grid gap-4">{profiles.map(profile => <article key={profile.id} className="rounded-2xl border border-white/10 bg-zinc-900 p-5"><p className="font-semibold">{profile.businessName}</p><p className="mt-2 text-sm text-zinc-400">Status: {profile.status} · AI readiness: {profile.aiReadinessScore}/100 · completeness: {profile.profileCompleteness}/100</p><p className="mt-3 text-zinc-300">Missing proof: {profile.missingData.join(', ')}</p></article>)}</div>
        </section>
      </div>
    </main>
  )
}
