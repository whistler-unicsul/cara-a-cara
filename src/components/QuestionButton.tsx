import { useAudio } from '@/context/AudioContext'
import type { Question } from '@/types'

// ── QuestionButton ────────────────────────────────────────────────────────────

interface QuestionButtonProps {
  question: Question
  disabled?: boolean
  answer?: boolean | null
  onClick: () => void
}

export default function QuestionButton({ question, disabled = false, answer, onClick }: QuestionButtonProps) {
  const { play, isPlaying } = useAudio()

  async function handleClick() {
    if (disabled) return
    play(question.audioPath).catch(() => {
      // Audio failure is non-fatal — proceed with game logic
    })
    onClick()
  }

  const bgColor = answer === true
    ? 'var(--color-success-bg)'
    : answer === false
      ? 'var(--color-error-bg)'
      : disabled ? 'var(--color-border)' : 'var(--color-surface)'

  const borderColor = answer === true
    ? 'var(--color-success)'
    : answer === false
      ? 'var(--color-error)'
      : 'var(--color-border)'

  const textColor = answer != null
    ? 'var(--color-text)'
    : disabled ? 'var(--color-text-muted)' : 'var(--color-text)'

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    width: '100%',
    textAlign: 'left' as const,
    padding: 'var(--space-sm) var(--space-md)',
    borderRadius: 'var(--radius-sm)',
    border: `2px solid ${borderColor}`,
    backgroundColor: bgColor,
    color: textColor,
    minHeight: '44px',
    minWidth: '44px',
    pointerEvents: disabled ? ('none' as const) : ('auto' as const),
    transition: 'background-color 0.15s ease',
    cursor: disabled ? 'default' : 'pointer',
    fontSize: 'var(--font-size-body)',
  }

  return (
    <button
      style={buttonStyle}
      onClick={handleClick}
      aria-disabled={disabled}
      disabled={disabled}
      className={isPlaying ? 'question-btn question-btn--playing' : 'question-btn'}
      data-testid="question-btn"
    >
      <span aria-hidden="true">{question.iconEmoji}</span>
      <span style={{ flex: 1 }}>{question.text}</span>
      <span aria-label="Reproduzir áudio" role="img">
        {isPlaying ? '🔊' : '🔈'}
      </span>
    </button>
  )
}
