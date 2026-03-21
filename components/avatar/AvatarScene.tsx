'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface AvatarSceneProps {
  authState: 'idle' | 'sending' | 'sent' | 'verified'
  userName?: string
}

const avatarExpressions = {
  idle: { emoji: '😎', label: 'Alex — Your AI Business Manager' },
  sending: { emoji: '🤔', label: 'Sending your magic link...' },
  sent: { emoji: '📱', label: 'Check your WhatsApp!' },
  verified: { emoji: '🙌', label: `Welcome back!` }
}

export default function AvatarScene({ authState, userName }: AvatarSceneProps) {
  const expression = avatarExpressions[authState]

  return (
    <div className="relative flex flex-col items-center">
      {/* Speech bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={authState}
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="mb-4 bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-5 py-3 text-white text-sm font-medium max-w-xs text-center relative"
        >
          {authState === 'verified' && userName
            ? `Welcome back, ${userName}! Your dashboard is ready. 🚀`
            : expression.label}
          {/* Triangle pointer */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-2 overflow-hidden">
            <div className="w-4 h-4 bg-white/10 border border-white/20 rotate-45 -translate-y-2 translate-x-0 border-l-0 border-t-0" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Avatar body */}
      <motion.div
        className="relative"
        animate={authState === 'verified' ? {
          y: [0, -12, 0],
          rotate: [0, -5, 5, 0]
        } : authState === 'sending' ? {
          rotate: [0, -3, 3, 0]
        } : {
          y: [0, -6, 0]
        }}
        transition={{
          duration: authState === 'verified' ? 0.6 : 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        {/* Avatar circle */}
        <div className="w-44 h-44 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-2xl shadow-indigo-500/30 relative">
          {/* Inner glow ring */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/10 to-transparent" />

          {/* Face */}
          <AnimatePresence mode="wait">
            <motion.span
              key={authState}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="text-6xl select-none relative z-10"
            >
              {expression.emoji}
            </motion.span>
          </AnimatePresence>

          {/* Status indicator */}
          <div className={`absolute bottom-3 right-3 w-5 h-5 rounded-full border-2 border-slate-900 ${
            authState === 'verified' ? 'bg-green-400' :
            authState === 'sending' ? 'bg-yellow-400' :
            'bg-emerald-400'
          }`}>
            {authState === 'sending' && (
              <motion.div
                className="absolute inset-0 rounded-full bg-yellow-400"
                animate={{ scale: [1, 1.8], opacity: [1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </div>
        </div>

        {/* Name badge */}
        <div className="mt-4 text-center">
          <div className="text-white font-bold text-lg">Alex</div>
          <div className="text-indigo-300 text-xs font-medium tracking-wider">AI BUSINESS MANAGER</div>
        </div>
      </motion.div>

      {/* Floating particles */}
      {authState === 'verified' && (
        <div className="absolute inset-0 pointer-events-none">
          {['🎊', '⭐', '🚀', '💰', '✨'].map((particle, i) => (
            <motion.div
              key={i}
              className="absolute text-xl"
              style={{
                left: `${20 + i * 15}%`,
                top: '50%'
              }}
              animate={{
                y: [-20, -120],
                x: [0, (i % 2 === 0 ? 30 : -30)],
                opacity: [1, 0],
                scale: [1, 0.5]
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.15,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              {particle}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
