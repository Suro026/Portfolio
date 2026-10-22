export interface ProjectData {
  id: string
  title: string
  tagline: string
  overview: string
  techStack: string[]
  github: string
  image: string
}

// Placeholder copy — swap in real project details/screenshots/links whenever ready.
export const PROJECTS: ProjectData[] = [
  {
    id: 'netra',
    title: 'NETRA',
    tagline: 'AI-powered vision & anomaly monitoring system',
    overview:
      'A real-time computer-vision pipeline that watches video feeds and flags anomalies the moment they happen — a lightweight edge-inference pipeline runs object detection and behavioural anomaly scoring per-frame, streaming only flagged events to a dashboard with instant alerts.',
    techStack: ['Python', 'OpenCV', 'PyTorch', 'FastAPI', 'WebSockets', 'Raspberry Pi'],
    github: 'https://github.com/suro026/netra',
    image: '/ML.jpg',
  },
  {
    id: 'sahaayak',
    title: 'Sahaayak',
    tagline: 'Conversational AI assistant for everyday tasks',
    overview:
      'A multilingual conversational assistant that helps users navigate forms, reminders, and everyday digital tasks through natural language — a retrieval-augmented LLM pipeline with intent-routing breaks tasks into guided steps with voice and text support end-to-end.',
    techStack: ['Python', 'FastAPI', 'LangChain', 'Next.js', 'PostgreSQL'],
    github: 'https://github.com/suro026/sahaayak',
    image: '/FastApi.jpeg',
  },
  {
    id: 'kllinic',
    title: 'Kllinic',
    tagline: 'Smart clinic management & triage platform',
    overview:
      'Streamlines the patient-to-doctor pipeline for small clinics — a rules-assisted triage score ranks incoming patients by urgency, a live queue board keeps staff synced, and structured records replace the paper trail.',
    techStack: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'IoT sensors'],
    github: 'https://github.com/suro026/kllinic',
    image: '/Nextjs.png',
  },
  {
    id: 'manas-ai',
    title: 'Manas AI',
    tagline: 'AI companion for mental-wellness check-ins',
    overview:
      'A private, judgement-free journalling companion — on-device-first sentiment analysis tracks mood trends across journal entries, offering weekly reflections and gentle nudges without ever sending raw entries to third parties.',
    techStack: ['Python', 'PyTorch', 'FastAPI', 'Next.js', 'SQLite'],
    github: 'https://github.com/suro026/manas-ai',
    image: '/Python.jpg',
  },
]
