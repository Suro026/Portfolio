'use client'

import { useEffect, useRef } from 'react'
import { KONAMI_SEQUENCE } from '@/lib/constants'

export function useKonamiCode(onUnlock: () => void) {
  const progress = useRef(0)
  const callback = useRef(onUnlock)
  callback.current = onUnlock

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const expected = KONAMI_SEQUENCE[progress.current]
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (key === expected) {
        progress.current += 1
        if (progress.current === KONAMI_SEQUENCE.length) {
          progress.current = 0
          callback.current()
        }
      } else {
        progress.current = key === KONAMI_SEQUENCE[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
}
