import type { ZoneId } from '@/types/game'

export const TILE_SIZE = 64

export const COLORS = {
  violet: '#7C3AED',
  cyan: '#06B6D4',
  amber: '#F59E0B',
  charcoal: '#0A0A0F',
} as const

export const PLAYER_SPEED = 240 // px/sec
export const INTERACT_RADIUS = 84
export const JOYSTICK_DEADZONE = 0.15

export const ZONE_LABELS: Record<ZoneId, string> = {
  home: 'Home',
  'ai-lab': 'AI Laboratory',
  'design-studio': 'Design Studio',
  'hackathon-arena': 'Hackathon Arena',
  'skill-terminal': 'Skill Terminal',
  'contact-portal': 'Contact Portal',
  'secret-lab': 'Sub-Level // Secret Lab',
}

export const ZONE_ACCENTS: Record<ZoneId, string> = {
  home: COLORS.violet,
  'ai-lab': COLORS.cyan,
  'design-studio': COLORS.amber,
  'hackathon-arena': COLORS.amber,
  'skill-terminal': COLORS.cyan,
  'contact-portal': COLORS.violet,
  'secret-lab': '#22c55e',
}

export const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export const SAVE_KEY = 'gamefolio-save-v1'

export const CHIP_REF_IDS = ['chip-home', 'chip-ai-lab', 'chip-design-studio', 'chip-hackathon-arena', 'chip-secret-lab'] as const

export const HOME_SPAWN = { x: 608, y: 608 }
