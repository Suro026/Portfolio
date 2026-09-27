'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Github, Mail, RotateCcw } from 'lucide-react'
import { CONTACT } from '@/lib/data/contact'

const Background3D = dynamic(() => import('@/game/fx/Background3D').then((m) => m.Background3D), { ssr: false })

interface EndingCinematicProps {
  onReplay: () => void
}

export function EndingCinematic({ onReplay }: EndingCinematicProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#05050a]">
      <Background3D accentColor="#06B6D4" ambient="portal" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm uppercase tracking-[0.5em] text-violet-400"
        >
          Signal transmitted
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="bg-gradient-to-b from-white via-cyan-300 to-cyan-600 bg-clip-text text-5xl font-black tracking-tight text-transparent drop-shadow-[0_0_40px_rgba(6,182,212,0.6)] sm:text-6xl"
        >
          Thanks for playing.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="max-w-md text-sm text-white/60 sm:text-base"
        >
          You've explored the world of Surajit. Let's build something together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2.5 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/20"
          >
            <Mail className="h-4 w-4" /> {CONTACT.email}
          </a>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-400/10 px-5 py-2.5 text-sm font-medium text-violet-300 transition hover:bg-violet-400/20"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          onClick={onReplay}
          className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 transition hover:text-white/70"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Return to the world
        </motion.button>
      </div>
    </div>
  )
}
