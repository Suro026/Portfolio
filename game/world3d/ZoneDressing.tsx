'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { ZoneMapData } from '@/types/game'
import { mapPixelSize } from '@/lib/tiled'
import { px2u } from '@/lib/constants'

function Pillar({ x, z, color }: { x: number; z: number; color: string }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 2.8, 12]} />
        <meshStandardMaterial color="#111117" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, 2.85, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.8} toneMapped={false} />
      </mesh>
    </group>
  )
}

function DeskCluster({ x, z, color }: { x: number; z: number; color: string }) {
  const screen = useRef<THREE.Mesh>(null)
  useFrame(() => {
    if (screen.current) {
      const mat = screen.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.55 + Math.sin(performance.now() * 0.004) * 0.25
    }
  })
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.38, 0]}>
        <boxGeometry args={[1.3, 0.08, 0.7]} />
        <meshStandardMaterial color="#1c1420" roughness={0.5} metalness={0.3} />
      </mesh>
      {[-0.55, 0.55].map((lx) => (
        <mesh key={lx} position={[lx, 0.19, -0.28]}>
          <boxGeometry args={[0.06, 0.38, 0.06]} />
          <meshStandardMaterial color="#0c0c12" />
        </mesh>
      ))}
      <mesh position={[0, 0.44, -0.15]} rotation={[-0.35, 0, 0]}>
        <boxGeometry args={[0.55, 0.35, 0.03]} />
        <meshStandardMaterial color="#08080c" />
      </mesh>
      <mesh ref={screen} position={[0, 0.44, -0.13]} rotation={[-0.35, 0, 0]}>
        <planeGeometry args={[0.48, 0.28]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} toneMapped={false} />
      </mesh>
    </group>
  )
}

interface ZoneDressingProps {
  zone: ZoneMapData
}

/** Small per-zone flourishes layered on top of the generic room shell, so
 * each converted zone keeps a bit of its own identity (desk in Home,
 * light-colonnade in the Arena, etc.) without hand-modelling a full set for
 * all seven rooms. */
export function ZoneDressing({ zone }: ZoneDressingProps) {
  const { width: wPx, height: hPx } = mapPixelSize(zone.map)
  const w = px2u(wPx)
  const d = px2u(hPx)
  const inset = 1.1

  if (zone.ambient === 'home') {
    return <DeskCluster x={inset + 0.4} z={d - inset - 0.2} color={zone.accentColor} />
  }

  if (zone.ambient === 'arena') {
    return (
      <group>
        <Pillar x={inset} z={inset} color={zone.accentColor} />
        <Pillar x={w - inset} z={inset} color={zone.accentColor} />
        <Pillar x={inset} z={d - inset} color={zone.accentColor} />
        <Pillar x={w - inset} z={d - inset} color={zone.accentColor} />
      </group>
    )
  }

  if (zone.ambient === 'lab' || zone.ambient === 'terminal') {
    return (
      <>
        <Pillar x={inset} z={inset} color={zone.accentColor} />
        <Pillar x={w - inset} z={d - inset} color={zone.accentColor} />
      </>
    )
  }

  return null
}
