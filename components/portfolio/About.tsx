import { Section } from './Section'
import { EDUCATION } from '@/lib/data/resume'

export function About() {
  return (
    <Section id="about" title="About Me">
      <div className="max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground">
        <p>
          I&apos;m Surajit Sadhukhan, known as Suro, a third-year CSE (AI &amp; ML) student at Bengal Institute of
          Technology in Kolkata.
        </p>
        <p>
          My interests sit at the intersection of artificial intelligence, connected hardware, and user-centered
          design. I work on projects that combine software with physical-world applications, explore AI-powered
          product experiences, and create interfaces that are clear, functional, and visually thoughtful.
        </p>
        <p>
          Beyond development, I contribute to campus technology communities, design teams, and hackathon projects.
          These experiences help me collaborate with people across different disciplines and turn early-stage ideas
          into practical outcomes.
        </p>
        <p>
          I&apos;m particularly interested in applied AI, computer vision, IoT automation, product design, and
          building useful tools for real users.
        </p>
      </div>

      <div className="mt-8 max-w-2xl border-t border-border/60 pt-6">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Education</p>
        <ul className="flex flex-col gap-4">
          {EDUCATION.map((entry) => (
            <li key={entry.id}>
              <h3 className="font-semibold text-foreground">{entry.degree}</h3>
              <p className="text-sm text-muted-foreground">{entry.institution}</p>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-primary">{entry.status}</p>
              {entry.note && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{entry.note}</p>}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
