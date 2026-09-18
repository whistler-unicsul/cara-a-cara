import { describe, it, expect } from 'vitest'
import { phase1Questions } from '../questions'

const PHASE1_CHARACTER_IDS = ['aie', 'yara', 'caua', 'taina', 'iara', 'potira'] as const

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

  it('iara (Yanomami) deve ter respostas bem definidas em todas as perguntas', () => {
    for (const question of phase1Questions) {
      expect(question.answers['iara']).not.toBeUndefined()
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

  it('iara deve tecer cestos (q-cesto: true)', () => {
    const q = phase1Questions.find(q => q.id === 'q-cesto')
    expect(q).toBeDefined()
    expect(q!.answers['iara']).toBe(true)
  })

  it('potira deve fazer colares de miçangas (q-micanga: true)', () => {
    const q = phase1Questions.find(q => q.id === 'q-micanga')
    expect(q).toBeDefined()
    expect(q!.answers['potira']).toBe(true)
  })
})
