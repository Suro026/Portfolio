'use client'

import { Printer } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { SKILL_GROUPS } from '@/lib/data/skills'
import { RESUME } from '@/lib/data/resume'

interface ResumeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ResumeModal({ open, onOpenChange }: ResumeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl border-violet-500/20 bg-black/90 backdrop-blur-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">The Archive — Resume</DialogTitle>
          <DialogDescription className="sr-only">Resume and experience summary</DialogDescription>
        </DialogHeader>

        <div id="resume-print-area" className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto pr-1 text-white/90">
          <div>
            <p className="text-xl font-bold text-white">{RESUME.name}</p>
            <p className="text-sm text-cyan-400">{RESUME.role}</p>
          </div>
          <p className="text-sm leading-relaxed text-white/70">{RESUME.summary}</p>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-violet-400">Experience</p>
            <div className="flex flex-col gap-3">
              {RESUME.experience.map((e) => (
                <div key={e.title}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">{e.title}</p>
                    <span className="text-xs text-white/40">{e.period}</span>
                  </div>
                  <ul className="mt-1 list-disc pl-4 text-xs text-white/60">
                    {e.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-violet-400">Skills</p>
            <div className="flex flex-col gap-1">
              {SKILL_GROUPS.map((g) => (
                <p key={g.category} className="text-xs text-white/60">
                  <span className="font-medium text-white/80">{g.category}:</span> {g.items.join(', ')}
                </p>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-violet-400">Projects</p>
            <p className="text-xs text-white/60">{RESUME.projects.join(' · ')}</p>
          </div>
        </div>

        <Button className="w-fit gap-2" variant="secondary" onClick={() => window.print()}>
          <Printer className="h-4 w-4" /> Print / Save as PDF
        </Button>
      </DialogContent>
    </Dialog>
  )
}
