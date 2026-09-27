'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei/web'
import * as THREE from 'three'
import { px2u } from '@/lib/constants'
import type { DoorLink } from '@/types/game'

interface Door3DProps {
  door: DoorLink
  accentColor: string
  locked: boolean
}

const ARCH_W = 2.0
const ARCH_H = 2.6

export function Door3D({ door, accentColor, locked }: Door3DProps) {
  const field = useRef<THREE.Mesh>(null)
  const color = locked ? '#555566' : accentColor

  useFrame(() => {
    if (field.current) {
      const mat = field.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.18 + Math.sin(performance.now() * 0.003) * 0.06
    }
  })

  const x = px2u(door.x + door.width / 2)
  const z = px2u(door.y + door.height / 2)

  return (
    <group position={[x, 0, z]}>
      <mesh position={[-ARCH_W / 2, ARCH_H / 2, 0]}>
        <boxGeometry args={[0.14, ARCH_H, 0.14]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.8} toneMapped={false} />
      </mesh>
      <mesh position={[ARCH_W / 2, ARCH_H / 2, 0]}>
        <boxGeometry args={[0.14, ARCH_H, 0.14]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.8} toneMapped={false} />
      </mesh>
      <mesh position={[0, ARCH_H, 0]}>
        <boxGeometry args={[ARCH_W + 0.14, 0.14, 0.14]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.8} toneMapped={false} />
      </mesh>
      <mesh ref={field} position={[0, ARCH_H / 2, 0]}>
        <planeGeometry args={[ARCH_W - 0.1, ARCH_H - 0.1]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {!locked && <pointLight color={color} intensity={4} distance={4} position={[0, ARCH_H / 2, 0]} />}

      {door.label && (
        <Html center position={[0, ARCH_H + 0.35, 0]} distanceFactor={9} sprite pointerEvents="none" occlude={false}>
          <div
            className="whitespace-nowrap rounded bg-black/70 px-2 py-0.5 text-[11px] font-medium backdrop-blur-sm"
            style={{ color: locked ? '#9aa0ae' : '#fff' }}
          >
            {locked ? `${door.label} (locked)` : door.label}
          </div>
        </Html>
      )}
    </group>
  )
}
