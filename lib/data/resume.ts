export const PROFILE = {
  name: 'Surajit',
  shortName: 'Suro',
  role: 'Aspiring AI Engineer',
  tagline: 'AI Engineer • IoT Systems Builder • UI/UX Designer',
  bio: 'I build at the intersection of AI, embedded systems, and design — shipping full-stack products from a trained model to a polished interface. I lead teams under hackathon deadlines and care just as much about how something feels to use as how well it works.',
  location: 'India',
}

export interface ExperienceEntry {
  id: string
  title: string
  org: string
  period: string
  points: string[]
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'predaiction',
    title: 'Lead',
    org: 'PredAIction',
    period: '2025',
    points: ['Drove ML pipeline architecture and technical direction from kickoff to final demo.'],
  },
  {
    id: 'novax',
    title: 'Team Leader',
    org: 'NovaX',
    period: '2025',
    points: ['Directed a cross-functional team from idea to working prototype, owning architecture calls.'],
  },
  {
    id: 'gdg',
    title: 'UI/UX Lead',
    org: 'GDG On Campus',
    period: '2024 — Present',
    points: ['Runs the design track for the campus developer community: workshops, critiques, handoff standards.'],
  },
]

export interface EducationEntry {
  id: string
  degree: string
  institution: string
  period: string
  note?: string
}

// Placeholder — swap in your real institution/years.
export const EDUCATION: EducationEntry[] = [
  {
    id: 'degree-1',
    degree: 'B.Tech, Computer Science & Engineering',
    institution: 'Your University',
    period: '2022 — 2026',
    note: 'Focus on AI/ML, systems, and human-computer interaction.',
  },
]
