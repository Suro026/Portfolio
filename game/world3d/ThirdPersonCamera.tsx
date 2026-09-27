'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import type { RapierRigidBody } from '@react-three/rapier'
import * as THREE from 'three'

interface ThirdPersonCameraProps {
  bodyRef: React.RefObject<RapierRigidBody | null>
  yawRef: React.RefObject<number>
}

const DISTANCE = 5.2
const HEIGHT = 2.6
const LOOK_HEIGHT = 1.3

/** Chase camera: stays behind the player relative to their facing yaw,
 * smoothly damped so direction changes never feel like a snap-cut. */
export function ThirdPersonCamera({ bodyRef, yawRef }: ThirdPersonCameraProps) {
  const { camera } = useThree()
  const currentPos = useRef<THREE.Vector3 | null>(null)
  const currentLook = useRef(new THREE.Vector3())
  const forward = useRef(new THREE.Vector3())
  const desired = useRef(new THREE.Vector3())

  useFrame((_, rawDelta) => {
    const rb = bodyRef.current
    if (!rb) return
    const delta = Math.min(rawDelta, 0.05)
    const tr = rb.translation()
    const yaw = yawRef.current

    forward.current.set(Math.sin(yaw), 0, Math.cos(yaw))
    desired.current
      .set(tr.x, tr.y, tr.z)
      .addScaledVector(forward.current, -DISTANCE)
      .add(new THREE.Vector3(0, HEIGHT, 0))

    const lookTarget = currentLook.current
    const targetLook = new THREE.Vector3(tr.x, tr.y + LOOK_HEIGHT, tr.z)

    if (!currentPos.current) {
      currentPos.current = desired.current.clone()
      lookTarget.copy(targetLook)
    } else {
      currentPos.current.lerp(desired.current, 1 - Math.exp(-6 * delta))
      lookTarget.lerp(targetLook, 1 - Math.exp(-10 * delta))
    }

    camera.position.copy(currentPos.current)
    camera.lookAt(lookTarget)
  })

  return null
}
