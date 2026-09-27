'use client'

import type { Direction } from '@/types/game'
import { cn } from '@/lib/utils'

interface PlayerSpriteProps {
  direction: Direction
  moving: boolean
}

const DIRECTION_ROTATION: Record<Direction, number> = {
  up: -90,
  down: 90,
  left: 180,
  right: 0,
}

/** A stylised glowing runner — no external sprite sheet required. Facing is
 * conveyed by the visor chevron rotating to the movement direction, and the
 * walk cycle is a pure-CSS leg swing (see `.player-*` rules in globals.css). */
export function PlayerSprite({ direction, moving }: PlayerSpriteProps) {
  return (
    <div className="relative h-12 w-12 -translate-x-1/2 -translate-y-1/2">
      <div className={cn('player-shadow absolute left-1/2 top-[42px] h-2 w-6 -translate-x-1/2 rounded-full bg-black/60 blur-[2px]')} />
      <div className={cn('player-body relative h-full w-full', moving && 'player-bob')}>
        <div className="absolute left-1/2 top-[26px] flex -translate-x-1/2 gap-2">
          <span className={cn('player-leg h-3 w-2 rounded-b-sm bg-violet-950', moving && 'player-leg-a')} />
          <span className={cn('player-leg h-3 w-2 rounded-b-sm bg-violet-950', moving && 'player-leg-b')} />
        </div>
        <div className="absolute left-1/2 top-2 h-6 w-7 -translate-x-1/2 rounded-md bg-gradient-to-b from-violet-500 to-violet-800 shadow-[0_0_14px_rgba(124,58,237,0.75)]" />
        <div className="absolute left-1/2 top-[2px] h-5 w-5 -translate-x-1/2 rounded-full bg-gradient-to-b from-zinc-200 to-zinc-400 shadow-[0_0_10px_rgba(6,182,212,0.6)]">
          <div
            className="absolute left-1/2 top-1/2 h-1.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-cyan-400 shadow-[0_0_6px_2px_rgba(6,182,212,0.9)] transition-transform duration-150"
            style={{ transform: `translate(-50%, -50%) rotate(${DIRECTION_ROTATION[direction]}deg)` }}
          />
        </div>
      </div>
    </div>
  )
}
