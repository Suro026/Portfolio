'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { px2u } from '@/lib/constants'
import type { Interactable } from '@/types/game'
import { Portal3D } from './Portal3D'

interface Interactable3DProps {
  interactable: Interactable
  active: boolean
  accentColor: string
  collected?: boolean
}

function ActiveRing({ radius, color }: { radius: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.6
      ref.current.scale.setScalar(1 + Math.sin(performance.now() * 0.005) * 0.08)
    }
  })
  return (
    <mesh ref={ref} position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius, radius + 0.08, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  )
}

function GlowPillar({ color, tall = 1.5, headColor = '#e4e4e7' }: { color: string; tall?: number; headColor?: string }) {
  const bob = useRef<THREE.Group>(null)
  useFrame(() => {
    if (bob.current) bob.current.position.y = Math.sin(performance.now() * 0.0015) * 0.05
  })
  return (
    <group ref={bob}>
      <mesh position={[0, tall * 0.4, 0]}>
        <capsuleGeometry args={[0.26, tall * 0.55, 4, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh position={[0, tall * 0.4 + tall * 0.42, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={headColor} roughness={0.3} metalness={0.4} />
      </mesh>
      <pointLight position={[0, tall * 0.6, 0]} color={color} intensity={2.5} distance={3} />
    </group>
  )
}

function DuckProp() {
  const bob = useRef<THREE.Group>(null)
  useFrame(() => {
    if (bob.current) bob.current.rotation.y += 0.004
  })
  return (
    <group ref={bob} position={[0, 0.32, 0]}>
      <mesh>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.22, 0.05]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.22, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.06, 0.14, 8]} />
        <meshStandardMaterial color="#ea580c" />
      </mesh>
      <pointLight color="#F59E0B" intensity={1.5} distance={2} position={[0, 0.3, 0]} />
    </group>
  )
}

function ProjectMachine({ color }: { color: string }) {
  const core = useRef<THREE.Mesh>(null)
  const ringA = useRef<THREE.Mesh>(null)
  const ringB = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (core.current) core.current.rotation.y += delta * 0.5
    if (ringA.current) ringA.current.rotation.x += delta * 0.6
    if (ringB.current) ringB.current.rotation.y += delta * 0.4
  })
  return (
    <group>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.55, 0.65, 0.3, 6]} />
        <meshStandardMaterial color="#0c0c14" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh ref={core} position={[0, 1.05, 0]}>
        <icosahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} wireframe toneMapped={false} />
      </mesh>
      <mesh ref={ringA} position={[0, 1.05, 0]}>
        <torusGeometry args={[0.55, 0.02, 8, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.8} toneMapped={false} />
      </mesh>
      <mesh ref={ringB} position={[0, 1.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.015, 8, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 1.05, 0]} color={color} intensity={3} distance={3.5} />
    </group>
  )
}

function TrophyPodium({ color }: { color: string }) {
  const trophy = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (trophy.current) trophy.current.rotation.y += delta * 0.8
  })
  return (
    <group>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.9, 1.0, 0.6, 24]} />
        <meshStandardMaterial color="#141018" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.66, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 0.1, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.6} toneMapped={false} />
      </mesh>
      <group ref={trophy} position={[0, 1.15, 0]}>
        <mesh>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.8} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.28, 0]}>
          <coneGeometry args={[0.16, 0.32, 16]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.9} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      <spotLight position={[0, 3, 0]} target-position={[0, 0, 0]} angle={0.5} penumbra={0.6} intensity={8} color={color} castShadow />
    </group>
  )
}

function TerminalDesk({ color }: { color: string }) {
  const scan = useRef<THREE.Mesh>(null)
  useFrame(() => {
    if (scan.current) {
      const mat = scan.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.5 + Math.sin(performance.now() * 0.006) * 0.3
    }
  })
  return (
    <group>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.1, 0.8, 0.6]} />
        <meshStandardMaterial color="#111116" roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.95, -0.18]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[0.9, 0.55, 0.05]} />
        <meshStandardMaterial color="#04110f" roughness={0.5} />
      </mesh>
      <mesh ref={scan} position={[0, 0.97, -0.15]} rotation={[-0.25, 0, 0]}>
        <planeGeometry args={[0.8, 0.42]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 1.0, 0.1]} color={color} intensity={2} distance={2.5} />
    </group>
  )
}

function Bookshelf({ color }: { color: string }) {
  const books = useMemo(() => {
    const palette = ['#7C3AED', '#06B6D4', '#F59E0B', '#22c55e', '#ef4444']
    return Array.from({ length: 10 }, (_, i) => ({
      x: -0.75 + i * 0.16,
      h: 0.4 + ((i * 37) % 20) / 100,
      c: palette[i % palette.length],
    }))
  }, [])
  return (
    <group>
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[1.7, 1.8, 0.4]} />
        <meshStandardMaterial color="#161018" roughness={0.7} />
      </mesh>
      {[0.35, 0.9, 1.45].map((y) => (
        <group key={y} position={[0, y, 0.12]}>
          {books.map((b, i) => (
            <mesh key={i} position={[b.x, b.h / 2, 0]}>
              <boxGeometry args={[0.12, b.h, 0.26]} />
              <meshStandardMaterial color={b.c} roughness={0.5} />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[0, 1.9, 0]}>
        <boxGeometry args={[1.72, 0.04, 0.42]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
    </group>
  )
}

function DesignFrame({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null)
  useFrame(() => {
    if (group.current) group.current.position.y = 0.9 + Math.sin(performance.now() * 0.0012) * 0.06
  })
  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[1.1, 1.4, 0.06]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.35}
          roughness={0.05}
          metalness={0}
          transmission={0.9}
          thickness={0.4}
          ior={1.4}
        />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[0.9, 1.15]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} toneMapped={false} />
      </mesh>
      <pointLight color={color} intensity={2} distance={3} />
    </group>
  )
}

function CollectibleChip({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 2
      ref.current.position.y = 0.5 + Math.sin(performance.now() * 0.003) * 0.12
    }
  })
  return (
    <group>
      <mesh ref={ref} position={[0, 0.5, 0]}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 0.5, 0]} color={color} intensity={2.5} distance={2.5} />
    </group>
  )
}

export function Interactable3D({ interactable, active, accentColor, collected }: Interactable3DProps) {
  if (collected) return null

  const x = px2u(interactable.x + interactable.width / 2)
  const z = px2u(interactable.y + interactable.height / 2)
  const ringRadius = px2u(Math.max(interactable.width, interactable.height)) / 2 + 0.15

  return (
    <group position={[x, 0, z]}>
      {active && <ActiveRing radius={ringRadius} color={accentColor} />}

      {interactable.kind === 'npc' && <GlowPillar color={accentColor} />}
      {interactable.kind === 'duck' && <DuckProp />}
      {interactable.kind === 'project' && <ProjectMachine color={accentColor} />}
      {interactable.kind === 'trophy' && <TrophyPodium color={accentColor} />}
      {interactable.kind === 'terminal' && <TerminalDesk color={accentColor} />}
      {interactable.kind === 'bookshelf' && <Bookshelf color={accentColor} />}
      {interactable.kind === 'design-frame' && <DesignFrame color={accentColor} />}
      {interactable.kind === 'collectible' && <CollectibleChip color={accentColor} />}
      {interactable.kind === 'portal' && <Portal3D color={accentColor} scale={1.3} />}
    </group>
  )
}
