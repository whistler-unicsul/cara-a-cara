import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMultiplayer } from '@/context/MultiplayerContext'

// ── MultiplayerLobbyScreen ────────────────────────────────────────────────────

export default function MultiplayerLobbyScreen() {
  const navigate = useNavigate()
  const { createRoom, joinRoom, error } = useMultiplayer()

  const [showJoinInput, setShowJoinInput] = useState(false)
  const [joinCode, setJoinCode] = useState('')

  async function handleCreateRoom() {
    await createRoom()
    navigate('/multiplayer/waiting')
  }

  async function handleJoin() {
    await joinRoom(joinCode)
    navigate('/multiplayer/waiting')
  }

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
      <h1
        style={{
          fontSize: 'var(--font-size-heading, 32px)',
          fontFamily: 'Lexend, sans-serif',
          textAlign: 'center',
        }}
      >
        Multijogador
      </h1>

      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          maxWidth: '320px',
        }}
      >
        <button
          className="menu-btn"
          style={{
            minHeight: '44px',
            fontSize: 'var(--font-size-button, 24px)',
            fontFamily: 'Lexend, sans-serif',
            padding: '12px 24px',
          }}
          onClick={handleCreateRoom}
        >
          Criar Partida
        </button>

        <button
          className="menu-btn"
          style={{
            minHeight: '44px',
            fontSize: 'var(--font-size-button, 24px)',
            fontFamily: 'Lexend, sans-serif',
            padding: '12px 24px',
          }}
          onClick={() => setShowJoinInput(true)}
        >
          Entrar em Partida
        </button>
      </nav>

      {showJoinInput && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            maxWidth: '320px',
          }}
        >
          <input
            type="text"
            aria-label="Código da sala"
            placeholder="CÓDIGO"
            maxLength={6}
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            style={{
              minHeight: '44px',
              fontSize: '24px',
              textAlign: 'center',
              letterSpacing: '4px',
              fontFamily: 'Lexend, monospace',
              padding: '8px',
              border: '2px solid var(--color-primary, #333)',
              borderRadius: '8px',
            }}
          />

          <button
            className="menu-btn"
            style={{
              minHeight: '44px',
              fontSize: 'var(--font-size-button, 24px)',
              fontFamily: 'Lexend, sans-serif',
              padding: '12px 24px',
            }}
            onClick={handleJoin}
          >
            Entrar
          </button>
        </div>
      )}

      {error && (
        <p
          role="alert"
          style={{
            color: 'var(--color-error, red)',
            textAlign: 'center',
            fontFamily: 'Lexend, sans-serif',
          }}
        >
          {error}
        </p>
      )}
    </main>
  )
}
