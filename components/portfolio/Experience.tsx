import { Badge } from '@/components/ui/badge'
import { Section } from './Section'
import { EXPERIENCE } from '@/lib/data/resume'
import { HACKATHONS } from '@/lib/data/hackathons'

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="flex flex-col gap-8">
        {EXPERIENCE.map((entry) => (
          <li key={entry.id} className="group relative grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground sm:pt-0.5">{entry.period}</p>
            <div>
              <h3 className="font-semibold text-foreground">
                {entry.title} <span className="text-muted-foreground">· {entry.org}</span>
              </h3>
              <ul className="mt-2 flex flex-col gap-1.5">
                {entry.points.map((point) => (
                  <li key={point} className="text-sm leading-relaxed text-muted-foreground">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 border-t border-border/60 pt-6">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Hackathons &amp; recognition
        </p>
        <div className="flex flex-wrap gap-2">
          {HACKATHONS.map((entry) => (
            <Badge key={entry.id} variant="secondary" className="font-normal">
              {entry.title} <span className="mx-1.5 text-muted-foreground">·</span> {entry.place}
            </Badge>
          ))}
        </div>
      </div>
    </Section>
  )
}
