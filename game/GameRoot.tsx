'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'
import { useGameStore } from '@/store/useGameStore'
import { useKeyboardControls } from '@/hooks/useKeyboardControls'
import { useKonamiCode } from '@/hooks/useKonamiCode'
import { useGameLoop } from '@/game/engine/useGameLoop'
import { loadZone } from '@/lib/zones'
import { audioEngine } from '@/lib/audio'
import { CHIP_REF_IDS, HOME_SPAWN } from '@/lib/constants'
import { DIALOGUE } from '@/lib/data/dialogue'
import type { DoorLink, Interactable, ZoneMapData } from '@/types/game'

import { ScreenEffects } from '@/game/fx/ScreenEffects'
import { HUD } from '@/game/ui/HUD'
import { DialogueBox } from '@/game/ui/DialogueBox'
import { InteractPrompt } from '@/game/ui/InteractPrompt'
import { AchievementToast } from '@/game/ui/AchievementToast'
import { VirtualJoystick } from '@/game/ui/VirtualJoystick'
import { MobileInteractButton } from '@/game/ui/MobileInteractButton'
import { SettingsMenu } from '@/game/ui/SettingsMenu'
import { QuestLog } from '@/game/ui/QuestLog'
import { SkillTerminal } from '@/game/ui/SkillTerminal'
import { ProjectModal } from '@/game/modals/ProjectModal'
import { TrophyModal } from '@/game/modals/TrophyModal'
import { ResumeModal } from '@/game/modals/ResumeModal'
import { DesignFrameModal } from '@/game/modals/DesignFrameModal'
import { SpawnGateIntro } from '@/game/scenes/SpawnGateIntro'
import { EndingCinematic } from '@/game/scenes/EndingCinematic'

const Scene3D = dynamic(() => import('@/game/world3d/Scene3D').then((m) => m.Scene3D), { ssr: false })

const EMPTY_INTERACTABLES: Interactable[] = []
const EMPTY_DOORS: DoorLink[] = []

