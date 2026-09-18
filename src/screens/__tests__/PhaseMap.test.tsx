import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import PhaseMap from '@/screens/PhaseMap'

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// We need to control completedPhases — mock useGame
let mockCompletedPhases: number[] = []
let mockNickname = ''

vi.mock('@/context/GameContext', async () => {
  const actual = await vi.importActual<typeof import('@/context/GameContext')>('@/context/GameContext')
  return {
    ...actual,
    useGame: () => ({
      screen: 'PHASE_MAP',
      sessionId: 'test-uuid',
      avatar: null,
      nickname: mockNickname,
      completedPhases: mockCompletedPhases,
      currentPhase: null,
      secretCharacterId: null,
      cardStates: {},
      askedQuestionIds: [],
      lastAnswer: null,
      accessibilityHighContrast: false,
      dispatch: vi.fn(),
    }),
  }
})

// ── Helpers ───────────────────────────────────────────────────────────────────

function renderPhaseMap() {
  return render(
    <MemoryRouter>
      <PhaseMap />
    </MemoryRouter>,
  )
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('PhaseMap', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockCompletedPhases = []
    mockNickname = ''
  })

  it('Phase 1 click → navigate to /game/1', async () => {
    const user = userEvent.setup()
    renderPhaseMap()

    const phase1Btn = screen.getByRole('button', { name: /fase 1/i })
    await user.click(phase1Btn)

    expect(mockNavigate).toHaveBeenCalledWith('/game/1')
  })

  it('Phases 2-4 have aria-disabled="true"', () => {
    renderPhaseMap()

    const allButtons = screen.getAllByRole('button')
    // Find locked phase buttons by aria-disabled
    const disabledButtons = allButtons.filter(btn => btn.getAttribute('aria-disabled') === 'true')
    expect(disabledButtons.length).toBeGreaterThanOrEqual(3)
  })

  it('when completedPhases=[1] → shows "Concluída" badge on Phase 1', () => {
    mockCompletedPhases = [1]
    renderPhaseMap()

    expect(screen.getByText('Concluída')).toBeInTheDocument()
  })

  it('when completedPhases=[] → no "Concluída" badge visible', () => {
    mockCompletedPhases = []
    renderPhaseMap()

    expect(screen.queryByText('Concluída')).not.toBeInTheDocument()
  })

  it('shows user nickname when available', () => {
    mockNickname = 'Herói'
    renderPhaseMap()

    expect(screen.getByText(/Herói/i)).toBeInTheDocument()
  })
})
