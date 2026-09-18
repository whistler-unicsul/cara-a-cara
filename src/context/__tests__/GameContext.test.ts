import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { GameReducer, GameProvider, useGame, initialState } from '@/context/GameContext'
import type { GameState } from '@/types'

// ── GameProvider — session ID (CAC-28) ───────────────────────────────────────

function SessionConsumer() {
  const { sessionId } = useGame()
  return React.createElement('div', { 'data-testid': 'session' }, sessionId ?? 'null')
}

describe('GameProvider session ID (CAC-28)', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    localStorage.clear()
  })

  it('generates UUID and stores under cara-a-cara-session-id when key is absent', async () => {
    vi.stubGlobal('crypto', { randomUUID: vi.fn().mockReturnValue('generated-uuid-1234') })
    localStorage.removeItem('cara-a-cara-session-id')

    render(
      React.createElement(GameProvider, null, React.createElement(SessionConsumer))
    )

    await waitFor(() => {
      expect(screen.getByTestId('session').textContent).toBe('generated-uuid-1234')
    })
    expect(localStorage.getItem('cara-a-cara-session-id')).toBe('generated-uuid-1234')
  })

  it('reads existing session ID from localStorage without generating a new one', async () => {
    const mockRandomUUID = vi.fn().mockReturnValue('should-not-be-used')
    vi.stubGlobal('crypto', { randomUUID: mockRandomUUID })
    localStorage.setItem('cara-a-cara-session-id', 'existing-uuid-5678')

    render(
      React.createElement(GameProvider, null, React.createElement(SessionConsumer))
    )

    await waitFor(() => {
      expect(screen.getByTestId('session').textContent).toBe('existing-uuid-5678')
    })
    expect(mockRandomUUID).not.toHaveBeenCalled()
  })
})

// ── Helpers ───────────────────────────────────────────────────────────────────

