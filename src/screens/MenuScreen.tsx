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
    <main className="menu-screen">
      <h1 className="sr-only">Cara a Cara Brasil</h1>

      <img
        src="/banner.gif"
        alt="Cara a Cara do Brasil — personagens coloridos do jogo"
        className="menu-banner"
      />

      <nav className="menu-nav">
        <button
          className="menu-btn menu-btn--start"
          onClick={() => navigate('/avatar')}
          onFocus={() => handleButtonFocus('assets/audio/ui/btn-iniciar-jogo.mp3')}
          onMouseEnter={() => handleButtonFocus('assets/audio/ui/btn-iniciar-jogo.mp3')}
        >
          Iniciar Jogo
        </button>

        <button
          className="menu-btn menu-btn--instructions"
          onClick={() => setShowInstructions(true)}
          onFocus={() => handleButtonFocus('assets/audio/ui/btn-instrucoes.mp3')}
          onMouseEnter={() => handleButtonFocus('assets/audio/ui/btn-instrucoes.mp3')}
        >
          Instruções
        </button>

        <button
          className="menu-btn menu-btn--multiplayer"
          onClick={() => navigate('/multiplayer')}
          onFocus={() => handleButtonFocus('assets/audio/ui/btn-multijogador.mp3')}
          onMouseEnter={() => handleButtonFocus('assets/audio/ui/btn-multijogador.mp3')}
        >
          Multijogador
        </button>

        <button
          ref={settingsTriggerRef}
          className="menu-btn menu-btn--settings"
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
