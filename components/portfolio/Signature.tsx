'use client'

import { motion } from 'framer-motion'
import { Caveat } from 'next/font/google'
import { cn } from '@/lib/utils'

const caveat = Caveat({ subsets: ['latin'], weight: ['600'] })

interface SignatureProps {
  name: string
  className?: string
}

/** A "self-writing" signature — the name is traced on stroke-first, like a
 * pen tracing ink, then fills in with the accent color. */
export function Signature({ name, className }: SignatureProps) {
  const width = name.length * 24 + 24
  const perimeter = name.length * 70

  return (
    <svg
      viewBox={`0 0 ${width} 56`}
      width={width}
      height={56}
      className={cn('overflow-visible', className)}
      role="img"
      aria-label={name}
    >
      <motion.text
        x={8}
        y={40}
        className={caveat.className}
        fontSize={34}
        fontWeight={600}
        fill="var(--color-primary)"
        stroke="var(--color-primary)"
        strokeWidth={1}
        strokeDasharray={perimeter}
        initial={{ strokeDashoffset: perimeter, fillOpacity: 0 }}
        animate={{ strokeDashoffset: 0, fillOpacity: 1 }}
        transition={{
          strokeDashoffset: { duration: 1.6, delay: 0.3, ease: [0.5, 0, 0.3, 1] },
          fillOpacity: { duration: 0.6, delay: 1.6 },
        }}
      >
        {name}
      </motion.text>
    </svg>
  )
}
