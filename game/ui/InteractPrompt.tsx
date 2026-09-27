'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Kbd } from '@/components/ui/kbd'

interface InteractPromptProps {
  label: string | null
}

export function InteractPrompt({ label }: InteractPromptProps) {
  return (
    <AnimatePresence>
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="pointer-events-none fixed inset-x-0 bottom-28 z-40 flex justify-center"
        >
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 text-sm text-white backdrop-blur-md">
            <Kbd>E</Kbd>
            <span>{label}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
