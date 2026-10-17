// ── BackButton ────────────────────────────────────────────────────────────────

interface BackButtonProps {
  onClick: () => void
  label?: string
}

export default function BackButton({ onClick, label = 'Voltar' }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      data-testid="back-button"
      style={{
        alignSelf: 'flex-start',
        minWidth: '44px',
        minHeight: '44px',
        padding: '8px 16px',
        fontSize: 'var(--font-size-button, 24px)',
        fontFamily: 'Lexend, sans-serif',
        lineHeight: 1,
        background: 'transparent',
        color: 'var(--color-primary, #6c3d91)',
        border: '2px solid var(--color-primary, #6c3d91)',
        borderRadius: '12px',
        cursor: 'pointer',
      }}
    >
      <span aria-hidden="true">←</span>
    </button>
  )
}
