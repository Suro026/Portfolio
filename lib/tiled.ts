import type { TiledLayer, TiledMap, TiledObject, TiledProperty } from '@/types/game'

export function getLayer(map: TiledMap, name: string): TiledLayer | undefined {
  return map.layers.find((l) => l.name === name)
}

export function getObjects(map: TiledMap, layerName: string): TiledObject[] {
  const layer = getLayer(map, layerName)
  return layer?.objects ?? []
}

export function getTileData(map: TiledMap, layerName: string): number[] {
  const layer = getLayer(map, layerName)
  return layer?.data ?? []
}

export function propsToRecord(props?: TiledProperty[]): Record<string, string | number | boolean> {
  if (!props) return {}
  return Object.fromEntries(props.map((p) => [p.name, p.value]))
}

export function tiledObjectRect(obj: TiledObject) {
  return { x: obj.x, y: obj.y, width: obj.width, height: obj.height }
}

export function mapPixelSize(map: TiledMap) {
  return { width: map.width * map.tilewidth, height: map.height * map.tileheight }
}
