import type { Question } from '@/types'
import { characters } from '@/data/characters'

// ── Phase 1 Question Bank ─────────────────────────────────────────────────────
//
// Personagens da Fase 1: aie (Tupi), yara (Guarani), caua (Xavante),
//                        taina (Kayapó), lara (Yanomami), potira (Pataxó)
//
// Matriz de respostas (true = sim, false = não):
//
// Pergunta                         | aie | yara | caua | taina | lara | potira
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
      lara: false,
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
      lara: false,
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
      lara: false,
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
      lara: false,
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
      lara: true,
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
      lara: false,
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
      lara: true,
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
      lara: false,
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
      lara: false,
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
      lara: false,
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
      lara: true,
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
      lara: false,
      potira: true,
    },
  },
]

// ── Fases 2–5 ─────────────────────────────────────────────────────────────────
//
// Cada pergunta lista só os ids que respondem "sim"; os demais personagens da
// fase respondem "não". As respostas se baseiam nos campos de characters.ts
// (traje, profissão, item cultural, comida típica e origem).

function buildQuestions(
  phase: number,
  defs: Array<{ slug: string; text: string; emoji: string; yes: string[] }>,
): Question[] {
  const ids = characters.filter(c => c.phase === phase).map(c => c.id)
  return defs.map(({ slug, text, emoji, yes }) => ({
    id: `q-p${phase}-${slug}`,
    text,
    audioPath: `assets/audio/questions/q-p${phase}-${slug}.mp3`,
    iconEmoji: emoji,
    phaseIds: [phase],
    answers: Object.fromEntries(ids.map(id => [id, yes.includes(id)])),
  }))
}

// Fase 2 — kojo, amara, zumbi, babatunde, kofi, maria
export const phase2Questions: Question[] = buildQuestions(2, [
  { slug: 'tecido', text: 'Essa pessoa trabalha com tecidos ou renda?', emoji: '🧵', yes: ['amara', 'kofi', 'maria'] },
  { slug: 'africa', text: 'Essa pessoa tem origem na África?', emoji: '🌍', yes: ['kojo', 'amara', 'babatunde', 'kofi'] },
  { slug: 'tambor', text: 'Essa pessoa toca tambor?', emoji: '🥁', yes: ['kojo', 'babatunde'] },
  { slug: 'colorido', text: 'Essa pessoa usa roupas muito coloridas ou estampadas?', emoji: '🌈', yes: ['kojo', 'amara', 'babatunde', 'kofi'] },
  { slug: 'historias', text: 'Essa pessoa conta histórias?', emoji: '📖', yes: ['babatunde'] },
  { slug: 'terra', text: 'Essa pessoa trabalha na terra?', emoji: '🌾', yes: ['zumbi'] },
  { slug: 'doces', text: 'Essa pessoa faz doces?', emoji: '🍬', yes: ['maria'] },
  { slug: 'ferro', text: 'Essa pessoa trabalha com ferro?', emoji: '🔨', yes: ['kojo'] },
  { slug: 'joias', text: 'Essa pessoa usa joias ou miçangas?', emoji: '📿', yes: ['amara', 'babatunde', 'maria'] },
  { slug: 'berimbau', text: 'Essa pessoa toca berimbau?', emoji: '🎶', yes: ['zumbi'] },
  { slug: 'portugal', text: 'Essa pessoa veio de Portugal?', emoji: '🇵🇹', yes: ['maria'] },
  { slug: 'listrado', text: 'Essa pessoa usa tecido listrado em dourado, verde e vermelho?', emoji: '🟨', yes: ['kofi'] },
])

// Fase 3 — sofia, greta, carmen, zofia, olena, natasha
export const phase3Questions: Question[] = buildQuestions(3, [
  { slug: 'bordado', text: 'Essa pessoa usa roupa bordada?', emoji: '🪡', yes: ['sofia', 'greta', 'zofia', 'olena', 'natasha'] },
  { slug: 'ovo', text: 'Essa pessoa decora ovos?', emoji: '🥚', yes: ['zofia', 'olena'] },
  { slug: 'danca', text: 'Essa pessoa dança?', emoji: '💃', yes: ['carmen'] },
  { slug: 'instrumento', text: 'Essa pessoa toca algum instrumento?', emoji: '🎵', yes: ['sofia', 'greta', 'carmen', 'natasha'] },
  { slug: 'flor-cabelo', text: 'Essa pessoa usa flores no cabelo?', emoji: '🌸', yes: ['carmen', 'olena'] },
  { slug: 'trancas', text: 'Essa pessoa usa tranças?', emoji: '🎀', yes: ['greta', 'zofia'] },
  { slug: 'cerveja', text: 'Essa pessoa faz cerveja?', emoji: '🍺', yes: ['greta'] },
  { slug: 'professora', text: 'Essa pessoa é professora?', emoji: '🏫', yes: ['carmen', 'natasha'] },
  { slug: 'agricultora', text: 'Essa pessoa trabalha na terra?', emoji: '🌾', yes: ['greta', 'zofia', 'olena'] },
  { slug: 'vermelho', text: 'Essa pessoa usa algo vermelho de destaque?', emoji: '🔴', yes: ['sofia', 'carmen'] },
  { slug: 'chapeu', text: 'Essa pessoa usa um chapéu branco bordado?', emoji: '👒', yes: ['natasha'] },
  { slug: 'sopa', text: 'Essa pessoa come sopa típica?', emoji: '🍲', yes: ['natasha'] },
])

