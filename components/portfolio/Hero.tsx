'use client'

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Code2, Heart, Mail, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PROFILE } from '@/lib/data/resume'

const QUIPS = ['shipped ✓', 'tests passing', 'training model…', '0 bugs (so far)', 'merged to main', 'deploying…']

function OrbitIcon({ icon, radius, duration, delay }: { icon: ReactNode; radius: number; duration: number; delay: number }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 h-0 w-0 motion-reduce:hidden"
      style={
        {
          animation: `spt-orbit ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
          '--orbit-radius': `${radius}px`,
        } as CSSProperties
      }
    >
      <div className="flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-primary shadow-sm">
        {icon}
      </div>
    </div>
  )
}

function HeroArt() {
  const [quip, setQuip] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setQuip((n) => (n + 1) % QUIPS.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative mx-auto h-64 w-64 shrink-0 sm:h-72 sm:w-72">
      <OrbitIcon icon={<Mail className="h-4 w-4" />} radius={118} duration={14} delay={0} />
      <OrbitIcon icon={<MessageCircle className="h-4 w-4" />} radius={118} duration={14} delay={-7} />
      <OrbitIcon icon={<Code2 className="h-4 w-4" />} radius={92} duration={11} delay={-2.5} />
      <OrbitIcon icon={<Heart className="h-4 w-4" />} radius={92} duration={11} delay={-8} />

      <div className="absolute left-1/2 top-1/2 flex flex-col items-center gap-2 [animation:spt-bob_4s_ease-in-out_infinite] motion-reduce:[animation:none] motion-reduce:-translate-x-1/2 motion-reduce:-translate-y-1/2">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-accent">
          <div className="flex gap-3">
            <span className="h-2.5 w-2 origin-center animate-[spt-blink_5s_ease-in-out_infinite] rounded-full bg-accent-foreground motion-reduce:animate-none" />
            <span className="h-2.5 w-2 origin-center animate-[spt-blink_5s_ease-in-out_infinite] rounded-full bg-accent-foreground motion-reduce:animate-none" />
          </div>
        </div>
        <div className="flex h-6 w-20 items-center justify-center rounded-md border border-border bg-card">
          <span className="h-1.5 w-1.5 animate-[spt-led_1.8s_ease-in-out_infinite] rounded-full bg-emerald-500 motion-reduce:animate-none" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={quip}
          initial={{ opacity: 0, y: 6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.9 }}
          transition={{ duration: 0.35 }}
          className="absolute right-0 top-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm"
        >
          {QUIPS[quip]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-10 py-10 text-center sm:py-16 lg:flex-row lg:items-center lg:gap-16 lg:text-left">
      <div className="flex-1">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Hey, I&apos;m {PROFILE.name}</p>
        <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{PROFILE.role}</h2>
        <p className="mx-auto mt-4 max-w-md text-balance text-muted-foreground lg:mx-0">{PROFILE.tagline}</p>
        <div className="mt-8 flex items-center justify-center gap-4 lg:justify-start">
          <Button asChild size="lg" className="gap-2">
            <a href="#experience">View Experience</a>
          </Button>
        </div>
      </div>
      <HeroArt />
    </section>
  )
}
