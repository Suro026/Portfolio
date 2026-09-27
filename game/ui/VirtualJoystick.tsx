'use client'

import { useRef, useState } from 'react'
import { JOYSTICK_DEADZONE } from '@/lib/constants'
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice'

interface VirtualJoystickProps {
  vectorRef: React.RefObject<{ x: number; y: number }>
}

const RADIUS = 50

export function VirtualJoystick({ vectorRef }: VirtualJoystickProps) {
  const isTouch = useIsTouchDevice()
  const [knob, setKnob] = useState({ x: 0, y: 0 })
  const baseRef = useRef<HTMLDivElement>(null)
  const activePointer = useRef<number | null>(null)

  if (!isTouch) return null

  const updateFromEvent = (clientX: number, clientY: number) => {
    const base = baseRef.current
    if (!base) return
    const rect = base.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    let dx = clientX - cx
    let dy = clientY - cy
    const dist = Math.hypot(dx, dy)
    if (dist > RADIUS) {
      dx = (dx / dist) * RADIUS
      dy = (dy / dist) * RADIUS
    }
    setKnob({ x: dx, y: dy })
    const nx = dx / RADIUS
    const ny = dy / RADIUS
    const len = Math.hypot(nx, ny)
    vectorRef.current.x = len > JOYSTICK_DEADZONE ? nx : 0
    vectorRef.current.y = len > JOYSTICK_DEADZONE ? ny : 0
  }

  const reset = () => {
    setKnob({ x: 0, y: 0 })
    vectorRef.current.x = 0
    vectorRef.current.y = 0
    activePointer.current = null
  }

  return (
    <div
      ref={baseRef}
      className="fixed bottom-8 left-8 z-40 h-32 w-32 touch-none select-none rounded-full border border-white/15 bg-black/40 backdrop-blur-md"
      onPointerDown={(e) => {
        activePointer.current = e.pointerId
        ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
        updateFromEvent(e.clientX, e.clientY)
      }}
      onPointerMove={(e) => {
        if (activePointer.current !== e.pointerId) return
        updateFromEvent(e.clientX, e.clientY)
      }}
      onPointerUp={reset}
      onPointerCancel={reset}
    >
      <div
        className="absolute left-1/2 top-1/2 h-14 w-14 rounded-full bg-gradient-to-b from-violet-500/80 to-violet-800/80 shadow-[0_0_20px_rgba(124,58,237,0.6)]"
        style={{ transform: `translate(-50%, -50%) translate(${knob.x}px, ${knob.y}px)` }}
      />
    </div>
  )
}
