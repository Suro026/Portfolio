'use client'

import { useEffect, useRef } from 'react'
import type { TiledMap } from '@/types/game'
import { getTileData } from '@/lib/tiled'

interface TileCanvasProps {
  map: TiledMap
  accentColor: string
}

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/** Renders the Tiled ground layer to a single canvas — cheap, and avoids
 * hundreds of DOM nodes for what's purely a background. */
export function TileCanvas({ map, accentColor }: TileCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height, tilewidth, tileheight } = map
    canvas.width = width * tilewidth
    canvas.height = height * tileheight

    const data = getTileData(map, 'ground')
    const floorBase = '#111018'
    const wallBase = '#050508'
    const accentSoft = hexToRgba(accentColor, 0.12)
    const accentLine = hexToRgba(accentColor, 0.35)
    const walkway = hexToRgba(accentColor, 0.22)

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const tile = data[row * width + col]
        const x = col * tilewidth
        const y = row * tileheight

        if (tile === 3) {
          ctx.fillStyle = wallBase
          ctx.fillRect(x, y, tilewidth, tileheight)
          ctx.strokeStyle = accentLine
          ctx.lineWidth = 1
          ctx.strokeRect(x + 0.5, y + 0.5, tilewidth - 1, tileheight - 1)
        } else if (tile === 4) {
          ctx.fillStyle = walkway
          ctx.fillRect(x, y, tilewidth, tileheight)
        } else if (tile === 2) {
          ctx.fillStyle = floorBase
          ctx.fillRect(x, y, tilewidth, tileheight)
          ctx.fillStyle = accentSoft
          ctx.fillRect(x, y, tilewidth, tileheight)
        } else {
          ctx.fillStyle = floorBase
          ctx.fillRect(x, y, tilewidth, tileheight)
        }
      }
    }

    // Subtle vignette so the room edges recede into fog.
    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      Math.min(canvas.width, canvas.height) * 0.25,
      canvas.width / 2,
      canvas.height / 2,
      Math.max(canvas.width, canvas.height) * 0.7,
    )
    gradient.addColorStop(0, 'rgba(0,0,0,0)')
    gradient.addColorStop(1, 'rgba(0,0,0,0.55)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [map, accentColor])

  return <canvas ref={canvasRef} className="absolute left-0 top-0" style={{ imageRendering: 'pixelated' }} />
}
