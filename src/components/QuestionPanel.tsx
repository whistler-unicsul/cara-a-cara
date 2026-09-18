import type { Question } from '@/types'
import QuestionButton from '@/components/QuestionButton'

// ── QuestionPanel ─────────────────────────────────────────────────────────────

interface QuestionPanelProps {
  questions: Question[]
  askedIds: string[]
  lastAnswer: boolean | null
  onAsk: (questionId: string) => void
}

export default function QuestionPanel({ questions, askedIds, lastAnswer, onAsk }: QuestionPanelProps) {
  const panelStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--space-sm)',
    padding: 'var(--space-md)',
  }

  const answerAreaStyle = {
    padding: 'var(--space-md)',
    borderRadius: 'var(--radius-md)',
    textAlign: 'center' as const,
    fontWeight: 700,
    fontSize: 'var(--font-size-heading)',
    minHeight: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return (
    <div style={panelStyle}>
      {/* Answer area */}
      <div style={answerAreaStyle}>
        {lastAnswer === true && (
          <span style={{ color: 'var(--color-success)' }}>SIM ✓</span>
        )}
        {lastAnswer === false && (
          <span style={{ color: 'var(--color-error)' }}>NÃO ✗</span>
        )}
      </div>

      {/* Question list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
        {questions.map((question) => {
          const isAsked = askedIds.includes(question.id)
          return (
            <QuestionButton
              key={question.id}
              question={question}
              disabled={isAsked}
              onClick={() => onAsk(question.id)}
            />
          )
        })}
      </div>
    </div>
  )
}
