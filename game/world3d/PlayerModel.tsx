'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { PLAYER_HEIGHT } from '@/lib/constants'

interface PlayerModelProps {
  movingRef: React.RefObject<boolean>
  sprintRef: React.RefObject<boolean>
}

/** Visual-only third-person character — a stylised glowing runner built from
 * primitives (no external sprite/GLB assets), matching the look of the
 * original 2D sprite. Animates its own walk cycle off `movingRef`/`sprintRef`
 * so the physics loop never has to trigger a React re-render for it. */
export function PlayerModel({ movingRef, sprintRef }: PlayerModelProps) {
  const legL = useRef<THREE.Mesh>(null)
  const legR = useRef<THREE.Mesh>(null)
  const bob = useRef<THREE.Group>(null)
  const phase = useRef(0)

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05)
    const moving = movingRef.current
    const speed = sprintRef.current ? 16 : 9.5

    if (moving) {
      phase.current += delta * speed
    } else {
      phase.current = THREE.MathUtils.damp(phase.current, Math.round(phase.current / Math.PI) * Math.PI, 8, delta)
    }

    const swing = Math.sin(phase.current) * (moving ? 0.6 : 0)
    if (legL.current) legL.current.rotation.x = swing
    if (legR.current) legR.current.rotation.x = -swing
    if (bob.current) bob.current.position.y = moving ? Math.abs(Math.sin(phase.current)) * 0.06 : 0
  })

  const feetY = -PLAYER_HEIGHT / 2

  return (
    <group position={[0, 0, 0]}>
      <group ref={bob}>
        {/* legs */}
        <mesh ref={legL} position={[-0.14, feetY + 0.35, 0]}>
          <boxGeometry args={[0.16, 0.7, 0.16]} />
          <meshStandardMaterial color="#2e1065" roughness={0.6} />
        </mesh>
        <mesh ref={legR} position={[0.14, feetY + 0.35, 0]}>
          <boxGeometry args={[0.16, 0.7, 0.16]} />
          <meshStandardMaterial color="#2e1065" roughness={0.6} />
        </mesh>

        {/* torso */}
        <mesh position={[0, feetY + 0.95, 0]}>
          <capsuleGeometry args={[0.28, 0.5, 4, 8]} />
          <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={0.6} roughness={0.35} metalness={0.3} />
        </mesh>

        {/* head */}
        <mesh position={[0, feetY + 1.55, 0]}>
          <sphereGeometry args={[0.22, 20, 20]} />
          <meshStandardMaterial color="#e4e4e7" roughness={0.3} metalness={0.4} />
        </mesh>
        {/* visor */}
        <mesh position={[0, feetY + 1.55, 0.19]}>
          <boxGeometry args={[0.22, 0.08, 0.06]} />
          <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={2.2} toneMapped={false} />
        </mesh>

        <pointLight position={[0, feetY + 1.1, 0]} color="#7C3AED" intensity={2.5} distance={2.5} />
      </group>
    </group>
  )
}
