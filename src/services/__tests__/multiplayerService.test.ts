import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockSelect = vi.fn()
const mockEq = vi.fn()
const mockSingle = vi.fn()
const mockFrom = vi.fn()
const mockInsert = vi.fn()
const mockUpdate = vi.fn()

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: mockFrom,
  })),
}))

// Import AFTER mocking
const {
  generateRoomCode,
  createRoom,
  joinRoom,
  startGame,
  askQuestion,
  makeGuess,
  subscribeToRoom,
} = await import('../multiplayerService')

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeRoom(overrides: Partial<Record<string, unknown>> = {}): Record<string, unknown> {
  return {
    room_id: 'room-uuid-1',
    room_code: 'ABCDEF',
    phase: 1,
    host_session_id: 'host-session',
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
    status: 'waiting',
    winner: null,
    created_at: '2026-01-01T00:00:00Z',
    last_activity_at: '2026-01-01T00:00:00Z',
    ...overrides,
  }
}

// Setup chains for insert → select → single
function setupInsertChain(result: { data: unknown; error: unknown }) {
  mockSingle.mockResolvedValue(result)
  mockSelect.mockReturnValue({ single: mockSingle })
  mockInsert.mockReturnValue({ select: mockSelect })
  mockFrom.mockReturnValue({ insert: mockInsert })
}

// Setup update chain (kept for potential future use)
// eslint-disable-next-line @typescript-eslint/no-unused-vars

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('generateRoomCode', () => {
  it('retorna string de 6 chars uppercase', () => {
    const code = generateRoomCode()
    expect(code).toHaveLength(6)
    expect(code).toBe(code.toUpperCase())
    expect(code).toMatch(/^[A-Z0-9]{6}$/)
  })
})

describe('createRoom', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('happy path — insere linha e retorna room', async () => {
    const room = makeRoom()
    setupInsertChain({ data: room, error: null })

    const result = await createRoom('host-session')

    expect(mockFrom).toHaveBeenCalledWith('multiplayer_rooms')
    expect(result).toEqual(room)
  })

  it('falha Supabase → rejeita com erro', async () => {
    setupInsertChain({ data: null, error: { message: 'DB error', code: 'OTHER' } })

    await expect(createRoom('host-session')).rejects.toThrow('DB error')
  })

  it('timeout → rejeita após 5s com mensagem amigável (MPL-11)', async () => {
    vi.useFakeTimers()

    mockSingle.mockReturnValue(new Promise(() => {}))
    mockSelect.mockReturnValue({ single: mockSingle })
    mockInsert.mockReturnValue({ select: mockSelect })
    mockFrom.mockReturnValue({ insert: mockInsert })

    const promise = createRoom('host-session')
    vi.advanceTimersByTime(5001)

    await expect(promise).rejects.toThrow('Tempo esgotado. Tente novamente.')
  })

  it('retry em colisão de código (MPL-33) — 2ª tentativa tem sucesso', async () => {
    const room = makeRoom()

    // First attempt: unique constraint violation
    mockSingle
      .mockResolvedValueOnce({ data: null, error: { code: '23505', message: 'duplicate key' } })
      // Second attempt: success
      .mockResolvedValueOnce({ data: room, error: null })

    mockSelect.mockReturnValue({ single: mockSingle })
    mockInsert.mockReturnValue({ select: mockSelect })
    mockFrom.mockReturnValue({ insert: mockInsert })

    const result = await createRoom('host-session')
    expect(result).toEqual(room)
    expect(mockInsert).toHaveBeenCalledTimes(2)
  })
})

describe('joinRoom', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('happy path — atualiza guest_session_id', async () => {
    const room = makeRoom()
    const updatedRoom = makeRoom({ guest_session_id: 'guest-session' })

    // First call: fetch room
    mockSingle
      .mockResolvedValueOnce({ data: room, error: null })
      .mockResolvedValueOnce({ data: updatedRoom, error: null })

    const mockUpdateEq = vi.fn().mockReturnValue({ select: vi.fn().mockReturnValue({ single: mockSingle }) })
    mockUpdate.mockReturnValue({ eq: mockUpdateEq })

    mockEq.mockReturnValue({ single: mockSingle })
    mockSelect.mockReturnValue({ eq: mockEq })

    mockFrom.mockReturnValue({
      select: mockSelect,
      update: mockUpdate,
    })

    const result = await joinRoom('ABCDEF', 'guest-session')

    expect(result).toEqual(updatedRoom)
  })

  it('sala não encontrada → erro "Sala não encontrada."', async () => {
    mockSingle.mockResolvedValue({ data: null, error: { code: 'PGRST116', message: 'not found' } })
    mockEq.mockReturnValue({ single: mockSingle })
    mockSelect.mockReturnValue({ eq: mockEq })
    mockFrom.mockReturnValue({ select: mockSelect })

    await expect(joinRoom('XXXXXX', 'guest-session')).rejects.toThrow('Sala não encontrada.')
  })

  it('sala cheia → erro "Sala cheia."', async () => {
    const fullRoom = makeRoom({ guest_session_id: 'someone-else', status: 'waiting' })

    mockSingle.mockResolvedValue({ data: fullRoom, error: null })
    mockEq.mockReturnValue({ single: mockSingle })
    mockSelect.mockReturnValue({ eq: mockEq })
    mockFrom.mockReturnValue({ select: mockSelect })

    await expect(joinRoom('ABCDEF', 'guest-session')).rejects.toThrow('Sala cheia.')
  })
})

