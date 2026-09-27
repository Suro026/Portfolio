import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Direction, GamePhase, ZoneId } from '@/types/game'
import { ACHIEVEMENTS } from '@/lib/data/achievements'
import { QUESTS } from '@/lib/data/quests'
import { CHIP_REF_IDS, HOME_SPAWN, SAVE_KEY } from '@/lib/constants'
import { audioEngine } from '@/lib/audio'

export interface ActiveModal {
  type: 'project' | 'trophy' | 'resume' | 'design'
  refId?: string
}

export interface ActiveDialogue {
  key: string
  index: number
}

interface QuestProgress {
  completedSteps: string[]
  completed: boolean
}

interface GameState {
  // --- persisted progress ---
  phase: GamePhase
  currentZone: ZoneId
  playerX: number
  playerY: number
  visitedZones: ZoneId[]
  collectedChips: string[]
  unlockedAchievements: string[]
  questProgress: Record<string, QuestProgress>
  konamiUnlocked: boolean
  secretLabFound: boolean
  duckFound: boolean
  musicOn: boolean
  sfxOn: boolean

  // --- transient/session state (not persisted) ---
  direction: Direction
  moving: boolean
  activeDialogue: ActiveDialogue | null
  activeModal: ActiveModal | null
  achievementQueue: string[]
  showQuestLog: boolean
  showSettings: boolean
  terminalOpen: boolean

  // --- actions ---
  setPhase: (phase: GamePhase) => void
  setPlayerPosition: (x: number, y: number) => void
  setDirection: (d: Direction) => void
  setMoving: (m: boolean) => void
  teleport: (zone: ZoneId, x: number, y: number) => void
  visitZone: (zone: ZoneId) => void
  openDialogue: (key: string) => void
  advanceDialogue: (length: number) => void
  closeDialogue: () => void
  openModal: (modal: ActiveModal) => void
  closeModal: () => void
  toggleQuestLog: () => void
  toggleSettings: () => void
  setTerminalOpen: (open: boolean) => void
  completeQuestStep: (questId: string, stepId: string) => void
  unlockAchievement: (id: string) => void
  dismissAchievement: () => void
  collectChip: (chipId: string) => void
  unlockKonami: () => void
  findSecretLab: () => void
  findDuck: () => void
  setMusicOn: (on: boolean) => void
  setSfxOn: (on: boolean) => void
  resetSave: () => void
}

