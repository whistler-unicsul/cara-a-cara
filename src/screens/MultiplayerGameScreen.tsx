import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMultiplayer } from '@/context/MultiplayerContext'
import { useProgress } from '@/hooks/useProgress'
import { useAudio } from '@/context/AudioContext'
import { characters } from '@/data/characters'
import { phase1Questions } from '@/data/questions'
import CharacterGrid from '@/components/CharacterGrid'
import QuestionPanel from '@/components/QuestionPanel'
import CelebrationOverlay from '@/components/CelebrationOverlay'
import EducationalCard from '@/components/EducationalCard'

// ── MultiplayerGameScreen ──────────────────────────────────────────────────────

export default function MultiplayerGameScreen() {
  const navigate = useNavigate()
  const { savePhaseComplete } = useProgress()
  const { play } = useAudio()

  const {
    room,
    myRole,
    isMyTurn,
    myCardStates,
    myAskedQuestionIds,
    opponentSecretCharId,
    error,
    askQuestion,
    toggleCard,
    makeGuess,
  } = useMultiplayer()

  const [showEducational, setShowEducational] = useState(false)

  // Derive phase characters
  const phaseCharacters = characters.filter(c => c.phase === 1)

  // Derive active ids from myCardStates
  const activeIds = Object.entries(myCardStates)
    .filter(([, state]) => state === 'active')
    .map(([id]) => id)

  // CAC-40: recycle question list when all questions have been asked
  const effectiveAskedIds =
    myAskedQuestionIds.length >= phase1Questions.length ? [] : myAskedQuestionIds

  // Opponent character (for EducationalCard)
  const opponentCharacter = opponentSecretCharId
    ? characters.find(c => c.id === opponentSecretCharId) ?? null
    : null

  // Handle error: navigate to menu when room expired
  useEffect(() => {
    if (error && error.includes('expirou')) {
      navigate('/')
    }
  }, [error, navigate])

  // Handle ask question
  const handleAsk = useCallback(
    async (questionId: string) => {
      if (!opponentSecretCharId) return
      const question = phase1Questions.find(q => q.id === questionId)
      if (!question) return
      const answer = question.answers[opponentSecretCharId] ?? false

      // Play audio
      play(question.audioPath).catch(() => {})

      await askQuestion(questionId, answer)
    },
    [opponentSecretCharId, askQuestion, play],
  )

  // Handle toggle card
  const handleToggle = useCallback(
    (characterId: string) => {
      toggleCard(characterId)
    },
    [toggleCard],
  )

  // Handle guess
  const handleGuess = useCallback(
    async (characterId: string) => {
      await makeGuess(characterId)
    },
    [makeGuess],
  )

  // When celebration complete, show educational card
  const handleCelebrationComplete = useCallback(() => {
    setShowEducational(true)
  }, [])

  // When wrong: show "Boa tentativa!" message and after 2.5s show educational
  const isFinished = room?.status === 'finished'
  const iWon = isFinished && room?.winner === myRole
  const iLost = isFinished && room?.winner !== myRole

  useEffect(() => {
    if (!iLost) return
    const timer = setTimeout(() => {
      setShowEducational(true)
    }, 2500)
    return () => clearTimeout(timer)
  }, [iLost])

  // Handle next (educational card)
  const handleNext = useCallback(async () => {
    await savePhaseComplete(1)
    navigate('/phases')
  }, [savePhaseComplete, navigate])

  // Determine lastAnswer for QuestionPanel
  const lastAnswer = room?.last_answer ?? null

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
      {/* Error banner */}
      {error && !error.includes('expirou') && (
        <div
          role="alert"
          style={{
            backgroundColor: 'var(--color-error, #f44)',
            color: '#fff',
            padding: '12px',
            borderRadius: '8px',
            textAlign: 'center',
            fontFamily: 'Lexend, sans-serif',
          }}
        >
          {error}
        </div>
      )}

      {/* Encouragement after wrong guess — MPL-25 */}
      {room?.last_action === 'wrong_guess' && !isFinished && (
        <p
          role="alert"
          style={{
            textAlign: 'center',
            color: 'var(--color-primary)',
            fontSize: 'var(--font-size-body)',
            fontWeight: 'bold',
          }}
        >
          Quase lá! Vamos tentar outra pergunta
        </p>
      )}

      {/* Opponent's turn banner */}
      {!isMyTurn && !isFinished && (
        <p
          style={{
            textAlign: 'center',
            fontFamily: 'Lexend, sans-serif',
            fontSize: '18px',
            color: 'var(--color-text-secondary, #666)',
          }}
        >
          Vez do adversário…
        </p>
      )}

      {/* Character grid */}
      <CharacterGrid
        characters={phaseCharacters}
        activeIds={activeIds}
        onToggle={isMyTurn ? handleToggle : () => {}}
        onGuess={isMyTurn ? handleGuess : () => {}}
      />

      {/* Question panel */}
      <QuestionPanel
        questions={phase1Questions}
        askedIds={isMyTurn ? effectiveAskedIds : phase1Questions.map(q => q.id)}
        lastAnswer={lastAnswer}
        onAsk={isMyTurn ? handleAsk : () => {}}
      />

      {/* Win: celebration overlay */}
      {iWon && !showEducational && (
        <CelebrationOverlay
          isVisible={true}
          onComplete={handleCelebrationComplete}
        />
      )}

      {/* Loss: "Boa tentativa!" */}
      {iLost && !showEducational && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p
            style={{
              color: '#fff',
              fontSize: '2rem',
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            Boa tentativa! 🌟
          </p>
        </div>
      )}

      {/* Educational card */}
      {showEducational && opponentCharacter && (
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
          <EducationalCard character={opponentCharacter} onNext={handleNext} />
        </div>
      )}
    </div>
  )
}
