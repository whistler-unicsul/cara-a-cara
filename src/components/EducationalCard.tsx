import { useEffect, useState } from 'react'
import { useAudio } from '@/context/AudioContext'
import type { Character } from '@/types'

// ── EducationalCard ───────────────────────────────────────────────────────────

interface EducationalCardProps {
  character: Character
  onNext: () => void
}

export default function EducationalCard({ character, onNext }: EducationalCardProps) {
  const { play } = useAudio()
  const [audioFailed, setAudioFailed] = useState(false)

  useEffect(() => {
    let cancelled = false

    play(character.audioPath).catch(() => {
      if (!cancelled) {
        setAudioFailed(true)
      }
    })

    return () => {
      cancelled = true
    }
  }, [character.audioPath, play])

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-lg)',
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-card)',
    maxWidth: '480px',
    margin: '0 auto',
  }

  return (
    <div style={cardStyle} role="article" aria-label={`Cartão educacional: ${character.name}`} data-testid="educational-card">
      {/* Audio status */}
      {audioFailed && (
        <span
          aria-label="Áudio mudo"
          role="img"
          style={{ fontSize: '1.5rem', alignSelf: 'flex-end' }}
        >
          🔇
        </span>
      )}

      {/* Character image */}
      <img
        src={character.imagePath}
        alt={character.name}
        style={{
          width: '180px',
          height: '180px',
          objectFit: 'cover',
          borderRadius: 'var(--radius-md)',
        }}
      />

      {/* Name */}
      <h2 style={{ fontWeight: 700, fontSize: 'var(--font-size-heading)' }}>
        {character.name}
      </h2>

      {/* Item icon */}
      <div style={{ fontSize: '2rem' }}>
        {character.itemIconPath ? (
          <img
            src={character.itemIconPath}
            alt={character.itemCultural}
            style={{ width: '48px', height: '48px' }}
          />
        ) : (
          <span aria-label={character.itemCultural}>🎭</span>
        )}
      </div>

      {/* Origin fact */}
      <p style={{ textAlign: 'center', color: 'var(--color-text)' }}>
        {character.originFact}
      </p>

      {/* Cultural fact */}
      <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
        {character.culturalFact}
      </p>

      {/* Next button */}
      <button
        onClick={onNext}
        style={{
          backgroundColor: 'var(--color-primary)',
          color: '#fff',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-sm) var(--space-lg)',
          fontWeight: 700,
          fontSize: 'var(--font-size-button)',
          minHeight: '44px',
          minWidth: '44px',
        }}
      >
        Próximo
      </button>
    </div>
  )
}
