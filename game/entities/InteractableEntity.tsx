'use client'

import {
  BookOpen,
  Cpu,
  DoorOpen,
  FlaskConical,
  Frame,
  MessageCircle,
  Radio,
  Sparkles,
  Trophy,
} from 'lucide-react'
import type { Interactable } from '@/types/game'
import { cn } from '@/lib/utils'

interface InteractableEntityProps {
  interactable: Interactable
  active: boolean
  accentColor: string
  collected?: boolean
}

const ICONS: Record<Interactable['kind'], typeof Sparkles> = {
  npc: MessageCircle,
  project: Cpu,
  trophy: Trophy,
  terminal: Radio,
  portal: Sparkles,
  collectible: Sparkles,
  door: DoorOpen,
  bookshelf: BookOpen,
  'design-frame': Frame,
  duck: MessageCircle,
  'secret-door': DoorOpen,
}

export function InteractableEntity({ interactable, active, accentColor, collected }: InteractableEntityProps) {
  if (collected) return null
  const Icon = ICONS[interactable.kind]
  const isDuck = interactable.kind === 'duck'

  return (
    <div
      className="absolute flex flex-col items-center justify-center"
      style={{
        left: interactable.x,
        top: interactable.y,
        width: interactable.width,
        height: interactable.height,
      }}
    >
      <div
        className={cn(
          'flex h-full w-full items-center justify-center rounded-lg border transition-all duration-200',
          active ? 'scale-105 border-white/60' : 'border-white/10',
        )}
        style={{
          background: `linear-gradient(160deg, ${accentColor}33, #05050899)`,
          boxShadow: active ? `0 0 24px 4px ${accentColor}aa` : `0 0 12px 1px ${accentColor}55`,
        }}
      >
        <Icon
          className={cn('drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]', isDuck ? 'h-5 w-5 text-amber-300' : 'h-6 w-6 text-white')}
          strokeWidth={1.75}
        />
      </div>
      {active && (
        <span className="absolute -top-6 whitespace-nowrap rounded bg-black/70 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
          {interactable.name}
        </span>
      )}
    </div>
  )
}