describe('startGame', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('atribui dois chars distintos', async () => {
    let capturedUpdate: Record<string, unknown> | null = null

    const mockUpdateEq = vi.fn().mockResolvedValue({ error: null })
    mockUpdate.mockImplementation((data: Record<string, unknown>) => {
      capturedUpdate = data
      return { eq: mockUpdateEq }
    })
    mockFrom.mockReturnValue({ update: mockUpdate })

    await startGame('room-uuid-1')

    expect(capturedUpdate).not.toBeNull()
    expect(capturedUpdate!.host_secret_char_id).toBeTruthy()
    expect(capturedUpdate!.guest_secret_char_id).toBeTruthy()
    expect(capturedUpdate!.host_secret_char_id).not.toBe(capturedUpdate!.guest_secret_char_id)
    const validIds = ['aie', 'kojo', 'zumbi', 'amara']
    expect(validIds).toContain(capturedUpdate!.host_secret_char_id)
    expect(validIds).toContain(capturedUpdate!.guest_secret_char_id)
  })
})

describe('askQuestion', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('atualiza campos corretos e inverte turno', async () => {
    // First call: fetch asked_q_ids
    const fetchSingle = vi.fn().mockResolvedValue({
      data: { host_asked_q_ids: [], current_turn: 'host' },
      error: null,
    })
    const fetchEq = vi.fn().mockReturnValue({ single: fetchSingle })
    const fetchSelect = vi.fn().mockReturnValue({ eq: fetchEq })

    // Second call: update
    let capturedUpdate: Record<string, unknown> | null = null
    const updateEq = vi.fn().mockResolvedValue({ error: null })
    mockUpdate.mockImplementation((data: Record<string, unknown>) => {
      capturedUpdate = data
      return { eq: updateEq }
    })

    mockFrom.mockReturnValue({
      select: fetchSelect,
      update: mockUpdate,
    })

    await askQuestion('room-uuid-1', 'q-turbante', 'host', true)

    expect(capturedUpdate).not.toBeNull()
    expect(capturedUpdate!.last_question_id).toBe('q-turbante')
    expect(capturedUpdate!.last_answer).toBe(true)
    expect(capturedUpdate!.current_turn).toBe('guest') // inverted from 'host'
    expect(capturedUpdate!.host_asked_q_ids).toContain('q-turbante')
  })
})

describe('makeGuess', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('acerto → status="finished", winner setado', async () => {
    let capturedUpdate: Record<string, unknown> | null = null

    const updateEq = vi.fn().mockResolvedValue({ error: null })
    mockUpdate.mockImplementation((data: Record<string, unknown>) => {
      capturedUpdate = data
      return { eq: updateEq }
    })
    mockFrom.mockReturnValue({ update: mockUpdate })

    const cardStates = { aie: 'active' as const, kojo: 'active' as const }
    await makeGuess('room-uuid-1', 'kojo', 'host', 'kojo', cardStates)

    expect(capturedUpdate!.status).toBe('finished')
    expect(capturedUpdate!.winner).toBe('host')
  })

  it('erro → cartas restauradas, turno invertido', async () => {
    let capturedUpdate: Record<string, unknown> | null = null

    const updateEq = vi.fn().mockResolvedValue({ error: null })
    mockUpdate.mockImplementation((data: Record<string, unknown>) => {
      capturedUpdate = data
      return { eq: updateEq }
    })
    mockFrom.mockReturnValue({ update: mockUpdate })

    const cardStates = { aie: 'eliminated' as const, kojo: 'active' as const, zumbi: 'eliminated' as const }
    await makeGuess('room-uuid-1', 'aie', 'host', 'kojo', cardStates)

    expect(capturedUpdate!.status).toBeUndefined()
    expect(capturedUpdate!.current_turn).toBe('guest')
    expect(capturedUpdate!.last_action).toBe('wrong_guess')
    const restoredStates = capturedUpdate!.host_card_states as Record<string, string>
    expect(restoredStates.aie).toBe('active')
    expect(restoredStates.kojo).toBe('active')
    expect(restoredStates.zumbi).toBe('active')
  })
})

describe('subscribeToRoom', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('chama onUpdate a cada 2s e cleanup cancela o intervalo', async () => {
    const room = makeRoom()
    mockSingle.mockResolvedValue({ data: room, error: null })
    mockEq.mockReturnValue({ single: mockSingle })
    mockSelect.mockReturnValue({ eq: mockEq })
    mockFrom.mockReturnValue({ select: mockSelect })

    const onUpdate = vi.fn()
    const cleanup = subscribeToRoom('room-uuid-1', onUpdate)

    expect(typeof cleanup).toBe('function')

    // Avança 2s → primeira chamada
    await vi.advanceTimersByTimeAsync(2000)
    expect(onUpdate).toHaveBeenCalledTimes(1)
    expect(onUpdate).toHaveBeenCalledWith(room)

    // Avança mais 2s → segunda chamada
    await vi.advanceTimersByTimeAsync(2000)
    expect(onUpdate).toHaveBeenCalledTimes(2)

    // Cleanup cancela o intervalo
    cleanup()
    await vi.advanceTimersByTimeAsync(4000)
    expect(onUpdate).toHaveBeenCalledTimes(2)
  })
})
