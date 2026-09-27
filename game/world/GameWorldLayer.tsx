'use client'

import { useGameStore } from '@/store/useGameStore'
import type { ZoneMapData } from '@/types/game'
import { WorldRenderer } from './WorldRenderer'

interface GameWorldLayerProps {
  zone: ZoneMapData
  viewport: { width: number; height: number }
  activeInteractableId: string | null
  collectedChipIds: string[]
  konamiUnlocked: boolean
}

/** Isolates the high-frequency player-position subscription so the rest of
 * the UI (HUD, modals, quest log...) doesn't re-render 60x/sec while walking. */
export function GameWorldLayer({ zone, viewport, activeInteractableId, collectedChipIds, konamiUnlocked }: GameWorldLayerProps) {
  const playerX = useGameStore((s) => s.playerX)
  const playerY = useGameStore((s) => s.playerY)
  const direction = useGameStore((s) => s.direction)
  const moving = useGameStore((s) => s.moving)

  return (
    <WorldRenderer
      zone={zone}
      playerX={playerX}
      playerY={playerY}
      direction={direction}
      moving={moving}
      viewport={viewport}
      activeInteractableId={activeInteractableId}
      collectedChipIds={collectedChipIds}
      konamiUnlocked={konamiUnlocked}
    />
  )
}
