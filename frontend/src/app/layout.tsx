import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GOAT Alliance - Network of Vetted Professionals',
  description: 'GOAT Alliance connects top-tier professionals in a trusted network',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}