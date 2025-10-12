import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/cn"

const navLinks = [
  { href: "#directory", label: "Directory" },
  { href: "#pricing", label: "Pricing" },
  { href: "#insights", label: "Insights" },
  { href: "#about", label: "About" }
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-charcoal/70 backdrop-blur border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-3xl font-black text-saffron">G.O.A.T.</span>
          <span className="text-lg font-semibold tracking-[0.2em] text-white">ALLIANCE</span>
        </Link>
        <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-white/80 transition hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" className="text-white" asChild>
            <a href="#signin">Sign In</a>
          </Button>
          <Button className="bg-saffron text-charcoal hover:bg-saffron/90" asChild>
            <a href="#join">Join as Pro</a>
          </Button>
        </div>
        <button
          type="button"
          className="md:hidden"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="block h-0.5 w-8 rounded bg-white" />
          <span className="mt-1 block h-0.5 w-8 rounded bg-white" />
          <span className="mt-1 block h-0.5 w-8 rounded bg-white" />
        </button>
      </div>
      <div
        className={cn("md:hidden overflow-hidden transition-[max-height] duration-300", menuOpen ? "max-h-96" : "max-h-0")}
      >
        <div className="space-y-4 px-6 pb-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="block text-base font-medium text-white/80 hover:text-white">
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-4">
            <Button variant="ghost" className="w-full text-white" asChild>
              <a href="#signin">Sign In</a>
            </Button>
            <Button className="w-full bg-saffron text-charcoal hover:bg-saffron/90" asChild>
              <a href="#join">Join as Pro</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
