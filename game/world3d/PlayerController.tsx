'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, CapsuleCollider, type RapierRigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { useGameStore } from '@/store/useGameStore'
import { audioEngine } from '@/lib/audio'
import { PLAYER_HEIGHT, PLAYER_RADIUS, PLAYER_SPEED, SPRINT_MULTIPLIER, WORLD_SCALE, px2u, u2px } from '@/lib/constants'
import type { ControlState } from '@/hooks/useKeyboardControls'
import type { Direction } from '@/types/game'
import { PlayerModel } from './PlayerModel'

interface PlayerControllerProps {
  spawnX: number // px, store space
  spawnZ: number // px, store space (maps to store's playerY / world Z)
  controls: React.RefObject<ControlState>
  joystick: React.RefObject<{ x: number; y: number }>
  paused: boolean
  bodyRef: React.RefObject<RapierRigidBody | null>
  yawRef: React.RefObject<number>
}

const ACCEL = 10
const CAPSULE_HALF_HEIGHT = Math.max(0.01, PLAYER_HEIGHT / 2 - PLAYER_RADIUS)

function lerpAngle(a: number, b: number, t: number) {
  let diff = ((b - a + Math.PI) % (Math.PI * 2)) - Math.PI
  if (diff < -Math.PI) diff += Math.PI * 2
  return a + diff * t
}

/** Rapier-driven third-person movement. Reads the same keyboard/joystick
 * refs the 2D build used, and writes the resulting position back into the
 * existing Zustand store (via px2u/u2px) so every other system — HUD, quest
 * triggers, door/portal/chip detection, save file — keeps working unchanged. */
export function PlayerController({ spawnX, spawnZ, controls, joystick, paused, bodyRef, yawRef }: PlayerControllerProps) {
  const velRef = useRef(new THREE.Vector2(0, 0))
  const modelGroupRef = useRef<THREE.Group>(null)
  const movingRef = useRef(false)
  const sprintRef = useRef(false)
  const stepAccum = useRef(0)

  useFrame((_, rawDelta) => {
    const rb = bodyRef.current
    if (!rb) return
    const delta = Math.min(rawDelta, 0.05)

    if (paused) {
      const v = rb.linvel()
      rb.setLinvel({ x: 0, y: v.y, z: 0 }, true)
      velRef.current.set(0, 0)
      if (movingRef.current) {
        movingRef.current = false
        useGameStore.getState().setMoving(false)
      }
      return
    }

    const c = controls.current
    const j = joystick.current
    let ix = (c.right ? 1 : 0) - (c.left ? 1 : 0)
    let iz = (c.down ? 1 : 0) - (c.up ? 1 : 0)
    if (j && (Math.abs(j.x) > 0.001 || Math.abs(j.y) > 0.001)) {
      ix = j.x
      iz = j.y
    }
    const len = Math.hypot(ix, iz)
    const moving = len > 0.05
    sprintRef.current = c.sprint

    const speedU = (c.sprint ? PLAYER_SPEED * SPRINT_MULTIPLIER : PLAYER_SPEED) * WORLD_SCALE
    const targetX = moving ? (ix / len) * speedU : 0
    const targetZ = moving ? (iz / len) * speedU : 0

    const t = 1 - Math.exp(-ACCEL * delta)
    velRef.current.x += (targetX - velRef.current.x) * t
    velRef.current.y += (targetZ - velRef.current.y) * t

    const v = rb.linvel()
    rb.setLinvel({ x: velRef.current.x, y: v.y, z: velRef.current.y }, true)

    const tr = rb.translation()
    const store = useGameStore.getState()
    store.setPlayerPosition(u2px(tr.x), u2px(tr.z))

    if (moving) {
      const targetYaw = Math.atan2(velRef.current.x, velRef.current.y)
      yawRef.current = lerpAngle(yawRef.current, targetYaw, 1 - Math.exp(-14 * delta))

      const dir: Direction = Math.abs(ix) > Math.abs(iz) ? (ix > 0 ? 'right' : 'left') : iz > 0 ? 'down' : 'up'
      if (store.direction !== dir) store.setDirection(dir)

      stepAccum.current += delta
      const stepInterval = c.sprint ? 0.22 : 0.32
      if (stepAccum.current > stepInterval) {
        stepAccum.current = 0
        audioEngine.play('footstep')
      }
    } else {
      stepAccum.current = 0
    }

    if (movingRef.current !== moving) {
      movingRef.current = moving
      store.setMoving(moving)
    }

    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.y = yawRef.current
    }
  })

  return (
    <RigidBody
      ref={bodyRef}
      type="dynamic"
      colliders={false}
      position={[px2u(spawnX), PLAYER_HEIGHT / 2 + 0.05, px2u(spawnZ)]}
      enabledRotations={[false, false, false]}
      linearDamping={0.5}
      ccd
    >
      <CapsuleCollider args={[CAPSULE_HALF_HEIGHT, PLAYER_RADIUS]} />
      <group ref={modelGroupRef}>
        <PlayerModel movingRef={movingRef} sprintRef={sprintRef} />
      </group>
    </RigidBody>
  )
}
