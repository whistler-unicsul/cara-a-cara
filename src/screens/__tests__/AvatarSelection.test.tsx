import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import AvatarSelection from '@/screens/AvatarSelection'

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockNavigate = vi.fn()
const mockDispatch = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('@/context/GameContext', async () => {
  const actual = await vi.importActual<typeof import('@/context/GameContext')>('@/context/GameContext')
  return {
    ...actual,
    useGame: () => ({
      screen: 'AVATAR_SELECTION',
      sessionId: 'test-uuid',
      avatar: null,
      nickname: '',
      completedPhases: [],
      currentPhase: null,
      secretCharacterId: null,
      cardStates: {},
      askedQuestionIds: [],
      lastAnswer: null,
      accessibilityHighContrast: false,
      dispatch: mockDispatch,
    }),
  }
})

// ── Helpers ───────────────────────────────────────────────────────────────────

function renderAvatarSelection() {
  return render(
    <MemoryRouter>
      <AvatarSelection />
    </MemoryRouter>,
  )
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('AvatarSelection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.setItem('cara-a-cara-session-id', 'test-uuid')
  })

  it('renders at least 6 avatars', () => {
    renderAvatarSelection()
    const buttons = screen.getAllByRole('button', { name: /leão|tartaruga|papagaio|flor|onda|estrela/i })
    expect(buttons.length).toBeGreaterThanOrEqual(6)
  })

  it('clicking an avatar adds the selected class (only that one highlighted)', async () => {
    const user = userEvent.setup()
    renderAvatarSelection()

    const leaoBtn = screen.getByRole('button', { name: /leão/i })
    await user.click(leaoBtn)

    expect(leaoBtn.classList.contains('avatar-btn--selected')).toBe(true)

    // All others should not be selected
    const tartarugaBtn = screen.getByRole('button', { name: /tartaruga/i })
    expect(tartarugaBtn.classList.contains('avatar-btn--selected')).toBe(false)
  })

  it('clicking another avatar changes the selection (only one highlighted)', async () => {
    const user = userEvent.setup()
    renderAvatarSelection()

    await user.click(screen.getByRole('button', { name: /leão/i }))
    await user.click(screen.getByRole('button', { name: /tartaruga/i }))

    expect(screen.getByRole('button', { name: /tartaruga/i }).classList.contains('avatar-btn--selected')).toBe(true)
    expect(screen.getByRole('button', { name: /leão/i }).classList.contains('avatar-btn--selected')).toBe(false)
  })

  it('input accepts text and reflects in value', async () => {
    const user = userEvent.setup()
    renderAvatarSelection()

    const input = screen.getByRole('textbox')
    await user.type(input, 'Jogador')

    expect((input as HTMLInputElement).value).toBe('Jogador')
  })

  it('input respects maxLength 12 attribute', () => {
    renderAvatarSelection()
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.maxLength).toBe(12)
  })

  it('"Jogar" button → dispatch SET_AVATAR + navigate /phases', async () => {
    const user = userEvent.setup()
    renderAvatarSelection()

    await user.click(screen.getByRole('button', { name: /leão/i }))
    await user.type(screen.getByRole('textbox'), 'Teste')
    await user.click(screen.getByRole('button', { name: /jogar/i }))

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'SET_AVATAR' }),
    )
    expect(mockNavigate).toHaveBeenCalledWith('/phases')
  })
})
