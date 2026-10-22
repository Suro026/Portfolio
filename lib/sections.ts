export interface SectionDef {
  id: string
  label: string
}

export const SECTIONS: SectionDef[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
]

export const SECTION_IDS = SECTIONS.map((s) => s.id)
