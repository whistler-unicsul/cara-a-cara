import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import MenuScreen from '@/screens/MenuScreen'

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('@/services/AudioManager', () => ({
  audioManager: {
    play: vi.fn().mockResolvedValue(undefined),
    stop: vi.fn(),
    isPlaying: false,
  },
}))

import { audioManager } from '@/services/AudioManager'
const mockAudioManager = audioManager as unknown as { play: ReturnType<typeof vi.fn>; stop: ReturnType<typeof vi.fn> }

// ── Helpers ───────────────────────────────────────────────────────────────────

function renderMenu() {
  return render(
    <MemoryRouter>
      <MenuScreen />
    </MemoryRouter>,
  )
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('MenuScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the game title/logo', () => {
    renderMenu()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Cara a Cara Brasil')
  })

  it('renders the 3 buttons with correct labels', () => {
    renderMenu()
    expect(screen.getByRole('button', { name: /iniciar jogo/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /instruções/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /configurações/i })).toBeInTheDocument()
  })

  it('renders "Multijogador" button and navigates to /multiplayer on click', async () => {
    const user = userEvent.setup()
    renderMenu()

    const multiBtn = screen.getByRole('button', { name: /multijogador/i })
    expect(multiBtn).toBeInTheDocument()

    await user.click(multiBtn)

    expect(mockNavigate).toHaveBeenCalledWith('/multiplayer')
  })

  it('"Iniciar Jogo" button click → navigate called with /avatar', async () => {
    const user = userEvent.setup()
    renderMenu()

    await user.click(screen.getByRole('button', { name: /iniciar jogo/i }))

    expect(mockNavigate).toHaveBeenCalledWith('/avatar')
  })

  it('onFocus on button → audioManager.play called', async () => {
    const user = userEvent.setup()
    renderMenu()

    const btn = screen.getByRole('button', { name: /iniciar jogo/i })
    await user.tab() // focus first focusable element
    btn.focus()

    // Trigger focus event directly
    btn.dispatchEvent(new FocusEvent('focus', { bubbles: true }))

    expect(mockAudioManager.play).toHaveBeenCalled()
  })

  it('buttons have minHeight 44px style for touch target', () => {
    renderMenu()
    const buttons = screen.getAllByRole('button')
    const menuButtons = buttons.filter(btn => btn.classList.contains('menu-btn'))
    menuButtons.forEach(btn => {
      const style = (btn as HTMLButtonElement).style
      expect(style.minHeight).toBe('44px')
    })
  })

  it('"Instruções" button click → shows instructions overlay', async () => {
    const user = userEvent.setup()
    renderMenu()

    await user.click(screen.getByRole('button', { name: /instruções/i }))

    expect(screen.getByRole('dialog', { name: /instruções do jogo/i })).toBeInTheDocument()
  })

  // ── Accessibility assertions (T26) ─────────────────────────────────────────

  it('all menu buttons have accessible text', () => {
    renderMenu()
    const iniciar = screen.getByRole('button', { name: /iniciar jogo/i })
    const instrucoes = screen.getByRole('button', { name: /instruções/i })
    const multi = screen.getByRole('button', { name: /multijogador/i })
    const config = screen.getByRole('button', { name: /configurações/i })

    expect(iniciar.textContent).not.toBe('')
    expect(instrucoes.textContent).not.toBe('')
    expect(multi.textContent).not.toBe('')
    expect(config.textContent).not.toBe('')
  })

  it('menu buttons meet 44px touch target requirement', () => {
    renderMenu()
    const menuButtons = screen.getAllByRole('button').filter(btn => btn.classList.contains('menu-btn'))
    menuButtons.forEach(btn => {
      expect((btn as HTMLButtonElement).style.minHeight).toBe('44px')
    })
  })

  it('"Configurações" button opens AccessibilitySettings overlay', async () => {
    const user = userEvent.setup()
    renderMenu()

    await user.click(screen.getByRole('button', { name: /configurações/i }))

    expect(screen.getByRole('dialog', { name: /configurações de acessibilidade/i })).toBeInTheDocument()
  })
})
