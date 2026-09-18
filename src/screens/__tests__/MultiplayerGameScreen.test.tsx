import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import MultiplayerGameScreen from '@/screens/MultiplayerGameScreen'
import type { MultiplayerRoom } from '@/types'
import { phase1Questions } from '@/data/questions'
import React from 'react'

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const mockAskQuestion = vi.fn().mockResolvedValue(undefined)
const mockToggleCard = vi.fn()
const mockMakeGuess = vi.fn().mockResolvedValue(undefined)

let mockRoom: MultiplayerRoom | null = null
let mockMyRole: 'host' | 'guest' | null = 'host'
let mockIsMyTurn = true
let mockMyCardStates: Record<string, 'active' | 'eliminated'> = {
  aie: 'active',
  yara: 'active',
  caua: 'active',
  taina: 'active',
  iara: 'active',
  potira: 'active',
}
let mockMyAskedQuestionIds: string[] = []
let mockOpponentSecretCharId: string | null = 'yara'
let mockError: string | null = null

vi.mock('@/context/MultiplayerContext', () => ({
  useMultiplayer: () => ({
    room: mockRoom,
    myRole: mockMyRole,
    isMyTurn: mockIsMyTurn,
    myCardStates: mockMyCardStates,
    myAskedQuestionIds: mockMyAskedQuestionIds,
    opponentSecretCharId: mockOpponentSecretCharId,
    error: mockError,
    createRoom: vi.fn(),
    joinRoom: vi.fn(),
    startGame: vi.fn(),
    askQuestion: mockAskQuestion,
    toggleCard: mockToggleCard,
    makeGuess: mockMakeGuess,
    leaveRoom: vi.fn(),
  }),
}))

const mockSavePhaseComplete = vi.fn().mockResolvedValue(undefined)

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

function makeRoom(overrides: Partial<MultiplayerRoom> = {}): MultiplayerRoom {
  return {
    room_id: 'room-uuid-1',
    room_code: 'XYZABC',
    phase: 1,
    host_session_id: 'host-session-id',
    guest_session_id: 'guest-session-id',
    host_secret_char_id: 'aie',
    guest_secret_char_id: 'yara',
    current_turn: 'host',
    host_card_states: { aie: 'active', yara: 'active', caua: 'active', taina: 'active', iara: 'active', potira: 'active' },
    guest_card_states: { aie: 'active', yara: 'active', caua: 'active', taina: 'active', iara: 'active', potira: 'active' },
    host_asked_q_ids: [],
    guest_asked_q_ids: [],
    last_question_id: null,
    last_answer: null,
    last_action: null,
    status: 'playing',
    winner: null,
    created_at: '2026-01-01T00:00:00Z',
    last_activity_at: '2026-01-01T00:00:00Z',
    ...overrides,
  }
}

function resetState() {
  mockRoom = makeRoom()
  mockMyRole = 'host'
  mockIsMyTurn = true
  mockMyCardStates = { aie: 'active', kojo: 'active', zumbi: 'active', amara: 'active' }
  mockMyAskedQuestionIds = []
  mockOpponentSecretCharId = 'kojo'
  mockError = null
}

