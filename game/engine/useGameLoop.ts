'use client'

import { useEffect, useRef } from 'react'
import { useGameStore } from '@/store/useGameStore'
import { INTERACT_RADIUS } from '@/lib/constants'
import { distance } from './collision'
import type { DoorLink, Interactable } from '@/types/game'
import { audioEngine } from '@/lib/audio'

const INTERACTABLE_KINDS_REQUIRING_E: Interactable['kind'][] = [
  'npc',
  'project',
  'trophy',
  'terminal',
  'bookshelf',
  'design-frame',
  'duck',
]

interface UseGameLoopOptions {
  interactables: Interactable[]
  doors: DoorLink[]
  collectedChipRefIds: string[]
  konamiUnlocked: boolean
  paused: boolean
  onNearestChange: (id: string | null) => void
  onDoorTrigger: (door: DoorLink) => void
  onPortalTrigger: (interactable: Interactable) => void
  onChipCollect: (interactable: Interactable) => void
}

/**
 * Scans the player's current (store-driven) position against the active
 * zone's interactables/doors every frame: nearest press-E target, and
 * rising-edge auto-triggers for portals/doors/collectible chips.
 *
 * Movement itself now lives in the 3D `PlayerController` (Rapier physics),
 * which writes the resulting position into the same store fields this hook
 * already reads — so this trigger/quest/achievement wiring is unchanged
 * from the 2D build.
 */
export function useGameLoop({
  interactables,
  doors,
  collectedChipRefIds,
  konamiUnlocked,
  paused,
  onNearestChange,
  onDoorTrigger,
  onPortalTrigger,
  onChipCollect,
}: UseGameLoopOptions) {
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const overlapping = new Map<string, boolean>()
    let lastNearestId: string | null = null

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick)
      if (paused) return

      const { playerX: px, playerY: py } = useGameStore.getState()

      // Nearest E-interactable
      let nearestId: string | null = null
      let nearestDist = INTERACT_RADIUS
      for (const it of interactables) {
        if (!INTERACTABLE_KINDS_REQUIRING_E.includes(it.kind)) continue
        const cx = it.x + it.width / 2
        const cy = it.y + it.height / 2
        const d = distance(px, py, cx, cy)
        if (d < nearestDist) {
          nearestDist = d
          nearestId = it.id
        }
      }
      if (nearestId !== lastNearestId) {
        lastNearestId = nearestId
        onNearestChange(nearestId)
      }

      // Auto-trigger: portal + collectible chips (rising edge only)
      for (const it of interactables) {
        if (it.kind !== 'portal' && it.kind !== 'collectible') continue
        if (it.kind === 'collectible' && collectedChipRefIds.includes(it.refId ?? '')) continue
        const cx = it.x + it.width / 2
        const cy = it.y + it.height / 2
        const overlap = distance(px, py, cx, cy) < Math.max(it.width, it.height) / 2 + 16
        const key = `it-${it.id}`
        const wasOverlapping = overlapping.get(key) ?? false
        if (overlap && !wasOverlapping) {
          if (it.kind === 'portal') onPortalTrigger(it)
          else onChipCollect(it)
        }
        overlapping.set(key, overlap)
      }

      // Auto-trigger: doors (rising edge only)
      for (const door of doors) {
        const cx = door.x + door.width / 2
        const cy = door.y + door.height / 2
        const overlap = distance(px, py, cx, cy) < Math.max(door.width, door.height) / 2 + 12
        const key = `door-${door.id}`
        const wasOverlapping = overlapping.get(key) ?? false
        if (overlap && !wasOverlapping) {
          const locked = Boolean(door.requiresFlag) && door.requiresFlag === 'konamiUnlocked' && !konamiUnlocked
          if (!locked) onDoorTrigger(door)
          else audioEngine.play('error')
        }
        overlapping.set(key, overlap)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [interactables, doors, collectedChipRefIds, konamiUnlocked, paused, onNearestChange, onDoorTrigger, onPortalTrigger, onChipCollect])
}
