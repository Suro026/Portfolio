'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionProps {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}

export function Section({ id, title, children, className }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn('scroll-mt-20 py-10 first:pt-0', className)}
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="h-px w-8 bg-primary" />
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{title}</h2>
      </div>
      {children}
    </motion.section>
  )
}
