export interface Rect {
  x: number
  y: number
  width: number
  height: number
  name?: string
}

export function distance(ax: number, ay: number, bx: number, by: number): number {
  return Math.hypot(ax - bx, ay - by)
}
