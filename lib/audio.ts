// Fully synthesized SFX/music engine built on the Web Audio API.
// No binary audio assets are required — every sound is generated at runtime,
// which keeps the game entirely self-contained and licence-free.

type SfxName = 'footstep' | 'interact' | 'portal' | 'type' | 'achievement' | 'collect' | 'error' | 'confirm'

class AudioEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private musicGain: GainNode | null = null
  private sfxGain: GainNode | null = null
  private musicNodes: { stop: () => void } | null = null
  private musicOn = true
  private sfxOn = true

  private ensureCtx() {
    if (typeof window === 'undefined') return null
    if (!this.ctx) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new Ctx()
      this.master = this.ctx.createGain()
      this.master.gain.value = 0.7
      this.master.connect(this.ctx.destination)
      this.musicGain = this.ctx.createGain()
      this.musicGain.gain.value = this.musicOn ? 0.35 : 0
      this.musicGain.connect(this.master)
      this.sfxGain = this.ctx.createGain()
      this.sfxGain.gain.value = this.sfxOn ? 0.6 : 0
      this.sfxGain.connect(this.master)
    }
    return this.ctx
  }

  resume() {
    const ctx = this.ensureCtx()
    if (ctx && ctx.state === 'suspended') ctx.resume()
  }

  setMusicOn(on: boolean) {
    this.musicOn = on
    this.ensureCtx()
    if (this.musicGain) this.musicGain.gain.setTargetAtTime(on ? 0.35 : 0, this.ctx!.currentTime, 0.1)
    if (on) this.startAmbient()
    else this.stopAmbient()
  }

  setSfxOn(on: boolean) {
    this.sfxOn = on
    this.ensureCtx()
    if (this.sfxGain) this.sfxGain.gain.setTargetAtTime(on ? 0.6 : 0, this.ctx!.currentTime, 0.05)
  }

  startAmbient() {
    const ctx = this.ensureCtx()
    if (!ctx || !this.musicGain || this.musicNodes) return
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc1.type = 'sawtooth'
    osc1.frequency.value = 55
    osc2.type = 'sine'
    osc2.frequency.value = 110.5
    filter.type = 'lowpass'
    filter.frequency.value = 400

    lfo.frequency.value = 0.08
    lfoGain.gain.value = 60
    lfo.connect(lfoGain)
    lfoGain.connect(filter.frequency)

    gain.gain.value = 0.5

    osc1.connect(filter)
    osc2.connect(filter)
    filter.connect(gain)
    gain.connect(this.musicGain)

    osc1.start()
    osc2.start()
    lfo.start()

    this.musicNodes = {
      stop: () => {
        osc1.stop()
        osc2.stop()
        lfo.stop()
      },
    }
  }

  stopAmbient() {
    this.musicNodes?.stop()
    this.musicNodes = null
  }

  play(name: SfxName) {
    const ctx = this.ensureCtx()
    if (!ctx || !this.sfxGain) return
    const now = ctx.currentTime

    const tone = (freq: number, dur: number, type: OscillatorType = 'sine', vol = 0.3, glideTo?: number) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = type
      osc.frequency.setValueAtTime(freq, now)
      if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, now + dur)
      gain.gain.setValueAtTime(vol, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur)
      osc.connect(gain)
      gain.connect(this.sfxGain!)
      osc.start(now)
      osc.stop(now + dur + 0.02)
    }

    const noise = (dur: number, vol = 0.2) => {
      const bufferSize = ctx.sampleRate * dur
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
      const src = ctx.createBufferSource()
      src.buffer = buffer
      const gain = ctx.createGain()
      gain.gain.value = vol
      src.connect(gain)
      gain.connect(this.sfxGain!)
      src.start(now)
    }

    switch (name) {
      case 'footstep':
        noise(0.06, 0.12)
        break
      case 'interact':
        tone(520, 0.09, 'triangle', 0.25, 700)
        break
      case 'confirm':
        tone(440, 0.08, 'square', 0.2, 660)
        setTimeout(() => tone(660, 0.1, 'square', 0.2), 60)
        break
      case 'type':
        tone(1200 + Math.random() * 200, 0.02, 'square', 0.06)
        break
      case 'collect':
        tone(880, 0.12, 'triangle', 0.25, 1760)
        break
      case 'achievement':
        tone(523.25, 0.12, 'triangle', 0.25)
        setTimeout(() => tone(659.25, 0.12, 'triangle', 0.25), 100)
        setTimeout(() => tone(783.99, 0.2, 'triangle', 0.28), 200)
        break
      case 'portal':
        tone(120, 1.2, 'sawtooth', 0.2, 900)
        noise(1.2, 0.08)
        break
      case 'error':
        tone(160, 0.2, 'sawtooth', 0.2, 80)
        break
    }
  }
}

export const audioEngine = new AudioEngine()
