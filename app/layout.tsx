import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'G.O.A.T. Alliance - Network of Vetted Professionals',
  description: 'Connect with the Greatest Of All Time contractors and service providers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}