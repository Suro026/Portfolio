import { Section } from './Section'
import { EDUCATION } from '@/lib/data/resume'

export function Education() {
  return (
    <Section id="education" title="Education">
      <ol className="flex flex-col gap-6">
        {EDUCATION.map((entry) => (
          <li key={entry.id} className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground sm:pt-0.5">{entry.period}</p>
            <div>
              <h3 className="font-semibold text-foreground">{entry.degree}</h3>
              <p className="text-sm text-muted-foreground">{entry.institution}</p>
              {entry.note && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{entry.note}</p>}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
