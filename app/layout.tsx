import type { Metadata, Viewport } from "next"
import Link from "next/link"
import { GoogleAnalytics } from "@/components/analytics/google-analytics"
import "./globals.css"

const siteUrl = "https://www.goatalliance.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "G.O.A.T. Alliance | Network of Vetted Professionals",
    template: "%s | G.O.A.T. Alliance"
  },
  description:
    "Connect with the Greatest Of All Time contractors, consultants, and service providers through our vetted premium directory.",
  keywords: [
    "GOAT Alliance",
    "vetted professionals",
    "contractor directory",
    "premium consultants",
    "trusted service providers"
  ],
  authors: [{ name: "G.O.A.T. Alliance" }],
  creator: "G.O.A.T. Alliance",
  publisher: "G.O.A.T. Alliance",
  openGraph: {
    type: "website",
    siteName: "G.O.A.T. Alliance",
    title: "G.O.A.T. Alliance | Network of Vetted Professionals",
    description:
      "Connect with the Greatest Of All Time professionals. Discover pre-vetted contractors, consultants, and service providers.",
    url: siteUrl,
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "G.O.A.T. Alliance | Network of Vetted Professionals",
    description:
      "Discover the Greatest Of All Time contractors, consultants, and service providers in our vetted marketplace."
  },
  alternates: {
    canonical: siteUrl
  },
  robots: {
    index: true,
    follow: true
  }
}

export const viewport: Viewport = {
  themeColor: "#0f172a"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-slate-950 text-slate-100">
      <body className="antialiased min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:rounded-lg focus:bg-white/90 focus:px-4 focus:py-2 focus:text-slate-900"
        >
          Skip to main content
        </a>
        <GoogleAnalytics />
        {children}
        <footer className="sr-only" aria-hidden>
          <Link href="/sitemap.xml">Sitemap</Link>
        </footer>
      </body>
    </html>
  )
}
