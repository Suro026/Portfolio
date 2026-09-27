import type { DoorLink, Interactable, InteractableKind, TiledMap, ZoneId, ZoneMapData } from '@/types/game'
import { getObjects, propsToRecord, tiledObjectRect } from './tiled'
import { ZONE_LABELS, ZONE_ACCENTS } from './constants'
import type { Rect } from '@/game/engine/collision'

const ZONE_AMBIENT: Record<ZoneId, ZoneMapData['ambient']> = {
  home: 'home',
  'ai-lab': 'lab',
  'design-studio': 'studio',
  'hackathon-arena': 'arena',
  'skill-terminal': 'terminal',
  'contact-portal': 'portal',
  'secret-lab': 'secret',
}

const cache = new Map<ZoneId, ZoneMapData>()

export async function loadZone(id: ZoneId): Promise<ZoneMapData> {
  const cached = cache.get(id)
  if (cached) return cached

  const res = await fetch(`/assets/maps/${id}.json`)
  if (!res.ok) throw new Error(`Failed to load zone map: ${id}`)
  const map: TiledMap = await res.json()

  const interactables: Interactable[] = getObjects(map, 'interactables').map((o) => {
    const props = propsToRecord(o.properties)
    return {
      id: String(o.id),
      kind: o.type as InteractableKind,
      name: o.name,
      x: o.x,
      y: o.y,
      width: o.width,
      height: o.height,
      refId: props.refId ? String(props.refId) : undefined,
    }
  })

  const doors: DoorLink[] = getObjects(map, 'doors').map((o) => {
    const props = propsToRecord(o.properties)
    return {
      id: String(o.id),
      x: o.x,
      y: o.y,
      width: o.width,
      height: o.height,
      targetZone: String(props.targetZone) as ZoneId,
      spawnX: Number(props.spawnX),
      spawnY: Number(props.spawnY),
      label: props.label ? String(props.label) : undefined,
      requiresFlag: props.requiresFlag ? String(props.requiresFlag) : undefined,
    }
  })

  const spawnProps = propsToRecord(map.properties)

  const data: ZoneMapData = {
    id,
    name: ZONE_LABELS[id],
    accentColor: ZONE_ACCENTS[id],
    ambient: ZONE_AMBIENT[id],
    map,
    interactables,
    doors,
    spawn: { x: Number(spawnProps.spawnX) || 0, y: Number(spawnProps.spawnY) || 0 },
  }
  cache.set(id, data)
  return data
}

export function solidsFromMap(map: TiledMap): Rect[] {
  return getObjects(map, 'collision').map(tiledObjectRect)
}
