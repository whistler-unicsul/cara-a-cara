import type { Question } from '@/types'

// ── Phase 1 Question Bank ─────────────────────────────────────────────────────
//
// Personagens da Fase 1: aie (Tupi), kojo (Iorubá), zumbi (quilombola), amara (Angola/Moçambique)
//
// Matriz de respostas (true = sim, false = não):
//
// Pergunta                            | aie   | kojo  | zumbi | amara
// ------------------------------------|-------|-------|-------|------
// Usa turbante?                       | false | true  | false | false
// Usa cocar?                          | true  | false | false | false
// Tem instrumento de percussão?       | false | true  | true  | false
// A comida é frita?                   | false | true  | false | false
// Usa roupas coloridas?               | true  | true  | false | true
// Trabalha com artesanato ou tecido?  | false | true  | false | true
// Tem arco?                           | true  | false | false | false
// A comida vem de feijão?             | false | false | true  | false

export const phase1Questions: Question[] = [
  {
    id: 'q-turbante',
    text: 'Essa pessoa usa turbante?',
    audioPath: 'assets/audio/questions/q-turbante.mp3',
    iconEmoji: '🎩',
    phaseIds: [1],
    answers: {
      aie: false,
      kojo: true,
      zumbi: false,
      amara: false,
    },
  },
  {
    id: 'q-cocar',
    text: 'Essa pessoa usa cocar?',
    audioPath: 'assets/audio/questions/q-cocar.mp3',
    iconEmoji: '🪶',
    phaseIds: [1],
    answers: {
      aie: true,
      kojo: false,
      zumbi: false,
      amara: false,
    },
  },
  {
    id: 'q-percussao',
    text: 'Essa pessoa tem um instrumento de percussão?',
    audioPath: 'assets/audio/questions/q-percussao.mp3',
    iconEmoji: '🥁',
    phaseIds: [1],
    answers: {
      aie: false,
      kojo: true,
      zumbi: true,
      amara: false,
    },
  },
  {
    id: 'q-comida-frita',
    text: 'A comida dessa pessoa é frita?',
    audioPath: 'assets/audio/questions/q-comida-frita.mp3',
    iconEmoji: '🍳',
    phaseIds: [1],
    answers: {
      aie: false,
      kojo: true,
      zumbi: false,
      amara: false,
    },
  },
  {
    id: 'q-roupa-colorida',
    text: 'Essa pessoa usa roupas coloridas?',
    audioPath: 'assets/audio/questions/q-roupa-colorida.mp3',
    iconEmoji: '🌈',
    phaseIds: [1],
    answers: {
      aie: true,
      kojo: true,
      zumbi: false,
      amara: true,
    },
  },
  {
    id: 'q-artesanato',
    text: 'Essa pessoa trabalha com artesanato ou tecido?',
    audioPath: 'assets/audio/questions/q-artesanato.mp3',
    iconEmoji: '🧵',
    phaseIds: [1],
    answers: {
      aie: false,
      kojo: true,
      zumbi: false,
      amara: true,
    },
  },
  {
    id: 'q-arco',
    text: 'Essa pessoa tem um arco?',
    audioPath: 'assets/audio/questions/q-arco.mp3',
    iconEmoji: '🏹',
    phaseIds: [1],
    answers: {
      aie: true,
      kojo: false,
      zumbi: false,
      amara: false,
    },
  },
  {
    id: 'q-feijao',
    text: 'A comida dessa pessoa vem de feijão?',
    audioPath: 'assets/audio/questions/q-feijao.mp3',
    iconEmoji: '🫘',
    phaseIds: [1],
    answers: {
      aie: false,
      kojo: false,
      zumbi: true,
      amara: false,
    },
  },
]

export const allQuestions: Question[] = [...phase1Questions]
