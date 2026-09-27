'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, SoftShadows, Sparkles } from '@react-three/drei'
import { Physics, type RapierRigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { useGameStore } from '@/store/useGameStore'
import type { ZoneMapData } from '@/types/game'
import type { ControlState } from '@/hooks/useKeyboardControls'
import { px2u } from '@/lib/constants'
import { mapPixelSize } from '@/lib/tiled'

import { ZoneGeometry } from './ZoneGeometry'
import { ZoneDressing } from './ZoneDressing'
import { Door3D } from './Door3D'
import { Interactable3D } from './Interactable3D'
import { PlayerController } from './PlayerController'
import { ThirdPersonCamera } from './ThirdPersonCamera'
import { PostFX } from './PostFX'

interface Scene3DProps {
  zone: ZoneMapData
  controls: React.RefObject<ControlState>
  joystick: React.RefObject<{ x: number; y: number }>
  paused: boolean
  activeInteractableId: string | null
  collectedChipIds: string[]
  konamiUnlocked: boolean
}

const AMBIENT_PARTICLES: Record<ZoneMapData['ambient'], number> = {
  home: 40,
  lab: 70,
  studio: 45,
  arena: 55,
  terminal: 30,
  portal: 90,
  secret: 25,
}

function DriftingLights({ color }: { color: string }) {
  const a = useRef<THREE.PointLight>(null)
  const b = useRef<THREE.PointLight>(null)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (a.current) {
      a.current.position.x = 4 + Math.sin(t * 0.15) * 3
      a.current.position.z = 4 + Math.cos(t * 0.12) * 3
    }
    if (b.current) {
      b.current.position.x = -4 + Math.cos(t * 0.18) * 3
      b.current.position.z = -4 + Math.sin(t * 0.1) * 3
    }
  })
  return (
    <>
      <pointLight ref={a} position={[4, 2.2, 4]} color={color} intensity={9} distance={9} />
      <pointLight ref={b} position={[-4, 2.2, -4]} color="#06B6D4" intensity={6} distance={8} />
    </>
  )
}

/** Bakes a small offline "HDR" reflection environment from a handful of
 * colored Lightformers instead of fetching an external .hdr file — gives
 * metal/glass surfaces real image-based lighting with zero network
 * dependency (works the same in dev, in this sandbox, and in prod). */
function ZoneEnvironment({ color }: { color: string }) {
  return (
    <Environment resolution={64} frames={1} background={false}>
      <Lightformer form="rect" intensity={2} color={color} position={[0, 4, 0]} scale={[6, 6, 1]} />
      <Lightformer form="rect" intensity={1.4} color="#06B6D4" position={[-6, 2, 0]} rotation-y={Math.PI / 2} scale={[6, 4, 1]} />
      <Lightformer form="rect" intensity={1.2} color="#ffffff" position={[6, 2, 0]} rotation-y={-Math.PI / 2} scale={[6, 4, 1]} />
      <Lightformer form="ring" intensity={2} color={color} position={[0, 1, -6]} scale={4} />
    </Environment>
  )
}

function ZoneContent({
  zone,
  controls,
  joystick,
  paused,
  activeInteractableId,
  collectedChipIds,
  konamiUnlocked,
}: Scene3DProps) {
  const bodyRef = useRef<RapierRigidBody | null>(null)
  const yawRef = useRef(0)
  const spawn = useRef({ x: useGameStore.getState().playerX, y: useGameStore.getState().playerY }).current
  const { width: wPx, height: hPx } = mapPixelSize(zone.map)
  const roomW = px2u(wPx)
  const roomD = px2u(hPx)
  const fogDensity = THREE.MathUtils.clamp(3.2 / Math.max(roomW, roomD), 0.025, 0.085)

  return (
    <group>
      <fogExp2 attach="fog" args={['#05050a', fogDensity]} />
      <ZoneEnvironment color={zone.accentColor} />
      <DriftingLights color={zone.accentColor} />
      <Sparkles
        count={AMBIENT_PARTICLES[zone.ambient]}
        scale={[px2u(wPx), 3, px2u(hPx)]}
        position={[px2u(wPx) / 2, 1.6, px2u(hPx) / 2]}
        size={2}
        speed={0.25}
        opacity={0.5}
        color={zone.accentColor}
      />

      <ZoneGeometry zone={zone} />
      <ZoneDressing zone={zone} />

      {zone.doors.map((door) => (
        <Door3D
          key={door.id}
          door={door}
          accentColor={zone.accentColor}
          locked={Boolean(door.requiresFlag) && door.requiresFlag === 'konamiUnlocked' && !konamiUnlocked}
        />
      ))}

      {zone.interactables.map((it) => (
        <Interactable3D
          key={it.id}
          interactable={it}
          active={activeInteractableId === it.id}
          accentColor={zone.accentColor}
          collected={it.kind === 'collectible' && collectedChipIds.includes(it.refId ?? '')}
        />
      ))}

      <PlayerController
        spawnX={spawn.x}
        spawnZ={spawn.y}
        controls={controls}
        joystick={joystick}
        paused={paused}
        bodyRef={bodyRef}
        yawRef={yawRef}
      />
      <ThirdPersonCamera bodyRef={bodyRef} yawRef={yawRef} />
    </group>
  )
}

const CANVAS_DPR: [number, number] = [1, 1.75]
const CANVAS_GL = { antialias: true, powerPreference: 'high-performance' as const }
// Stable reference: passing a fresh object here every render makes R3F
// re-sync (and snap back) the camera on every Scene3D re-render, fighting
// ThirdPersonCamera's own imperative position updates.
const CANVAS_CAMERA = { fov: 68, near: 0.1, far: 80, position: [0, 3, -6] as [number, number, number] }

export function Scene3D(props: Scene3DProps) {
  return (
    <Canvas className="!absolute inset-0" shadows dpr={CANVAS_DPR} gl={CANVAS_GL} camera={CANVAS_CAMERA}>
      <color attach="background" args={['#05050a']} />
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[8, 12, -6]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
      />
      <SoftShadows size={12} samples={12} focus={0.6} />

      <Suspense fallback={null}>
        <Physics gravity={[0, -28, 0]}>
          <ZoneContent key={props.zone.id} {...props} />
        </Physics>
      </Suspense>

      <PostFX />
    </Canvas>
  )
}
