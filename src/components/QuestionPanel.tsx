import { useState, useEffect } from 'react'
import type { Question } from '@/types'
import QuestionButton from '@/components/QuestionButton'

// ── QuestionPanel ─────────────────────────────────────────────────────────────

interface QuestionPanelProps {
  questions: Question[]
  askedIds: string[]
  questionAnswers?: Record<string, boolean>
  lastAnswer: boolean | null
  questionCount?: number
  onAsk: (questionId: string) => void
}

export default function QuestionPanel({ questions, askedIds, questionAnswers = {}, lastAnswer, questionCount = 0, onAsk }: QuestionPanelProps) {
  const [visibleAnswer, setVisibleAnswer] = useState<boolean | null>(null)

  useEffect(() => {
    if (lastAnswer === null) {
      setVisibleAnswer(null)
      return
    }
    setVisibleAnswer(lastAnswer)
    const timer = setTimeout(() => setVisibleAnswer(null), 2000)
    return () => clearTimeout(timer)
  // questionCount garante que o efeito dispara mesmo quando a resposta é repetida
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionCount])
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
        {visibleAnswer === true && (
          <span style={{ color: 'var(--color-success)' }}>SIM ✓</span>
        )}
        {visibleAnswer === false && (
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
              answer={questionAnswers[question.id]}
              onClick={() => onAsk(question.id)}
            />
          )
        })}
      </div>
    </div>
  )
}
