"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useMemo } from "react"

const heroWords = [
  "CONTRACTORS",
  "CONSULTANTS",
  "FREELANCERS",
  "SPECIALISTS",
  "EXPERTS"
]

const stats = [
  { value: "2.5K+", label: "Vetted Professionals" },
  { value: "98%", label: "Success Rate" },
  { value: "10K+", label: "Projects Completed" },
  { value: "4.9★", label: "Average Rating" }
]

export default function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined

    const interval = setInterval(() => {
      setIsAnimating(true)
      timeout = setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % heroWords.length)
        setIsAnimating(false)
      }, 500)
    }, 3000)

    return () => {
      clearInterval(interval)
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [])

  const statVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 16 },
      visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: shouldReduceMotion ? 0 : index * 0.12 + 0.2,
          duration: shouldReduceMotion ? 0 : 0.6,
          ease: [0.16, 1, 0.3, 1]
        }
      })
    }),
    [shouldReduceMotion]
  )

  return (
    <motion.section
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 32 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? undefined : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/60 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-500/60 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/60 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Main headline */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-gradient-x mb-4">
            G.O.A.T.
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">ALLIANCE</h2>

          {/* Animated subheading */}
          <div className="text-xl md:text-3xl text-gray-300 mb-8 h-12 flex items-center justify-center">
            <span>NETWORK OF VETTED&nbsp;</span>
            <span
              className={`font-bold text-yellow-400 transition-all duration-500 ${
                isAnimating && !shouldReduceMotion ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              {heroWords[currentWordIndex]}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-200/90 max-w-3xl mx-auto mb-12 leading-relaxed">
          Connect with the <span className="text-yellow-400 font-semibold">Greatest Of All Time</span> professionals. Our premium
          directory features thoroughly vetted contractors, consultants, and service providers ready to elevate your projects to
          championship level.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-black font-bold px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Link href="/directory">🏆 BROWSE THE G.O.A.T.S</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-yellow-400/70 text-yellow-300 hover:bg-yellow-300/20 hover:text-black font-bold px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Link href="/contractor/apply">💎 BECOME A G.O.A.T.</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-slate-900 font-semibold"
          >
            <a href="tel:+18335554628" aria-label="Tap to call the concierge team">📞 Speak with concierge</a>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-panel rounded-2xl px-6 py-8 border border-white/10"
              variants={statVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              custom={index}
            >
              <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">{stat.value}</div>
              <div className="text-sm md:text-base text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </motion.section>
  )
}
