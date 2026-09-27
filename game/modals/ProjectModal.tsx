'use client'

import Image from 'next/image'
import { Github } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { PROJECTS } from '@/lib/data/projects'

interface ProjectModalProps {
  refId: string | null
  onOpenChange: (open: boolean) => void
}

export function ProjectModal({ refId, onOpenChange }: ProjectModalProps) {
  const project = PROJECTS.find((p) => p.id === refId)

  return (
    <Dialog open={Boolean(project)} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-cyan-500/20 bg-black/90 backdrop-blur-2xl">
        {project && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-white">
                {project.title}
                <span className="ml-3 align-middle text-sm font-normal text-cyan-400">{project.tagline}</span>
              </DialogTitle>
              <DialogDescription className="sr-only">{project.overview}</DialogDescription>
            </DialogHeader>

            <Carousel className="w-full">
              <CarouselContent>
                {project.images.map((src) => (
                  <CarouselItem key={src}>
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-white/5">
                      <Image src={src} alt={project.title} fill className="object-contain p-6" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>

            <Tabs defaultValue="overview" className="mt-2">
              <TabsList className="grid w-full grid-cols-4 bg-white/5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="problem">Problem</TabsTrigger>
                <TabsTrigger value="solution">Solution</TabsTrigger>
                <TabsTrigger value="stack">Stack</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="text-sm leading-relaxed text-white/80">
                {project.overview}
              </TabsContent>
              <TabsContent value="problem" className="text-sm leading-relaxed text-white/80">
                {project.problem}
              </TabsContent>
              <TabsContent value="solution" className="text-sm leading-relaxed text-white/80">
                {project.solution}
              </TabsContent>
              <TabsContent value="stack">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-violet-500/15 text-violet-200">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex w-fit items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              <Github className="h-4 w-4" /> View on GitHub
            </a>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
