'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AvatarScene from '@/components/avatar/AvatarScene'
import UIBubbles from '@/components/avatar/UIBubbles'
import MagicLinkForm from '@/components/avatar/MagicLinkForm'

export default function AvatarLoginPage() {
  const [authState, setAuthState] = useState<'idle' | 'sending' | 'sent' | 'verified'>('idle')
  const [userName, setUserName] = useState('')

  // Check for magic link token in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      verifyToken(token)
    }
  }, [])

  async function verifyToken(token: string) {
    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })
      const data = await res.json()
      if (data.success) {
        setUserName(data.businessName)
        setAuthState('verified')
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 2500)
      }
    } catch {
      console.error('Token verification failed')
    }
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden relative flex items-center justify-center">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-5xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* Left: Avatar Scene */}
        <div className="flex-1 flex flex-col items-center">
          <AvatarScene authState={authState} userName={userName} />
          <UIBubbles />
        </div>

        {/* Right: Auth Panel */}
        <div className="flex-1 max-w-sm w-full">
          <AnimatePresence mode="wait">
            {authState === 'verified' ? (
              <motion.div
                key="verified"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center"
              >
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Welcome back, {userName}!
                </h2>
                <p className="text-slate-300 text-sm">
                  Opening your Vibe Cockpit...
                </p>
                <div className="mt-6 flex justify-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-indigo-400 rounded-full"
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              <MagicLinkForm authState={authState} setAuthState={setAuthState} />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Brand tag */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-600 text-xs font-medium tracking-widest uppercase">
        G.O.A.T. Alliance — AI-Native Local Services
      </div>
    </div>
  )
}
