import type { Question } from '@/types'

// ── Phase 1 Question Bank ─────────────────────────────────────────────────────
//
// Personagens da Fase 1: aie (Tupi), yara (Guarani), caua (Xavante),
//                        taina (Kayapó), iara (Yanomami), potira (Pataxó)
//
// Matriz de respostas (true = sim, false = não):
//
// Pergunta                         | aie | yara | caua | taina | iara | potira
// ---------------------------------|-----|------|------|-------|------|-------
// Usa cocar?                       |  T  |  F   |  T   |   F   |  F   |   F
// É pescador/pescadora?            |  T  |  F   |  F   |   F   |  F   |   F
// Usa arco e flecha?               |  T  |  F   |  T   |   F   |  F   |   F
// Usa roupas coloridas?            |  T  |  T   |  F   |   F   |  F   |   T
// Trabalha com artesanato?         |  F  |  T   |  F   |   F   |  T   |   T
// Toca flauta?                     |  F  |  T   |  F   |   F   |  F   |   F
// É curandeiro/curandeira?         |  F  |  T   |  F   |   F   |  T   |   F
// É caçador/caçadora?              |  F  |  F   |  T   |   F   |  F   |   F
// Usa adorno no lábio?             |  F  |  F   |  F   |   T   |  F   |   F
// Toca maracá?                     |  F  |  F   |  F   |   T   |  F   |   F
// Tece cestos?                     |  F  |  F   |  F   |   F   |  T   |   F
// Faz colares de miçangas?         |  F  |  T   |  F   |   F   |  F   |   T

export const phase1Questions: Question[] = [
  {
    id: 'q-cocar',
    text: 'Essa pessoa usa cocar?',
    audioPath: 'assets/audio/questions/q-cocar.mp3',
    iconEmoji: '🪶',
    phaseIds: [1],
    answers: {
      aie: true,
      yara: false,
      caua: true,
      taina: false,
      iara: false,
      potira: false,
    },
  },
  {
    id: 'q-pescador',
    text: 'Essa pessoa é pescadora ou pescador?',
    audioPath: 'assets/audio/questions/q-pescador.mp3',
    iconEmoji: '🎣',
    phaseIds: [1],
    answers: {
      aie: true,
      yara: false,
      caua: false,
      taina: false,
      iara: false,
      potira: false,
    },
  },
  {
    id: 'q-arco',
    text: 'Essa pessoa usa arco e flecha?',
    audioPath: 'assets/audio/questions/q-arco.mp3',
    iconEmoji: '🏹',
    phaseIds: [1],
    answers: {
      aie: true,
      yara: false,
      caua: true,
      taina: false,
      iara: false,
      potira: false,
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
      yara: true,
      caua: false,
      taina: false,
      iara: false,
      potira: true,
    },
  },
  {
    id: 'q-artesanato',
    text: 'Essa pessoa trabalha com artesanato?',
    audioPath: 'assets/audio/questions/q-artesanato.mp3',
    iconEmoji: '🧵',
    phaseIds: [1],
    answers: {
      aie: false,
      yara: true,
      caua: false,
      taina: false,
      iara: true,
      potira: true,
    },
  },
  {
    id: 'q-flauta',
    text: 'Essa pessoa toca flauta?',
    audioPath: 'assets/audio/questions/q-flauta.mp3',
    iconEmoji: '🎵',
    phaseIds: [1],
    answers: {
      aie: false,
      yara: true,
      caua: false,
      taina: false,
      iara: false,
      potira: false,
    },
  },
  {
    id: 'q-curandeiro',
    text: 'Essa pessoa é curandeira ou curandeiro?',
    audioPath: 'assets/audio/questions/q-curandeiro.mp3',
    iconEmoji: '🌿',
    phaseIds: [1],
    answers: {
      aie: false,
      yara: true,
      caua: false,
      taina: false,
      iara: true,
      potira: false,
    },
  },
  {
    id: 'q-cacador',
    text: 'Essa pessoa é caçadora ou caçador?',
    audioPath: 'assets/audio/questions/q-cacador.mp3',
    iconEmoji: '🦌',
    phaseIds: [1],
    answers: {
      aie: false,
      yara: false,
      caua: true,
      taina: false,
      iara: false,
      potira: false,
    },
  },
  {
    id: 'q-labrete',
    text: 'Essa pessoa usa adorno no lábio?',
    audioPath: 'assets/audio/questions/q-labrete.mp3',
    iconEmoji: '💎',
    phaseIds: [1],
    answers: {
      aie: false,
      yara: false,
      caua: false,
      taina: true,
      iara: false,
      potira: false,
    },
  },
  {
    id: 'q-maraca',
    text: 'Essa pessoa toca maracá?',
    audioPath: 'assets/audio/questions/q-maraca.mp3',
    iconEmoji: '🪇',
    phaseIds: [1],
    answers: {
      aie: false,
      yara: false,
      caua: false,
      taina: true,
      iara: false,
      potira: false,
    },
  },
  {
    id: 'q-cesto',
    text: 'Essa pessoa tece cestos?',
    audioPath: 'assets/audio/questions/q-cesto.mp3',
    iconEmoji: '🧺',
    phaseIds: [1],
    answers: {
      aie: false,
      yara: false,
      caua: false,
      taina: false,
      iara: true,
      potira: false,
    },
  },
  {
    id: 'q-micanga',
    text: 'Essa pessoa faz colares de miçangas?',
    audioPath: 'assets/audio/questions/q-micanga.mp3',
    iconEmoji: '📿',
    phaseIds: [1],
    answers: {
      aie: false,
      yara: true,
      caua: false,
      taina: false,
      iara: false,
      potira: true,
    },
  },
]

export const allQuestions: Question[] = [...phase1Questions]
