import { PROFILE, EXPERIENCE, EDUCATION } from './data/resume'
import { SKILL_GROUPS } from './data/skills'
import { CONTACT } from './data/contact'

/** Builds a plain-text CV straight from the same data the page shows, so it
 * can never disagree with it. */
export function buildCvText(): string {
  const out: string[] = []
  const head = (t: string) => out.push('', t.toUpperCase(), '-'.repeat(t.length))

  out.push(PROFILE.name, PROFILE.role)
  const contactLine = [CONTACT.email, PROFILE.location, CONTACT.github].filter(Boolean).join('  ·  ')
  if (contactLine) out.push(contactLine)
  if (PROFILE.bio) out.push('', PROFILE.bio)

  if (EXPERIENCE.length) {
    head('Experience')
    for (const e of EXPERIENCE) {
      out.push('', e.title + ' — ' + e.org + (e.period ? ' (' + e.period + ')' : ''))
      for (const p of e.points) out.push('  • ' + p)
    }
  }

  if (EDUCATION.length) {
    head('Education')
    for (const ed of EDUCATION) {
      out.push('', ed.degree + ' — ' + ed.institution, ed.status)
      if (ed.note) out.push('  • ' + ed.note)
    }
  }

  if (SKILL_GROUPS.length) {
    head('Skills')
    for (const g of SKILL_GROUPS) {
      const items = [...g.items, ...(g.learning ?? [])]
      out.push(g.category + ': ' + items.join(', '))
    }
  }

  return out.join('\n') + '\n'
}

/** Triggers an immediate browser download of the generated CV text file. */
export function downloadCv(): void {
  const text = buildCvText()
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = PROFILE.name.replace(/\s+/g, '-') + '-CV.txt'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
