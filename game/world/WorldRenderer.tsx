'use client'

import type { ZoneMapData } from '@/types/game'
import { mapPixelSize } from '@/lib/tiled'
import { TileCanvas } from './TileCanvas'
import { DoorEntity } from '../entities/DoorEntity'
import { InteractableEntity } from '../entities/InteractableEntity'
import { PlayerSprite } from '../entities/PlayerSprite'
import type { Direction } from '@/types/game'

interface WorldRendererProps {
  zone: ZoneMapData
  playerX: number
  playerY: number
  direction: Direction
  moving: boolean
  viewport: { width: number; height: number }
  activeInteractableId: string | null
  collectedChipIds: string[]
  konamiUnlocked: boolean
}

export function WorldRenderer({
  zone,
  playerX,
  playerY,
  direction,
  moving,
  viewport,
  activeInteractableId,
  collectedChipIds,
  konamiUnlocked,
}: WorldRendererProps) {
  const { width: mapW, height: mapH } = mapPixelSize(zone.map)

  const camX = clampCamera(viewport.width / 2 - playerX, viewport.width, mapW)
  const camY = clampCamera(viewport.height / 2 - playerY, viewport.height, mapH)

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute left-0 top-0 will-change-transform"
        style={{ width: mapW, height: mapH, transform: `translate3d(${camX}px, ${camY}px, 0)` }}
      >
        <TileCanvas map={zone.map} accentColor={zone.accentColor} />

        {zone.doors.map((door) => (
          <DoorEntity
            key={door.id}
            door={door}
            accentColor={zone.accentColor}
            locked={Boolean(door.requiresFlag) && door.requiresFlag === 'konamiUnlocked' && !konamiUnlocked}
          />
        ))}

        {zone.interactables.map((it) => (
          <InteractableEntity
            key={it.id}
            interactable={it}
            active={activeInteractableId === it.id}
            accentColor={zone.accentColor}
            collected={it.kind === 'collectible' && collectedChipIds.includes(it.refId ?? '')}
          />
        ))}

        <div className="absolute" style={{ left: playerX, top: playerY }}>
          <PlayerSprite direction={direction} moving={moving} />
        </div>
      </div>
    </div>
  )
}

function clampCamera(desired: number, viewportSize: number, mapSize: number) {
  if (mapSize <= viewportSize) {
    return (viewportSize - mapSize) / 2
  }
  return Math.min(0, Math.max(viewportSize - mapSize, desired))
}
