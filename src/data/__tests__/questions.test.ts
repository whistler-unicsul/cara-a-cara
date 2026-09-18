import { describe, it, expect } from 'vitest'
import { phase1Questions } from '../questions'

// Personagens da Fase 1
const PHASE1_CHARACTER_IDS = ['aie', 'kojo', 'zumbi', 'amara'] as const

describe('Phase 1 Question Bank — integridade dos dados', () => {
  it('deve ter pelo menos 8 perguntas', () => {
    expect(phase1Questions.length).toBeGreaterThanOrEqual(8)
  })

  it('cada pergunta deve ter answers definidos para todos os 4 personagens da Fase 1', () => {
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

  it('kojo (Iorubá) deve ter respostas bem definidas em todas as perguntas', () => {
    for (const question of phase1Questions) {
      expect(question.answers['kojo']).not.toBeUndefined()
    }
  })

  it('zumbi (quilombola) deve ter respostas bem definidas em todas as perguntas', () => {
    for (const question of phase1Questions) {
      expect(question.answers['zumbi']).not.toBeUndefined()
    }
  })

  it('amara (Angola/Moçambique) deve ter respostas bem definidas em todas as perguntas', () => {
    for (const question of phase1Questions) {
      expect(question.answers['amara']).not.toBeUndefined()
    }
  })

  it('as perguntas devem cobrir pelo menos 3 atributos distintos (verificado por diversidade de respostas)', () => {
    // Verifica que não todas as perguntas têm o mesmo padrão de respostas
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

  // Verificações específicas de valores conhecidos (matriz de perguntas)
  it('kojo deve usar turbante (q-turbante: true)', () => {
    const q = phase1Questions.find(q => q.id === 'q-turbante')
    expect(q).toBeDefined()
    expect(q!.answers['kojo']).toBe(true)
  })

  it('aiê deve usar cocar (q-cocar: true)', () => {
    const q = phase1Questions.find(q => q.id === 'q-cocar')
    expect(q).toBeDefined()
    expect(q!.answers['aie']).toBe(true)
  })

  it('zumbi deve ter feijão na comida (q-feijao: true)', () => {
    const q = phase1Questions.find(q => q.id === 'q-feijao')
    expect(q).toBeDefined()
    expect(q!.answers['zumbi']).toBe(true)
  })
})
