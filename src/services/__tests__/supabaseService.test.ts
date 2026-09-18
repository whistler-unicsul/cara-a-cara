import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// ── Mocks ─────────────────────────────────────────────────────────────────────

// Mock before importing the module under test
const mockSelect = vi.fn()
const mockEq = vi.fn()
const mockSingle = vi.fn()
const mockFrom = vi.fn()
const mockUpsert = vi.fn()

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: mockFrom,
  })),
}))

// Import AFTER mocking
const { fetchProgress, upsertProgress } = await import('../supabaseService')

// ── Helpers ───────────────────────────────────────────────────────────────────

function setupFetchChain(result: { data: unknown; error: unknown }) {
  mockSingle.mockResolvedValue(result)
  mockEq.mockReturnValue({ single: mockSingle })
  mockSelect.mockReturnValue({ eq: mockEq })
  mockFrom.mockReturnValue({ select: mockSelect })
}

function setupUpsertChain(result: { error: unknown }) {
  mockUpsert.mockResolvedValue(result)
  mockFrom.mockReturnValue({ upsert: mockUpsert })
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('supabaseService — fetchProgress', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('retorna GameProgress quando Supabase retorna dados', async () => {
    const mockProgress = {
      session_id: 'abc-123',
      completed_phases: [1],
      updated_at: '2026-01-01T00:00:00Z',
    }

    setupFetchChain({ data: mockProgress, error: null })

    const result = await fetchProgress('abc-123')

    expect(result).toEqual(mockProgress)
    expect(mockFrom).toHaveBeenCalledWith('game_progress')
  })

  it('retorna null quando não há dados (PGRST116 — no rows found)', async () => {
    setupFetchChain({ data: null, error: { code: 'PGRST116', message: 'No rows found' } })

    const result = await fetchProgress('nao-existe')

    expect(result).toBeNull()
  })

  it('rejeita quando Supabase retorna erro genérico', async () => {
    setupFetchChain({ data: null, error: { code: 'OTHER', message: 'Erro de rede' } })

    await expect(fetchProgress('session-id')).rejects.toThrow('Erro de rede')
  })

  it('rejeita após 5s de timeout', async () => {
    vi.useFakeTimers()

    // Promise que nunca resolve — simula Supabase travado
    mockSingle.mockReturnValue(new Promise(() => {}))
    mockEq.mockReturnValue({ single: mockSingle })
    mockSelect.mockReturnValue({ eq: mockEq })
    mockFrom.mockReturnValue({ select: mockSelect })

    const promise = fetchProgress('timeout-session')

    // Avança o tempo em 5001ms para acionar o timeout
    vi.advanceTimersByTime(5001)

    await expect(promise).rejects.toThrow('Supabase timeout after 5000ms')
  })
})

describe('supabaseService — upsertProgress', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('chama upsert com os dados corretos', async () => {
    setupUpsertChain({ error: null })

    await upsertProgress('my-session', [1, 2])

    expect(mockFrom).toHaveBeenCalledWith('game_progress')
    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        session_id: 'my-session',
        completed_phases: [1, 2],
      }),
      expect.objectContaining({ onConflict: 'session_id' }),
    )
  })

  it('resolve sem erro quando upsert é bem-sucedido', async () => {
    setupUpsertChain({ error: null })

    await expect(upsertProgress('my-session', [1])).resolves.toBeUndefined()
  })

  it('rejeita quando Supabase retorna erro no upsert', async () => {
    setupUpsertChain({ error: { message: 'Falha no upsert' } })

    await expect(upsertProgress('bad-session', [])).rejects.toThrow('Falha no upsert')
  })

  it('rejeita após 5s de timeout no upsert', async () => {
    vi.useFakeTimers()

    // Promise que nunca resolve
    mockUpsert.mockReturnValue(new Promise(() => {}))
    mockFrom.mockReturnValue({ upsert: mockUpsert })

    const promise = upsertProgress('timeout-session', [1])

    vi.advanceTimersByTime(5001)

    await expect(promise).rejects.toThrow('Supabase timeout after 5000ms')
  })
})
