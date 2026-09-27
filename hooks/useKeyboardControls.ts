'use client'

import { useEffect, useRef } from 'react'

export interface ControlState {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
  interact: boolean
  sprint: boolean
}

const KEY_MAP: Record<string, keyof ControlState> = {
  w: 'up',
  arrowup: 'up',
  s: 'down',
  arrowdown: 'down',
  a: 'left',
  arrowleft: 'left',
  d: 'right',
  arrowright: 'right',
  e: 'interact',
  shift: 'sprint',
}

/** Tracks currently-held movement/interact keys in a ref (no re-render per keystroke). */
export function useKeyboardControls() {
  const state = useRef<ControlState>({ up: false, down: false, left: false, right: false, interact: false, sprint: false })
  const onInteractPress = useRef<(() => void) | null>(null)

  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      const key = KEY_MAP[e.key.toLowerCase()]
      if (!key) return
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(e.key.toLowerCase())) {
        e.preventDefault()
      }
      const wasDown = state.current[key]
      state.current[key] = true
      if (key === 'interact' && !wasDown) onInteractPress.current?.()
    }
    const handleUp = (e: KeyboardEvent) => {
      const key = KEY_MAP[e.key.toLowerCase()]
      if (!key) return
      state.current[key] = false
    }
    const handleBlur = () => {
      state.current = { up: false, down: false, left: false, right: false, interact: false, sprint: false }
    }
    window.addEventListener('keydown', handleDown)
    window.addEventListener('keyup', handleUp)
    window.addEventListener('blur', handleBlur)
    return () => {
      window.removeEventListener('keydown', handleDown)
      window.removeEventListener('keyup', handleUp)
      window.removeEventListener('blur', handleBlur)
    }
  }, [])

  return { state, onInteractPress }
}
