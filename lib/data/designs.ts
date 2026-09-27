export interface DesignEntry {
  id: string
  title: string
  description: string
  image: string
  figma?: string
}

// Placeholder copy — swap in real screenshots/Figma links whenever ready.
export const DESIGNS: DesignEntry[] = [
  {
    id: 'design-1',
    title: 'Kllinic — Queue Dashboard',
    description: 'Live patient queue with urgency-ranked triage cards and a calm, glanceable status board.',
    image: '/Figma.jpg',
  },
  {
    id: 'design-2',
    title: 'Sahaayak — Onboarding Flow',
    description: 'Multilingual, voice-first onboarding designed for first-time digital users.',
    image: '/placeholder.jpg',
  },
  {
    id: 'design-3',
    title: 'Manas AI — Journal Companion',
    description: 'A private, judgement-free journalling surface with gentle weekly reflection prompts.',
    image: '/placeholder.svg',
  },
  {
    id: 'design-4',
    title: 'NETRA — Monitoring Console',
    description: 'Operator dashboard that surfaces only flagged anomalies, not endless idle camera feeds.',
    image: '/ML.jpg',
  },
]
