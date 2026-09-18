import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import React from 'react'
import { GameProvider } from '@/context/GameContext'
import { useProgress } from '@/hooks/useProgress'

// ── Mock supabaseService ──────────────────────────────────────────────────────

vi.mock('@/services/supabaseService', () => ({
  fetchProgress: vi.fn(),
  upsertProgress: vi.fn(),
}))

import { fetchProgress, upsertProgress } from '@/services/supabaseService'

const mockFetchProgress = fetchProgress as ReturnType<typeof vi.fn>
const mockUpsertProgress = upsertProgress as ReturnType<typeof vi.fn>

// ── Wrapper ───────────────────────────────────────────────────────────────────

function wrapper({ children }: { children: React.ReactNode }) {
  return React.createElement(GameProvider, null, children)
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('useProgress', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    // Provide a default sessionId via localStorage so GameProvider loads one
    localStorage.setItem('cara-a-cara-session-id', 'test-session-uuid')
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('isLoading is true during initial fetch and false after resolving', async () => {
    let resolvePromise!: (v: null) => void
    mockFetchProgress.mockReturnValue(new Promise(res => { resolvePromise = res }))

    const { result } = renderHook(() => useProgress(), { wrapper })

    // During fetch, isLoading should be true
    expect(result.current.isLoading).toBe(true)

    // Resolve the fetch
    act(() => { resolvePromise(null) })

    await waitFor(() => expect(result.current.isLoading).toBe(false))
  })

  it('fetchProgress success → dispatch SET_COMPLETED_PHASES with Supabase data', async () => {
    mockFetchProgress.mockResolvedValue({
      session_id: 'test-session-uuid',
      completed_phases: [1, 2],
      updated_at: new Date().toISOString(),
    })

    const { result } = renderHook(() => useProgress(), { wrapper })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.completedPhases).toEqual([1, 2])
  })

  it('fetchProgress failure → reads localStorage as fallback', async () => {
    mockFetchProgress.mockRejectedValue(new Error('Network error'))
    localStorage.setItem('cara-a-cara-progress', JSON.stringify([1]))

    const { result } = renderHook(() => useProgress(), { wrapper })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.completedPhases).toEqual([1])
  })

  it('savePhaseComplete success → upsertProgress called with correct phase', async () => {
    mockFetchProgress.mockResolvedValue(null)
    mockUpsertProgress.mockResolvedValue(undefined)

    const { result } = renderHook(() => useProgress(), { wrapper })
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    await act(async () => {
      await result.current.savePhaseComplete(1)
    })

    expect(mockUpsertProgress).toHaveBeenCalledWith('test-session-uuid', expect.arrayContaining([1]))
    expect(result.current.error).toBeNull()
  })

  it('savePhaseComplete failure → localStorage fallback + error message', async () => {
    mockFetchProgress.mockResolvedValue(null)
    mockUpsertProgress.mockRejectedValue(new Error('Supabase error'))

    const { result } = renderHook(() => useProgress(), { wrapper })
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    await act(async () => {
      await result.current.savePhaseComplete(1)
    })

    expect(result.current.error).toBe('Progresso salvo localmente')
    // Check localStorage was set
    const stored = localStorage.getItem('cara-a-cara-progress')
    expect(stored).not.toBeNull()
    const parsed = JSON.parse(stored!)
    expect(parsed).toContain(1)
  })

  it('isSaving is true during upsert and false after', async () => {
    mockFetchProgress.mockResolvedValue(null)

    let resolveUpsert!: () => void
    mockUpsertProgress.mockReturnValue(new Promise<void>(res => { resolveUpsert = res }))

    const { result } = renderHook(() => useProgress(), { wrapper })
    await waitFor(() => expect(result.current.isLoading).toBe(false))

    // Start saving without awaiting
    let savePromise: Promise<void>
    act(() => {
      savePromise = result.current.savePhaseComplete(1)
    })

    // isSaving should be true
    await waitFor(() => expect(result.current.isSaving).toBe(true))

    // Resolve the upsert
    act(() => { resolveUpsert() })
    await act(async () => { await savePromise! })

    await waitFor(() => expect(result.current.isSaving).toBe(false))
  })
})
