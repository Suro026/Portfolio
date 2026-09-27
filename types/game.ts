export type Vector2 = { x: number; y: number }

export type Direction = 'up' | 'down' | 'left' | 'right'

export type ZoneId =
  | 'home'
  | 'ai-lab'
  | 'design-studio'
  | 'hackathon-arena'
  | 'skill-terminal'
  | 'contact-portal'
  | 'secret-lab'

export type GamePhase = 'boot' | 'spawn-gate' | 'playing' | 'ending'

export type InteractableKind =
  | 'npc'
  | 'project'
  | 'trophy'
  | 'terminal'
  | 'portal'
  | 'collectible'
  | 'door'
  | 'bookshelf'
  | 'design-frame'
  | 'duck'
  | 'secret-door'

// --- Tiled JSON (subset of the real Tiled map format) ---

export interface TiledProperty {
  name: string
  type: string
  value: string | number | boolean
}

export interface TiledObject {
  id: number
  name: string
  type: string
  x: number
  y: number
  width: number
  height: number
  properties?: TiledProperty[]
}

export interface TiledLayer {
  name: string
  type: 'tilelayer' | 'objectgroup'
  width?: number
  height?: number
  data?: number[]
  objects?: TiledObject[]
}

export interface TiledMap {
  compressionlevel: number
  width: number
  height: number
  tilewidth: number
  tileheight: number
  orientation: 'orthogonal'
  renderorder: string
  type: 'map'
  version: string
  layers: TiledLayer[]
  properties?: TiledProperty[]
}

// --- Game domain types ---

export interface Interactable {
  id: string
  kind: InteractableKind
  name: string
  x: number
  y: number
  width: number
  height: number
  refId?: string
}

export interface DoorLink {
  id: string
  x: number
  y: number
  width: number
  height: number
  targetZone: ZoneId
  spawnX: number
  spawnY: number
  requiresFlag?: string
  label?: string
}

export interface ZoneMapData {
  id: ZoneId
  name: string
  accentColor: string
  ambient: 'lab' | 'studio' | 'arena' | 'terminal' | 'portal' | 'home' | 'secret'
  map: TiledMap
  interactables: Interactable[]
  doors: DoorLink[]
  spawn: Vector2
}

export interface ProjectData {
  id: string
  title: string
  tagline: string
  overview: string
  problem: string
  solution: string
  techStack: string[]
  github: string
  images: string[]
}

export interface HackathonEntry {
  id: string
  title: string
  place: string
  description: string
  year: string
}

export interface DialogueLine {
  speaker: string
  text: string
}

export interface QuestStep {
  id: string
  label: string
}

export interface Quest {
  id: string
  title: string
  description: string
  steps: QuestStep[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  secret?: boolean
}

export interface TerminalCommandResult {
  lines: string[]
}
