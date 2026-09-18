import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EducationalCard from '@/components/EducationalCard'
import type { Character } from '@/types'

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockPlay = vi.fn()

vi.mock('@/context/AudioContext', () => ({
  useAudio: () => ({
    play: mockPlay,
    stop: vi.fn(),
    isPlaying: false,
  }),
}))

// ── Fixtures ──────────────────────────────────────────────────────────────────

const mockCharacter: Character = {
  id: 'aie',
  name: 'Aiê',
  phase: 1,
  origin: 'Povos Tupi, Brasil',
  originFact: 'Aiê vive nas florestas da Amazônia com seu povo Tupi.',
  culturalFact: 'Os Tupi ensinaram ao Brasil o cultivo da mandioca.',
  traje: 'Cocar de penas coloridas',
  profissao: 'Pescador',
  itemCultural: 'Arco e flecha',
  comidaTipica: 'Beiju',
  imagePath: 'assets/characters/aie.png',
  audioPath: 'assets/audio/characters/aie-narration.mp3',
  itemIconPath: 'assets/icons/items/arco-flecha.svg',
  attributes: {},
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('EducationalCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockPlay.mockResolvedValue(undefined)
  })

  it('renders character name', () => {
    render(<EducationalCard character={mockCharacter} onNext={vi.fn()} />)
    expect(screen.getByText('Aiê')).toBeInTheDocument()
  })

  it('renders origin fact', () => {
    render(<EducationalCard character={mockCharacter} onNext={vi.fn()} />)
    expect(
      screen.getByText('Aiê vive nas florestas da Amazônia com seu povo Tupi.'),
    ).toBeInTheDocument()
  })

  it('renders cultural fact', () => {
    render(<EducationalCard character={mockCharacter} onNext={vi.fn()} />)
    expect(
      screen.getByText('Os Tupi ensinaram ao Brasil o cultivo da mandioca.'),
    ).toBeInTheDocument()
  })

  it('calls play on mount with character audioPath', () => {
    render(<EducationalCard character={mockCharacter} onNext={vi.fn()} />)
    expect(mockPlay).toHaveBeenCalledWith('assets/audio/characters/aie-narration.mp3')
  })

  it('shows muted speaker icon when play rejects', async () => {
    mockPlay.mockRejectedValue(new Error('Audio not available'))
    render(<EducationalCard character={mockCharacter} onNext={vi.fn()} />)

    await waitFor(() => {
      expect(screen.getByRole('img', { name: /áudio mudo/i })).toBeInTheDocument()
    })
  })

  it('"Próximo" button calls onNext', async () => {
    const user = userEvent.setup()
    const onNext = vi.fn()
    render(<EducationalCard character={mockCharacter} onNext={onNext} />)

    await user.click(screen.getByRole('button', { name: /próximo/i }))

    expect(onNext).toHaveBeenCalledOnce()
  })

  // ── Accessibility assertions (T26) ─────────────────────────────────────────

  it('character image has a non-empty alt attribute', () => {
    render(<EducationalCard character={mockCharacter} onNext={vi.fn()} />)
    const img = screen.getByAltText('Aiê')
    expect(img).toBeInTheDocument()
    expect(img.getAttribute('alt')).not.toBe('')
  })

  it('"Próximo" button has accessible label (text content)', () => {
    render(<EducationalCard character={mockCharacter} onNext={vi.fn()} />)
    const btn = screen.getByRole('button', { name: /próximo/i })
    expect(btn).toBeInTheDocument()
    expect(btn.textContent?.trim()).toBe('Próximo')
  })

  it('card has role="article" for semantic landmark', () => {
    const { container } = render(<EducationalCard character={mockCharacter} onNext={vi.fn()} />)
    const article = container.querySelector('[role="article"]')
    expect(article).not.toBeNull()
    expect(article).toHaveAttribute('aria-label')
  })

  it('"Próximo" button meets 44px touch target requirement', () => {
    render(<EducationalCard character={mockCharacter} onNext={vi.fn()} />)
    const btn = screen.getByRole('button', { name: /próximo/i })
    expect((btn as HTMLButtonElement).style.minHeight).toBe('44px')
  })
})
