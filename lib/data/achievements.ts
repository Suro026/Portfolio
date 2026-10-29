export interface AchievementEntry {
  id: string
  title: string
  detail: string
  type: 'award' | 'selection' | 'participation' | 'certificate' | 'contribution'
  year?: string
}

export const ACHIEVEMENTS: AchievementEntry[] = [
  {
    id: 'sih-2025',
    title: 'Smart India Hackathon 2025 — Internal Round',
    detail: 'First Runner-Up recognition for a hardware-based project built with Team NovaX.',
    type: 'award',
    year: '2025',
  },
  {
    id: 'innofusion-3',
    title: 'InnoFusion 3.0 — UEM Kolkata',
    detail: 'Selected to participate in the innovation event.',
    type: 'selection',
    year: 'July 2026',
  },
  {
    id: 'code-canvas',
    title: 'Code Canvas Portfolio Competition',
    detail: 'Certificate of Participation — organized with GDG On Campus, IIIT Kalyani.',
    type: 'certificate',
  },
  {
    id: 'hackathon-circuit',
    title: 'Hackathons & Innovation Events',
    detail: 'Team-based participation across events including Educ-A-Thon and Cosmohack, alongside other campus innovation competitions.',
    type: 'participation',
  },
  {
    id: 'aiml-workshops',
    title: 'AI/ML Workshops & Technical Community',
    detail: 'Regular contributor to campus AI/ML workshops and technical community initiatives.',
    type: 'contribution',
  },
]
