import { useNavigate } from 'react-router-dom'
import { useGame } from '@/context/GameContext'
import BackButton from '@/components/BackButton'

// ── Phase data ────────────────────────────────────────────────────────────────

const PHASES = [
  { phase: 1, title: 'Fase 1', subtitle: 'Raízes — Povos Originários' },
  { phase: 2, title: 'Fase 2', subtitle: 'Encontros — África e Portugal' },
  { phase: 3, title: 'Fase 3', subtitle: 'Imigração — Europa' },
  { phase: 4, title: 'Fase 4', subtitle: 'Novos Horizontes — Ásia e Oriente Médio' },
  { phase: 5, title: 'Fase 5 ⭐', subtitle: 'Brasil de Todos — Extra' },
]

// ── PhaseMap ──────────────────────────────────────────────────────────────────

export default function PhaseMap() {
  const navigate = useNavigate()
  const { completedPhases, nickname } = useGame()

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        gap: '24px',
        padding: '32px 24px',
        fontFamily: 'Lexend, sans-serif',
      }}
    >
      <div style={{ width: '100%', maxWidth: '480px', display: 'flex' }}>
        <BackButton onClick={() => navigate('/')} />
      </div>

      <h1 style={{ fontSize: 'var(--font-size-heading, 32px)', textAlign: 'center' }}>
        Mapa de Fases
      </h1>

      {nickname && (
        <p style={{ fontSize: 'var(--font-size-body, 18px)' }}>
          Olá, <strong>{nickname}</strong>!
        </p>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          maxWidth: '480px',
        }}
      >
        {PHASES.map(({ phase, title, subtitle }) => {
          const isCompleted = completedPhases.includes(phase)
          // Fase 1 sempre liberada; as demais abrem ao concluir a fase anterior
          const isUnlocked = phase === 1 || completedPhases.includes(phase - 1)

          if (isUnlocked) {
            return (
              <button
                key={phase}
                onClick={() => navigate(`/game/${phase}`)}
                style={{
                  minHeight: '80px',
                  padding: '16px 24px',
                  fontSize: 'var(--font-size-body, 18px)',
                  fontFamily: 'Lexend, sans-serif',
                  background: 'var(--color-primary, #6c3d91)',
                  color: 'var(--color-on-primary, #fff)',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  position: 'relative',
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '20px' }}>{title}</div>
                <div style={{ fontSize: '14px', opacity: 0.9 }}>{subtitle}</div>
                {isCompleted && (
                  <span
                    aria-label="Fase concluída"
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '12px',
                      background: 'var(--color-success, #15803d)',
                      color: 'var(--color-on-primary, #fff)',
                      padding: '2px 10px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 'bold',
                    }}
                  >
                    Concluída
                  </span>
                )}
              </button>
            )
          }

          // Locked phases
          return (
            <button
              key={phase}
              aria-disabled="true"
              disabled
              style={{
                minHeight: '80px',
                padding: '16px 24px',
                fontSize: 'var(--font-size-body, 18px)',
                fontFamily: 'Lexend, sans-serif',
                background: 'var(--color-surface, #fff)',
                color: 'var(--color-text-muted, #64748b)',
                border: '2px dashed var(--color-border, #94a3b8)',
                borderRadius: '12px',
                cursor: 'not-allowed',
                textAlign: 'left',
                position: 'relative',
              }}
            >
              <span style={{ position: 'absolute', top: '8px', right: '12px', fontSize: '20px' }}>
                🔒
              </span>
              <div style={{ fontWeight: 'bold', fontSize: '20px' }}>{title}</div>
              <div style={{ fontSize: '14px' }}>{subtitle}</div>
            </button>
          )
        })}
      </div>
    </main>
  )
}
