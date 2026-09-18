import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import MultiplayerLobbyScreen from '@/screens/MultiplayerLobbyScreen'

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const mockCreateRoom = vi.fn().mockResolvedValue(undefined)
const mockJoinRoom = vi.fn().mockResolvedValue(undefined)
let mockError: string | null = null

vi.mock('@/context/MultiplayerContext', () => ({
  useMultiplayer: () => ({
    room: null,
    myRole: null,
    isMyTurn: false,
    myCardStates: {},
    myAskedQuestionIds: [],
    opponentSecretCharId: null,
    error: mockError,
    createRoom: mockCreateRoom,
    joinRoom: mockJoinRoom,
    startGame: vi.fn(),
    askQuestion: vi.fn(),
    toggleCard: vi.fn(),
    makeGuess: vi.fn(),
    leaveRoom: vi.fn(),
  }),
}))

// ── Helpers ───────────────────────────────────────────────────────────────────

function renderLobby() {
  return render(
    <MemoryRouter>
      <MultiplayerLobbyScreen />
    </MemoryRouter>,
  )
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('MultiplayerLobbyScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockError = null
  })

  it('renderiza título "Multijogador" e dois botões principais', () => {
    renderLobby()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Multijogador')
    expect(screen.getByRole('button', { name: /criar partida/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar em partida/i })).toBeInTheDocument()
  })

  it('"Criar Partida" chama createRoom e navega para /multiplayer/waiting', async () => {
    const user = userEvent.setup()
    renderLobby()

    await user.click(screen.getByRole('button', { name: /criar partida/i }))

    expect(mockCreateRoom).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('/multiplayer/waiting')
  })

  it('"Entrar em Partida" exibe campo de input', async () => {
    const user = userEvent.setup()
    renderLobby()

    await user.click(screen.getByRole('button', { name: /entrar em partida/i }))

    expect(screen.getByRole('textbox', { name: /código da sala/i })).toBeInTheDocument()
  })

  it('input converte para uppercase automaticamente', async () => {
    const user = userEvent.setup()
    renderLobby()

    await user.click(screen.getByRole('button', { name: /entrar em partida/i }))

    const input = screen.getByRole('textbox', { name: /código da sala/i })
    await user.type(input, 'abcdef')

    expect(input).toHaveValue('ABCDEF')
  })

  it('"Entrar" chama joinRoom com código correto', async () => {
    const user = userEvent.setup()
    renderLobby()

    await user.click(screen.getByRole('button', { name: /entrar em partida/i }))

    const input = screen.getByRole('textbox', { name: /código da sala/i })
    await user.type(input, 'XYZABC')

    await user.click(screen.getByRole('button', { name: /^entrar$/i }))

    expect(mockJoinRoom).toHaveBeenCalledWith('XYZABC')
    expect(mockNavigate).toHaveBeenCalledWith('/multiplayer/waiting')
  })

  it('mensagem de erro exibida quando error não é null', () => {
    mockError = 'Sala não encontrada.'
    renderLobby()

    expect(screen.getByRole('alert')).toHaveTextContent('Sala não encontrada.')
  })
})
