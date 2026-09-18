import { useAudio } from '@/context/AudioContext'
import type { Question } from '@/types'

// ── QuestionButton ────────────────────────────────────────────────────────────

interface QuestionButtonProps {
  question: Question
  disabled?: boolean
  onClick: () => void
}

export default function QuestionButton({ question, disabled = false, onClick }: QuestionButtonProps) {
  const { play, isPlaying } = useAudio()

  async function handleClick() {
    if (disabled) return
    play(question.audioPath).catch(() => {
      // Audio failure is non-fatal — proceed with game logic
    })
    onClick()
  }

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    width: '100%',
    textAlign: 'left' as const,
    padding: 'var(--space-sm) var(--space-md)',
    borderRadius: 'var(--radius-sm)',
    border: '2px solid var(--color-border)',
    backgroundColor: disabled ? 'var(--color-border)' : 'var(--color-surface)',
    color: disabled ? 'var(--color-text-muted)' : 'var(--color-text)',
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
