"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500">
              G.O.A.T.
            </div>
            <div className="text-lg font-bold text-gray-900">ALLIANCE</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/directory" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Directory
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Pricing
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              About
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-black font-bold">
                Join as Pro
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-gray-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
              <span className={`bg-gray-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-gray-900 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 space-y-4">
            <Link href="/directory" className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2">
              Directory
            </Link>
            <Link href="/pricing" className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2">
              Pricing
            </Link>
            <Link href="/blog" className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2">
              Blog
            </Link>
            <Link href="/about" className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2">
              About
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
              <Link href="/auth/signin">
                <Button variant="ghost" className="justify-start w-full">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-black font-bold justify-start w-full">
                  Join as Pro
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}