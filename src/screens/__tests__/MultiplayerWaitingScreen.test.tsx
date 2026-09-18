import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import MultiplayerWaitingScreen from '@/screens/MultiplayerWaitingScreen'
import type { MultiplayerRoom } from '@/types'

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const mockStartGame = vi.fn().mockResolvedValue(undefined)

let mockRoom: MultiplayerRoom | null = null
let mockMyRole: 'host' | 'guest' | null = 'host'

vi.mock('@/context/MultiplayerContext', () => ({
  useMultiplayer: () => ({
    room: mockRoom,
    myRole: mockMyRole,
    isMyTurn: false,
    myCardStates: {},
    myAskedQuestionIds: [],
    opponentSecretCharId: null,
    error: null,
    createRoom: vi.fn(),
    joinRoom: vi.fn(),
    startGame: mockStartGame,
    askQuestion: vi.fn(),
    toggleCard: vi.fn(),
    makeGuess: vi.fn(),
    leaveRoom: vi.fn(),
  }),
}))

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeRoom(overrides: Partial<MultiplayerRoom> = {}): MultiplayerRoom {
  return {
    room_id: 'room-uuid-1',
    room_code: 'XYZABC',
    phase: 1,
    host_session_id: 'host-session-id',
    guest_session_id: null,
    host_secret_char_id: null,
    guest_secret_char_id: null,
    current_turn: 'host',
    host_card_states: {},
    guest_card_states: {},
    host_asked_q_ids: [],
    guest_asked_q_ids: [],
    last_question_id: null,
    last_answer: null,
    last_action: null,
    status: 'waiting',
    winner: null,
    created_at: '2026-01-01T00:00:00Z',
    last_activity_at: '2026-01-01T00:00:00Z',
    ...overrides,
  }
}

function renderWaiting() {
  return render(
    <MemoryRouter>
      <MultiplayerWaitingScreen />
    </MemoryRouter>,
  )
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('MultiplayerWaitingScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockMyRole = 'host'
    mockRoom = makeRoom()
  })

  it('host vê código da sala', () => {
    mockRoom = makeRoom({ room_code: 'XYZABC' })
    renderWaiting()

    expect(screen.getByTestId('room-code')).toHaveTextContent('XYZABC')
  })

  it('host vê "Aguardando adversário…" sem guest', () => {
    mockRoom = makeRoom({ guest_session_id: null })
    renderWaiting()

    expect(screen.getByText('Aguardando adversário…')).toBeInTheDocument()
  })

  it('host vê "Adversário conectado!" com guest', () => {
    mockRoom = makeRoom({ guest_session_id: 'guest-session-id' })
    renderWaiting()

    expect(screen.getByText('Adversário conectado!')).toBeInTheDocument()
  })

  it('botão "Iniciar" desabilitado sem guest, habilitado com guest', () => {
    mockRoom = makeRoom({ guest_session_id: null })
    renderWaiting()

    const btn = screen.getByRole('button', { name: /iniciar/i })
    expect(btn).toBeDisabled()

    // Now with guest
    mockRoom = makeRoom({ guest_session_id: 'guest-session-id' })
    const { unmount } = renderWaiting()
    const btn2 = screen.getAllByRole('button', { name: /iniciar/i })[1]
    expect(btn2).not.toBeDisabled()
    unmount()
  })

  it('quando status="playing" → navega para /multiplayer/game', () => {
    mockRoom = makeRoom({ status: 'playing' })
    renderWaiting()

    expect(mockNavigate).toHaveBeenCalledWith('/multiplayer/game')
  })

  it('guest vê "Aguardando host iniciar…"', () => {
    mockMyRole = 'guest'
    mockRoom = makeRoom({ guest_session_id: 'guest-session-id' })
    renderWaiting()

    expect(screen.getByText('Aguardando host iniciar…')).toBeInTheDocument()
  })

  it('"Iniciar" chama startGame quando habilitado', async () => {
    const user = userEvent.setup()
    mockRoom = makeRoom({ guest_session_id: 'guest-session-id' })
    renderWaiting()

    await user.click(screen.getByRole('button', { name: /iniciar/i }))

    expect(mockStartGame).toHaveBeenCalled()
  })
})
