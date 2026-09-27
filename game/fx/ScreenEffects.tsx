'use client'

interface ScreenEffectsProps {
  accentColor: string
}

/** Pure-CSS CRT scanlines + vignette + colour wash layered above the game,
 * standing in for a full postprocessing bloom pass. */
export function ScreenEffects({ accentColor }: ScreenEffectsProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      <div
        className="absolute inset-0 mix-blend-screen opacity-[0.06]"
        style={{
          backgroundImage: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)',
        }}
      />
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, ${accentColor}14 75%, rgba(0,0,0,0.75) 100%)`,
        }}
      />
      <div className="absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(0,0,0,0.85)]" />
    </div>
  )
}
