import { Section } from './Section'
import { EXPERIENCE } from '@/lib/data/resume'

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="flex flex-col gap-8">
        {EXPERIENCE.map((entry) => (
          <li key={entry.id} className="group relative grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-6">
            {entry.period && (
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground sm:pt-0.5">{entry.period}</p>
            )}
            <div className={entry.period ? '' : 'sm:col-start-2'}>
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
    </Section>
  )
}
