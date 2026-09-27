'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface SettingsMenuProps {
  open: boolean
  onClose: () => void
  musicOn: boolean
  sfxOn: boolean
  onMusicChange: (on: boolean) => void
  onSfxChange: (on: boolean) => void
  onResetSave: () => void
}

export function SettingsMenu({ open, onClose, musicOn, sfxOn, onMusicChange, onSfxChange, onResetSave }: SettingsMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-black/85 p-6 shadow-[0_0_60px_rgba(124,58,237,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Settings</h2>
              <Button size="icon" variant="ghost" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="music-toggle" className="text-white/80">
                  Ambient music
                </Label>
                <Switch id="music-toggle" checked={musicOn} onCheckedChange={onMusicChange} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sfx-toggle" className="text-white/80">
                  Sound effects
                </Label>
                <Switch id="sfx-toggle" checked={sfxOn} onCheckedChange={onSfxChange} />
              </div>

              <div className="mt-2 border-t border-white/10 pt-4">
                <Button variant="destructive" className="w-full" onClick={onResetSave}>
                  Reset save progress
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
