'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Coffee, Download, GraduationCap, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Signature } from './Signature'
import { CopyEmailButton } from './CopyEmailButton'
import { PROFILE, EDUCATION } from '@/lib/data/resume'
import { CONTACT } from '@/lib/data/contact'
import { SECTIONS, SECTION_IDS } from '@/lib/sections'
import { useActiveSection } from '@/hooks/use-active-section'
import { downloadCv } from '@/lib/cv'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const active = useActiveSection(SECTION_IDS)

  return (
    <aside className="border-border/60 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[22rem] lg:shrink-0 lg:flex-col lg:justify-between lg:border-r lg:py-16 lg:pl-10 lg:pr-8">
      <div className="flex flex-col gap-6 px-6 pt-10 lg:px-0 lg:pt-0">
        <Image
          src="/avatar.jpg"
          alt={PROFILE.name}
          width={320}
          height={320}
          priority
          className="h-16 w-16 rounded-2xl object-cover ring-1 ring-border"
        />

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
            Open to Internships &amp; Collaborations
          </span>
        </div>

        <p className="text-balance text-sm leading-relaxed text-muted-foreground">{PROFILE.bio}</p>

        <Signature name={PROFILE.name} />

        <hr className="border-border/60" />

        <ul className="grid gap-1.5 text-xs text-muted-foreground">
          <li className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {PROFILE.location}
          </li>
          {EDUCATION[0] && (
            <li className="flex items-center gap-2">
              <GraduationCap className="h-3.5 w-3.5 shrink-0" />
              {EDUCATION[0].status}
            </li>
          )}
        </ul>

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
          <Button asChild variant="ghost" size="icon" className="rounded-md text-muted-foreground transition-transform duration-200 hover:-translate-y-0.5 hover:bg-secondary hover:text-foreground">
            <a href={CONTACT.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <Github className="h-[1.1rem] w-[1.1rem]" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon" className="rounded-md text-muted-foreground transition-transform duration-200 hover:-translate-y-0.5 hover:bg-secondary hover:text-foreground">
            <a href={`mailto:${CONTACT.email}`} aria-label="Send an email">
              <Mail className="h-[1.1rem] w-[1.1rem]" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon" className="rounded-md text-muted-foreground transition-transform duration-200 hover:-translate-y-0.5 hover:bg-secondary hover:text-foreground">
            <a href={CONTACT.buymeacoffee} target="_blank" rel="noreferrer" aria-label="Buy me a coffee">
              <Coffee className="h-[1.1rem] w-[1.1rem]" />
            </a>
          </Button>
          {CONTACT.linkedin && (
            <Button asChild variant="ghost" size="icon" className="rounded-md text-muted-foreground transition-transform duration-200 hover:-translate-y-0.5 hover:bg-secondary hover:text-foreground">
              <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                <Linkedin className="h-[1.1rem] w-[1.1rem]" />
              </a>
            </Button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="ink" size="sm" className="gap-2" onClick={downloadCv}>
            <Download className="h-3.5 w-3.5" />
            Download CV
          </Button>
          <CopyEmailButton email={CONTACT.email} />
        </div>
      </div>
    </aside>
  )
}
