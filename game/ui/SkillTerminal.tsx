'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { SKILL_GROUPS, TERMINAL_HELP, TERMINAL_RESPONSES } from '@/lib/data/skills'
import { audioEngine } from '@/lib/audio'

interface SkillTerminalProps {
  open: boolean
  onClose: () => void
  onCommandRun: () => void
}

interface HistoryEntry {
  command?: string
  lines: string[]
}

const BANNER = [
  '///////////////////////////////////////',
  '  SURO-OS v2.6  //  SKILL TERMINAL',
  "  type 'help' for a list of commands",
  '///////////////////////////////////////',
]

function skillsOutput() {
  return SKILL_GROUPS.flatMap((g) => [`${g.category}:`, `  ${g.items.join(', ')}`])
}

export function SkillTerminal({ open, onClose, onCommandRun }: SkillTerminalProps) {
  const [history, setHistory] = useState<HistoryEntry[]>([{ lines: BANNER }])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    onCommandRun()

    if (cmd === 'clear') {
      setHistory([])
      return
    }
    if (cmd === 'help') {
      setHistory((h) => [...h, { command: raw, lines: TERMINAL_HELP }])
      return
    }
    if (cmd === 'skills') {
      setHistory((h) => [...h, { command: raw, lines: skillsOutput() }])
      return
    }
    if (TERMINAL_RESPONSES[cmd]) {
      setHistory((h) => [...h, { command: raw, lines: TERMINAL_RESPONSES[cmd] }])
      return
    }
    audioEngine.play('error')
    setHistory((h) => [...h, { command: raw, lines: [`command not found: ${cmd}`, "type 'help' for a list of commands"] }])
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="flex h-[70vh] w-full max-w-2xl flex-col rounded-lg border border-cyan-500/30 bg-black font-mono text-sm text-cyan-300 shadow-[0_0_60px_rgba(6,182,212,0.35)]"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex items-center justify-between border-b border-cyan-500/20 px-4 py-2">
              <span className="text-xs text-cyan-500/70">skill_terminal — bash</span>
              <button onClick={onClose} className="text-cyan-500/70 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3">
              {history.map((entry, i) => (
                <div key={i} className="mb-2">
                  {entry.command && (
                    <p className="text-white">
                      <span className="text-emerald-400">surajit@gamefolio</span>:~$ {entry.command}
                    </p>
                  )}
                  {entry.lines.map((line, j) => (
                    <p key={j} className="whitespace-pre-wrap text-cyan-300/90">
                      {line}
                    </p>
                  ))}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <form
              className="flex items-center gap-2 border-t border-cyan-500/20 px-4 py-3"
              onSubmit={(e) => {
                e.preventDefault()
                runCommand(input)
                setInput('')
              }}
            >
              <span className="text-emerald-400">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none placeholder:text-cyan-500/30"
                placeholder="type a command..."
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
