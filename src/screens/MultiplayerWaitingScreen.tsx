import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMultiplayer } from '@/context/MultiplayerContext'

// ── MultiplayerWaitingScreen ──────────────────────────────────────────────────

export default function MultiplayerWaitingScreen() {
  const navigate = useNavigate()
  const { room, myRole, startGame } = useMultiplayer()

  // Navigate to game when status changes to 'playing'
  useEffect(() => {
    if (room?.status === 'playing') {
      navigate('/multiplayer/game')
    }
  }, [room?.status, navigate])

  if (!room) {
    return (
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <p>Carregando…</p>
      </main>
    )
  }

  const hasGuest = room.guest_session_id !== null

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '24px',
        padding: '16px',
      }}
    >
      {myRole === 'host' ? (
        <>
          <p
            style={{
              fontFamily: 'Lexend, sans-serif',
              fontSize: '16px',
              color: 'var(--color-text-secondary, #666)',
            }}
          >
            Código da sala
          </p>

          <p
            data-testid="room-code"
            style={{
              fontFamily: 'Lexend, monospace',
              fontSize: '40px',
              letterSpacing: '8px',
              fontWeight: 'bold',
            }}
          >
            {room.room_code}
          </p>

          <p
            style={{
              fontFamily: 'Lexend, sans-serif',
              fontSize: '18px',
              textAlign: 'center',
            }}
          >
            {hasGuest ? 'Adversário conectado!' : 'Aguardando adversário…'}
          </p>

          <button
            className="menu-btn"
            style={{
              minHeight: '44px',
              fontSize: 'var(--font-size-button, 24px)',
              fontFamily: 'Lexend, sans-serif',
              padding: '12px 24px',
              opacity: hasGuest ? 1 : 0.5,
              cursor: hasGuest ? 'pointer' : 'not-allowed',
            }}
            disabled={!hasGuest}
            onClick={startGame}
          >
            Iniciar
          </button>
        </>
      ) : (
        <p
          style={{
            fontFamily: 'Lexend, sans-serif',
            fontSize: '18px',
            textAlign: 'center',
          }}
        >
          Aguardando host iniciar…
        </p>
      )}
    </main>
  )
}
