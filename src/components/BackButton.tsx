import type { CSSProperties } from 'react'

// ── BackButton ────────────────────────────────────────────────────────────────

interface BackButtonProps {
  onBack: () => void
  onHome?: () => void
  onNext?: () => void
  nextEnabled?: boolean
}

export default function BackButton({ onBack, onHome, onNext, nextEnabled = false }: BackButtonProps) {
  const base: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    minHeight: '44px',
    padding: '8px 20px',
    fontSize: '16px',
    fontFamily: 'Lexend, sans-serif',
    fontWeight: 600,
    lineHeight: 1,
    borderRadius: '999px',
    cursor: 'pointer',
    border: '2px solid var(--color-border)',
    background: 'var(--color-surface)',
    color: 'var(--color-text)',
    boxShadow: 'var(--shadow-card)',
  }

  const disabledStyle: CSSProperties = {
    ...base,
    opacity: 0.4,
    cursor: 'not-allowed',
    boxShadow: 'none',
  }

  return (
    <div
      data-testid="back-button"
      style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}
    >
      <button type="button" onClick={onBack} aria-label="Voltar" style={base}>
        <span aria-hidden="true">←</span>
        <span>Voltar</span>
      </button>

      {onHome && (
        <button type="button" onClick={onHome} aria-label="Início" style={base}>
          <span aria-hidden="true">🏠</span>
          <span>Início</span>
        </button>
      )}

      {onNext && (
        <button
          type="button"
          onClick={nextEnabled ? onNext : undefined}
          aria-label="Seguinte"
          aria-disabled={!nextEnabled}
          style={nextEnabled ? base : disabledStyle}
        >
          <span>Seguinte</span>
          <span aria-hidden="true">→</span>
        </button>
      )}
    </div>
  )
}
