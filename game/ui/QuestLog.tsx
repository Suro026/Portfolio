'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Circle, X } from 'lucide-react'
import { QUESTS } from '@/lib/data/quests'
import { Button } from '@/components/ui/button'

interface QuestLogProps {
  open: boolean
  onClose: () => void
  progress: Record<string, { completedSteps: string[]; completed: boolean }>
}

export function QuestLog({ open, onClose, progress }: QuestLogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: 360, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 360, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          className="fixed right-0 top-0 z-50 h-full w-full max-w-sm border-l border-white/10 bg-black/85 p-5 backdrop-blur-xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Quest Log</h2>
            <Button size="icon" variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto pr-1" style={{ maxHeight: 'calc(100vh - 100px)' }}>
            {QUESTS.map((quest) => {
              const p = progress[quest.id] ?? { completedSteps: [], completed: false }
              return (
                <div
                  key={quest.id}
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <p className={`text-sm font-semibold ${p.completed ? 'text-emerald-400' : 'text-white'}`}>{quest.title}</p>
                    {p.completed && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                  </div>
                  <p className="mb-2 text-xs text-white/50">{quest.description}</p>
                  <ul className="flex flex-col gap-1">
                    {quest.steps.map((step) => {
                      const done = p.completedSteps.includes(step.id)
                      return (
                        <li key={step.id} className="flex items-center gap-2 text-xs text-white/70">
                          {done ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          ) : (
                            <Circle className="h-3.5 w-3.5 text-white/30" />
                          )}
                          <span className={done ? 'text-white/40 line-through' : ''}>{step.label}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
