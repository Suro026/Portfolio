export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export function rectsOverlap(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
}

/** Player is modelled as a small AABB centered on (x, y) at the feet. */
export function playerRect(x: number, y: number, size = 28): Rect {
  return { x: x - size / 2, y: y - size / 2, width: size, height: size }
}

/**
 * Resolve movement against a list of solid rectangles, one axis at a time,
 * so the player slides smoothly along walls instead of stopping dead.
 */
export function resolveMove(
  x: number,
  y: number,
  dx: number,
  dy: number,
  solids: Rect[],
  bounds: { width: number; height: number },
  playerSize = 28,
): { x: number; y: number } {
  let nx = x + dx
  let ny = y

  const half = playerSize / 2
  nx = Math.max(half, Math.min(bounds.width - half, nx))
  if (solids.some((r) => rectsOverlap(playerRect(nx, ny, playerSize), r))) {
    nx = x
  }

  ny = y + dy
  ny = Math.max(half, Math.min(bounds.height - half, ny))
  if (solids.some((r) => rectsOverlap(playerRect(nx, ny, playerSize), r))) {
    ny = y
  }

  return { x: nx, y: ny }
}

export function distance(ax: number, ay: number, bx: number, by: number): number {
  return Math.hypot(ax - bx, ay - by)
}
