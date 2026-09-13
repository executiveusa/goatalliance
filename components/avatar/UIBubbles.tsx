'use client'

import { motion } from 'framer-motion'

const socialBubbles = [
  { icon: '💬', label: 'WhatsApp', color: 'from-green-500 to-green-600', delay: 0 },
  { icon: '📘', label: 'Facebook', color: 'from-blue-600 to-blue-700', delay: 0.1 },
  { icon: '📸', label: 'Instagram', color: 'from-pink-500 to-purple-600', delay: 0.2 },
  { icon: '🌐', label: 'Google', color: 'from-red-500 to-yellow-500', delay: 0.3 },
  { icon: '⭐', label: 'Reviews', color: 'from-yellow-500 to-orange-500', delay: 0.4 },
]

export default function UIBubbles() {
  return (
    <div className="flex gap-3 mt-8 flex-wrap justify-center">
      {socialBubbles.map((bubble, i) => (
        <motion.div
          key={bubble.label}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: 0.5 + bubble.delay,
            type: 'spring',
            stiffness: 300,
            damping: 20
          }}
          whileHover={{ scale: 1.1, y: -4 }}
          className={`flex flex-col items-center gap-1.5 bg-gradient-to-br ${bubble.color} p-3 rounded-2xl shadow-lg cursor-pointer`}
        >
          <span className="text-xl">{bubble.icon}</span>
          <span className="text-white text-xs font-semibold">{bubble.label}</span>
        </motion.div>
      ))}
    </div>
  )
}
