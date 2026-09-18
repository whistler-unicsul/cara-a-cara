import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AccessibilitySettings from '@/components/AccessibilitySettings'

// ── Helpers ───────────────────────────────────────────────────────────────────

function renderOpen(onClose = vi.fn()) {
  return render(<AccessibilitySettings isOpen={true} onClose={onClose} />)
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('AccessibilitySettings', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset data-theme and localStorage before each test
    delete document.documentElement.dataset.theme
    localStorage.removeItem('cac-high-contrast')
  })

  afterEach(() => {
    delete document.documentElement.dataset.theme
    localStorage.removeItem('cac-high-contrast')
  })

  it('renders nothing when isOpen=false', () => {
    render(<AccessibilitySettings isOpen={false} onClose={vi.fn()} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders dialog with Alto Contraste toggle when isOpen=true', () => {
    renderOpen()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Alto Contraste')).toBeInTheDocument()
    expect(screen.getByRole('switch', { name: /alto contraste/i })).toBeInTheDocument()
  })

  it('toggle ON → sets data-theme high-contrast and localStorage', async () => {
    const user = userEvent.setup()
    renderOpen()

    const toggle = screen.getByRole('switch', { name: /alto contraste/i })
    expect(toggle).toHaveAttribute('aria-checked', 'false')

    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-checked', 'true')
    expect(document.documentElement.dataset.theme).toBe('high-contrast')
    expect(localStorage.getItem('cac-high-contrast')).toBe('true')
  })

  it('toggle OFF → removes data-theme and localStorage entry', async () => {
    const user = userEvent.setup()
    // Pre-set high contrast
    document.documentElement.dataset.theme = 'high-contrast'
    localStorage.setItem('cac-high-contrast', 'true')

    renderOpen()

    const toggle = screen.getByRole('switch', { name: /alto contraste/i })
    // Should start checked because localStorage has 'true'
    expect(toggle).toHaveAttribute('aria-checked', 'true')

    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-checked', 'false')
    expect(document.documentElement.dataset.theme).toBeUndefined()
    expect(localStorage.getItem('cac-high-contrast')).toBeNull()
  })

  it('restores high-contrast state from localStorage on mount', () => {
    localStorage.setItem('cac-high-contrast', 'true')
    renderOpen()

    const toggle = screen.getByRole('switch', { name: /alto contraste/i })
    expect(toggle).toHaveAttribute('aria-checked', 'true')
    expect(document.documentElement.dataset.theme).toBe('high-contrast')
  })

  it('close button calls onClose', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<AccessibilitySettings isOpen={true} onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: /fechar configurações/i }))

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('pressing Escape calls onClose', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<AccessibilitySettings isOpen={true} onClose={onClose} />)

    await user.keyboard('{Escape}')

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('dialog has role="dialog" and aria-modal="true"', () => {
    renderOpen()
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
  })
})