const initialQuestProgress: Record<string, QuestProgress> = Object.fromEntries(
  QUESTS.map((q) => [q.id, { completedSteps: [], completed: false }]),
)

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      phase: 'boot',
      currentZone: 'home',
      playerX: HOME_SPAWN.x,
      playerY: HOME_SPAWN.y,
      visitedZones: [],
      collectedChips: [],
      unlockedAchievements: [],
      questProgress: initialQuestProgress,
      konamiUnlocked: false,
      secretLabFound: false,
      duckFound: false,
      musicOn: true,
      sfxOn: true,

      direction: 'down',
      moving: false,
      activeDialogue: null,
      activeModal: null,
      achievementQueue: [],
      showQuestLog: false,
      showSettings: false,
      terminalOpen: false,

      setPhase: (phase) => set({ phase }),
      setPlayerPosition: (x, y) => set({ playerX: x, playerY: y }),
      setDirection: (direction) => set({ direction }),
      setMoving: (moving) => set({ moving }),
      teleport: (zone, x, y) => {
        audioEngine.play('portal')
        set({ currentZone: zone, playerX: x, playerY: y })
        get().visitZone(zone)
      },
      visitZone: (zone) => {
        const { visitedZones, unlockAchievement } = get()
        if (!visitedZones.includes(zone)) {
          set({ visitedZones: [...visitedZones, zone] })
          if (visitedZones.length === 0) unlockAchievement('first-steps')
          if (zone === 'secret-lab') get().findSecretLab()
        }
      },
      openDialogue: (key) => set({ activeDialogue: { key, index: 0 } }),
      advanceDialogue: (length) => {
        const current = get().activeDialogue
        if (!current) return
        if (current.index + 1 >= length) {
          set({ activeDialogue: null })
        } else {
          set({ activeDialogue: { ...current, index: current.index + 1 } })
        }
      },
      closeDialogue: () => set({ activeDialogue: null }),
      openModal: (modal) => set({ activeModal: modal }),
      closeModal: () => set({ activeModal: null }),
      toggleQuestLog: () => set((s) => ({ showQuestLog: !s.showQuestLog })),
      toggleSettings: () => set((s) => ({ showSettings: !s.showSettings })),
      setTerminalOpen: (terminalOpen) => set({ terminalOpen }),
      completeQuestStep: (questId, stepId) => {
        const quest = QUESTS.find((q) => q.id === questId)
        if (!quest) return
        const progress = get().questProgress[questId] ?? { completedSteps: [], completed: false }
        if (progress.completedSteps.includes(stepId)) return
        const completedSteps = [...progress.completedSteps, stepId]
        const completed = quest.steps.every((s) => completedSteps.includes(s.id))
        set({
          questProgress: { ...get().questProgress, [questId]: { completedSteps, completed } },
        })
      },
      unlockAchievement: (id) => {
        const { unlockedAchievements, achievementQueue } = get()
        if (unlockedAchievements.includes(id)) return
        if (!ACHIEVEMENTS.some((a) => a.id === id)) return
        audioEngine.play('achievement')
        set({
          unlockedAchievements: [...unlockedAchievements, id],
          achievementQueue: [...achievementQueue, id],
        })
      },
      dismissAchievement: () => set((s) => ({ achievementQueue: s.achievementQueue.slice(1) })),
      collectChip: (chipId) => {
        const { collectedChips, unlockAchievement } = get()
        if (collectedChips.includes(chipId)) return
        audioEngine.play('collect')
        const next = [...collectedChips, chipId]
        set({ collectedChips: next })
        if (next.length >= CHIP_REF_IDS.length) unlockAchievement('chip-collector')
      },
      unlockKonami: () => {
        if (get().konamiUnlocked) return
        set({ konamiUnlocked: true })
        get().unlockAchievement('konami')
      },
      findSecretLab: () => {
        if (get().secretLabFound) return
        set({ secretLabFound: true })
        get().unlockAchievement('secret-lab')
      },
      findDuck: () => {
        if (get().duckFound) return
        set({ duckFound: true })
        get().unlockAchievement('quacked-it')
      },
      setMusicOn: (musicOn) => {
        set({ musicOn })
        audioEngine.setMusicOn(musicOn)
      },
      setSfxOn: (sfxOn) => {
        set({ sfxOn })
        audioEngine.setSfxOn(sfxOn)
      },
      resetSave: () => {
        if (typeof window !== 'undefined') window.localStorage.removeItem(SAVE_KEY)
        set({
          phase: 'spawn-gate',
          currentZone: 'home',
          playerX: HOME_SPAWN.x,
          playerY: HOME_SPAWN.y,
          visitedZones: [],
          collectedChips: [],
          unlockedAchievements: [],
          questProgress: initialQuestProgress,
          konamiUnlocked: false,
          secretLabFound: false,
          duckFound: false,
          activeDialogue: null,
          activeModal: null,
          achievementQueue: [],
        })
      },
    }),
    {
      name: SAVE_KEY,
      partialize: (state) => ({
        phase: state.phase === 'boot' ? 'boot' : 'playing',
        currentZone: state.currentZone,
        playerX: state.playerX,
        playerY: state.playerY,
        visitedZones: state.visitedZones,
        collectedChips: state.collectedChips,
        unlockedAchievements: state.unlockedAchievements,
        questProgress: state.questProgress,
        konamiUnlocked: state.konamiUnlocked,
        secretLabFound: state.secretLabFound,
        duckFound: state.duckFound,
        musicOn: state.musicOn,
        sfxOn: state.sfxOn,
      }),
    },
  ),
)