function renderGameScreen() {
  return render(
    <MemoryRouter>
      <MultiplayerGameScreen />
    </MemoryRouter>,
  )
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('MultiplayerGameScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    resetState()
  })

  it('renderiza 6 cartas e ≥ 8 perguntas', () => {
    renderGameScreen()

    const cards = screen.getAllByRole('button', { name: /aiê|yara|cauã|tainá|iara|potira/i })
    expect(cards).toHaveLength(6)

    const allButtons = screen.getAllByRole('button')
    expect(allButtons.length).toBeGreaterThanOrEqual(14) // 6 cards + 8 questions
  })

  it('isMyTurn=true → controles habilitados (perguntas não estão todas desabilitadas)', () => {
    mockIsMyTurn = true
    renderGameScreen()

    const questionBtns = screen.getAllByTestId('question-btn')
    const enabledBtns = questionBtns.filter(btn => !btn.hasAttribute('disabled'))
    expect(enabledBtns.length).toBeGreaterThan(0)
  })

  it('isMyTurn=false → exibe "Vez do adversário…"', () => {
    mockIsMyTurn = false
    mockRoom = makeRoom({ current_turn: 'guest' })
    renderGameScreen()

    expect(screen.getByText('Vez do adversário…')).toBeInTheDocument()
  })

  it('pergunta tocada → askQuestion chamado', async () => {
    const firstQuestion = phase1Questions[0]
    renderGameScreen()

    await act(async () => {
      fireEvent.click(screen.getByText(firstQuestion.text))
      await Promise.resolve()
    })

    expect(mockAskQuestion).toHaveBeenCalled()
  })

  it('carta tocada → toggleCard chamado', async () => {
    const user = userEvent.setup()
    renderGameScreen()

    await user.click(screen.getByRole('button', { name: 'Aiê' }))

    expect(mockToggleCard).toHaveBeenCalledWith('aie')
  })

  it('com 1 carta ativa → "Adivinhar!" visível', () => {
    mockMyCardStates = {
      aie: 'active',
      yara: 'eliminated',
      caua: 'eliminated',
      taina: 'eliminated',
      iara: 'eliminated',
      potira: 'eliminated',
    }
    renderGameScreen()

    expect(screen.getByText('Adivinhar!')).toBeInTheDocument()
  })

  it('status="finished" e winner=myRole → CelebrationOverlay visível', () => {
    mockRoom = makeRoom({ status: 'finished', winner: 'host' })
    mockMyRole = 'host'
    renderGameScreen()

    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('status="finished" e winner≠myRole → "Boa tentativa!" visível', () => {
    mockRoom = makeRoom({ status: 'finished', winner: 'guest' })
    mockMyRole = 'host'
    renderGameScreen()

    expect(screen.getByText(/boa tentativa/i)).toBeInTheDocument()
  })

  it('EducationalCard exibido com personagem certo após winner=myRole', () => {
    vi.useFakeTimers()
    mockRoom = makeRoom({ status: 'finished', winner: 'host' })
    mockMyRole = 'host'
    mockOpponentSecretCharId = 'yara'
    renderGameScreen()

    act(() => {
      vi.advanceTimersByTime(2500)
    })

    // After celebration, educational card should show opponent's character
    expect(screen.getByTestId('educational-card')).toBeInTheDocument()
    // Yara's name should be visible
    expect(screen.getByRole('heading', { name: 'Yara' })).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('palavras "errou"/"perdeu"/"game over" ausentes', () => {
    renderGameScreen()
    const body = document.body.textContent?.toLowerCase() ?? ''
    expect(body).not.toContain('errou')
    expect(body).not.toContain('perdeu')
    expect(body).not.toContain('game over')
  })

  it('banner de erro quando error !== null (não expirou)', () => {
    mockError = 'Conexão perdida. Tentando reconectar…'
    renderGameScreen()

    expect(screen.getByRole('alert')).toHaveTextContent('Conexão perdida. Tentando reconectar…')
  })

  it('exibe mensagem de encorajamento quando last_action="wrong_guess" (MPL-25)', () => {
    mockRoom = makeRoom({ last_action: 'wrong_guess' })
    renderGameScreen()

    expect(screen.getByRole('alert')).toHaveTextContent('Quase lá! Vamos tentar outra pergunta')
  })

  it('askQuestion NÃO é chamado quando isMyTurn=false (MPL-21)', async () => {
    mockIsMyTurn = false
    mockRoom = makeRoom({ current_turn: 'guest' })
    renderGameScreen()

    const firstQuestion = phase1Questions[0]
    await act(async () => {
      fireEvent.click(screen.getByText(firstQuestion.text))
      await Promise.resolve()
    })

    expect(mockAskQuestion).not.toHaveBeenCalled()
  })

  it('reciclagem de perguntas quando todas foram feitas (MPL-20)', () => {
    mockMyAskedQuestionIds = phase1Questions.map(q => q.id)
    renderGameScreen()

    const questionBtns = screen.getAllByTestId('question-btn')
    const disabledBtns = questionBtns.filter(btn => btn.hasAttribute('disabled'))
    expect(disabledBtns).toHaveLength(0)
  })

  it('savePhaseComplete + navigate /phases quando "Próximo" clicado (MPL-27)', async () => {
    vi.useFakeTimers()

    mockRoom = makeRoom({ status: 'finished', winner: 'host' })
    mockMyRole = 'host'
    mockOpponentSecretCharId = 'yara'
    renderGameScreen()

    act(() => { vi.advanceTimersByTime(2500) })

    const proximoBtn = screen.getByRole('button', { name: /próximo/i })
    await act(async () => { fireEvent.click(proximoBtn) })

    expect(mockSavePhaseComplete).toHaveBeenCalledWith(1)
    expect(mockNavigate).toHaveBeenCalledWith('/phases')
    vi.useRealTimers()
  })
})