// Fase 4 — hana, mei, habib, fatima, jiho, ara
export const phase4Questions: Question[] = buildQuestions(4, [
  { slug: 'asia-oriental', text: 'Essa pessoa tem origem na Ásia Oriental?', emoji: '🌏', yes: ['hana', 'mei', 'jiho'] },
  { slug: 'oriente-medio', text: 'Essa pessoa tem origem no Oriente Médio?', emoji: '🕌', yes: ['habib', 'fatima', 'ara'] },
  { slug: 'comerciante', text: 'Essa pessoa é comerciante?', emoji: '🛍️', yes: ['mei', 'habib'] },
  { slug: 'costura', text: 'Essa pessoa borda ou costura?', emoji: '🧵', yes: ['fatima', 'jiho'] },
  { slug: 'instrumento', text: 'Essa pessoa toca instrumento de cordas ou de sopro?', emoji: '🎶', yes: ['habib', 'jiho', 'ara'] },
  { slug: 'flores', text: 'Essa pessoa cuida de flores e plantas?', emoji: '🌸', yes: ['hana'] },
  { slug: 'papel', text: 'Essa pessoa usa objetos de papel?', emoji: '📄', yes: ['hana', 'mei'] },
  { slug: 'dourado', text: 'Essa pessoa usa detalhes dourados?', emoji: '✨', yes: ['mei', 'habib', 'fatima', 'ara'] },
  { slug: 'vermelho', text: 'Essa pessoa usa roupa com vermelho forte?', emoji: '🔴', yes: ['mei', 'ara'] },
  { slug: 'cabeca', text: 'Essa pessoa usa turbante ou véu?', emoji: '🧕', yes: ['habib', 'fatima'] },
  { slug: 'ouro', text: 'Essa pessoa trabalha com ouro?', emoji: '🥇', yes: ['ara'] },
  { slug: 'kimchi', text: 'Essa pessoa come kimchi?', emoji: '🥬', yes: ['jiho'] },
])

// Fase 5 — samuel, pieter, helene, zara, dilnoza, amaru
export const phase5Questions: Question[] = buildQuestions(5, [
  { slug: 'america-sul', text: 'Essa pessoa vem da América do Sul?', emoji: '🌎', yes: ['dilnoza', 'amaru'] },
  { slug: 'europa', text: 'Essa pessoa tem origem na Europa?', emoji: '🌍', yes: ['samuel', 'pieter', 'helene', 'zara'] },
  { slug: 'musica', text: 'Essa pessoa toca algum instrumento?', emoji: '🎻', yes: ['zara', 'dilnoza', 'amaru'] },
  { slug: 'sopro', text: 'Essa pessoa toca flauta?', emoji: '🪈', yes: ['dilnoza'] },
  { slug: 'livro', text: 'Essa pessoa trabalha com livros?', emoji: '📚', yes: ['samuel', 'helene'] },
  { slug: 'mapa', text: 'Essa pessoa faz mapas?', emoji: '🗺️', yes: ['pieter'] },
  { slug: 'danca', text: 'Essa pessoa dança?', emoji: '💃', yes: ['zara'] },
  { slug: 'chapeu', text: 'Essa pessoa usa chapéu?', emoji: '🎩', yes: ['pieter', 'dilnoza'] },
  { slug: 'colorido', text: 'Essa pessoa usa roupas muito coloridas?', emoji: '🌈', yes: ['zara', 'dilnoza', 'amaru'] },
  { slug: 'escuro', text: 'Essa pessoa usa roupa escura e sóbria?', emoji: '🖤', yes: ['samuel', 'pieter'] },
  { slug: 'costura', text: 'Essa pessoa costura?', emoji: '🧵', yes: ['dilnoza'] },
  { slug: 'rua', text: 'Essa pessoa toca música na rua?', emoji: '🏙️', yes: ['amaru'] },
])

const questionsByPhase: Record<number, Question[]> = {
  1: phase1Questions,
  2: phase2Questions,
  3: phase3Questions,
  4: phase4Questions,
  5: phase5Questions,
}

export function getQuestionsForPhase(phase: number): Question[] {
  return questionsByPhase[phase] ?? []
}

export const allQuestions: Question[] = Object.values(questionsByPhase).flat()
