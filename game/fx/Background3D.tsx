'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import type { ZoneMapData } from '@/types/game'

interface Background3DProps {
  accentColor: string
  ambient: ZoneMapData['ambient']
}

function DriftingLights({ color }: { color: string }) {
  const light1 = useRef<THREE.PointLight>(null)
  const light2 = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (light1.current) {
      light1.current.position.x = Math.sin(t * 0.15) * 6
      light1.current.position.y = Math.cos(t * 0.1) * 3
    }
    if (light2.current) {
      light2.current.position.x = Math.cos(t * 0.12) * 5
      light2.current.position.y = Math.sin(t * 0.18) * 4
    }
  })

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight ref={light1} position={[-4, 2, 3]} color={color} intensity={18} distance={20} />
      <pointLight ref={light2} position={[4, -2, 3]} color="#06B6D4" intensity={10} distance={18} />
    </>
  )
}

const AMBIENT_DENSITY: Record<ZoneMapData['ambient'], number> = {
  home: 60,
  lab: 90,
  studio: 50,
  arena: 70,
  terminal: 40,
  portal: 120,
  secret: 30,
}

export function Background3D({ accentColor, ambient }: Background3DProps) {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      camera={{ position: [0, 0, 8], fov: 50 }}
    >
      <color attach="background" args={['#0a0a0f']} />
      <fog attach="fog" args={['#0a0a0f', 6, 16]} />
      <DriftingLights color={accentColor} />
      <Sparkles
        count={AMBIENT_DENSITY[ambient]}
        scale={[16, 9, 6]}
        size={2.5}
        speed={0.25}
        opacity={0.55}
        color={accentColor}
      />
      <mesh position={[0, 0, -6]}>
        <planeGeometry args={[40, 24]} />
        <meshBasicMaterial color="#05050a" transparent opacity={0.4} />
      </mesh>
    </Canvas>
  )
}
