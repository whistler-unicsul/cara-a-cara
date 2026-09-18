import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { audioManager } from '@/services/AudioManager'
import InstructionsOverlay from '@/components/InstructionsOverlay'
import AccessibilitySettings from '@/components/AccessibilitySettings'

// ── MenuScreen ─────────────────────────────────────────────────────────────────

export default function MenuScreen() {
  const navigate = useNavigate()
  const [showInstructions, setShowInstructions] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const settingsTriggerRef = useRef<HTMLButtonElement>(null)

  function handleButtonFocus(audioPath: string) {
    audioManager.play(audioPath).catch(() => {
      // Silently ignore audio errors
    })
  }

  return (
    <main className="menu-screen" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '24px' }}>
      <h1 style={{ fontSize: 'var(--font-size-heading, 32px)', fontFamily: 'Lexend, sans-serif', textAlign: 'center' }}>
        Cara a Cara Brasil
      </h1>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '320px' }}>
        <button
          className="menu-btn"
          style={{ minHeight: '44px', fontSize: 'var(--font-size-button, 24px)', fontFamily: 'Lexend, sans-serif', padding: '12px 24px' }}
          onClick={() => navigate('/avatar')}
          onFocus={() => handleButtonFocus('assets/audio/ui/btn-iniciar-jogo.mp3')}
          onMouseEnter={() => handleButtonFocus('assets/audio/ui/btn-iniciar-jogo.mp3')}
        >
          Iniciar Jogo
        </button>

        <button
          className="menu-btn"
          style={{ minHeight: '44px', fontSize: 'var(--font-size-button, 24px)', fontFamily: 'Lexend, sans-serif', padding: '12px 24px' }}
          onClick={() => setShowInstructions(true)}
          onFocus={() => handleButtonFocus('assets/audio/ui/btn-instrucoes.mp3')}
          onMouseEnter={() => handleButtonFocus('assets/audio/ui/btn-instrucoes.mp3')}
        >
          Instruções
        </button>

        <button
          className="menu-btn"
          style={{ minHeight: '44px', fontSize: 'var(--font-size-button, 24px)', fontFamily: 'Lexend, sans-serif', padding: '12px 24px' }}
          onClick={() => navigate('/multiplayer')}
          onFocus={() => handleButtonFocus('assets/audio/ui/btn-multijogador.mp3')}
          onMouseEnter={() => handleButtonFocus('assets/audio/ui/btn-multijogador.mp3')}
        >
          Multijogador
        </button>

        <button
          ref={settingsTriggerRef}
          className="menu-btn"
          style={{ minHeight: '44px', fontSize: 'var(--font-size-button, 24px)', fontFamily: 'Lexend, sans-serif', padding: '12px 24px' }}
          onClick={() => setShowSettings(true)}
          onFocus={() => handleButtonFocus('assets/audio/ui/btn-configuracoes.mp3')}
          onMouseEnter={() => handleButtonFocus('assets/audio/ui/btn-configuracoes.mp3')}
        >
          Configurações
        </button>
      </nav>

      <InstructionsOverlay
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />

      <AccessibilitySettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        triggerRef={settingsTriggerRef}
      />
    </main>
  )
}
