'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MagicLinkFormProps {
  authState: 'idle' | 'sending' | 'sent' | 'verified'
  setAuthState: (state: 'idle' | 'sending' | 'sent' | 'verified') => void
}

export default function MagicLinkForm({ authState, setAuthState }: MagicLinkFormProps) {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!phone.trim()) return

    setError('')
    setAuthState('sending')

    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.trim() })
      })
      const data = await res.json()

      if (data.success) {
        setAuthState('sent')
      } else {
        setError(data.error || 'Could not send magic link. Try again.')
        setAuthState('idle')
      }
    } catch {
      setError('Network error. Please try again.')
      setAuthState('idle')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8"
    >
      <AnimatePresence mode="wait">
        {authState === 'sent' ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="text-5xl mb-4">📱</div>
            <h3 className="text-xl font-bold text-white mb-2">Check your WhatsApp</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              We sent a magic link to <span className="text-white font-medium">{phone}</span>.
              <br />Click it to login instantly — no password needed.
            </p>
            <p className="text-slate-500 text-xs mt-4">Link expires in 10 minutes</p>
            <button
              onClick={() => { setAuthState('idle'); setPhone('') }}
              className="mt-6 text-indigo-400 text-sm hover:text-indigo-300 underline underline-offset-2"
            >
              Use a different number
            </button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full px-3 py-1 text-indigo-300 text-xs font-semibold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                No Password Required
              </div>
              <h2 className="text-2xl font-bold text-white">Login via WhatsApp</h2>
              <p className="text-slate-400 text-sm mt-1">
                Enter your number to receive a one-tap login link
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2 block">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (206) 555-1234"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                  disabled={authState === 'sending'}
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={!phone.trim() || authState === 'sending'}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
              >
                {authState === 'sending' ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Sending...
                  </>
                ) : (
                  <>💬 Send Magic Link</>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-transparent px-3 text-slate-500 text-xs">or</span>
              </div>
            </div>

            {/* Demo access */}
            <a
              href="/dashboard"
              className="block w-full text-center bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-medium py-3 rounded-xl transition-all text-sm"
            >
              View Demo Dashboard →
            </a>

            <p className="text-slate-600 text-xs text-center mt-4">
              By continuing, you agree to our{' '}
              <span className="text-slate-500 hover:text-slate-400 cursor-pointer">Terms</span>
              {' & '}
              <span className="text-slate-500 hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
