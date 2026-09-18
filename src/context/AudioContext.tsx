import React, { createContext, useContext } from 'react'
import { audioManager } from '@/services/AudioManager'

// ── Types ─────────────────────────────────────────────────────────────────────

interface AudioContextValue {
  play: (audioPath: string) => Promise<void>
  stop: () => void
  isPlaying: boolean
}

// ── Context ───────────────────────────────────────────────────────────────────

export const AudioContext = createContext<AudioContextValue | null>(null)

// ── Provider ──────────────────────────────────────────────────────────────────

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const value: AudioContextValue = {
    play: (audioPath: string) => audioManager.play(audioPath),
    stop: () => audioManager.stop(),
    get isPlaying() {
      return audioManager.isPlaying
    },
  }

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioContext)
  if (!ctx) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return ctx
}
