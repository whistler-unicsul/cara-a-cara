import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { AudioManager } from '../AudioManager'

// ── Mock HTMLAudioElement ─────────────────────────────────────────────────────
//
// Precisamos de uma classe para que `new Audio()` funcione corretamente.
// Mantemos referência à última instância criada para triggers de eventos.

type EventHandler = ((event: Event) => void) | null

interface MockAudioRecord {
  src: string
  pause: ReturnType<typeof vi.fn>
  play: ReturnType<typeof vi.fn>
  ended: EventHandler
  error: EventHandler
  _trigger: (event: 'ended' | 'error') => void
}

let lastMockAudio: MockAudioRecord

class MockAudio {
  src: string
  pause = vi.fn()
  play = vi.fn().mockResolvedValue(undefined)

  private _listeners: Partial<Record<string, EventHandler>> = {}

  constructor(src: string) {
    this.src = src
    lastMockAudio = this as unknown as MockAudioRecord
  }

  addEventListener(event: string, handler: (e: Event) => void) {
    this._listeners[event] = handler
  }

  _trigger(event: 'ended' | 'error') {
    const handler = this._listeners[event]
    if (handler) handler(new Event(event))
  }
}

beforeEach(() => {
  vi.stubGlobal('Audio', MockAudio)
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('AudioManager — play()', () => {
  it('play("") resolve sem instanciar Audio', async () => {
    const manager = new AudioManager()
    const constructorSpy = vi.fn()
    vi.stubGlobal('Audio', class extends MockAudio {
      constructor(src: string) {
        super(src)
        constructorSpy(src)
      }
    })

    await expect(manager.play('')).resolves.toBeUndefined()
    expect(constructorSpy).not.toHaveBeenCalled()
  })

  it('play(path) resolve quando evento "ended" é disparado', async () => {
    const manager = new AudioManager()

    const playPromise = manager.play('assets/audio/test.mp3')

    // Dispara o evento 'ended' na instância criada pelo AudioManager
    lastMockAudio._trigger('ended')

    await expect(playPromise).resolves.toBeUndefined()
  })

  it('play(path) rejeita após 3s sem evento "ended" (fake timers)', async () => {
    vi.useFakeTimers()

    const manager = new AudioManager()

    const playPromise = manager.play('assets/audio/test.mp3')

    // Avança 3001ms para acionar o timeout interno
    vi.advanceTimersByTime(3001)

    await expect(playPromise).rejects.toThrow('Audio timeout after 3000ms')
  })

  it('isPlaying retorna true durante reprodução e false após ended', async () => {
    const manager = new AudioManager()

    expect(manager.isPlaying).toBe(false)

    const playPromise = manager.play('assets/audio/test.mp3')
    expect(manager.isPlaying).toBe(true)

    lastMockAudio._trigger('ended')
    await playPromise

    expect(manager.isPlaying).toBe(false)
  })
})

describe('AudioManager — stop()', () => {
  it('stop() pausa a reprodução atual e limpa isPlaying', () => {
    const manager = new AudioManager()

    // Inicia reprodução sem aguardar
    manager.play('assets/audio/test.mp3')

    expect(manager.isPlaying).toBe(true)

    manager.stop()

    expect(lastMockAudio.pause).toHaveBeenCalledOnce()
    expect(manager.isPlaying).toBe(false)
  })

  it('stop() sem áudio ativo não lança erro', () => {
    const manager = new AudioManager()
    expect(() => manager.stop()).not.toThrow()
  })
})

describe('AudioManager — onError()', () => {
  it('onError callback é chamado quando Audio dispara evento "error"', async () => {
    const manager = new AudioManager()
    const errorHandler = vi.fn()

    manager.onError(errorHandler)

    const playPromise = manager.play('assets/audio/nao-existe.mp3')

    // Dispara evento 'error'
    lastMockAudio._trigger('error')

    // A promise deve rejeitar
    await expect(playPromise).rejects.toThrow('Audio error')

    // O callback deve ter sido chamado com o path correto
    expect(errorHandler).toHaveBeenCalledWith('assets/audio/nao-existe.mp3')
  })
})
