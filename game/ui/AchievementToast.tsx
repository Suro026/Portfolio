'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BookOpen,
  Cpu,
  DoorOpen,
  Egg,
  FlaskConical,
  Footprints,
  Frame,
  MessageCircle,
  RadioTower,
  Sparkles,
  Terminal,
  Trophy,
} from 'lucide-react'
import { ACHIEVEMENTS } from '@/lib/data/achievements'

interface AchievementToastProps {
  achievementId: string | null
  onDismiss: () => void
}

const ICONS: Record<string, typeof Sparkles> = {
  footprints: Footprints,
  'message-circle': MessageCircle,
  'book-open': BookOpen,
  'flask-conical': FlaskConical,
  frame: Frame,
  trophy: Trophy,
  terminal: Terminal,
  cpu: Cpu,
  egg: Egg,
  sparkles: Sparkles,
  'door-open': DoorOpen,
  'radio-tower': RadioTower,
}

export function AchievementToast({ achievementId, onDismiss }: AchievementToastProps) {
  const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId)

  useEffect(() => {
    if (!achievementId) return
    const timer = setTimeout(onDismiss, 3600)
    return () => clearTimeout(timer)
  }, [achievementId, onDismiss])

  const Icon = achievement ? ICONS[achievement.icon] ?? Sparkles : Sparkles

  return (
    <div className="pointer-events-none fixed right-4 top-20 z-[60] flex flex-col items-end gap-2">
      <AnimatePresence>
        {achievement && (
          <motion.div
            key={achievement.id}
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="flex w-72 items-center gap-3 rounded-xl border border-amber-400/40 bg-black/80 p-3 shadow-[0_0_30px_rgba(245,158,11,0.35)] backdrop-blur-md"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400/20">
              <Icon className="h-5 w-5 text-amber-300" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wider text-amber-300">Achievement unlocked</p>
              <p className="truncate text-sm font-semibold text-white">{achievement.title}</p>
              <p className="truncate text-xs text-white/60">{achievement.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
