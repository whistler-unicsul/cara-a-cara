// ── Characters ────────────────────────────────────────────────────────────────

export interface Character {
  id: string
  name: string
  phase: number
  origin: string
  originFact: string     // ≤ 40 palavras
  culturalFact: string   // ≤ 40 palavras
  traje: string
  profissao: string
  itemCultural: string
  comidaTipica: string
  imagePath: string
  audioPath: string
  itemIconPath: string
  attributes: Record<string, boolean>
}

// ── Questions ─────────────────────────────────────────────────────────────────

export interface Question {
  id: string
  text: string
  audioPath: string
  iconEmoji: string
  phaseIds: number[]
  answers: Record<string, boolean>  // characterId → true/false
}

// ── Game State ────────────────────────────────────────────────────────────────

export type GameScreen =
  | 'MENU'
  | 'AVATAR_SELECTION'
  | 'PHASE_MAP'
  | 'PLAYING'
  | 'WIN'
  | 'EDUCATIONAL_CARD'

export interface GameState {
  screen: GameScreen
  sessionId: string | null
  avatar: string | null
  nickname: string
  completedPhases: number[]
  currentPhase: number | null
  secretCharacterId: string | null
  cardStates: Record<string, 'active' | 'eliminated'>
  askedQuestionIds: string[]
  lastAnswer: boolean | null
  encouragement: string | null
  accessibilityHighContrast: boolean
}

// ── Game Actions ──────────────────────────────────────────────────────────────

export type GameAction =
  | { type: 'SET_SESSION'; sessionId: string }
  | { type: 'SET_AVATAR'; avatar: string; nickname: string }
  | { type: 'START_GAME'; phase: number }
  | { type: 'ASK_QUESTION'; questionId: string }
  | { type: 'TOGGLE_CARD'; characterId: string }
  | { type: 'MAKE_GUESS'; characterId: string }
  | { type: 'WRONG_GUESS' }
  | { type: 'WIN' }
  | { type: 'SHOW_EDUCATIONAL_CARD' }
  | { type: 'COMPLETE_PHASE'; phase: number }
  | { type: 'GO_TO_PHASE_MAP' }
  | { type: 'TOGGLE_HIGH_CONTRAST' }
  | { type: 'SET_COMPLETED_PHASES'; completedPhases: number[] }

// ── Persistence ───────────────────────────────────────────────────────────────

export interface GameProgress {
  session_id: string
  completed_phases: number[]
  updated_at: string
}

// ── Multiplayer ───────────────────────────────────────────────────────────────

export interface MultiplayerRoom {
  room_id: string
  room_code: string
  phase: number
  host_session_id: string
  guest_session_id: string | null
  host_secret_char_id: string | null
  guest_secret_char_id: string | null
  current_turn: 'host' | 'guest'
  host_card_states: Record<string, 'active' | 'eliminated'>
  guest_card_states: Record<string, 'active' | 'eliminated'>
  host_asked_q_ids: string[]
  guest_asked_q_ids: string[]
  last_question_id: string | null
  last_answer: boolean | null
  last_action: 'question' | 'wrong_guess' | null
  status: 'waiting' | 'playing' | 'finished' | 'expired'
  winner: 'host' | 'guest' | null
  created_at: string
  last_activity_at: string
}

export type PlayerRole = 'host' | 'guest'
