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
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "G.O.A.T. ALLIANCE - Network of Vetted Professionals",
  description: "Connect with the Greatest Of All Time professionals. Premium directory of vetted contractors, consultants, and service providers.",
  keywords: "contractors, professionals, vetted, directory, services, premium",
  authors: [{ name: "G.O.A.T. ALLIANCE" }],
  openGraph: {
    title: "G.O.A.T. ALLIANCE - Network of Vetted Professionals",
    description: "Connect with the Greatest Of All Time professionals. Premium directory of vetted contractors, consultants, and service providers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
