import type { Quest } from '@/types/game'

export const QUESTS: Quest[] = [
  {
    id: 'say-hello',
    title: 'Say Hello',
    description: 'Talk to the NPC in Home.',
    steps: [{ id: 'talk-npc', label: 'Speak with the guide' }],
  },
  {
    id: 'read-archive',
    title: 'Read the Archive',
    description: 'Open the bookshelf to view the resume.',
    steps: [{ id: 'open-bookshelf', label: 'Open the bookshelf' }],
  },
  {
    id: 'ai-lab-tour',
    title: 'Tour the AI Laboratory',
    description: 'Inspect every machine in the AI Laboratory.',
    steps: [
      { id: 'view-netra', label: 'Inspect NETRA' },
      { id: 'view-sahaayak', label: 'Inspect Sahaayak' },
      { id: 'view-kllinic', label: 'Inspect Kllinic' },
      { id: 'view-manas-ai', label: 'Inspect Manas AI' },
    ],
  },
  {
    id: 'design-studio-visit',
    title: 'Visit the Design Studio',
    description: 'View at least one framed design.',
    steps: [{ id: 'view-design', label: 'View a design frame' }],
  },
  {
    id: 'claim-trophies',
    title: 'Claim Your Trophies',
    description: 'Step up to the podium in the Hackathon Arena.',
    steps: [{ id: 'view-podium', label: 'Inspect the podium' }],
  },
  {
    id: 'access-mainframe',
    title: 'Access the Mainframe',
    description: 'Run a command in the Skill Terminal.',
    steps: [{ id: 'run-command', label: 'Run a terminal command' }],
  },
  {
    id: 'signal-home',
    title: 'Signal Home',
    description: 'Step through the Contact Portal.',
    steps: [{ id: 'enter-portal', label: 'Enter the portal' }],
  },
]
