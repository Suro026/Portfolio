'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { signatureOf } from '@/lib/signature'

interface SignatureProps {
  name: string
  className?: string
}

/** A "self-writing" signature — an illegible, confident scribble generated
 * from the name (same algorithm as the reference), traced on like a pen. */
export function Signature({ name, className }: SignatureProps) {
  const [run, setRun] = useState(0)
  const sig = signatureOf(name)

  return (
    <button
      type="button"
      onClick={() => setRun((n) => n + 1)}
      aria-label={`Signature of ${name}. Click to sign again.`}
      title="Sign again"
      className={cn('inline-block w-max rounded-md p-1 text-foreground transition-colors hover:bg-secondary', className)}
    >
      <motion.svg key={run} viewBox={`0 0 ${sig.width} 52`} width={sig.width * 1.25} height={65} aria-hidden="true">
        <motion.path
          d={sig.d}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.35}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.5, 0, 0.3, 1] }}
        />
      </motion.svg>
    </button>
  )
}
