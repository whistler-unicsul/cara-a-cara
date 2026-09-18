import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CharacterCard from '@/components/CharacterCard'
import type { Character } from '@/types'

// ── Fixture ───────────────────────────────────────────────────────────────────

const mockCharacter: Character = {
  id: 'aie',
  name: 'Aiê',
  phase: 1,
  origin: 'Povos Tupi, Brasil',
  originFact: 'Fact about origin.',
  culturalFact: 'Fact about culture.',
  traje: 'Cocar',
  profissao: 'Pescador',
  itemCultural: 'Arco e flecha',
  comidaTipica: 'Beiju',
  imagePath: 'assets/characters/aie.png',
  audioPath: 'assets/audio/characters/aie-narration.mp3',
  itemIconPath: 'assets/icons/items/arco-flecha.svg',
  attributes: { usaCocar: true },
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('CharacterCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('active state renders character image and name', () => {
    render(
      <CharacterCard
        character={mockCharacter}
        isActive={true}
        onToggle={vi.fn()}
      />,
    )
    expect(screen.getByAltText('Aiê')).toBeInTheDocument()
    expect(screen.getByText('Aiê')).toBeInTheDocument()
  })

  it('eliminated state has opacity 0.3 and scaleY transform', () => {
    const { container } = render(
      <CharacterCard
        character={mockCharacter}
        isActive={false}
        onToggle={vi.fn()}
      />,
    )
    const card = container.firstChild as HTMLElement
    expect(card.style.opacity).toBe('0.3')
    expect(card.style.transform).toContain('scaleY(0.05)')
  })

  it('active state has opacity 1 and no collapsed transform', () => {
    const { container } = render(
      <CharacterCard
        character={mockCharacter}
        isActive={true}
        onToggle={vi.fn()}
      />,
    )
    const card = container.firstChild as HTMLElement
    expect(card.style.opacity).toBe('1')
    expect(card.style.transform).toContain('scaleY(1)')
  })

  it('tapping card calls onToggle', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(
      <CharacterCard
        character={mockCharacter}
        isActive={true}
        onToggle={onToggle}
      />,
    )
    await user.click(screen.getByRole('button', { name: 'Aiê' }))
    expect(onToggle).toHaveBeenCalledOnce()
  })

  it('showGuessButton=true shows "Adivinhar!" button', () => {
    render(
      <CharacterCard
        character={mockCharacter}
        isActive={true}
        onToggle={vi.fn()}
        showGuessButton={true}
        onGuess={vi.fn()}
      />,
    )
    expect(screen.getByText('Adivinhar!')).toBeInTheDocument()
  })

  it('showGuessButton=false does not show "Adivinhar!" button', () => {
    render(
      <CharacterCard
        character={mockCharacter}
        isActive={true}
        onToggle={vi.fn()}
        showGuessButton={false}
      />,
    )
    expect(screen.queryByText('Adivinhar!')).not.toBeInTheDocument()
  })

  it('tapping "Adivinhar!" calls onGuess without calling onToggle', async () => {
    const user = userEvent.setup()
    const onGuess = vi.fn()
    const onToggle = vi.fn()
    render(
      <CharacterCard
        character={mockCharacter}
        isActive={true}
        onToggle={onToggle}
        showGuessButton={true}
        onGuess={onGuess}
      />,
    )
    await user.click(screen.getByText('Adivinhar!'))
    expect(onGuess).toHaveBeenCalledOnce()
    expect(onToggle).not.toHaveBeenCalled()
  })

  it('card has minHeight and minWidth of 44px for touch target', () => {
    const { container } = render(
      <CharacterCard
        character={mockCharacter}
        isActive={true}
        onToggle={vi.fn()}
      />,
    )
    const card = container.firstChild as HTMLElement
    expect(card.style.minHeight).toBe('44px')
    expect(card.style.minWidth).toBe('44px')
  })

  // ── Accessibility assertions (T26) ─────────────────────────────────────────

  it('character image has a non-empty alt attribute', () => {
    render(
      <CharacterCard
        character={mockCharacter}
        isActive={true}
        onToggle={vi.fn()}
      />,
    )
    const img = screen.getByRole('img', { name: 'Aiê' })
    expect(img).toHaveAttribute('alt', 'Aiê')
    expect(img.getAttribute('alt')).not.toBe('')
  })

  it('"Adivinhar!" button has accessible label', () => {
    render(
      <CharacterCard
        character={mockCharacter}
        isActive={true}
        onToggle={vi.fn()}
        showGuessButton={true}
        onGuess={vi.fn()}
      />,
    )
    // The button has aria-label="Adivinhar <character.name>"
    const guessBtn = screen.getByRole('button', { name: /adivinhar/i })
    expect(guessBtn).toBeInTheDocument()
    const label = guessBtn.getAttribute('aria-label')
    expect(label).toBeTruthy()
    expect(label!.length).toBeGreaterThan(0)
  })

  it('card is keyboard-accessible via role=button with tabIndex', () => {
    const { container } = render(
      <CharacterCard
        character={mockCharacter}
        isActive={true}
        onToggle={vi.fn()}
      />,
    )
    const card = container.firstChild as HTMLElement
    expect(card.getAttribute('role')).toBe('button')
    expect(card.getAttribute('tabIndex')).toBe('0')
  })
})
