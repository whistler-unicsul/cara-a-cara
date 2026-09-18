import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CharacterGrid from '@/components/CharacterGrid'
import type { Character } from '@/types'

// ── Fixtures ──────────────────────────────────────────────────────────────────

function makeCharacter(id: string, name: string): Character {
  return {
    id,
    name,
    phase: 1,
    origin: 'Origem',
    originFact: 'Fact.',
    culturalFact: 'Fact.',
    traje: 'Traje',
    profissao: 'Prof',
    itemCultural: 'Item',
    comidaTipica: 'Comida',
    imagePath: `assets/characters/${id}.png`,
    audioPath: `assets/audio/characters/${id}-narration.mp3`,
    itemIconPath: `assets/icons/items/${id}.svg`,
    attributes: {},
  }
}

const characters: Character[] = [
  makeCharacter('aie', 'Aiê'),
  makeCharacter('kojo', 'Kojo'),
  makeCharacter('zumbi', 'Zumbi'),
  makeCharacter('amara', 'Amara'),
]

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('CharacterGrid', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders 4 character cards', () => {
    render(
      <CharacterGrid
        characters={characters}
        activeIds={['aie', 'kojo', 'zumbi', 'amara']}
        onToggle={vi.fn()}
        onGuess={vi.fn()}
      />,
    )
    const cards = screen.getAllByRole('button', { name: /aiê|kojo|zumbi|amara/i })
    expect(cards).toHaveLength(4)
  })

  it('with 2+ active cards, no "Adivinhar!" is visible', () => {
    render(
      <CharacterGrid
        characters={characters}
        activeIds={['aie', 'kojo']}
        onToggle={vi.fn()}
        onGuess={vi.fn()}
      />,
    )
    expect(screen.queryByText('Adivinhar!')).not.toBeInTheDocument()
  })

  it('with exactly 1 active card, "Adivinhar!" is visible on that card', () => {
    render(
      <CharacterGrid
        characters={characters}
        activeIds={['kojo']}
        onToggle={vi.fn()}
        onGuess={vi.fn()}
      />,
    )
    expect(screen.getByText('Adivinhar!')).toBeInTheDocument()
  })

  it('onGuess called with correct character id when "Adivinhar!" is tapped', async () => {
    const user = userEvent.setup()
    const onGuess = vi.fn()
    render(
      <CharacterGrid
        characters={characters}
        activeIds={['zumbi']}
        onToggle={vi.fn()}
        onGuess={onGuess}
      />,
    )
    await user.click(screen.getByText('Adivinhar!'))
    expect(onGuess).toHaveBeenCalledWith('zumbi')
  })

  it('onToggle called with correct character id when card is tapped', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(
      <CharacterGrid
        characters={characters}
        activeIds={['aie', 'kojo', 'zumbi', 'amara']}
        onToggle={onToggle}
        onGuess={vi.fn()}
      />,
    )
    await user.click(screen.getByRole('button', { name: 'Aiê' }))
    expect(onToggle).toHaveBeenCalledWith('aie')
  })
})
