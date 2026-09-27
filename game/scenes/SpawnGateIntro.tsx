'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const CinematicPortalScene = dynamic(() => import('@/game/world3d/CinematicPortalScene').then((m) => m.CinematicPortalScene), {
  ssr: false,
})

interface SpawnGateIntroProps {
  onEnter: () => void
}

export function SpawnGateIntro({ onEnter }: SpawnGateIntroProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') onEnter()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onEnter])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#05050a]">
      <CinematicPortalScene color="#7C3AED" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-sm uppercase tracking-[0.5em] text-cyan-400"
        >
          Presenting
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          className="bg-gradient-to-b from-white via-violet-300 to-violet-600 bg-clip-text text-6xl font-black tracking-tight text-transparent drop-shadow-[0_0_40px_rgba(124,58,237,0.6)] sm:text-8xl"
        >
          GAMEFOLIO
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="max-w-md text-balance text-sm text-white/60 sm:text-base"
        >
          The interactive world of Surajit — Aspiring AI Engineer, IoT Systems Builder, UI/UX Designer.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="mt-4 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.4)] transition hover:bg-cyan-400/20"
        >
          Press Enter to Begin
        </motion.button>
      </div>
    </div>
  )
}
