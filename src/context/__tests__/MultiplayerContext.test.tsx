import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, act, waitFor } from '@testing-library/react'
import { MultiplayerProvider, useMultiplayer } from '@/context/MultiplayerContext'
import type { MultiplayerRoom } from '@/types'

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock('@/services/multiplayerService', () => ({
  subscribeToRoom: vi.fn().mockReturnValue(vi.fn()),
  createRoom: vi.fn(),
  joinRoom: vi.fn(),
  startGame: vi.fn(),
  askQuestion: vi.fn(),
  makeGuess: vi.fn(),
  generateRoomCode: vi.fn().mockReturnValue('ABCDEF'),
}))

vi.mock('@/context/GameContext', () => ({
  useGame: vi.fn().mockReturnValue({
    sessionId: 'host-session-id',
    dispatch: vi.fn(),
  }),
}))

// ── Import after mocking ──────────────────────────────────────────────────────

import * as multiplayerService from '@/services/multiplayerService'
import { useGame } from '@/context/GameContext'

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeRoom(overrides: Partial<MultiplayerRoom> = {}): MultiplayerRoom {
  return {
    room_id: 'room-uuid-1',
    room_code: 'ABCDEF',
    phase: 1,
    host_session_id: 'host-session-id',
    guest_session_id: null,
    host_secret_char_id: 'aie',
    guest_secret_char_id: 'kojo',
    current_turn: 'host',
    host_card_states: { aie: 'active', kojo: 'active', zumbi: 'active', amara: 'active' },
    guest_card_states: { aie: 'active', kojo: 'active', zumbi: 'active', amara: 'active' },
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

// Consumer that exposes context values for testing
let capturedContext: ReturnType<typeof useMultiplayer> | null = null

function ContextConsumer() {
  capturedContext = useMultiplayer()
  return <div data-testid="consumer" />
}

async function renderAndCreateRoom(room: MultiplayerRoom, sessionId = 'host-session-id') {
  capturedContext = null
  vi.mocked(useGame).mockReturnValue({ sessionId, dispatch: vi.fn() } as unknown as ReturnType<typeof useGame>)
  vi.mocked(multiplayerService.createRoom).mockResolvedValue(room)

  render(
    <MultiplayerProvider>
      <ContextConsumer />
    </MultiplayerProvider>,
  )

  await act(async () => {
    await capturedContext!.createRoom()
  })

  return capturedContext!
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('MultiplayerContext — myRole', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(multiplayerService.subscribeToRoom).mockReturnValue(vi.fn())
  })

  it('myRole = "host" quando sessionId === host_session_id', async () => {
    const room = makeRoom({ host_session_id: 'host-session-id' })
    const ctx = await renderAndCreateRoom(room, 'host-session-id')

    expect(ctx.myRole).toBe('host')
  })

  it('myRole = "guest" quando sessionId === guest_session_id', async () => {
    const room = makeRoom({
      host_session_id: 'other-host',
      guest_session_id: 'guest-session-id',
    })
    const ctx = await renderAndCreateRoom(room, 'guest-session-id')

    expect(ctx.myRole).toBe('guest')
  })
})

describe('MultiplayerContext — isMyTurn', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(multiplayerService.subscribeToRoom).mockReturnValue(vi.fn())
  })

  it('isMyTurn true quando current_turn === myRole', async () => {
    const room = makeRoom({ current_turn: 'host', host_session_id: 'host-session-id' })
    const ctx = await renderAndCreateRoom(room, 'host-session-id')

    expect(ctx.isMyTurn).toBe(true)
  })

  it('isMyTurn false quando current_turn !== myRole', async () => {
    const room = makeRoom({ current_turn: 'guest', host_session_id: 'host-session-id' })
    const ctx = await renderAndCreateRoom(room, 'host-session-id')

    expect(ctx.isMyTurn).toBe(false)
  })
})

describe('MultiplayerContext — myCardStates', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(multiplayerService.subscribeToRoom).mockReturnValue(vi.fn())
  })

  it('myCardStates retorna campos corretos para host', async () => {
    const hostStates = { aie: 'active' as const, kojo: 'eliminated' as const }
    const room = makeRoom({
      host_session_id: 'host-session-id',
      host_card_states: hostStates,
    })
    const ctx = await renderAndCreateRoom(room, 'host-session-id')

    expect(ctx.myCardStates).toEqual(hostStates)
  })

  it('myCardStates retorna campos corretos para guest', async () => {
    const guestStates = { aie: 'eliminated' as const, kojo: 'active' as const }
    const room = makeRoom({
      host_session_id: 'other-host',
      guest_session_id: 'guest-session-id',
      guest_card_states: guestStates,
    })
    const ctx = await renderAndCreateRoom(room, 'guest-session-id')

    expect(ctx.myCardStates).toEqual(guestStates)
  })
})

describe('MultiplayerContext — opponentSecretCharId', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(multiplayerService.subscribeToRoom).mockReturnValue(vi.fn())
  })

  it('opponentSecretCharId correto para host (retorna guest_secret_char_id)', async () => {
    const room = makeRoom({
      host_session_id: 'host-session-id',
      host_secret_char_id: 'aie',
      guest_secret_char_id: 'kojo',
    })
    const ctx = await renderAndCreateRoom(room, 'host-session-id')

    expect(ctx.opponentSecretCharId).toBe('kojo')
  })

  it('opponentSecretCharId correto para guest', async () => {
    const room = makeRoom({
      host_session_id: 'other-host',
      guest_session_id: 'guest-session-id',
      host_secret_char_id: 'aie',
      guest_secret_char_id: 'kojo',
    })
    const ctx = await renderAndCreateRoom(room, 'guest-session-id')

    expect(ctx.opponentSecretCharId).toBe('aie')
  })
})

describe('MultiplayerContext — toggleCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(multiplayerService.subscribeToRoom).mockReturnValue(vi.fn())
  })

  it('toggleCard altera estado local sem chamar service', async () => {
    const room = makeRoom({
      host_session_id: 'host-session-id',
      host_card_states: { aie: 'active', kojo: 'active' },
    })
    await renderAndCreateRoom(room, 'host-session-id')

    act(() => {
      capturedContext!.toggleCard('aie')
    })

    // Verify service was NOT called for card toggle
    expect(multiplayerService.askQuestion).not.toHaveBeenCalled()
    expect(multiplayerService.makeGuess).not.toHaveBeenCalled()

    // Verify local state changed
    expect(capturedContext!.myCardStates['aie']).toBe('eliminated')
  })
})

describe('MultiplayerContext — room expired', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('room.status === "expired" → error setado', async () => {
    let subscribeCallback: ((room: MultiplayerRoom) => void) | null = null

    vi.mocked(multiplayerService.subscribeToRoom).mockImplementation(
      (_roomId: string, cb: (room: MultiplayerRoom) => void) => {
        subscribeCallback = cb
        return vi.fn()
      },
    )

    const room = makeRoom({ status: 'playing' })
    await renderAndCreateRoom(room, 'host-session-id')

    // Simulate realtime update with expired status
    act(() => {
      subscribeCallback!({ ...room, status: 'expired' })
    })

    await waitFor(() => {
      expect(capturedContext!.error).toBe('A partida expirou por inatividade.')
    })
  })
})