export function GameRoot() {
  const phase = useGameStore((s) => s.phase)
  const currentZone = useGameStore((s) => s.currentZone)
  const activeDialogue = useGameStore((s) => s.activeDialogue)
  const activeModal = useGameStore((s) => s.activeModal)
  const achievementQueue = useGameStore((s) => s.achievementQueue)
  const showQuestLog = useGameStore((s) => s.showQuestLog)
  const showSettings = useGameStore((s) => s.showSettings)
  const terminalOpen = useGameStore((s) => s.terminalOpen)
  const questProgress = useGameStore((s) => s.questProgress)
  const collectedChips = useGameStore((s) => s.collectedChips)
  const unlockedAchievements = useGameStore((s) => s.unlockedAchievements)
  const konamiUnlocked = useGameStore((s) => s.konamiUnlocked)
  const musicOn = useGameStore((s) => s.musicOn)
  const sfxOn = useGameStore((s) => s.sfxOn)

  const [hydrated, setHydrated] = useState(false)
  const [zoneData, setZoneData] = useState<ZoneMapData | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const [activeInteractableId, setActiveInteractableId] = useState<string | null>(null)

  const controls = useKeyboardControls()
  const joystickRef = useRef({ x: 0, y: 0 })

  // --- hydration (localStorage save) ---
  useEffect(() => {
    if (useGameStore.persist.hasHydrated()) {
      setHydrated(true)
      return
    }
    return useGameStore.persist.onFinishHydration(() => setHydrated(true))
  }, [])

  useEffect(() => {
    if (!hydrated) return
    if (useGameStore.getState().phase === 'boot') useGameStore.getState().setPhase('spawn-gate')
  }, [hydrated])

  // --- audio bootstrap (needs a user gesture) ---
  useEffect(() => {
    const start = () => {
      audioEngine.resume()
      if (useGameStore.getState().musicOn) audioEngine.startAmbient()
      window.removeEventListener('pointerdown', start)
      window.removeEventListener('keydown', start)
    }
    window.addEventListener('pointerdown', start)
    window.addEventListener('keydown', start)
    return () => {
      window.removeEventListener('pointerdown', start)
      window.removeEventListener('keydown', start)
    }
  }, [])

  useKonamiCode(useCallback(() => useGameStore.getState().unlockKonami(), []))

  // --- zone loading ---
  useEffect(() => {
    if (phase !== 'playing') return
    let cancelled = false
    setTransitioning(true)
    setActiveInteractableId(null)
    loadZone(currentZone)
      .then((data) => {
        if (cancelled) return
        setZoneData(data)
        setTimeout(() => {
          if (!cancelled) setTransitioning(false)
        }, 300)
      })
      .catch(() => {
        if (!cancelled) setTransitioning(false)
      })
    return () => {
      cancelled = true
    }
  }, [currentZone, phase])

  const paused =
    phase !== 'playing' || Boolean(activeDialogue) || Boolean(activeModal) || terminalOpen || showSettings || !zoneData || transitioning

  const handleNearestChange = useCallback((id: string | null) => setActiveInteractableId(id), [])

  const handleDoorTrigger = useCallback((door: DoorLink) => {
    useGameStore.getState().teleport(door.targetZone, door.spawnX, door.spawnY)
  }, [])

  const handlePortalTrigger = useCallback(() => {
    const state = useGameStore.getState()
    state.completeQuestStep('signal-home', 'enter-portal')
    state.unlockAchievement('signal-sent')
    state.setPhase('ending')
  }, [])

  const handleChipCollect = useCallback((it: Interactable) => {
    if (it.refId) useGameStore.getState().collectChip(it.refId)
  }, [])

  const handleAdvanceDialogue = useCallback(() => {
    const state = useGameStore.getState()
    if (!state.activeDialogue) return
    state.advanceDialogue((DIALOGUE[state.activeDialogue.key] ?? []).length)
  }, [])

  const handleDismissAchievement = useCallback(() => useGameStore.getState().dismissAchievement(), [])

  useGameLoop({
    interactables: zoneData?.interactables ?? EMPTY_INTERACTABLES,
    doors: zoneData?.doors ?? EMPTY_DOORS,
    collectedChipRefIds: collectedChips,
    konamiUnlocked,
    paused,
    onNearestChange: handleNearestChange,
    onDoorTrigger: handleDoorTrigger,
    onPortalTrigger: handlePortalTrigger,
    onChipCollect: handleChipCollect,
  })

  const handleInteractPress = () => {
    const state = useGameStore.getState()
    if (state.phase !== 'playing') return
    if (state.activeDialogue || state.activeModal || state.terminalOpen || state.showSettings) return
    if (!activeInteractableId || !zoneData) return
    const it = zoneData.interactables.find((i) => i.id === activeInteractableId)
    if (!it) return
    audioEngine.play('interact')

    switch (it.kind) {
      case 'npc':
      case 'duck': {
        if (it.refId === 'rubber-duck') state.findDuck()
        if (it.refId === 'home-guide') {
          state.completeQuestStep('say-hello', 'talk-npc')
          state.unlockAchievement('greeter')
        }
        if (it.refId) state.openDialogue(it.refId)
        break
      }
      case 'bookshelf':
        state.openModal({ type: 'resume' })
        state.completeQuestStep('read-archive', 'open-bookshelf')
        state.unlockAchievement('archivist')
        break
      case 'project':
        state.openModal({ type: 'project', refId: it.refId })
        if (it.refId) {
          state.completeQuestStep('ai-lab-tour', `view-${it.refId}`)
          if (useGameStore.getState().questProgress['ai-lab-tour']?.completed) {
            state.unlockAchievement('lab-technician')
          }
        }
        break
      case 'design-frame':
        state.openModal({ type: 'design', refId: it.refId })
        state.completeQuestStep('design-studio-visit', 'view-design')
        state.unlockAchievement('art-critic')
        break
      case 'trophy':
        state.openModal({ type: 'trophy' })
        state.completeQuestStep('claim-trophies', 'view-podium')
        state.unlockAchievement('champion')
        break
      case 'terminal':
        state.setTerminalOpen(true)
        break
      default:
        break
    }
  }

  controls.onInteractPress.current = handleInteractPress

  const handleEnterWorld = () => {
    const state = useGameStore.getState()
    state.teleport('home', HOME_SPAWN.x, HOME_SPAWN.y)
    state.setPhase('playing')
  }

  const handleReplay = () => {
    const state = useGameStore.getState()
    state.teleport('home', HOME_SPAWN.x, HOME_SPAWN.y)
    state.setPhase('playing')
  }

  const activeInteractable = zoneData?.interactables.find((i) => i.id === activeInteractableId) ?? null

  if (!hydrated || phase === 'boot') {
    return <div className="fixed inset-0 bg-[#05050a]" />
  }

  if (phase === 'spawn-gate') {
    return <SpawnGateIntro onEnter={handleEnterWorld} />
  }

  if (phase === 'ending') {
    return <EndingCinematic onReplay={handleReplay} />
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#05050a]">
      {zoneData && (
        <Scene3D
          zone={zoneData}
          controls={controls.state}
          joystick={joystickRef}
          paused={paused}
          activeInteractableId={activeInteractableId}
          collectedChipIds={collectedChips}
          konamiUnlocked={konamiUnlocked}
        />
      )}

      <ScreenEffects accentColor={zoneData?.accentColor ?? '#7C3AED'} />

      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-black"
          />
        )}
      </AnimatePresence>

      <HUD
        zoneName={zoneData?.name ?? ''}
        accentColor={zoneData?.accentColor ?? '#7C3AED'}
        chipsCollected={collectedChips.length}
        totalChips={CHIP_REF_IDS.length}
        achievementsUnlocked={unlockedAchievements.length}
        musicOn={musicOn}
        onToggleMusic={() => useGameStore.getState().setMusicOn(!musicOn)}
        onToggleQuestLog={() => useGameStore.getState().toggleQuestLog()}
        onToggleSettings={() => useGameStore.getState().toggleSettings()}
      />

      <InteractPrompt label={activeInteractable ? activeInteractable.name : null} />

      {activeDialogue && (
        <DialogueBox
          lines={DIALOGUE[activeDialogue.key] ?? []}
          index={activeDialogue.index}
          onAdvance={handleAdvanceDialogue}
        />
      )}

      <AchievementToast achievementId={achievementQueue[0] ?? null} onDismiss={handleDismissAchievement} />

      <VirtualJoystick vectorRef={joystickRef} />
      <MobileInteractButton onPress={handleInteractPress} disabled={!activeInteractableId} />

      <QuestLog open={showQuestLog} onClose={() => useGameStore.getState().toggleQuestLog()} progress={questProgress} />

      <SettingsMenu
        open={showSettings}
        onClose={() => useGameStore.getState().toggleSettings()}
        musicOn={musicOn}
        sfxOn={sfxOn}
        onMusicChange={(on) => useGameStore.getState().setMusicOn(on)}
        onSfxChange={(on) => useGameStore.getState().setSfxOn(on)}
        onResetSave={() => useGameStore.getState().resetSave()}
      />

      <SkillTerminal
        open={terminalOpen}
        onClose={() => useGameStore.getState().setTerminalOpen(false)}
        onCommandRun={() => {
          const state = useGameStore.getState()
          state.completeQuestStep('access-mainframe', 'run-command')
          state.unlockAchievement('hacker')
        }}
      />

      <ProjectModal
        refId={activeModal?.type === 'project' ? activeModal.refId ?? null : null}
        onOpenChange={(open) => !open && useGameStore.getState().closeModal()}
      />
      <TrophyModal open={activeModal?.type === 'trophy'} onOpenChange={(open) => !open && useGameStore.getState().closeModal()} />
      <ResumeModal open={activeModal?.type === 'resume'} onOpenChange={(open) => !open && useGameStore.getState().closeModal()} />
      <DesignFrameModal
        refId={activeModal?.type === 'design' ? activeModal.refId ?? null : null}
        onOpenChange={(open) => !open && useGameStore.getState().closeModal()}
      />
    </div>
  )
}
