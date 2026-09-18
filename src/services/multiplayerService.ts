import { createClient } from '@supabase/supabase-js'
import type { MultiplayerRoom, PlayerRole } from '@/types'
import { characters } from '@/data/characters'

// ── Client ────────────────────────────────────────────────────────────────────

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ── Timeout helper ────────────────────────────────────────────────────────────

function withTimeout<T>(promise: PromiseLike<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Tempo esgotado. Tente novamente.')), ms),
  )
  return Promise.race([Promise.resolve(promise), timeout])
}

const TIMEOUT_MS = 5000

// ── generateRoomCode ──────────────────────────────────────────────────────────

export function generateRoomCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

// ── createRoom ────────────────────────────────────────────────────────────────

export async function createRoom(hostSessionId: string): Promise<MultiplayerRoom> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt < 3; attempt++) {
    const roomCode = generateRoomCode()

    const query = supabase
      .from('multiplayer_rooms')
      .insert({
        room_code: roomCode,
        host_session_id: hostSessionId,
        status: 'waiting',
        current_turn: 'host',
        host_card_states: {},
        guest_card_states: {},
        host_asked_q_ids: [],
        guest_asked_q_ids: [],
        phase: 1,
        last_activity_at: new Date().toISOString(),
      })
      .select()
      .single()

    const result = await withTimeout(query, TIMEOUT_MS)
    const { data, error } = result as { data: MultiplayerRoom | null; error: { code?: string; message: string } | null }

    if (error) {
      // Unique constraint violation (room_code collision) — retry
      if (error.code === '23505') {
        lastError = new Error(error.message)
        continue
      }
      throw new Error(error.message)
    }

    if (!data) throw new Error('Falha ao criar sala.')

    return data
  }

  throw lastError ?? new Error('Falha ao criar sala.')
}

// ── joinRoom ──────────────────────────────────────────────────────────────────

export async function joinRoom(roomCode: string, guestSessionId: string): Promise<MultiplayerRoom> {
  // Fetch room by code
  const fetchQuery = supabase
    .from('multiplayer_rooms')
    .select()
    .eq('room_code', roomCode)
    .single()

  const fetchResult = await withTimeout(fetchQuery, TIMEOUT_MS)
  const { data: room, error: fetchError } = fetchResult as {
    data: MultiplayerRoom | null
    error: { code?: string; message: string } | null
  }

  if (fetchError || !room) {
    throw new Error('Sala não encontrada.')
  }

  if (room.status !== 'waiting') {
    throw new Error('Sala não encontrada.')
  }

  if (room.guest_session_id !== null) {
    throw new Error('Sala cheia.')
  }

  // Join the room
  const updateQuery = supabase
    .from('multiplayer_rooms')
    .update({
      guest_session_id: guestSessionId,
      last_activity_at: new Date().toISOString(),
    })
    .eq('room_id', room.room_id)
    .select()
    .single()

  const updateResult = await withTimeout(updateQuery, TIMEOUT_MS)
  const { data: updatedRoom, error: updateError } = updateResult as {
    data: MultiplayerRoom | null
    error: { message: string } | null
  }

  if (updateError || !updatedRoom) {
    throw new Error(updateError?.message ?? 'Falha ao entrar na sala.')
  }

  return updatedRoom
}

// ── startGame ─────────────────────────────────────────────────────────────────

export async function startGame(roomId: string): Promise<void> {
  const phase1Chars = characters.filter(c => c.phase === 1)

  // Pick two distinct characters
  const shuffled = [...phase1Chars].sort(() => Math.random() - 0.5)
  const hostChar = shuffled[0]
  const guestChar = shuffled[1]

  // Build initial card states (all active)
  const cardStates: Record<string, 'active' | 'eliminated'> = {}
  for (const char of phase1Chars) {
    cardStates[char.id] = 'active'
  }

  const query = supabase
    .from('multiplayer_rooms')
    .update({
      host_secret_char_id: hostChar.id,
      guest_secret_char_id: guestChar.id,
      host_card_states: cardStates,
      guest_card_states: { ...cardStates },
      status: 'playing',
      last_activity_at: new Date().toISOString(),
    })
    .eq('room_id', roomId)

  const result = await withTimeout(query, TIMEOUT_MS)
  const { error } = result as { error: { message: string } | null }

  if (error) {
    throw new Error(error.message)
  }
}

// ── askQuestion ───────────────────────────────────────────────────────────────

export async function askQuestion(
  roomId: string,
  questionId: string,
  role: PlayerRole,
  answer: boolean,
): Promise<void> {
  // Get current asked question ids
  const fetchQuery = supabase
    .from('multiplayer_rooms')
    .select(`${role}_asked_q_ids, current_turn`)
    .eq('room_id', roomId)
    .single()

  const fetchResult = await withTimeout(fetchQuery, TIMEOUT_MS)
  const { data, error: fetchError } = fetchResult as {
    data: Record<string, unknown> | null
    error: { message: string } | null
  }

  if (fetchError || !data) {
    throw new Error(fetchError?.message ?? 'Sala não encontrada.')
  }

  const askedQIds = (data[`${role}_asked_q_ids`] as string[]) ?? []
  const newAskedQIds = [...askedQIds, questionId]
  const nextTurn: PlayerRole = role === 'host' ? 'guest' : 'host'

  const updateQuery = supabase
    .from('multiplayer_rooms')
    .update({
      last_question_id: questionId,
      last_answer: answer,
      last_action: 'question',
      [`${role}_asked_q_ids`]: newAskedQIds,
      current_turn: nextTurn,
      last_activity_at: new Date().toISOString(),
    })
    .eq('room_id', roomId)

  const updateResult = await withTimeout(updateQuery, TIMEOUT_MS)
  const { error: updateError } = updateResult as { error: { message: string } | null }

  if (updateError) {
    throw new Error(updateError.message)
  }
}

// ── makeGuess ─────────────────────────────────────────────────────────────────

export async function makeGuess(
  roomId: string,
  characterId: string,
  role: PlayerRole,
  opponentSecretCharId: string,
  currentCardStates: Record<string, 'active' | 'eliminated'>,
): Promise<void> {
  const isCorrect = characterId === opponentSecretCharId
  const nextTurn: PlayerRole = role === 'host' ? 'guest' : 'host'

  let updateData: Record<string, unknown>

  if (isCorrect) {
    updateData = {
      status: 'finished',
      winner: role,
      last_action: null,
      last_activity_at: new Date().toISOString(),
    }
  } else {
    // Restore all cards to active
    const restoredStates: Record<string, 'active' | 'eliminated'> = {}
    for (const id of Object.keys(currentCardStates)) {
      restoredStates[id] = 'active'
    }

    updateData = {
      [`${role}_card_states`]: restoredStates,
      current_turn: nextTurn,
      last_action: 'wrong_guess',
      last_activity_at: new Date().toISOString(),
    }
  }

  const query = supabase
    .from('multiplayer_rooms')
    .update(updateData)
    .eq('room_id', roomId)

  const result = await withTimeout(query, TIMEOUT_MS)
  const { error } = result as { error: { message: string } | null }

  if (error) {
    throw new Error(error.message)
  }
}

// ── subscribeToRoom ───────────────────────────────────────────────────────────

export function subscribeToRoom(
  roomId: string,
  onUpdate: (room: MultiplayerRoom) => void,
): () => void {
  const interval = setInterval(async () => {
    const { data } = await supabase
      .from('multiplayer_rooms')
      .select()
      .eq('room_id', roomId)
      .single()
    if (data) onUpdate(data as MultiplayerRoom)
  }, 2000)

  return () => clearInterval(interval)
}
