'use client'

import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Portal3D } from './Portal3D'

interface CinematicPortalSceneProps {
  color?: string
}

function DollyCamera() {
  const { camera } = useThree()
  const t = useRef(0)
  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05)
    t.current = Math.min(t.current + delta * 0.06, 1)
    const z = -6.5 + t.current * 2.6
    camera.position.set(Math.sin(t.current * 0.6) * 0.5, 1.6, z)
    camera.lookAt(0, 1.4, 0)
  })
  return null
}

/** Standalone 3D backdrop for the spawn-gate intro and ending cinematics —
 * reuses the same glowing-portal prop the Contact Portal zone renders
 * in-game, with a slow forward dolly for the "fly-in" feel. */
export function CinematicPortalScene({ color = '#7C3AED' }: CinematicPortalSceneProps) {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: 'low-power' }}
      camera={{ fov: 55, near: 0.1, far: 40, position: [0, 1.6, -6.5] }}
    >
      <color attach="background" args={['#05050a']} />
      <fogExp2 attach="fog" args={['#05050a', 0.07]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 3, -3]} intensity={4} color={color} />
      <Portal3D color={color} scale={1.6} />
      <DollyCamera />
    </Canvas>
  )
}
