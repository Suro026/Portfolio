import { Section } from './Section'

export function About() {
  return (
    <Section id="about" title="About">
      <div className="max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground">
        <p>
          Most of what I make starts life as a hackathon prototype under a hard deadline, which has made me fast at
          cutting scope to what actually matters and shipping something that works end to end rather than something
          half-finished in five places.
        </p>
        <p>
          I'm just as interested in how something feels to use as how well it works under the hood. That's the
          reasoning behind leading the design track at GDG On Campus alongside the engineering work — a model is
          only useful once someone can trust what it's telling them, and that's a design problem as much as it's a
          technical one.
        </p>
        <p>
          Lately I've been building IoT-connected systems, computer-vision pipelines, and conversational AI
          products — see the projects below for specifics.
        </p>
      </div>
    </Section>
  )
}