function makePlayingState(secretCharacterId: string): GameState {
  return {
    ...initialState,
    screen: 'PLAYING',
    currentPhase: 1,
    secretCharacterId,
    cardStates: {
      aie: 'active',
      kojo: 'active',
      zumbi: 'active',
      amara: 'active',
    },
    askedQuestionIds: [],
    lastAnswer: null,
  }
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('GameReducer', () => {
  // START_GAME
  describe('START_GAME', () => {
    it('selects one of the 4 Phase 1 characters as secretCharacterId', () => {
      const validIds = ['aie', 'kojo', 'zumbi', 'amara']
      const results = new Set<string>()

      // Run multiple times to check randomness coverage
      for (let i = 0; i < 50; i++) {
        const next = GameReducer(initialState, { type: 'START_GAME', phase: 1 })
        expect(next.secretCharacterId).not.toBeNull()
        expect(validIds).toContain(next.secretCharacterId)
        results.add(next.secretCharacterId!)
      }
      // With 50 runs and 4 characters, all 4 should appear
      expect(results.size).toBeGreaterThan(1)
    })

    it('initializes cardStates with all 4 Phase 1 characters as active', () => {
      const next = GameReducer(initialState, { type: 'START_GAME', phase: 1 })
      expect(next.cardStates).toEqual({
        aie: 'active',
        kojo: 'active',
        zumbi: 'active',
        amara: 'active',
      })
    })

    it('clears askedQuestionIds', () => {
      const stateWithAsked: GameState = {
        ...initialState,
        askedQuestionIds: ['q-turbante', 'q-cocar'],
      }
      const next = GameReducer(stateWithAsked, { type: 'START_GAME', phase: 1 })
      expect(next.askedQuestionIds).toEqual([])
    })

    it('sets screen to PLAYING', () => {
      const next = GameReducer(initialState, { type: 'START_GAME', phase: 1 })
      expect(next.screen).toBe('PLAYING')
    })

    it('sets currentPhase to the given phase', () => {
      const next = GameReducer(initialState, { type: 'START_GAME', phase: 1 })
      expect(next.currentPhase).toBe(1)
    })

    it('clears lastAnswer', () => {
      const stateWithAnswer: GameState = { ...initialState, lastAnswer: true }
      const next = GameReducer(stateWithAnswer, { type: 'START_GAME', phase: 1 })
      expect(next.lastAnswer).toBeNull()
    })
  })

  // TOGGLE_CARD
  describe('TOGGLE_CARD', () => {
    it('toggles active → eliminated', () => {
      const state = makePlayingState('kojo')
      const next = GameReducer(state, { type: 'TOGGLE_CARD', characterId: 'aie' })
      expect(next.cardStates['aie']).toBe('eliminated')
    })

    it('toggles eliminated → active', () => {
      const state: GameState = {
        ...makePlayingState('kojo'),
        cardStates: {
          aie: 'eliminated',
          kojo: 'active',
          zumbi: 'active',
          amara: 'active',
        },
      }
      const next = GameReducer(state, { type: 'TOGGLE_CARD', characterId: 'aie' })
      expect(next.cardStates['aie']).toBe('active')
    })

    it('does not change other card states', () => {
      const state = makePlayingState('kojo')
      const next = GameReducer(state, { type: 'TOGGLE_CARD', characterId: 'aie' })
      expect(next.cardStates['kojo']).toBe('active')
      expect(next.cardStates['zumbi']).toBe('active')
      expect(next.cardStates['amara']).toBe('active')
    })
  })

  // ASK_QUESTION
  describe('ASK_QUESTION', () => {
    it('adds questionId to askedQuestionIds', () => {
      const state = makePlayingState('kojo')
      const next = GameReducer(state, { type: 'ASK_QUESTION', questionId: 'q-turbante' })
      expect(next.askedQuestionIds).toContain('q-turbante')
    })

    it('calculates lastAnswer = true when secret character has the attribute (kojo uses turbante)', () => {
      const state = makePlayingState('kojo')
      const next = GameReducer(state, { type: 'ASK_QUESTION', questionId: 'q-turbante' })
      expect(next.lastAnswer).toBe(true)
    })

    it('calculates lastAnswer = false when secret character does not have attribute (aie does not use turbante)', () => {
      const state = makePlayingState('aie')
      const next = GameReducer(state, { type: 'ASK_QUESTION', questionId: 'q-turbante' })
      expect(next.lastAnswer).toBe(false)
    })

    it('accumulates multiple questions in askedQuestionIds', () => {
      const state = makePlayingState('zumbi')
      const s1 = GameReducer(state, { type: 'ASK_QUESTION', questionId: 'q-turbante' })
      const s2 = GameReducer(s1, { type: 'ASK_QUESTION', questionId: 'q-cocar' })
      expect(s2.askedQuestionIds).toEqual(['q-turbante', 'q-cocar'])
    })
  })

  // MAKE_GUESS
  describe('MAKE_GUESS', () => {
    it('correct guess (characterId === secretCharacterId) → screen WIN', () => {
      const state = makePlayingState('kojo')
      const next = GameReducer(state, { type: 'MAKE_GUESS', characterId: 'kojo' })
      expect(next.screen).toBe('WIN')
    })

    it('wrong guess (characterId !== secretCharacterId) → screen stays PLAYING', () => {
      const state = makePlayingState('kojo')
      const next = GameReducer(state, { type: 'MAKE_GUESS', characterId: 'aie' })
      expect(next.screen).toBe('PLAYING')
    })

    it('wrong guess → restores all cardStates to active', () => {
      const state: GameState = {
        ...makePlayingState('kojo'),
        cardStates: {
          aie: 'eliminated',
          kojo: 'active',
          zumbi: 'eliminated',
          amara: 'active',
        },
      }
      const next = GameReducer(state, { type: 'MAKE_GUESS', characterId: 'aie' })
      expect(next.cardStates).toEqual({
        aie: 'active',
        kojo: 'active',
        zumbi: 'active',
        amara: 'active',
      })
    })
  })

  // WRONG_GUESS
  describe('WRONG_GUESS', () => {
    it('restores all cardStates to active', () => {
      const state: GameState = {
        ...makePlayingState('kojo'),
        cardStates: {
          aie: 'eliminated',
          kojo: 'active',
          zumbi: 'eliminated',
          amara: 'eliminated',
        },
      }
      const next = GameReducer(state, { type: 'WRONG_GUESS' })
      expect(next.cardStates).toEqual({
        aie: 'active',
        kojo: 'active',
        zumbi: 'active',
        amara: 'active',
      })
    })

    it('does NOT change the screen (stays PLAYING)', () => {
      const state = makePlayingState('zumbi')
      const next = GameReducer(state, { type: 'WRONG_GUESS' })
      expect(next.screen).toBe('PLAYING')
    })

    it('keeps askedQuestionIds (does not clear them)', () => {
      const state: GameState = {
        ...makePlayingState('aie'),
        askedQuestionIds: ['q-turbante', 'q-cocar'],
      }
      const next = GameReducer(state, { type: 'WRONG_GUESS' })
      expect(next.askedQuestionIds).toEqual(['q-turbante', 'q-cocar'])
    })

    it('sets encouragement to the correct message (CAC-17)', () => {
      const state = makePlayingState('kojo')
      const next = GameReducer(state, { type: 'WRONG_GUESS' })
      expect(next.encouragement).toBe('Quase lá! Vamos tentar outra pergunta')
    })
  })

  // MAKE_GUESS encouragement (CAC-17)
  describe('MAKE_GUESS encouragement', () => {
    it('wrong guess sets encouragement message', () => {
      const state = makePlayingState('kojo')
      const next = GameReducer(state, { type: 'MAKE_GUESS', characterId: 'aie' })
      expect(next.encouragement).toBe('Quase lá! Vamos tentar outra pergunta')
    })

    it('correct guess clears encouragement', () => {
      const state: GameState = {
        ...makePlayingState('kojo'),
        encouragement: 'Quase lá! Vamos tentar outra pergunta',
      }
      const next = GameReducer(state, { type: 'MAKE_GUESS', characterId: 'kojo' })
      expect(next.encouragement).toBeNull()
    })
  })

  // SHOW_EDUCATIONAL_CARD
  describe('SHOW_EDUCATIONAL_CARD', () => {
    it('sets screen to EDUCATIONAL_CARD', () => {
      const state: GameState = { ...initialState, screen: 'WIN' }
      const next = GameReducer(state, { type: 'SHOW_EDUCATIONAL_CARD' })
      expect(next.screen).toBe('EDUCATIONAL_CARD')
    })
  })

  // COMPLETE_PHASE
  describe('COMPLETE_PHASE', () => {
    it('adds phase to completedPhases', () => {
      const state = { ...initialState, completedPhases: [] }
      const next = GameReducer(state, { type: 'COMPLETE_PHASE', phase: 1 })
      expect(next.completedPhases).toContain(1)
    })

    it('does not duplicate phase if already completed', () => {
      const state = { ...initialState, completedPhases: [1] }
      const next = GameReducer(state, { type: 'COMPLETE_PHASE', phase: 1 })
      expect(next.completedPhases.filter(p => p === 1)).toHaveLength(1)
    })

    it('sets screen to EDUCATIONAL_CARD', () => {
      const state = { ...initialState, screen: 'WIN' as const }
      const next = GameReducer(state, { type: 'COMPLETE_PHASE', phase: 1 })
      expect(next.screen).toBe('EDUCATIONAL_CARD')
    })
  })

  // GO_TO_PHASE_MAP
  describe('GO_TO_PHASE_MAP', () => {
    it('sets screen to PHASE_MAP', () => {
      const state = { ...initialState, screen: 'EDUCATIONAL_CARD' as const }
      const next = GameReducer(state, { type: 'GO_TO_PHASE_MAP' })
      expect(next.screen).toBe('PHASE_MAP')
    })
  })

  // SET_SESSION
  describe('SET_SESSION', () => {
    it('updates sessionId', () => {
      const next = GameReducer(initialState, { type: 'SET_SESSION', sessionId: 'test-uuid' })
      expect(next.sessionId).toBe('test-uuid')
    })
  })

  // SET_COMPLETED_PHASES
  describe('SET_COMPLETED_PHASES', () => {
    it('updates completedPhases', () => {
      const next = GameReducer(initialState, { type: 'SET_COMPLETED_PHASES', completedPhases: [1, 2] })
      expect(next.completedPhases).toEqual([1, 2])
    })
  })

  // TOGGLE_HIGH_CONTRAST
  describe('TOGGLE_HIGH_CONTRAST', () => {
    it('toggles accessibilityHighContrast from false to true', () => {
      const next = GameReducer(initialState, { type: 'TOGGLE_HIGH_CONTRAST' })
      expect(next.accessibilityHighContrast).toBe(true)
    })

    it('toggles accessibilityHighContrast from true to false', () => {
      const state = { ...initialState, accessibilityHighContrast: true }
      const next = GameReducer(state, { type: 'TOGGLE_HIGH_CONTRAST' })
      expect(next.accessibilityHighContrast).toBe(false)
    })
  })
})
