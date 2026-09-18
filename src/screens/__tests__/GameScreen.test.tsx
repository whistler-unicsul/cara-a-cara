import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import GameScreen from '@/screens/GameScreen'
import type { GameState } from '@/types'
import { phase1Questions, phase1Questions as qs } from '@/data/questions'
import React from 'react'

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ phase: '1' }),
  }
})

const mockDispatch = vi.fn()
const mockSavePhaseComplete = vi.fn().mockResolvedValue(undefined)

// Mutable game state for tests
let mockGameState: Partial<GameState> & { dispatch: typeof mockDispatch }

function makeDefaultState() {
  return {
    screen: 'PLAYING' as const,
    sessionId: 'test-uuid',
    avatar: 'avatar-1',
    nickname: 'Test',
    completedPhases: [] as number[],
    currentPhase: 1,
    secretCharacterId: 'aie',
    cardStates: {
      aie: 'active' as const,
      kojo: 'active' as const,
      zumbi: 'active' as const,
      amara: 'active' as const,
    },
    askedQuestionIds: [] as string[],
    lastAnswer: null as boolean | null,
    encouragement: null as string | null,
    accessibilityHighContrast: false,
    dispatch: mockDispatch,
  }
}

vi.mock('@/context/GameContext', async () => {
  const actual = await vi.importActual<typeof import('@/context/GameContext')>('@/context/GameContext')
  return {
    ...actual,
    useGame: () => mockGameState,
  }
})

vi.mock('@/hooks/useProgress', () => ({
  useProgress: () => ({
    completedPhases: [],
    savePhaseComplete: mockSavePhaseComplete,
    isLoading: false,
    isSaving: false,
    error: null,
  }),
}))

vi.mock('@/context/AudioContext', () => ({
  useAudio: () => ({
    play: vi.fn().mockResolvedValue(undefined),
    stop: vi.fn(),
    isPlaying: false,
  }),
  AudioProvider: ({ children }: { children: React.ReactNode }) => children,
}))

// ── Helpers ───────────────────────────────────────────────────────────────────

