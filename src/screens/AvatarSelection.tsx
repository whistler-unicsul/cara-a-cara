import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '@/context/GameContext'

// ── Avatar options ─────────────────────────────────────────────────────────────

const AVATARS = [
  { id: 'avatar-01', emoji: '🦁', label: 'Leão' },
  { id: 'avatar-02', emoji: '🐢', label: 'Tartaruga' },
  { id: 'avatar-03', emoji: '🦜', label: 'Papagaio' },
  { id: 'avatar-04', emoji: '🌺', label: 'Flor' },
  { id: 'avatar-05', emoji: '🌊', label: 'Onda' },
  { id: 'avatar-06', emoji: '⭐', label: 'Estrela' },
]

// ── AvatarSelection ───────────────────────────────────────────────────────────

export default function AvatarSelection() {
  const navigate = useNavigate()
  const { dispatch } = useGame()

  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
  const [nickname, setNickname] = useState('')

  function handlePlay() {
    const avatarId = selectedAvatar ?? AVATARS[0].id
    dispatch({ type: 'SET_AVATAR', avatar: avatarId, nickname: nickname.trim() || 'Jogador' })
    navigate('/phases')
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
        padding: '24px',
        fontFamily: 'Lexend, sans-serif',
      }}
    >
      <h1 style={{ fontSize: 'var(--font-size-heading, 32px)', textAlign: 'center' }}>
        Escolha seu Avatar
      </h1>

      {/* Avatar grid */}
      <div
        role="group"
        aria-label="Avatares disponíveis"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        {AVATARS.map(avatar => (
          <button
            key={avatar.id}
            aria-label={avatar.label}
            aria-pressed={selectedAvatar === avatar.id}
            className={`avatar-btn${selectedAvatar === avatar.id ? ' avatar-btn--selected' : ''}`}
            style={{
              minHeight: '80px',
              minWidth: '80px',
              fontSize: '40px',
              background: selectedAvatar === avatar.id
                ? 'var(--color-primary, #6c3d91)'
                : 'var(--color-bg, #f5f0ff)',
              border: selectedAvatar === avatar.id
                ? '3px solid var(--color-primary, #6c3d91)'
                : '2px solid #ccc',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => setSelectedAvatar(avatar.id)}
          >
            {avatar.emoji}
          </button>
        ))}
      </div>

      {/* Nickname input */}
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <label
          htmlFor="nickname-input"
          style={{ display: 'block', marginBottom: '8px', fontSize: 'var(--font-size-body, 18px)' }}
        >
          Seu apelido (opcional):
        </label>
        <input
          id="nickname-input"
          type="text"
          value={nickname}
          maxLength={12}
          onChange={e => setNickname(e.target.value)}
          placeholder="Digite seu apelido"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: 'var(--font-size-body, 18px)',
            fontFamily: 'Lexend, sans-serif',
            border: '2px solid #ccc',
            borderRadius: '8px',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Play button */}
      <button
        onClick={handlePlay}
        style={{
          minHeight: '44px',
          padding: '12px 48px',
          fontSize: 'var(--font-size-button, 24px)',
          fontFamily: 'Lexend, sans-serif',
          background: 'var(--color-primary, #6c3d91)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        Jogar
      </button>
    </main>
  )
}
