import type { ProjectData } from '@/types/game'

// Placeholder copy — swap in real project details/screenshots/links whenever ready.
export const PROJECTS: ProjectData[] = [
  {
    id: 'netra',
    title: 'NETRA',
    tagline: 'AI-powered vision & anomaly monitoring system',
    overview:
      'NETRA ("eye" in Sanskrit) is a real-time computer-vision pipeline that watches video feeds and flags anomalies the moment they happen, built for environments where a human can\'t watch every camera at once.',
    problem:
      'Manual CCTV monitoring doesn\'t scale — operators miss critical events in the noise of hundreds of idle frames, and reviewing footage after the fact is too late.',
    solution:
      'A lightweight edge-inference pipeline runs object detection and behavioural anomaly scoring per-frame, streaming only flagged events to a dashboard with instant alerts, so operators only look at what matters.',
    techStack: ['Python', 'OpenCV', 'PyTorch', 'FastAPI', 'WebSockets', 'Raspberry Pi'],
    github: 'https://github.com/suro026/netra',
    images: ['/ML.jpg', '/Python.jpg', '/Raspberry_Pi.png'],
  },
  {
    id: 'sahaayak',
    title: 'Sahaayak',
    tagline: 'Conversational AI assistant for everyday tasks',
    overview:
      'Sahaayak ("helper") is a multilingual conversational assistant that helps users navigate forms, reminders, and everyday digital tasks through natural language.',
    problem:
      'Digital literacy gaps and language barriers keep a large share of users locked out of basic online services — most assistants only work well in English.',
    solution:
      'A retrieval-augmented LLM pipeline paired with intent-routing handles multilingual queries, breaking tasks into guided steps with voice and text support end-to-end.',
    techStack: ['Python', 'FastAPI', 'LangChain', 'Next.js', 'PostgreSQL'],
    github: 'https://github.com/suro026/sahaayak',
    images: ['/FastApi.jpeg', '/Nextjs.png', '/ML.jpg'],
  },
  {
    id: 'kllinic',
    title: 'Kllinic',
    tagline: 'Smart clinic management & triage platform',
    overview:
      'Kllinic streamlines the patient-to-doctor pipeline for small clinics — queueing, triage prioritisation, and digital records in one lightweight system.',
    problem:
      'Small clinics run on paper queues and phone calls, causing long waits and no visibility into patient history or urgency.',
    solution:
      'A rules-assisted triage score ranks incoming patients by urgency, a live queue board keeps staff synced, and structured records replace the paper trail.',
    techStack: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'IoT sensors'],
    github: 'https://github.com/suro026/kllinic',
    images: ['/Nextjs.png', '/FastApi.jpeg', '/Arduino.png'],
  },
  {
    id: 'manas-ai',
    title: 'Manas AI',
    tagline: 'AI companion for mental-wellness check-ins',
    overview:
      'Manas ("mind") is a private, judgement-free journalling companion that uses sentiment trends over time to gently surface patterns worth noticing.',
    problem:
      'Mental-wellness tools are either clinical and cold or shallow mood trackers — few give users a private space with genuinely helpful reflection.',
    solution:
      'On-device-first sentiment analysis tracks mood trends across journal entries, offering weekly reflections and gentle nudges without ever sending raw entries to third parties.',
    techStack: ['Python', 'PyTorch', 'FastAPI', 'Next.js', 'SQLite'],
    github: 'https://github.com/suro026/manas-ai',
    images: ['/ML.jpg', '/Python.jpg', '/Nextjs.png'],
  },
]