function renderGameScreen() {
  return render(
    <MemoryRouter initialEntries={['/game/1']}>
      <GameScreen />
    </MemoryRouter>,
  )
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('GameScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGameState = makeDefaultState()
  })

  it('dispatches START_GAME on mount', () => {
    renderGameScreen()
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'START_GAME', phase: 1 }),
    )
  })

  it('renders 4 character cards', () => {
    renderGameScreen()
    const cards = screen.getAllByRole('button', { name: /aiê|kojo|zumbi|amara/i })
    expect(cards).toHaveLength(4)
  })

  it('renders at least 8 question buttons', () => {
    renderGameScreen()
    const allButtons = screen.getAllByRole('button')
    // 4 character cards + 8 question buttons = 12+ buttons
    expect(allButtons.length).toBeGreaterThanOrEqual(12)
  })

  it('tapping a question button dispatches ASK_QUESTION', async () => {
    renderGameScreen()

    const firstQuestion = phase1Questions[0]
    const questionBtn = screen.getByText(firstQuestion.text)

    // Use fireEvent to avoid timing issues with async play() + fake timers
    await act(async () => {
      fireEvent.click(questionBtn)
      // Let the async play() resolve
      await Promise.resolve()
    })

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'ASK_QUESTION', questionId: firstQuestion.id }),
    )
  })

  it('tapping a character card dispatches TOGGLE_CARD', async () => {
    const user = userEvent.setup()
    renderGameScreen()

    await user.click(screen.getByRole('button', { name: 'Aiê' }))

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'TOGGLE_CARD', characterId: 'aie' }),
    )
  })

  it('tapping "Adivinhar!" on last remaining card dispatches MAKE_GUESS', async () => {
    const user = userEvent.setup()

    // Set state so only one card is active
    mockGameState = {
      ...mockGameState,
      cardStates: {
        aie: 'active',
        kojo: 'eliminated',
        zumbi: 'eliminated',
        amara: 'eliminated',
      },
    }

    renderGameScreen()

    const guessBtn = screen.getByText('Adivinhar!')
    await user.click(guessBtn)

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'MAKE_GUESS', characterId: 'aie' }),
    )
  })

  it('words "errou", "perdeu", "game over" are absent from the DOM', () => {
    renderGameScreen()
    const body = document.body.textContent?.toLowerCase() ?? ''
    expect(body).not.toContain('errou')
    expect(body).not.toContain('perdeu')
    expect(body).not.toContain('game over')
  })

  it('shows CelebrationOverlay when screen=WIN', () => {
    mockGameState = { ...mockGameState, screen: 'WIN' }
    renderGameScreen()

    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('after CelebrationOverlay onComplete, dispatches SHOW_EDUCATIONAL_CARD', () => {
    vi.useFakeTimers()
    mockGameState = { ...mockGameState, screen: 'WIN' }
    renderGameScreen()

    act(() => {
      vi.advanceTimersByTime(2500)
    })

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SHOW_EDUCATIONAL_CARD' })
    vi.useRealTimers()
  })

  it('shows EducationalCard when screen=EDUCATIONAL_CARD', () => {
    mockGameState = {
      ...mockGameState,
      screen: 'EDUCATIONAL_CARD',
      secretCharacterId: 'aie',
    }
    renderGameScreen()

    // EducationalCard renders a heading with the character name
    expect(screen.getByRole('heading', { name: 'Aiê' })).toBeInTheDocument()
    // And "Próximo" button
    expect(screen.getByRole('button', { name: /próximo/i })).toBeInTheDocument()
  })

  it('dispatches COMPLETE_PHASE when "Próximo" is clicked on EducationalCard', async () => {
    const user = userEvent.setup()
    mockGameState = {
      ...mockGameState,
      screen: 'EDUCATIONAL_CARD',
      secretCharacterId: 'aie',
    }
    renderGameScreen()

    await user.click(screen.getByRole('button', { name: /próximo/i }))

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'COMPLETE_PHASE', phase: 1 }),
    )
  })

  it('calls savePhaseComplete when "Próximo" is clicked', async () => {
    const user = userEvent.setup()
    mockGameState = {
      ...mockGameState,
      screen: 'EDUCATIONAL_CARD',
      secretCharacterId: 'aie',
    }
    renderGameScreen()

    await user.click(screen.getByRole('button', { name: /próximo/i }))

    expect(mockSavePhaseComplete).toHaveBeenCalledWith(1)
  })

  it('navigates to /phases when "Próximo" is clicked', async () => {
    const user = userEvent.setup()
    mockGameState = {
      ...mockGameState,
      screen: 'EDUCATIONAL_CARD',
      secretCharacterId: 'aie',
    }
    renderGameScreen()

    await user.click(screen.getByRole('button', { name: /próximo/i }))

    expect(mockNavigate).toHaveBeenCalledWith('/phases')
  })

  it('shows encouragement message when state.encouragement is set (CAC-17)', () => {
    mockGameState = {
      ...mockGameState,
      encouragement: 'Quase lá! Vamos tentar outra pergunta',
    }
    renderGameScreen()
    expect(screen.getByRole('alert')).toHaveTextContent('Quase lá! Vamos tentar outra pergunta')
  })

  it('redirects to /phases when avatar is null — page reload edge case (CAC-39)', () => {
    mockGameState = { ...mockGameState, avatar: null }
    renderGameScreen()
    expect(mockNavigate).toHaveBeenCalledWith('/phases')
    expect(mockDispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: 'START_GAME' }),
    )
  })

  it('recycles question list when all questions have been asked (CAC-40)', () => {
    mockGameState = {
      ...mockGameState,
      // All questions asked
      askedQuestionIds: qs.map(q => q.id),
    }
    renderGameScreen()
    // All question buttons should be enabled (none disabled) after recycling
    const questionBtns = screen.getAllByTestId('question-btn')
    const disabledBtns = questionBtns.filter(btn => btn.hasAttribute('disabled'))
    expect(disabledBtns).toHaveLength(0)
  })
})
