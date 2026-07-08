import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'PNW AI Directory — AI-readable contractor visibility',
    template: '%s | PNW AI Directory'
  },
  description: 'AI-readable contractor directory for Pacific Northwest plumbers, HVAC contractors, roofers, painters, and pressure washers.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://pnwaidirectory.com'),
  openGraph: {
    title: 'PNW AI Directory',
    description: 'The AI-readable local contractor directory for the Pacific Northwest.',
    images: ['/images/hero-ai-readable-directory.svg']
  }
}

const nav = [
  { href: '/', label: 'Home' },
  { href: '/directory', label: 'Directory' },
  { href: '/blog', label: 'Field Notes' },
  { href: '/programs', label: 'Community' },
  { href: '/strategy', label: 'Strategy' }
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-50 antialiased">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/90 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
            <a href="/" className="font-semibold tracking-tight">PNW AI Directory</a>
            <div className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
              {nav.map(item => <a key={item.href} href={item.href} className="hover:text-white">{item.label}</a>)}
            </div>
            <a href="/directory" className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-emerald-300">Get audited</a>
          </nav>
        </header>
        {children}
        <footer className="border-t border-white/10 bg-zinc-950 px-5 py-12 text-sm text-zinc-400">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <p className="text-lg font-semibold text-white">PNW AI Directory</p>
              <p className="mt-3 max-w-xl">A social-purpose visibility system for local contractors. We make useful service data readable by people, search engines, and AI assistants without fake proof or pay-to-play trust claims.</p>
            </div>
            <div>
              <p className="font-semibold text-white">Machine-readable</p>
              <ul className="mt-3 space-y-2"><li><a href="/llms.txt">llms.txt</a></li><li><a href="/llms-full.txt">llms-full.txt</a></li><li><a href="/sitemap.xml">sitemap.xml</a></li></ul>
            </div>
            <div>
              <p className="font-semibold text-white">Launch niches</p>
              <p className="mt-3">Plumbing, HVAC, roofing, painting, and pressure washing.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
