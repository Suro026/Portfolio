'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Download, Github, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MonogramAvatar } from './MonogramAvatar'
import { Signature } from './Signature'
import { ThemeToggle } from './ThemeToggle'
import { CopyEmailButton } from './CopyEmailButton'
import { PROFILE } from '@/lib/data/resume'
import { CONTACT } from '@/lib/data/contact'
import { SECTIONS, SECTION_IDS } from '@/lib/sections'
import { useActiveSection } from '@/hooks/use-active-section'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const active = useActiveSection(SECTION_IDS)

  return (
    <aside className="border-border/60 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[22rem] lg:shrink-0 lg:flex-col lg:justify-between lg:border-r lg:py-16 lg:pl-10 lg:pr-8">
      <div className="flex flex-col gap-6 px-6 pt-10 lg:px-0 lg:pt-0">
        <MonogramAvatar className="h-16 w-16" />

        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
            {PROFILE.name} <span className="font-normal text-muted-foreground">({PROFILE.shortName})</span>
          </h1>
          <p className="mt-1 text-sm font-medium text-primary">{PROFILE.role}</p>
          <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for work
          </span>
        </div>

        <Signature name={PROFILE.name} />

        <p className="text-balance text-sm leading-relaxed text-muted-foreground">{PROFILE.bio}</p>

        <nav aria-label="Section navigation" className="mt-2 hidden lg:block">
          <ul className="flex flex-col gap-3">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={cn(
                    'group relative flex items-center gap-3 text-xs font-semibold uppercase tracking-widest transition-colors',
                    active === section.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <span className="relative h-px w-10">
                    {active === section.id ? (
                      <motion.span
                        layoutId="sidebar-nav-pill"
                        className="absolute inset-y-0 left-0 h-px w-10 bg-primary"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    ) : (
                      <span className="absolute inset-y-0 left-0 h-px w-5 bg-current transition-all duration-300 group-hover:w-10" />
                    )}
                  </span>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-10 flex flex-col gap-4 px-6 pb-10 lg:px-0 lg:pb-0">
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="icon" className="rounded-full transition-transform duration-200 hover:-translate-y-0.5 hover:text-primary">
            <a href={CONTACT.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <Github className="h-[1.1rem] w-[1.1rem]" />
            </a>
          </Button>
          <Button asChild variant="outline" size="icon" className="rounded-full transition-transform duration-200 hover:-translate-y-0.5 hover:text-primary">
            <a href={`mailto:${CONTACT.email}`} aria-label="Send an email">
              <Mail className="h-[1.1rem] w-[1.1rem]" />
            </a>
          </Button>
          <ThemeToggle />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button asChild size="sm" className="gap-2">
            <Link href="/resume" target="_blank">
              <Download className="h-3.5 w-3.5" />
              Download CV
            </Link>
          </Button>
          <CopyEmailButton email={CONTACT.email} />
        </div>
      </div>
    </aside>
  )
}
