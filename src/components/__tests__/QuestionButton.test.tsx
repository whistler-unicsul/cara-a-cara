import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuestionButton from '@/components/QuestionButton'
import type { Question } from '@/types'

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockPlay = vi.fn().mockResolvedValue(undefined)
const mockStop = vi.fn()
let mockIsPlaying = false

vi.mock('@/context/AudioContext', () => ({
  useAudio: () => ({
    play: mockPlay,
    stop: mockStop,
    get isPlaying() {
      return mockIsPlaying
    },
  }),
}))

// ── Fixtures ──────────────────────────────────────────────────────────────────

const mockQuestion: Question = {
  id: 'q-turbante',
  text: 'Essa pessoa usa turbante?',
  audioPath: 'assets/audio/questions/q-turbante.mp3',
  iconEmoji: '🎩',
  phaseIds: [1],
  answers: { aie: false, kojo: true },
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('QuestionButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockIsPlaying = false
  })

  it('renders icon emoji, question text, and speaker icon', () => {
    render(<QuestionButton question={mockQuestion} onClick={vi.fn()} />)
    expect(screen.getByText('🎩')).toBeInTheDocument()
    expect(screen.getByText('Essa pessoa usa turbante?')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /reproduzir áudio/i })).toBeInTheDocument()
  })

  it('click calls play with audioPath then onClick', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<QuestionButton question={mockQuestion} onClick={onClick} />)

    await user.click(screen.getByRole('button'))

    expect(mockPlay).toHaveBeenCalledWith('assets/audio/questions/q-turbante.mp3')
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('disabled button prevents click and has aria-disabled', () => {
    render(<QuestionButton question={mockQuestion} disabled={true} onClick={vi.fn()} />)
    const btn = screen.getByRole('button')
    expect(btn).toHaveAttribute('aria-disabled', 'true')
    expect(btn).toBeDisabled()
  })

  it('disabled button does not call onClick when clicked', () => {
    const onClick = vi.fn()
    render(<QuestionButton question={mockQuestion} disabled={true} onClick={onClick} />)

    // Use fireEvent since pointer-events: none prevents userEvent.click
    fireEvent.click(screen.getByRole('button'))

    expect(onClick).not.toHaveBeenCalled()
    expect(mockPlay).not.toHaveBeenCalled()
  })

  it('has minHeight 44px for touch target', () => {
    render(<QuestionButton question={mockQuestion} onClick={vi.fn()} />)
    const btn = screen.getByRole('button')
    expect(btn.style.minHeight).toBe('44px')
  })

  it('applies question-btn--playing class when audio is playing (CAC-19)', () => {
    mockIsPlaying = true
    render(<QuestionButton question={mockQuestion} onClick={vi.fn()} />)
    const btn = screen.getByRole('button')
    expect(btn.classList.contains('question-btn--playing')).toBe(true)
  })

  it('does not apply question-btn--playing class when audio is not playing', () => {
    mockIsPlaying = false
    render(<QuestionButton question={mockQuestion} onClick={vi.fn()} />)
    const btn = screen.getByRole('button')
    expect(btn.classList.contains('question-btn--playing')).toBe(false)
  })
})
