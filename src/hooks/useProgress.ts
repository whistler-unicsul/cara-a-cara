import { useState, useEffect, useCallback } from 'react'
import { fetchProgress, upsertProgress } from '@/services/supabaseService'
import { useGame } from '@/context/GameContext'

const PROGRESS_KEY = 'cara-a-cara-progress'

// ── useProgress ───────────────────────────────────────────────────────────────

export function useProgress() {
  const { sessionId, completedPhases, dispatch } = useGame()

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load progress on mount
  useEffect(() => {
    if (!sessionId) return

    let cancelled = false

    async function load() {
      try {
        const data = await fetchProgress(sessionId!)
        if (cancelled) return

        if (data) {
          dispatch({
            type: 'SET_COMPLETED_PHASES',
            completedPhases: data.completed_phases,
          })
        }
      } catch {
        if (cancelled) return

        // Fallback to localStorage
        try {
          const stored = localStorage.getItem(PROGRESS_KEY)
          if (stored) {
            const parsed = JSON.parse(stored) as number[]
            if (Array.isArray(parsed)) {
              dispatch({ type: 'SET_COMPLETED_PHASES', completedPhases: parsed })
            }
          }
        } catch {
          // Ignore localStorage errors
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [sessionId, dispatch])

  // Save phase complete
  const savePhaseComplete = useCallback(
    async (phase: number) => {
      if (!sessionId) return

      const newCompletedPhases = completedPhases.includes(phase)
        ? completedPhases
        : [...completedPhases, phase]

      setIsSaving(true)
      setError(null)

      try {
        await upsertProgress(sessionId, newCompletedPhases)
      } catch {
        // Fallback to localStorage
        try {
          localStorage.setItem(PROGRESS_KEY, JSON.stringify(newCompletedPhases))
        } catch {
          // Ignore localStorage errors
        }
        setError('Progresso salvo localmente')
      } finally {
        setIsSaving(false)
      }
    },
    [sessionId, completedPhases],
  )

  return {
    completedPhases,
    savePhaseComplete,
    isLoading,
    isSaving,
    error,
  }
}
