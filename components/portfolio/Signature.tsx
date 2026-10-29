'use client'

import { motion } from 'framer-motion'
import { Dancing_Script } from 'next/font/google'
import { cn } from '@/lib/utils'

const signatureFont = Dancing_Script({ subsets: ['latin'], weight: ['700'] })

interface SignatureProps {
  name: string
  className?: string
}

/** A "self-writing" signature — the name itself, in a cursive signature
 * style, traced on like a pen as the stroke draws in. */
export function Signature({ name, className }: SignatureProps) {
  const width = name.length * 22 + 24
  const perimeter = name.length * 70

  return (
    <svg
      viewBox={`0 0 ${width} 56`}
      width={width}
      height={56}
      className={cn('overflow-visible text-foreground', className)}
      role="img"
      aria-label={name}
    >
      <motion.text
        x={6}
        y={40}
        className={signatureFont.className}
        fontSize={32}
        fontWeight={700}
        fill="currentColor"
        stroke="currentColor"
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
