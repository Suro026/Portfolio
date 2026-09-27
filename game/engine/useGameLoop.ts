'use client'

import { useEffect, useRef } from 'react'
import { useGameStore } from '@/store/useGameStore'
import { INTERACT_RADIUS, PLAYER_SPEED } from '@/lib/constants'
import { distance, resolveMove, type Rect } from './collision'
import type { ControlState } from '@/hooks/useKeyboardControls'
import { audioEngine } from '@/lib/audio'
import type { DoorLink, Interactable } from '@/types/game'

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
  controls: React.RefObject<ControlState>
  joystick: React.RefObject<{ x: number; y: number }>
  solids: Rect[]
  bounds: { width: number; height: number }
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

export function useGameLoop({
  controls,
  joystick,
  solids,
  bounds,
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
  const lastTimeRef = useRef<number | undefined>(undefined)
  const stepAccumRef = useRef(0)

  useEffect(() => {
    const overlapping = new Map<string, boolean>()
    let lastNearestId: string | null = null

    const tick = (time: number) => {
      rafRef.current = requestAnimationFrame(tick)
      if (paused) {
        lastTimeRef.current = time
        return
      }
      if (lastTimeRef.current === undefined) {
        lastTimeRef.current = time
        return
      }
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05)
      lastTimeRef.current = time

      const c = controls.current
      const j = joystick.current
      let vx = (c.right ? 1 : 0) - (c.left ? 1 : 0)
      let vy = (c.down ? 1 : 0) - (c.up ? 1 : 0)

      if (j && (Math.abs(j.x) > 0.001 || Math.abs(j.y) > 0.001)) {
        vx = j.x
        vy = j.y
      }

      const len = Math.hypot(vx, vy)
      const moving = len > 0.05
      const store = useGameStore.getState()

      if (moving) {
        const nvx = vx / (len || 1)
        const nvy = vy / (len || 1)
        const dx = nvx * PLAYER_SPEED * dt
        const dy = nvy * PLAYER_SPEED * dt

        const { x, y } = resolveMove(store.playerX, store.playerY, dx, dy, solids, bounds)
        store.setPlayerPosition(x, y)

        const dir = Math.abs(nvx) > Math.abs(nvy) ? (nvx > 0 ? 'right' : 'left') : nvy > 0 ? 'down' : 'up'
        store.setDirection(dir)

        stepAccumRef.current += dt
        if (stepAccumRef.current > 0.28) {
          stepAccumRef.current = 0
          audioEngine.play('footstep')
        }
      } else {
        stepAccumRef.current = 0
      }

      if (store.moving !== moving) store.setMoving(moving)

      const px = store.playerX
      const py = store.playerY

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
      lastTimeRef.current = undefined
    }
  }, [
    controls,
    joystick,
    solids,
    bounds,
    interactables,
    doors,
    collectedChipRefIds,
    konamiUnlocked,
    paused,
    onNearestChange,
    onDoorTrigger,
    onPortalTrigger,
    onChipCollect,
  ])
}
