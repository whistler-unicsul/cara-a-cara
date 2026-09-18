import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import CelebrationOverlay from '@/components/CelebrationOverlay'

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('CelebrationOverlay', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('does not render anything when isVisible=false', () => {
    const { container } = render(
      <CelebrationOverlay isVisible={false} onComplete={vi.fn()} />,
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders overlay with particles when isVisible=true', () => {
    render(<CelebrationOverlay isVisible={true} onComplete={vi.fn()} />)
    const particles = document.querySelectorAll('.celebration-particle')
    expect(particles.length).toBeGreaterThanOrEqual(20)
  })

  it('shows overlay container when isVisible=true', () => {
    render(<CelebrationOverlay isVisible={true} onComplete={vi.fn()} />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('calls onComplete after 2500ms', () => {
    const onComplete = vi.fn()
    render(<CelebrationOverlay isVisible={true} onComplete={onComplete} />)

    expect(onComplete).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(2500)
    })

    expect(onComplete).toHaveBeenCalledOnce()
  })

  it('does not call onComplete before 2500ms', () => {
    const onComplete = vi.fn()
    render(<CelebrationOverlay isVisible={true} onComplete={onComplete} />)

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(onComplete).not.toHaveBeenCalled()
  })
})
