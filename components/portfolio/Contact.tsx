import { Figma, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section } from './Section'
import { CopyEmailButton } from './CopyEmailButton'
import { CONTACT } from '@/lib/data/contact'
import { PROFILE } from '@/lib/data/resume'

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="max-w-xl">
        <h3 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Let's build something.</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          I'm open to internships, AI/IoT project collaborations, UI/UX work, and freelance opportunities. If any of
          that sounds interesting, reach out — I usually reply quickly.
        </p>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {PROFILE.location}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button asChild variant="ink" className="gap-2">
            <a href={`mailto:${CONTACT.email}`}>
              <Mail className="h-4 w-4" />
              Email me
            </a>
          </Button>
          <CopyEmailButton email={CONTACT.email} />
          <Button asChild variant="outline" size="icon" className="rounded-full">
            <a href={CONTACT.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <Github className="h-[1.1rem] w-[1.1rem]" />
            </a>
          </Button>
          {CONTACT.linkedin && (
            <Button asChild variant="outline" size="icon" className="rounded-full">
              <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                <Linkedin className="h-[1.1rem] w-[1.1rem]" />
              </a>
            </Button>
          )}
          {CONTACT.figma && (
            <Button asChild variant="outline" size="icon" className="rounded-full">
              <a href={CONTACT.figma} target="_blank" rel="noreferrer" aria-label="Design portfolio">
                <Figma className="h-[1.1rem] w-[1.1rem]" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </Section>
  )
}
