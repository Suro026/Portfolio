'use client'

import { Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PROFILE, EXPERIENCE, EDUCATION } from '@/lib/data/resume'
import { SKILL_GROUPS } from '@/lib/data/skills'
import { PROJECTS } from '@/lib/data/projects'
import { HACKATHONS } from '@/lib/data/hackathons'
import { CONTACT } from '@/lib/data/contact'

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <div className="mb-8 flex items-center justify-between print:hidden">
        <p className="text-sm text-muted-foreground">This page is formatted to print cleanly as a PDF.</p>
        <Button onClick={() => window.print()} className="gap-2">
          <Printer className="h-4 w-4" />
          Print / Save as PDF
        </Button>
      </div>

      <div className="print-resume rounded-xl border border-border bg-card p-8 sm:p-10">
        <header className="mb-6 border-b border-border pb-6">
          <h1 className="text-3xl font-bold text-foreground">{PROFILE.name}</h1>
          <p className="mt-1 text-sm font-medium text-primary">{PROFILE.tagline}</p>
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a href={CONTACT.github} target="_blank" rel="noreferrer">
              {CONTACT.github.replace('https://', '')}
            </a>
          </p>
        </header>

        <section className="mb-6">
          <p className="text-sm leading-relaxed text-muted-foreground">{PROFILE.bio}</p>
        </section>

        <section className="mb-6">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Experience</h2>
          <div className="flex flex-col gap-4">
            {EXPERIENCE.map((entry) => (
              <div key={entry.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    {entry.title} · {entry.org}
                  </h3>
                  <span className="shrink-0 text-xs text-muted-foreground">{entry.period}</span>
                </div>
                <ul className="mt-1 list-disc pl-4 text-sm text-muted-foreground">
                  {entry.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Projects</h2>
          <div className="flex flex-col gap-3">
            {PROJECTS.map((project) => (
              <div key={project.id}>
                <h3 className="text-sm font-semibold text-foreground">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.tagline}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Skills</h2>
          <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
            {SKILL_GROUPS.map((group) => (
              <p key={group.category}>
                <span className="font-medium text-foreground">{group.category}:</span> {group.items.join(', ')}
              </p>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Education</h2>
          <div className="flex flex-col gap-2">
            {EDUCATION.map((entry) => (
              <div key={entry.id} className="flex items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{entry.degree}</h3>
                  <p className="text-sm text-muted-foreground">{entry.institution}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{entry.period}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Hackathons &amp; Recognition
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {HACKATHONS.map((entry) => (
              <Badge key={entry.id} variant="secondary" className="font-normal">
                {entry.title} — {entry.place}
              </Badge>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
