import React from 'react'
import type { Character } from '@/types'

// ── CharacterCard ─────────────────────────────────────────────────────────────

interface CharacterCardProps {
  character: Character
  isActive: boolean
  onToggle: () => void
  showGuessButton?: boolean
  onGuess?: () => void
}

export default function CharacterCard({
  character,
  isActive,
  onToggle,
  showGuessButton = false,
  onGuess,
}: CharacterCardProps) {
  const cardStyle: React.CSSProperties = {
    position: 'relative',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-surface)',
    boxShadow: 'var(--shadow-card)',
    cursor: 'pointer',
    minHeight: '44px',
    minWidth: '44px',
    overflow: 'hidden',
    transition: 'opacity 0.2s ease, transform 0.3s ease',
    opacity: isActive ? 1 : 0.3,
    transform: isActive ? 'scaleY(1)' : 'scaleY(0.05)',
    transformOrigin: 'top',
    padding: 'var(--space-sm)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-xs)',
  }

  return (
    <div
      role="button"
      aria-label={character.name}
      aria-pressed={isActive}
      style={cardStyle}
      onClick={onToggle}
      tabIndex={0}
      data-testid="character-card"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
    >
      <img
        src={character.imagePath}
        alt={character.name}
        style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-sm)' }}
      />
      <span style={{ fontWeight: 600, fontSize: 'var(--font-size-small)' }}>
        {character.name}
      </span>

      {showGuessButton && isActive && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onGuess?.()
          }}
          style={{
            position: 'absolute',
            bottom: 'var(--space-sm)',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-text)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--space-xs) var(--space-sm)',
            fontWeight: 700,
            fontSize: 'var(--font-size-small)',
            minHeight: '44px',
            minWidth: '44px',
            zIndex: 1,
          }}
          aria-label={`Adivinhar ${character.name}`}
        >
          Adivinhar!
        </button>
      )}
    </div>
  )
}
