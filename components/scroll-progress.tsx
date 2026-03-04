'use client'

import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / windowHeight) * 100
      setProgress(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-accent z-50 transition-all duration-200"
      style={{ width: `${progress}%` }}
    />
  )
}
