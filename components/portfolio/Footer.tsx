import { CONTACT } from '@/lib/data/contact'

export function Footer() {
  return (
    <footer className="mt-10 border-t border-border/60 pt-8 pb-4 text-sm text-muted-foreground">
      <p>
        Built by Surajit.{' '}
        <a href={CONTACT.github} target="_blank" rel="noreferrer" className="link-underline text-foreground">
          GitHub
        </a>
        .
      </p>
    </footer>
  )
}
