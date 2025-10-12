import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const heroWords = ["CONTRACTORS", "CONSULTANTS", "FREELANCERS", "SPECIALISTS", "EXPERTS"]

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true)
      setTimeout(() => {
        setWordIndex((value) => (value + 1) % heroWords.length)
        setAnimate(false)
      }, 350)
    }, 2600)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-charcoal via-[#1F2937] to-charcoal px-6 py-24 text-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,179,159,0.25),_transparent_55%),_linear-gradient(to_bottom,_rgba(20,27,36,0.2),_rgba(20,27,36,0.85))]" />
      <p className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-saffron">Network of Vetted Pros</p>
      <h1 className="font-display text-5xl font-black tracking-tight text-white md:text-7xl">GOAT Alliance</h1>
      <p className="mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
        Connect with the <span className="text-saffron">Greatest Of All Time</span> professionals. We vet every contractor and
        consultant so you can hire with confidence.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4 md:flex-row">
        <Button size="lg" className="bg-keppel text-charcoal hover:bg-keppel/90" asChild>
          <a href="#directory">Browse Members</a>
        </Button>
        <Button size="lg" variant="outline" className="border-saffron text-saffron hover:bg-saffron hover:text-charcoal" asChild>
          <a href="#join">Become a GOAT</a>
        </Button>
      </div>
      <div className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-8 text-left text-white/80 sm:grid-cols-4">
        <Stat label="Vetted Professionals" value="2.5K+" />
        <Stat label="Average Rating" value="4.9★" />
        <Stat label="Projects Delivered" value="10K+" />
        <Stat label="Referral Satisfaction" value="98%" />
      </div>
      <div className="mt-12 text-sm uppercase tracking-[0.3em] text-white/60">
        Network of vetted&nbsp;
        <span className={`inline-block font-semibold text-saffron transition duration-300 ${animate ? "opacity-0" : "opacity-100"}`}>
          {heroWords[wordIndex]}
        </span>
      </div>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-2xl font-semibold text-saffron">{value}</p>
      <p className="mt-1 text-sm text-white/70">{label}</p>
    </div>
  )
}
