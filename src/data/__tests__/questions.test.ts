import { describe, it, expect } from 'vitest'
import { phase1Questions } from '../questions'

const PHASE1_CHARACTER_IDS = ['aie', 'yara', 'caua', 'taina', 'lara', 'potira'] as const

describe('Phase 1 Question Bank — integridade dos dados', () => {
  it('deve ter pelo menos 8 perguntas', () => {
    expect(phase1Questions.length).toBeGreaterThanOrEqual(8)
  })

  it('cada pergunta deve ter answers definidos para todos os 6 personagens da Fase 1', () => {
    for (const question of phase1Questions) {
      for (const characterId of PHASE1_CHARACTER_IDS) {
        expect(
          question.answers[characterId],
          `Pergunta "${question.id}" está sem resposta para o personagem "${characterId}"`,
        ).toBeDefined()
      }
    }
  })

  it('todas as respostas devem ser booleanas (não undefined, não null)', () => {
    for (const question of phase1Questions) {
      for (const characterId of PHASE1_CHARACTER_IDS) {
        const answer = question.answers[characterId]
        expect(typeof answer, `Resposta de "${question.id}" para "${characterId}" deve ser boolean`).toBe('boolean')
      }
    }
  })

  it('aiê (Tupi) deve ter respostas bem definidas em todas as perguntas', () => {
    for (const question of phase1Questions) {
      expect(question.answers['aie']).not.toBeUndefined()
    }
  })

  it('yara (Guarani) deve ter respostas bem definidas em todas as perguntas', () => {
    for (const question of phase1Questions) {
      expect(question.answers['yara']).not.toBeUndefined()
    }
  })

  it('cauã (Xavante) deve ter respostas bem definidas em todas as perguntas', () => {
    for (const question of phase1Questions) {
      expect(question.answers['caua']).not.toBeUndefined()
    }
  })

  it('tainá (Kayapó) deve ter respostas bem definidas em todas as perguntas', () => {
    for (const question of phase1Questions) {
      expect(question.answers['taina']).not.toBeUndefined()
    }
  })

  it('lara (Yanomami) deve ter respostas bem definidas em todas as perguntas', () => {
    for (const question of phase1Questions) {
      expect(question.answers['lara']).not.toBeUndefined()
    }
  })

  it('potira (Pataxó) deve ter respostas bem definidas em todas as perguntas', () => {
    for (const question of phase1Questions) {
      expect(question.answers['potira']).not.toBeUndefined()
    }
  })

  it('as perguntas devem cobrir pelo menos 3 atributos distintos (verificado por diversidade de respostas)', () => {
    const patterns = new Set(
      phase1Questions.map(q =>
        PHASE1_CHARACTER_IDS.map(id => q.answers[id]).join(','),
      ),
    )
    expect(patterns.size).toBeGreaterThanOrEqual(3)
  })

  it('cada pergunta deve ter id único', () => {
    const ids = phase1Questions.map(q => q.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('cada pergunta deve ter phaseIds contendo 1', () => {
    for (const question of phase1Questions) {
      expect(question.phaseIds).toContain(1)
    }
  })

  it('aiê deve usar cocar (q-cocar: true)', () => {
    const q = phase1Questions.find(q => q.id === 'q-cocar')
    expect(q).toBeDefined()
    expect(q!.answers['aie']).toBe(true)
  })

  it('aiê deve ser pescador (q-pescador: true)', () => {
    const q = phase1Questions.find(q => q.id === 'q-pescador')
    expect(q).toBeDefined()
    expect(q!.answers['aie']).toBe(true)
  })

  it('tainá deve usar adorno no lábio (q-labrete: true)', () => {
    const q = phase1Questions.find(q => q.id === 'q-labrete')
    expect(q).toBeDefined()
    expect(q!.answers['taina']).toBe(true)
  })

  it('yara deve tocar flauta (q-flauta: true)', () => {
    const q = phase1Questions.find(q => q.id === 'q-flauta')
    expect(q).toBeDefined()
    expect(q!.answers['yara']).toBe(true)
  })

  it('cauã deve ser caçador (q-cacador: true)', () => {
    const q = phase1Questions.find(q => q.id === 'q-cacador')
    expect(q).toBeDefined()
    expect(q!.answers['caua']).toBe(true)
  })

  it('lara deve tecer cestos (q-cesto: true)', () => {
    const q = phase1Questions.find(q => q.id === 'q-cesto')
    expect(q).toBeDefined()
    expect(q!.answers['lara']).toBe(true)
  })

  it('potira deve fazer colares de miçangas (q-micanga: true)', () => {
    const q = phase1Questions.find(q => q.id === 'q-micanga')
    expect(q).toBeDefined()
    expect(q!.answers['potira']).toBe(true)
  })
})

// ── Fases 2–5 ─────────────────────────────────────────────────────────────────

import { getQuestionsForPhase, allQuestions } from '../questions'
import { characters } from '../characters'

describe.each([2, 3, 4, 5])('Fase %i — banco de perguntas', (phase) => {
  const questions = getQuestionsForPhase(phase)
  const ids = characters.filter(c => c.phase === phase).map(c => c.id)

  it('tem pelo menos 8 perguntas com id único e phaseIds correto', () => {
    expect(questions.length).toBeGreaterThanOrEqual(8)
    expect(new Set(questions.map(q => q.id)).size).toBe(questions.length)
    for (const q of questions) expect(q.phaseIds).toContain(phase)
  })

  it('responde (boolean) para todos os personagens da fase', () => {
    expect(ids.length).toBe(6)
    for (const q of questions) {
      for (const id of ids) {
        expect(typeof q.answers[id], `${q.id} → ${id}`).toBe('boolean')
      }
    }
  })

  it('nenhuma pergunta tem a mesma resposta para todos os personagens', () => {
    for (const q of questions) {
      const values = ids.map(id => q.answers[id])
      expect(values.some(Boolean) && values.some(v => !v), q.id).toBe(true)
    }
  })

  it('cada personagem pode ser identificado de forma única pelas respostas', () => {
    const signatures = ids.map(id => questions.map(q => (q.answers[id] ? 1 : 0)).join(''))
    expect(new Set(signatures).size).toBe(ids.length)
  })
})

describe('allQuestions', () => {
  it('reúne as perguntas de todas as fases sem ids repetidos', () => {
    const total = [1, 2, 3, 4, 5].reduce((n, p) => n + getQuestionsForPhase(p).length, 0)
    expect(allQuestions.length).toBe(total)
    expect(new Set(allQuestions.map(q => q.id)).size).toBe(total)
  })

  it('retorna lista vazia para fase inexistente', () => {
    expect(getQuestionsForPhase(99)).toEqual([])
  })
})
