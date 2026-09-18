import { createClient } from '@supabase/supabase-js'
import type { GameProgress } from '@/types'

// ── Client ────────────────────────────────────────────────────────────────────

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ── Timeout helper ────────────────────────────────────────────────────────────

function withTimeout<T>(promise: PromiseLike<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(`Supabase timeout after ${ms}ms`)), ms),
  )
  return Promise.race([Promise.resolve(promise), timeout])
}

const TIMEOUT_MS = 5000

// ── fetchProgress ─────────────────────────────────────────────────────────────

export async function fetchProgress(sessionId: string): Promise<GameProgress | null> {
  const query = supabase
    .from('game_progress')
    .select('session_id, completed_phases, updated_at')
    .eq('session_id', sessionId)
    .single()

  const result = await withTimeout(query, TIMEOUT_MS)
  const { data, error } = result as { data: GameProgress | null; error: { code?: string; message: string } | null }

  if (error) {
    // PostgREST code PGRST116 = "no rows found" — retorna null em vez de rejeitar
    if (error.code === 'PGRST116') {
      return null
    }
    throw new Error(error.message)
  }

  if (!data) return null

  return data
}

// ── upsertProgress ────────────────────────────────────────────────────────────

export async function upsertProgress(sessionId: string, completedPhases: number[]): Promise<void> {
  const query = supabase.from('game_progress').upsert(
    {
      session_id: sessionId,
      completed_phases: completedPhases,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'session_id' },
  )

  const result = await withTimeout(query, TIMEOUT_MS)
  const { error } = result as { error: { message: string } | null }

  if (error) {
    throw new Error(error.message)
  }
}
