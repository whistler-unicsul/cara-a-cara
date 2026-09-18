import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { MultiplayerRoom, PlayerRole } from '@/types'
import { useGame } from '@/context/GameContext'
import * as multiplayerService from '@/services/multiplayerService'
import { phase1Questions } from '@/data/questions'

// ── Types ─────────────────────────────────────────────────────────────────────

interface MultiplayerContextValue {
  room: MultiplayerRoom | null
  myRole: PlayerRole | null
  isMyTurn: boolean
  myCardStates: Record<string, 'active' | 'eliminated'>
  myAskedQuestionIds: string[]
  opponentSecretCharId: string | null
  error: string | null
  createRoom: () => Promise<void>
  joinRoom: (code: string) => Promise<void>
  startGame: () => Promise<void>
  askQuestion: (questionId: string, answer: boolean) => Promise<void>
  toggleCard: (characterId: string) => void
  makeGuess: (characterId: string) => Promise<void>
  leaveRoom: () => void
}

// ── Context ───────────────────────────────────────────────────────────────────

export const MultiplayerContext = createContext<MultiplayerContextValue | null>(null)

// ── Provider ──────────────────────────────────────────────────────────────────

export function MultiplayerProvider({ children }: { children: React.ReactNode }) {
  const { sessionId } = useGame()

  const [room, setRoom] = useState<MultiplayerRoom | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [localCardStates, setLocalCardStates] = useState<Record<string, 'active' | 'eliminated'>>({})

  // ── Derived state ────────────────────────────────────────────────────────────

  const myRole: PlayerRole | null = room
    ? room.host_session_id === sessionId
      ? 'host'
      : 'guest'
    : null

  const isMyTurn = room ? room.current_turn === myRole : false

  const myCardStates: Record<string, 'active' | 'eliminated'> = room
    ? localCardStates
    : {}

  const myAskedQuestionIds: string[] = room
    ? myRole === 'host'
      ? room.host_asked_q_ids
      : room.guest_asked_q_ids
    : []

  const opponentSecretCharId: string | null = room
    ? myRole === 'host'
      ? room.guest_secret_char_id
      : room.host_secret_char_id
    : null

  // ── Sync localCardStates when room changes ────────────────────────────────────

  useEffect(() => {
    if (!room || !myRole) return
    const serverStates = myRole === 'host' ? room.host_card_states : room.guest_card_states
    setLocalCardStates(serverStates)
  }, [room?.room_id, room?.status]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Realtime subscription ─────────────────────────────────────────────────────

  useEffect(() => {
    if (!room?.room_id) return

    const cleanup = multiplayerService.subscribeToRoom(room.room_id, (updatedRoom) => {
      setRoom(updatedRoom)

      if (updatedRoom.status === 'expired') {
        setError('A partida expirou por inatividade.')
      }
    })

    return cleanup
  }, [room?.room_id]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Actions ───────────────────────────────────────────────────────────────────

  const handleCreateRoom = useCallback(async () => {
    if (!sessionId) return
    try {
      setError(null)
      const newRoom = await multiplayerService.createRoom(sessionId)
      setRoom(newRoom)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar sala.')
      throw err
    }
  }, [sessionId])

  const handleJoinRoom = useCallback(async (code: string) => {
    if (!sessionId) return
    try {
      setError(null)
      const joinedRoom = await multiplayerService.joinRoom(code, sessionId)
      setRoom(joinedRoom)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao entrar na sala.')
      throw err
    }
  }, [sessionId])

  const handleStartGame = useCallback(async () => {
    if (!room) return
    try {
      setError(null)
      await multiplayerService.startGame(room.room_id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao iniciar partida.')
      throw err
    }
  }, [room])

  const handleAskQuestion = useCallback(async (questionId: string, answer: boolean) => {
    if (!room || !myRole) return
    try {
      setError(null)
      await multiplayerService.askQuestion(room.room_id, questionId, myRole, answer)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer pergunta.')
      throw err
    }
  }, [room, myRole])

  const handleToggleCard = useCallback((characterId: string) => {
    setLocalCardStates(prev => ({
      ...prev,
      [characterId]: prev[characterId] === 'active' ? 'eliminated' : 'active',
    }))
  }, [])

  const handleMakeGuess = useCallback(async (characterId: string) => {
    if (!room || !myRole || !opponentSecretCharId) return
    try {
      setError(null)
      await multiplayerService.makeGuess(
        room.room_id,
        characterId,
        myRole,
        opponentSecretCharId,
        localCardStates,
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer chute.')
      throw err
    }
  }, [room, myRole, opponentSecretCharId, localCardStates])

  const handleLeaveRoom = useCallback(() => {
    setRoom(null)
    setError(null)
    setLocalCardStates({})
  }, [])

  // ── Value ─────────────────────────────────────────────────────────────────────

  const value: MultiplayerContextValue = {
    room,
    myRole,
    isMyTurn,
    myCardStates,
    myAskedQuestionIds,
    opponentSecretCharId,
    error,
    createRoom: handleCreateRoom,
    joinRoom: handleJoinRoom,
    startGame: handleStartGame,
    askQuestion: handleAskQuestion,
    toggleCard: handleToggleCard,
    makeGuess: handleMakeGuess,
    leaveRoom: handleLeaveRoom,
  }

  return (
    <MultiplayerContext.Provider value={value}>
      {children}
    </MultiplayerContext.Provider>
  )
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useMultiplayer(): MultiplayerContextValue {
  const ctx = useContext(MultiplayerContext)
  if (!ctx) {
    throw new Error('useMultiplayer must be used within a MultiplayerProvider')
  }
  return ctx
}

// Re-export for convenience (used in askQuestion auto-answer logic in game screen)
export { phase1Questions }
