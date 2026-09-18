import { useEffect, useRef } from 'react'
import { audioManager } from '@/services/AudioManager'

// ── Instructions steps ────────────────────────────────────────────────────────

const STEPS = [
  {
    emoji: '❓',
    title: 'Faça perguntas',
    description: 'Escolha uma pergunta para descobrir características do personagem secreto.',
  },
  {
    emoji: '🃏',
    title: 'Elimine cartas',
    description: 'Toque nas cartas dos personagens que não correspondem à resposta para eliminá-los.',
  },
  {
    emoji: '🎉',
    title: 'Adivinhe!',
    description: 'Quando restar apenas um personagem, toque em "Adivinhar!" para ganhar o jogo.',
  },
]

// ── InstructionsOverlay ───────────────────────────────────────────────────────

interface InstructionsOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function InstructionsOverlay({ isOpen, onClose }: InstructionsOverlayProps) {
  const prevOpenRef = useRef(false)

  useEffect(() => {
    if (isOpen && !prevOpenRef.current) {
      // Opened — play audio
      audioManager.play('assets/audio/ui/instructions.mp3').catch(() => {
        // Silently ignore audio errors
      })
    }
    prevOpenRef.current = isOpen
  }, [isOpen])

  if (!isOpen) return null

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Instruções do jogo"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
      }}
      onClick={handleBackdropClick}
    >
      <div
        style={{
          background: 'var(--color-bg, #fff)',
          borderRadius: '12px',
          padding: '32px',
          maxWidth: '480px',
          width: '90%',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          aria-label="Fechar instruções"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            minHeight: '44px',
            minWidth: '44px',
            background: 'transparent',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        <h2 style={{ fontSize: 'var(--font-size-heading, 32px)', marginBottom: '24px' }}>
          Como Jogar
        </h2>

        <ol style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {STEPS.map((step, index) => (
            <li key={index} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '32px', lineHeight: 1 }}>{step.emoji}</span>
              <div>
                <strong style={{ display: 'block', fontSize: 'var(--font-size-body, 18px)' }}>
                  {step.title}
                </strong>
                <p style={{ margin: 0, fontSize: 'var(--font-size-body, 18px)' }}>
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
