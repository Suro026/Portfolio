import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Section } from './Section'
import { PROJECTS } from '@/lib/data/projects'

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-5 sm:grid-cols-2">
        {PROJECTS.map((project) => (
          <a
            key={project.id}
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain p-10 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground">{project.title}</h3>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>
              <p className="text-xs font-medium text-primary">{project.tagline}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{project.overview}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="outline" className="font-normal">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </Section>
  )
}
