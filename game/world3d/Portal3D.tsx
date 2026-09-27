'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

interface Portal3DProps {
  color?: string
  scale?: number
  withGroundGlow?: boolean
}

/** Shared "dimensional gateway" visual — used for the Contact Portal
 * interactable in-game, and reused as the cinematic backdrop for the
 * Spawn Gate intro and the ending scene. */
export function Portal3D({ color = '#06B6D4', scale = 1, withGroundGlow = true }: Portal3DProps) {
  const outerRing = useRef<THREE.Mesh>(null)
  const innerRing = useRef<THREE.Mesh>(null)
  const disc = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (outerRing.current) outerRing.current.rotation.z += delta * 0.25
    if (innerRing.current) innerRing.current.rotation.z -= delta * 0.4
    if (disc.current) {
      disc.current.rotation.z += delta * 0.15
      const mat = disc.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.45 + Math.sin(performance.now() * 0.002) * 0.15
    }
  })

  return (
    <group scale={scale}>
      <pointLight color={color} intensity={12} distance={10} position={[0, 1.4, 0]} />

      <mesh ref={outerRing} position={[0, 1.4, 0]}>
        <torusGeometry args={[1.3, 0.09, 16, 48]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.4} toneMapped={false} />
      </mesh>
      <mesh ref={innerRing} position={[0, 1.4, 0]} rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[1.05, 0.04, 16, 48]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
      <mesh ref={disc} position={[0, 1.4, 0]}>
        <circleGeometry args={[1.15, 40]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <Sparkles count={60} scale={[3, 3, 3]} size={3} speed={0.4} position={[0, 1.4, 0]} color={color} />

      {withGroundGlow && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.6, 40]} />
          <meshBasicMaterial color={color} transparent opacity={0.25} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      )}
    </group>
  )
}
