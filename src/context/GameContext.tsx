import React, { createContext, useContext, useReducer, useEffect } from 'react'
import type { GameState, GameAction } from '@/types'
import { characters } from '@/data/characters'
import { phase1Questions } from '@/data/questions'

// ── Initial State ─────────────────────────────────────────────────────────────

export const initialState: GameState = {
  screen: 'MENU',
  sessionId: null,
  avatar: null,
  nickname: '',
  completedPhases: [],
  currentPhase: null,
  secretCharacterId: null,
  cardStates: {},
  askedQuestionIds: [],
  lastAnswer: null,
  encouragement: null,
  accessibilityHighContrast: false,
}

// ── Helper: get characters for a phase ───────────────────────────────────────

function getPhaseCharacters(phase: number) {
  return characters.filter(c => c.phase === phase)
}

// ── Helper: compute answer for a question ────────────────────────────────────

function computeAnswer(secretCharacterId: string, questionId: string): boolean | null {
  // Try phase1Questions first, then all questions
  const question =
    phase1Questions.find(q => q.id === questionId)

  if (!question) return null

  const answer = question.answers[secretCharacterId]
  if (answer === undefined) return null

  return answer
}

// ── Reducer ───────────────────────────────────────────────────────────────────

export function GameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_SESSION':
      return { ...state, sessionId: action.sessionId }

    case 'SET_AVATAR':
      return {
        ...state,
        avatar: action.avatar,
        nickname: action.nickname,
        screen: 'AVATAR_SELECTION',
      }

    case 'START_GAME': {
      const phaseChars = getPhaseCharacters(action.phase)
      if (phaseChars.length === 0) return state

      const randomIndex = Math.floor(Math.random() * phaseChars.length)
      const secretCharacter = phaseChars[randomIndex]

      // Initialize card states: all 'active'
      const cardStates: Record<string, 'active' | 'eliminated'> = {}
      for (const char of phaseChars) {
        cardStates[char.id] = 'active'
      }

      return {
        ...state,
        screen: 'PLAYING',
        currentPhase: action.phase,
        secretCharacterId: secretCharacter.id,
        cardStates,
        askedQuestionIds: [],
        lastAnswer: null,
        encouragement: null,
      }
    }

    case 'ASK_QUESTION': {
      if (!state.secretCharacterId) return state

      const answer = computeAnswer(state.secretCharacterId, action.questionId)

      return {
        ...state,
        askedQuestionIds: [...state.askedQuestionIds, action.questionId],
        lastAnswer: answer,
        encouragement: null,
      }
    }

    case 'TOGGLE_CARD': {
      const current = state.cardStates[action.characterId]
      if (current === undefined) return state

      return {
        ...state,
        cardStates: {
          ...state.cardStates,
          [action.characterId]: current === 'active' ? 'eliminated' : 'active',
        },
      }
    }

    case 'MAKE_GUESS': {
      if (action.characterId === state.secretCharacterId) {
        return { ...state, screen: 'WIN', encouragement: null }
      }
      // Wrong guess — restore all cards to active, keep askedQuestionIds
      const restoredCardStates: Record<string, 'active' | 'eliminated'> = {}
      for (const id of Object.keys(state.cardStates)) {
        restoredCardStates[id] = 'active'
      }
      return {
        ...state,
        cardStates: restoredCardStates,
        lastAnswer: null,
        encouragement: 'Quase lá! Vamos tentar outra pergunta',
      }
    }

    case 'WRONG_GUESS': {
      // Restore all cards to active, keep askedQuestionIds
      const restoredCardStates: Record<string, 'active' | 'eliminated'> = {}
      for (const id of Object.keys(state.cardStates)) {
        restoredCardStates[id] = 'active'
      }
      return {
        ...state,
        cardStates: restoredCardStates,
        lastAnswer: null,
        encouragement: 'Quase lá! Vamos tentar outra pergunta',
      }
    }

    case 'WIN':
      return { ...state, screen: 'WIN' }

    case 'SHOW_EDUCATIONAL_CARD':
      return { ...state, screen: 'EDUCATIONAL_CARD' }

    case 'COMPLETE_PHASE': {
      const alreadyCompleted = state.completedPhases.includes(action.phase)
      const newCompletedPhases = alreadyCompleted
        ? state.completedPhases
        : [...state.completedPhases, action.phase]
      return {
        ...state,
        completedPhases: newCompletedPhases,
        screen: 'EDUCATIONAL_CARD',
      }
    }

    case 'GO_TO_PHASE_MAP':
      return { ...state, screen: 'PHASE_MAP' }

    case 'TOGGLE_HIGH_CONTRAST':
      return { ...state, accessibilityHighContrast: !state.accessibilityHighContrast }

    case 'SET_COMPLETED_PHASES':
      return { ...state, completedPhases: action.completedPhases }

    default:
      return state
  }
}

// ── Context ───────────────────────────────────────────────────────────────────

type GameContextValue = GameState & { dispatch: React.Dispatch<GameAction> }

export const GameContext = createContext<GameContextValue | null>(null)

// ── Provider ──────────────────────────────────────────────────────────────────

const SESSION_KEY = 'cara-a-cara-session-id'

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(GameReducer, initialState)

  useEffect(() => {
    // Read or generate sessionId
    let sessionId: string
    try {
      const stored = localStorage.getItem(SESSION_KEY)
      if (stored) {
        sessionId = stored
      } else {
        sessionId = crypto.randomUUID()
        localStorage.setItem(SESSION_KEY, sessionId)
      }
    } catch {
      // localStorage unavailable — use in-memory UUID
      sessionId = crypto.randomUUID()
    }
    dispatch({ type: 'SET_SESSION', sessionId })
  }, [])

  return (
    <GameContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext)
  if (!ctx) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return ctx
}
