import type { Character } from '@/types'
import CharacterCard from '@/components/CharacterCard'

// ── CharacterGrid ─────────────────────────────────────────────────────────────

interface CharacterGridProps {
  characters: Character[]
  activeIds: string[]
  onToggle: (id: string) => void
  onGuess: (id: string) => void
}

export default function CharacterGrid({
  characters,
  activeIds,
  onToggle,
  onGuess,
}: CharacterGridProps) {
  const singleActiveId = activeIds.length === 1 ? activeIds[0] : null

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--space-md)',
    padding: 'var(--space-md)',
  }

  return (
    <div style={gridStyle} role="grid" aria-label="Grade de personagens">
      {characters.map((character) => {
        const isActive = activeIds.includes(character.id)
        const showGuessButton = singleActiveId === character.id

        return (
          <CharacterCard
            key={character.id}
            character={character}
            isActive={isActive}
            onToggle={() => onToggle(character.id)}
            showGuessButton={showGuessButton}
            onGuess={() => onGuess(character.id)}
          />
        )
      })}
    </div>
  )
}
