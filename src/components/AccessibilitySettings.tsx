import { useEffect, useState, useRef, type RefObject } from 'react'

// ── AccessibilitySettings ─────────────────────────────────────────────────────

const STORAGE_KEY = 'cac-high-contrast'

interface AccessibilitySettingsProps {
  isOpen: boolean
  onClose: () => void
  triggerRef?: RefObject<HTMLElement | null>
}

function applyHighContrast(enabled: boolean) {
  if (enabled) {
    document.documentElement.dataset.theme = 'high-contrast'
    localStorage.setItem(STORAGE_KEY, 'true')
  } else {
    delete document.documentElement.dataset.theme
    localStorage.removeItem(STORAGE_KEY)
  }
}

export default function AccessibilitySettings({ isOpen, onClose, triggerRef }: AccessibilitySettingsProps) {
  const [highContrast, setHighContrast] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  // On mount: restore from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'true') {
      setHighContrast(true)
      document.documentElement.dataset.theme = 'high-contrast'
    }
  }, [])

  // Handle Escape key to close
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Return focus to trigger on close
  useEffect(() => {
    if (!isOpen && triggerRef?.current) {
      triggerRef.current.focus()
    }
  }, [isOpen, triggerRef])

  // Trap focus inside overlay when open
  useEffect(() => {
    if (isOpen && overlayRef.current) {
      overlayRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  function handleToggle() {
    const next = !highContrast
    setHighContrast(next)
    applyHighContrast(next)
  }

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
  }

  const panelStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-xl)',
    minWidth: '320px',
    maxWidth: '480px',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-lg)',
    boxShadow: 'var(--shadow-card)',
  }

  const toggleRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'var(--space-md)',
  }

  const toggleBtnStyle: React.CSSProperties = {
    position: 'relative',
    width: '56px',
    height: '28px',
    borderRadius: '14px',
    backgroundColor: highContrast ? 'var(--color-primary)' : 'var(--color-border)',
    border: 'none',
    cursor: 'pointer',
    minHeight: '28px',
    minWidth: '56px',
    transition: 'background-color 0.2s ease',
  }

  const knobStyle: React.CSSProperties = {
    position: 'absolute',
    top: '3px',
    left: highContrast ? '31px' : '3px',
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    transition: 'left 0.2s ease',
  }

  const closeButtonStyle: React.CSSProperties = {
    alignSelf: 'flex-end',
    backgroundColor: 'var(--color-primary)',
    color: '#fff',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-xs) var(--space-md)',
    fontWeight: 700,
    fontSize: 'var(--font-size-button)',
    minHeight: '44px',
    minWidth: '44px',
    cursor: 'pointer',
    border: 'none',
  }

  return (
    <div
      style={overlayStyle}
      role="dialog"
      aria-modal="true"
      aria-label="Configurações de Acessibilidade"
    >
      <div
        ref={overlayRef}
        style={panelStyle}
        tabIndex={-1}
      >
        <h2 style={{ fontWeight: 700, fontSize: 'var(--font-size-heading)' }}>
          Configurações
        </h2>

        <div style={toggleRowStyle}>
          <label
            htmlFor="high-contrast-toggle"
            style={{ fontWeight: 600, fontSize: 'var(--font-size-body)', cursor: 'pointer' }}
          >
            Alto Contraste
          </label>
          <button
            id="high-contrast-toggle"
            role="switch"
            aria-checked={highContrast}
            aria-label="Alternar Alto Contraste"
            onClick={handleToggle}
            style={toggleBtnStyle}
          >
            <span style={knobStyle} aria-hidden="true" />
          </button>
        </div>

        <button
          onClick={onClose}
          style={closeButtonStyle}
          aria-label="Fechar configurações"
        >
          Fechar
        </button>
      </div>
    </div>
  )
}
