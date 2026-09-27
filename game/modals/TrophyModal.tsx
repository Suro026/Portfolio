'use client'

import { Trophy } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { HACKATHONS } from '@/lib/data/hackathons'

interface TrophyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TrophyModal({ open, onOpenChange }: TrophyModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl border-amber-500/20 bg-black/90 backdrop-blur-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Hackathon Arena — Trophy Case</DialogTitle>
          <DialogDescription className="sr-only">Hackathon achievements and trophies</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          {HACKATHONS.map((h) => (
            <div key={h.id} className="flex gap-3 rounded-lg border border-amber-500/20 bg-amber-500/[0.04] p-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-400/15">
                <Trophy className="h-5 w-5 text-amber-300" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-white">{h.title}</p>
                  <Badge variant="secondary" className="bg-amber-400/20 text-amber-200">
                    {h.place}
                  </Badge>
                  <span className="text-xs text-white/40">{h.year}</span>
                </div>
                <p className="mt-1 text-sm text-white/70">{h.description}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
