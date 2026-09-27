'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { DialogueLine } from '@/types/game'
import { audioEngine } from '@/lib/audio'

interface DialogueBoxProps {
  lines: DialogueLine[]
  index: number
  onAdvance: () => void
}

export function DialogueBox({ lines, index, onAdvance }: DialogueBoxProps) {
  const line = lines[index]
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setTyped('')
    setDone(false)
    if (!line) return
    let i = 0
    const interval = setInterval(() => {
      i += 1
      setTyped(line.text.slice(0, i))
      if (i % 2 === 0) audioEngine.play('type')
      if (i >= line.text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 22)
    return () => clearInterval(interval)
  }, [line])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'e' || e.key === 'E' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        if (!done && line) {
          setTyped(line.text)
          setDone(true)
        } else {
          onAdvance()
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [done, line, onAdvance])

  if (!line) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
        onClick={() => {
          if (done) onAdvance()
          else {
            setTyped(line.text)
            setDone(true)
          }
        }}
      >
        <div className="w-full max-w-2xl cursor-pointer rounded-xl border border-white/10 bg-black/70 p-4 backdrop-blur-md shadow-[0_0_40px_rgba(124,58,237,0.25)]">
          <p className="mb-1 text-sm font-semibold tracking-wide text-cyan-400">{line.speaker}</p>
          <p className="min-h-[3lh] text-base leading-relaxed text-white/90">{typed}</p>
          <div className="mt-2 flex items-center justify-between text-[11px] text-white/40">
            <span>
              {index + 1} / {lines.length}
            </span>
            <span className="animate-pulse">{done ? 'Press E to continue' : 'Press E to skip'}</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
