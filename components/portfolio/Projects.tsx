import { Bot, Camera, ExternalLink, Github, GraduationCap, Heart, MessageCircle, Radar, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Section } from './Section'
import { PROJECTS, type ProjectData } from '@/lib/data/projects'

const CATEGORY_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  'IoT / Smart Mobility': Radar,
  'Robotics / IoT': Bot,
  'Digital Product / Healthcare': Heart,
  'AI / Conversational Experiences': MessageCircle,
  'Creator Project / Cultural Discovery': Camera,
  'EdTech / AI': GraduationCap,
  'Machine Learning / Flask': TrendingUp,
}

function ProjectCard({ project }: { project: ProjectData }) {
  const Icon = CATEGORY_ICON[project.category] ?? Bot

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40">
      <div className="flex aspect-[2/1] w-full items-center justify-center bg-accent">
        <Icon className="h-10 w-10 text-accent-foreground/70" aria-hidden />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-secondary px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-secondary-foreground">
            {project.category}
          </span>
          <span className="rounded-full border border-border px-2.5 py-1 text-[0.65rem] font-medium text-muted-foreground">
            {project.status}
          </span>
        </div>
        <h3 className="font-semibold text-foreground">{project.title}</h3>
        {(project.team || project.role) && (
          <p className="text-xs font-medium text-primary">
            {[project.role, project.team].filter(Boolean).join(' · ')}
          </p>
        )}
        <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="font-normal">
              {tech}
            </Badge>
          ))}
        </div>
        {(project.github || project.demo) && (
          <div className="flex items-center gap-3 pt-3 text-xs font-medium">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-foreground link-underline">
                <Github className="h-3.5 w-3.5" /> Code
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-foreground link-underline">
                <ExternalLink className="h-3.5 w-3.5" /> Live
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-5 sm:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}
