import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InstructionsOverlay from '@/components/InstructionsOverlay'

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock('@/services/AudioManager', () => ({
  audioManager: {
    play: vi.fn().mockResolvedValue(undefined),
    stop: vi.fn(),
    isPlaying: false,
  },
}))

import { audioManager } from '@/services/AudioManager'
const mockPlay = (audioManager as unknown as { play: ReturnType<typeof vi.fn> }).play

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('InstructionsOverlay', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('isOpen={false} → does not render overlay', () => {
    render(<InstructionsOverlay isOpen={false} onClose={vi.fn()} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('isOpen={true} → renders 3 instruction steps', () => {
    render(<InstructionsOverlay isOpen={true} onClose={vi.fn()} />)
    const items = screen.getAllByRole('listitem')
    expect(items.length).toBeGreaterThanOrEqual(3)
  })

  it('click on close button → onClose called', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<InstructionsOverlay isOpen={true} onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: /fechar instruções/i }))

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('clicking backdrop (outside modal) → onClose called', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<InstructionsOverlay isOpen={true} onClose={onClose} />)

    // Click on the dialog element itself (which is the backdrop)
    const dialog = screen.getByRole('dialog')
    await user.click(dialog)

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('when isOpen changes from false to true → audioManager.play called', () => {
    const { rerender } = render(<InstructionsOverlay isOpen={false} onClose={vi.fn()} />)

    expect(mockPlay).not.toHaveBeenCalled()

    rerender(<InstructionsOverlay isOpen={true} onClose={vi.fn()} />)

    expect(mockPlay).toHaveBeenCalledWith('assets/audio/ui/instructions.mp3')
  })

  it('renders How to Play title when open', () => {
    render(<InstructionsOverlay isOpen={true} onClose={vi.fn()} />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Como Jogar')
  })
})
