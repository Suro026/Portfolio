import type { Achievement } from '@/types/game'

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-steps', title: 'First Steps', description: 'Enter the world of GAMEFOLIO.', icon: 'footprints' },
  { id: 'greeter', title: 'Nice to Meet You', description: 'Talked to the Home NPC.', icon: 'message-circle' },
  { id: 'archivist', title: 'Archivist', description: 'Read the resume from the bookshelf.', icon: 'book-open' },
  { id: 'lab-technician', title: 'Lab Technician', description: 'Inspected every AI Laboratory project.', icon: 'flask-conical' },
  { id: 'art-critic', title: 'Art Critic', description: 'Viewed a design in the Design Studio.', icon: 'frame' },
  { id: 'champion', title: 'Champion', description: 'Visited the Hackathon Arena podium.', icon: 'trophy' },
  { id: 'hacker', title: 'Hacker', description: 'Ran a command in the Skill Terminal.', icon: 'terminal' },
  { id: 'chip-collector', title: 'Chip Collector', description: 'Collected every hidden chip.', icon: 'cpu' },
  { id: 'quacked-it', title: 'Quacked It', description: 'Found the rubber duck.', icon: 'egg' },
  { id: 'konami', title: 'Old-School', description: 'Entered the legendary code.', icon: 'sparkles' },
  { id: 'secret-lab', title: 'Off the Map', description: 'Discovered the secret lab.', icon: 'door-open' },
  { id: 'signal-sent', title: 'Signal Sent', description: 'Reached the Contact Portal.', icon: 'radio-tower' },
]
