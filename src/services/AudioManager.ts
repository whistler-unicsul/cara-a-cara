// ── AudioManager ──────────────────────────────────────────────────────────────
//
// Gerencia reprodução de áudio via HTMLAudioElement.
// - play(path) resolve ao 'ended'; rejeita após 3s de timeout
// - path vazio → resolve imediatamente sem instanciar Audio
// - stop() pausa e limpa referência
// - onError(handler) registra callback para evento 'error'
// - isPlaying getter

const AUDIO_TIMEOUT_MS = 3000

export class AudioManager {
  private _currentAudio: HTMLAudioElement | null = null
  private _errorHandler: ((path: string) => void) | null = null
  private _isPlaying = false

  get isPlaying(): boolean {
    return this._isPlaying
  }

  onError(handler: (path: string) => void): void {
    this._errorHandler = handler
  }

  play(audioPath: string): Promise<void> {
    // Path vazio → skip silencioso
    if (!audioPath) {
      return Promise.resolve()
    }

    // Para áudio anterior se existir
    this.stop()

    return new Promise<void>((resolve, reject) => {
      const audio = new Audio(audioPath)
      this._currentAudio = audio
      this._isPlaying = true

      const cleanup = () => {
        this._isPlaying = false
        this._currentAudio = null
      }

      const timeoutId = setTimeout(() => {
        cleanup()
        audio.pause()
        reject(new Error(`Audio timeout after ${AUDIO_TIMEOUT_MS}ms: ${audioPath}`))
      }, AUDIO_TIMEOUT_MS)

      audio.addEventListener('ended', () => {
        clearTimeout(timeoutId)
        cleanup()
        resolve()
      })

      audio.addEventListener('error', () => {
        clearTimeout(timeoutId)
        cleanup()
        if (this._errorHandler) {
          this._errorHandler(audioPath)
        }
        reject(new Error(`Audio error: ${audioPath}`))
      })

      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Silencia rejeição do play() — o evento 'error' cuidará disso
        })
      }
    })
  }

  stop(): void {
    if (this._currentAudio) {
      this._currentAudio.pause()
      this._currentAudio = null
    }
    this._isPlaying = false
  }
}

// ── Singleton ─────────────────────────────────────────────────────────────────

export const audioManager = new AudioManager()
