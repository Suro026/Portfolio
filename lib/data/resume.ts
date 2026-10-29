export const PROFILE = {
  name: 'Surajit Sadhukhan',
  shortName: 'Suro',
  role: 'Aspiring AI Engineer',
  tagline: 'AI Engineering · IoT Systems · UI/UX Design',
  bio: "I'm a CSE (AI & ML) student, IoT systems builder, and UI/UX designer from Kolkata. I build practical AI-powered solutions, experiment with hardware, and design digital products that put people first.",
  location: 'Kolkata, West Bengal, India',
}

export interface ExperienceEntry {
  id: string
  title: string
  org: string
  period?: string
  points: string[]
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'groo-agri',
    title: 'UI/UX & Graphic Design Intern',
    org: 'GROO Agri',
    points: [
      'Designed farmer-facing product communication, marketing banners, and creatives for an agri-tech product.',
      'Contributed to frontend implementation work alongside the design deliverables.',
    ],
  },
  {
    id: 'novax',
    title: 'Team Leader & Hackathon SPOC',
    org: 'Team NovaX',
    points: [
      'Coordinates a cross-functional team from idea to working prototype across hackathons, owning architecture calls.',
      'Leads N.E.T.R.A., an IoT-focused traffic management project combining hardware and software.',
    ],
  },
  {
    id: 'gdg',
    title: 'UI/UX Lead',
    org: 'GDG On Campus — Bengal Institute of Technology',
    points: [
      'Leads design contributions and interface design for campus technology community initiatives and student projects.',
    ],
  },
  {
    id: 'predaiction',
    title: 'Design & Technical Leadership',
    org: 'PredAIction Club',
    points: ['Supports AI/ML community activities, workshops, and technical and design collaboration.'],
  },
  {
    id: 'iic',
    title: 'Designer',
    org: "Institution's Innovation Council (IIC)",
    points: ['Designs event creatives and visual communication for IIC initiatives.'],
  },
  {
    id: 'tech-fest',
    title: 'Design Team Co-Lead',
    org: 'College Technical Fest',
    points: ['Coordinates design deliverables and maintains a consistent visual identity across event materials.'],
  },
]

export interface EducationEntry {
  id: string
  degree: string
  institution: string
  status: string
  note?: string
}

export const EDUCATION: EducationEntry[] = [
  {
    id: 'btech-cse-aiml',
    degree: 'B.Tech, Computer Science & Engineering (AI & ML)',
    institution: 'Bengal Institute of Technology, Kolkata',
    status: 'Third-year undergraduate student',
    note: 'Focus on applied AI, computer vision, and human-computer interaction.',
  },
]
