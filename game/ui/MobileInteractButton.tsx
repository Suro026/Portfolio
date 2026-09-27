'use client'

import { Zap } from 'lucide-react'
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice'

interface MobileInteractButtonProps {
  onPress: () => void
  disabled: boolean
}

export function MobileInteractButton({ onPress, disabled }: MobileInteractButtonProps) {
  const isTouch = useIsTouchDevice()
  if (!isTouch) return null

  return (
    <button
      className="fixed bottom-10 right-8 z-40 flex h-20 w-20 touch-none select-none items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md active:scale-95 disabled:opacity-40"
      style={{ boxShadow: disabled ? 'none' : '0 0 24px rgba(6,182,212,0.5)' }}
      disabled={disabled}
      onPointerDown={(e) => {
        e.preventDefault()
        onPress()
      }}
    >
      <Zap className="h-7 w-7" />
    </button>
  )
}
