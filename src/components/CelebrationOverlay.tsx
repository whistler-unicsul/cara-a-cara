import { useEffect } from 'react'

// ── CelebrationOverlay ────────────────────────────────────────────────────────

interface CelebrationOverlayProps {
  isVisible: boolean
  onComplete: () => void
}

const PARTICLE_COUNT = 20

const PARTICLE_EMOJIS = ['⭐', '🌟', '✨', '🎉', '🎊', '🎈', '🎀', '💫']

function getRandomParticleStyle(index: number): React.CSSProperties {
  const left = `${(index / PARTICLE_COUNT) * 100}%`
  const top = `${Math.random() * 80}%`
  const delay = `${(index * 100) % 800}ms`
  const emoji = PARTICLE_EMOJIS[index % PARTICLE_EMOJIS.length]
  void emoji

  return {
    position: 'absolute',
    left,
    top,
    fontSize: '2rem',
    animation: `celebration-fall 1.5s ease-in-out ${delay} infinite alternate`,
    opacity: 0.9,
    pointerEvents: 'none',
  }
}

export default function CelebrationOverlay({ isVisible, onComplete }: CelebrationOverlayProps) {
  useEffect(() => {
    if (!isVisible) return

    const timer = setTimeout(() => {
      onComplete()
    }, 2500)

    return () => clearTimeout(timer)
  }, [isVisible, onComplete])

  if (!isVisible) return null

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  }

  return (
    <div style={overlayStyle} role="status" aria-live="polite" aria-label="Celebração" data-testid="celebration-overlay">
      {/* Particles */}
      {Array.from({ length: PARTICLE_COUNT }).map((_, index) => (
        <div
          key={index}
          className="celebration-particle"
          style={getRandomParticleStyle(index)}
          aria-hidden="true"
        >
          {PARTICLE_EMOJIS[index % PARTICLE_EMOJIS.length]}
        </div>
      ))}

      <div
        style={{
          textAlign: 'center',
          color: '#fff',
          zIndex: 1001,
          fontSize: 'var(--font-size-heading)',
          fontWeight: 700,
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: 'var(--space-md)' }}>🏆</div>
        <h2>Você venceu!</h2>
      </div>
    </div>
  )
}
