import { useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGame } from '@/context/GameContext'
import { useProgress } from '@/hooks/useProgress'
import { characters } from '@/data/characters'
import CharacterGrid from '@/components/CharacterGrid'
import QuestionPanel from '@/components/QuestionPanel'
import CelebrationOverlay from '@/components/CelebrationOverlay'
import EducationalCard from '@/components/EducationalCard'
import { phase1Questions } from '@/data/questions'

// ── GameScreen ────────────────────────────────────────────────────────────────

export default function GameScreen() {
  const { phase } = useParams<{ phase: string }>()
  const navigate = useNavigate()
  const { savePhaseComplete } = useProgress()

  const {
    screen,
    avatar,
    cardStates,
    askedQuestionIds,
    lastAnswer,
    encouragement,
    secretCharacterId,
    dispatch,
  } = useGame()

  const phaseNumber = Number(phase) || 1

  // Start game on mount; CAC-39: redirect if no active session (page reload)
  useEffect(() => {
    if (!avatar) {
      navigate('/phases')
      return
    }
    dispatch({ type: 'START_GAME', phase: phaseNumber })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Derive phase characters and questions
  const phaseCharacters = characters.filter((c) => c.phase === phaseNumber)
  const phaseQuestions = phaseNumber === 1 ? phase1Questions : []

  // Derive active ids from cardStates
  const activeIds = Object.entries(cardStates)
    .filter(([, state]) => state === 'active')
    .map(([id]) => id)

  // CAC-40: recycle question list when all questions have been asked
  const effectiveAskedIds =
    askedQuestionIds.length >= phaseQuestions.length ? [] : askedQuestionIds

  // Secret character (for EducationalCard)
  const secretCharacter = secretCharacterId
    ? characters.find((c) => c.id === secretCharacterId) ?? null
    : null

  // Handlers
  const handleToggle = useCallback(
    (characterId: string) => {
      dispatch({ type: 'TOGGLE_CARD', characterId })
    },
    [dispatch],
  )

  const handleGuess = useCallback(
    (characterId: string) => {
      dispatch({ type: 'MAKE_GUESS', characterId })
    },
    [dispatch],
  )

  const handleAsk = useCallback(
    (questionId: string) => {
      dispatch({ type: 'ASK_QUESTION', questionId })
    },
    [dispatch],
  )

  const handleCelebrationComplete = useCallback(() => {
    dispatch({ type: 'SHOW_EDUCATIONAL_CARD' })
  }, [dispatch])

  const handleNext = useCallback(async () => {
    dispatch({ type: 'COMPLETE_PHASE', phase: phaseNumber })
    await savePhaseComplete(phaseNumber)
    navigate('/phases')
  }, [dispatch, phaseNumber, savePhaseComplete, navigate])

  const screenStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '100dvh',
    backgroundColor: 'var(--color-bg)',
    padding: 'var(--space-md)',
    gap: 'var(--space-md)',
  }

  return (
    <div style={screenStyle}>
      {/* Character grid */}
      <CharacterGrid
        characters={phaseCharacters}
        activeIds={activeIds}
        onToggle={handleToggle}
        onGuess={handleGuess}
      />

      {/* Encouragement message after wrong guess — CAC-17 */}
      {encouragement && (
        <p
          role="alert"
          style={{
            textAlign: 'center',
            color: 'var(--color-primary)',
            fontSize: 'var(--font-size-body)',
            fontWeight: 'bold',
          }}
        >
          {encouragement}
        </p>
      )}

      {/* Question panel */}
      <QuestionPanel
        questions={phaseQuestions}
        askedIds={effectiveAskedIds}
        lastAnswer={lastAnswer}
        onAsk={handleAsk}
      />

      {/* Win overlay */}
      {screen === 'WIN' && (
        <CelebrationOverlay
          isVisible={true}
          onComplete={handleCelebrationComplete}
        />
      )}

      {/* Educational card */}
      {screen === 'EDUCATIONAL_CARD' && secretCharacter && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'var(--color-bg)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-md)',
          }}
        >
          <EducationalCard character={secretCharacter} onNext={handleNext} />
        </div>
      )}
    </div>
  )
}
