'use client'

import { motion } from 'framer-motion'
import { Caveat } from 'next/font/google'
import { cn } from '@/lib/utils'

const caveat = Caveat({ subsets: ['latin'], weight: ['600'] })

interface SignatureProps {
  name: string
  className?: string
}

/** A "self-writing" signature — a cursive rendering of the name revealed
 * left-to-right on mount, like a pen tracing it out. */
export function Signature({ name, className }: SignatureProps) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={{ clipPath: 'inset(0 0% 0 0)' }}
      transition={{ duration: 1.4, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
      className={cn('inline-block', className)}
    >
      <span className={cn(caveat.className, 'text-4xl leading-none text-amber-500 dark:text-amber-400')}>{name}</span>
    </motion.div>
  )
}
