"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

const heroWords = [
  "CONTRACTORS",
  "CONSULTANTS", 
  "FREELANCERS",
  "SPECIALISTS",
  "EXPERTS"
]

export default function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % heroWords.length)
        setIsAnimating(false)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Main headline */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-gradient-x mb-4">
            G.O.A.T.
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            ALLIANCE
          </h2>
          
          {/* Animated subheading */}
          <div className="text-xl md:text-3xl text-gray-300 mb-8 h-12 flex items-center justify-center">
            <span>NETWORK OF VETTED&nbsp;</span>
            <span 
              className={`font-bold text-yellow-400 transition-all duration-500 ${
                isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
              }`}
            >
              {heroWords[currentWordIndex]}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          Connect with the <span className="text-yellow-400 font-semibold">Greatest Of All Time</span> professionals. 
          Our premium directory features thoroughly vetted contractors, consultants, and service providers 
          ready to elevate your projects to championship level.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-black font-bold px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            🏆 BROWSE THE G.O.A.T.S
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold px-8 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            💎 BECOME A G.O.A.T.
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="text-white">
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">2.5K+</div>
            <div className="text-sm md:text-base text-gray-400">Vetted Professionals</div>
          </div>
          <div className="text-white">
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">98%</div>
            <div className="text-sm md:text-base text-gray-400">Success Rate</div>
          </div>
          <div className="text-white">
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">10K+</div>
            <div className="text-sm md:text-base text-gray-400">Projects Completed</div>
          </div>
          <div className="text-white">
            <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">4.9★</div>
            <div className="text-sm md:text-base text-gray-400">Average Rating</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}