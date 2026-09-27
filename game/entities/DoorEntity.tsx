'use client'

import { DoorOpen, Lock } from 'lucide-react'
import type { DoorLink } from '@/types/game'
import { cn } from '@/lib/utils'

interface DoorEntityProps {
  door: DoorLink
  accentColor: string
  locked: boolean
}

export function DoorEntity({ door, accentColor, locked }: DoorEntityProps) {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{ left: door.x, top: door.y, width: door.width, height: door.height }}
    >
      <div
        className={cn('flex h-full w-full items-center justify-center rounded-sm', locked && 'opacity-40 grayscale')}
        style={{
          background: `radial-gradient(circle, ${accentColor}66 0%, transparent 70%)`,
          boxShadow: locked ? 'none' : `0 0 18px 3px ${accentColor}88`,
        }}
      >
        {locked ? <Lock className="h-5 w-5 text-white/70" /> : <DoorOpen className="h-5 w-5 text-white drop-shadow" />}
      </div>
      {door.label && (
        <span className="absolute top-full mt-1 whitespace-nowrap rounded bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white/70">
          {door.label}
        </span>
      )}
    </div>
  )
}
