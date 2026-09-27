'use client'

import { Cpu, ListChecks, Music, Settings, Trophy, VolumeX } from 'lucide-react'
import { ACHIEVEMENTS } from '@/lib/data/achievements'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HUDProps {
  zoneName: string
  accentColor: string
  chipsCollected: number
  totalChips: number
  achievementsUnlocked: number
  musicOn: boolean
  onToggleMusic: () => void
  onToggleQuestLog: () => void
  onToggleSettings: () => void
}

export function HUD({
  zoneName,
  accentColor,
  chipsCollected,
  totalChips,
  achievementsUnlocked,
  musicOn,
  onToggleMusic,
  onToggleQuestLog,
  onToggleSettings,
}: HUDProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-start justify-between p-4">
      <div
        className="pointer-events-auto rounded-lg border border-white/10 bg-black/50 px-4 py-2 backdrop-blur-md"
        style={{ boxShadow: `0 0 20px ${accentColor}33` }}
      >
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Zone</p>
        <p className="text-sm font-semibold text-white">{zoneName}</p>
      </div>

      <div className="pointer-events-auto flex items-center gap-2">
        <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-xs text-white/80 backdrop-blur-md">
          <span className="flex items-center gap-1">
            <Cpu className="h-3.5 w-3.5 text-cyan-400" /> {chipsCollected}/{totalChips}
          </span>
          <span className="flex items-center gap-1">
            <Trophy className="h-3.5 w-3.5 text-amber-400" /> {achievementsUnlocked}/{ACHIEVEMENTS.length}
          </span>
        </div>
        <Button size="icon" variant="ghost" className={cn('h-9 w-9 border border-white/10 bg-black/50 backdrop-blur-md hover:bg-white/10')} onClick={onToggleQuestLog}>
          <ListChecks className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" className="h-9 w-9 border border-white/10 bg-black/50 backdrop-blur-md hover:bg-white/10" onClick={onToggleMusic}>
          {musicOn ? <Music className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>
        <Button size="icon" variant="ghost" className="h-9 w-9 border border-white/10 bg-black/50 backdrop-blur-md hover:bg-white/10" onClick={onToggleSettings}>
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
