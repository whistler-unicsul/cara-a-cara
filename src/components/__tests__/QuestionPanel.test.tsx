import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import QuestionPanel from '@/components/QuestionPanel'
import type { Question } from '@/types'

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock('@/context/AudioContext', () => ({
  useAudio: () => ({
    play: vi.fn().mockResolvedValue(undefined),
    stop: vi.fn(),
    isPlaying: false,
  }),
}))

// ── Fixtures ──────────────────────────────────────────────────────────────────

function makeQuestion(id: string, text: string): Question {
  return {
    id,
    text,
    audioPath: `assets/audio/questions/${id}.mp3`,
    iconEmoji: '❓',
    phaseIds: [1],
    answers: {},
  }
}

const questions: Question[] = [
  makeQuestion('q-1', 'Pergunta 1?'),
  makeQuestion('q-2', 'Pergunta 2?'),
  makeQuestion('q-3', 'Pergunta 3?'),
  makeQuestion('q-4', 'Pergunta 4?'),
  makeQuestion('q-5', 'Pergunta 5?'),
  makeQuestion('q-6', 'Pergunta 6?'),
  makeQuestion('q-7', 'Pergunta 7?'),
  makeQuestion('q-8', 'Pergunta 8?'),
]

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('QuestionPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders at least 8 questions when given 8 props', () => {
    render(
      <QuestionPanel
        questions={questions}
        askedIds={[]}
        lastAnswer={null}
        onAsk={vi.fn()}
      />,
    )
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(8)
  })

  it('asked questions are disabled', () => {
    render(
      <QuestionPanel
        questions={questions}
        askedIds={['q-1', 'q-3']}
        lastAnswer={null}
        onAsk={vi.fn()}
      />,
    )
    const btn1 = screen.getByRole('button', { name: /pergunta 1/i })
    const btn3 = screen.getByRole('button', { name: /pergunta 3/i })
    expect(btn1).toBeDisabled()
    expect(btn3).toBeDisabled()
  })

  it('unasked questions are enabled', () => {
    render(
      <QuestionPanel
        questions={questions}
        askedIds={['q-1']}
        lastAnswer={null}
        onAsk={vi.fn()}
      />,
    )
    const btn2 = screen.getByRole('button', { name: /pergunta 2/i })
    expect(btn2).not.toBeDisabled()
  })

  it('displays "SIM ✓" in green when lastAnswer is true', () => {
    render(
      <QuestionPanel
        questions={questions}
        askedIds={[]}
        lastAnswer={true}
        onAsk={vi.fn()}
      />,
    )
    const simEl = screen.getByText(/SIM/i)
    expect(simEl).toBeInTheDocument()
    expect(simEl.style.color).toBe('var(--color-success)')
  })

  it('displays "NÃO ✗" in red when lastAnswer is false', () => {
    render(
      <QuestionPanel
        questions={questions}
        askedIds={[]}
        lastAnswer={false}
        onAsk={vi.fn()}
      />,
    )
    const naoEl = screen.getByText(/NÃO/i)
    expect(naoEl).toBeInTheDocument()
    expect(naoEl.style.color).toBe('var(--color-error)')
  })

  it('hides answer area content when lastAnswer is null', () => {
    render(
      <QuestionPanel
        questions={questions}
        askedIds={[]}
        lastAnswer={null}
        onAsk={vi.fn()}
      />,
    )
    expect(screen.queryByText(/SIM/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/NÃO/i)).not.toBeInTheDocument()
  })
})
