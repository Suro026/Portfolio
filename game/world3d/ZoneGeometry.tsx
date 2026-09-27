'use client'

import { useMemo } from 'react'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { mapPixelSize } from '@/lib/tiled'
import { solidsFromMap } from '@/lib/zones'
import { WALL_HEIGHT, px2u } from '@/lib/constants'
import type { ZoneMapData } from '@/types/game'

interface ZoneGeometryProps {
  zone: ZoneMapData
}

const OBSTACLE_HEIGHT = 1.9

function WallSegment({ x, z, w, d, color }: { x: number; z: number; w: number; d: number; color: string }) {
  return (
    <RigidBody type="fixed" position={[x, WALL_HEIGHT / 2, z]} colliders={false}>
      <CuboidCollider args={[w / 2, WALL_HEIGHT / 2, d / 2]} />
      <mesh castShadow receiveShadow>
        <boxGeometry args={[w, WALL_HEIGHT, d]} />
        <meshStandardMaterial color="#0c0c14" roughness={0.75} metalness={0.15} />
      </mesh>
      {/* neon trim along the top edge */}
      <mesh position={[0, WALL_HEIGHT / 2 - 0.04, 0]}>
        <boxGeometry args={[w + 0.02, 0.06, d + 0.02]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.2} toneMapped={false} />
      </mesh>
    </RigidBody>
  )
}

/** Invisible collider for an interactable's footprint (bookshelf, machine,
 * podium, NPC...) — the actual prop mesh comes from Interactable3D at the
 * same spot, so this only needs to block movement, plus a glowing floor
 * marker so the footprint still reads visually. */
function ObstacleFootprint({ x, z, w, d, color }: { x: number; z: number; w: number; d: number; color: string }) {
  return (
    <>
      <RigidBody type="fixed" position={[x, OBSTACLE_HEIGHT / 2, z]} colliders={false}>
        <CuboidCollider args={[w / 2, OBSTACLE_HEIGHT / 2, d / 2]} />
      </RigidBody>
      <mesh position={[x, 0.02, z]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[Math.max(w, d) / 2 - 0.06, Math.max(w, d) / 2, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.6} toneMapped={false} transparent opacity={0.7} />
      </mesh>
    </>
  )
}

/** Builds the room shell (floor + walls + obstacle colliders) straight from
 * the same Tiled collision data the 2D build used — no new level data, just
 * a 3D extrusion of the existing solids[] rectangles. */
export function ZoneGeometry({ zone }: ZoneGeometryProps) {
  const { width: widthPx, height: heightPx } = mapPixelSize(zone.map)
  const w = px2u(widthPx)
  const d = px2u(heightPx)

  const solids = useMemo(
    () =>
      solidsFromMap(zone.map).map((r, i) => ({
        key: `solid-${i}`,
        isWall: r.name === 'wall',
        x: px2u(r.x + r.width / 2),
        z: px2u(r.y + r.height / 2),
        w: px2u(r.width),
        d: px2u(r.height),
      })),
    [zone.map],
  )

  return (
    <group>
      {/* floor */}
      <RigidBody type="fixed" colliders={false} position={[w / 2, -0.1, d / 2]}>
        <CuboidCollider args={[w / 2, 0.1, d / 2]} />
        <mesh receiveShadow>
          <boxGeometry args={[w, 0.2, d]} />
          <meshStandardMaterial color="#0a0a12" roughness={0.25} metalness={0.55} />
        </mesh>
      </RigidBody>
      {/* subtle accent grid lines on the floor */}
      <gridHelper args={[Math.max(w, d), Math.max(w, d) / 2, zone.accentColor, '#1a1a24']} position={[w / 2, 0.001, d / 2]} />

      {solids.map((s) =>
        s.isWall ? (
          <WallSegment key={s.key} x={s.x} z={s.z} w={s.w} d={s.d} color={zone.accentColor} />
        ) : (
          <ObstacleFootprint key={s.key} x={s.x} z={s.z} w={s.w} d={s.d} color={zone.accentColor} />
        ),
      )}
    </group>
  )
}
