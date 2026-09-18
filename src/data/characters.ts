import type { Character } from '@/types'

// ── Phase 1 — Personagens completos ──────────────────────────────────────────

const AIE: Character = {
  id: 'aie',
  name: 'Aiê',
  phase: 1,
  origin: 'Povos Tupi, Brasil',
  originFact:
    'Aiê vive nas florestas da Amazônia com seu povo Tupi, que habitou o Brasil muito antes dos europeus chegarem. Seu povo conhecia cada planta e rio da mata.',
  culturalFact:
    'Os Tupi ensinaram ao Brasil o cultivo da mandioca, a arte do grafismo corporal e inúmeras palavras da língua portuguesa, como abacaxi, pipoca e mingau.',
  traje: 'Cocar de penas coloridas e grafismos corporais pintados com jenipapo e urucum',
  profissao: 'Pescador',
  itemCultural: 'Arco e flecha',
  comidaTipica: 'Beiju',
  imagePath: 'assets/characters/aie.png',
  audioPath: 'assets/audio/characters/aie-narration.mp3',
  itemIconPath: 'assets/icons/items/arco-flecha.svg',
  attributes: {
    usaTurbante: false,
    usaCocar: true,
    temPercussao: false,
    comidaFrita: false,
    usaRoupasColoridas: true,
    trabalhaArtesanato: false,
    temArco: true,
    comidaDeFeijao: false,
    temInstrumentoPercussao: false,
    ehPescador: true,
    usaGrafismoCorporal: true,
    temAtabaque: false,
    temBerimbau: false,
    temMascaraDeMadeira: false,
    usaCapulana: false,
    usaPanoDaCosta: false,
  },
}

const KOJO: Character = {
  id: 'kojo',
  name: 'Kojo',
  phase: 1,
  origin: 'Povos Iorubá, África Ocidental',
  originFact:
    'Kojo descende do povo Iorubá, trazido da África Ocidental para o Brasil durante o período colonial. Seus ancestrais eram mestres artesãos, músicos e comerciantes de um grande império.',
  culturalFact:
    'O povo Iorubá trouxe ao Brasil o acarajé, o candomblé, o atabaque, o pano da costa e uma rica tradição oral de histórias chamadas patakis, que ainda vivem no Brasil hoje.',
  traje: 'Turbante colorido e pano da costa com estampas geométricas',
  profissao: 'Ferreiro',
  itemCultural: 'Atabaque',
  comidaTipica: 'Acarajé',
  imagePath: 'assets/characters/kojo.png',
  audioPath: 'assets/audio/characters/kojo-narration.mp3',
  itemIconPath: 'assets/icons/items/atabaque.svg',
  attributes: {
    usaTurbante: true,
    usaCocar: false,
    temPercussao: true,
    comidaFrita: true,
    usaRoupasColoridas: true,
    trabalhaArtesanato: true,
    temArco: false,
    comidaDeFeijao: false,
    temInstrumentoPercussao: true,
    ehPescador: false,
    usaGrafismoCorporal: false,
    temAtabaque: true,
    temBerimbau: false,
    temMascaraDeMadeira: false,
    usaCapulana: false,
    usaPanoDaCosta: true,
  },
}

const ZUMBI: Character = {
  id: 'zumbi',
  name: 'Zumbi',
  phase: 1,
  origin: 'Quilombo dos Palmares, Brasil',
  originFact:
    'Zumbi dos Palmares liderou o maior quilombo do Brasil, onde africanos escravizados e seus descendentes viveram livres por quase cem anos nas matas de Alagoas.',
  culturalFact:
    'Os quilombolas preservaram línguas, religiões, músicas e saberes africanos no Brasil. Zumbi é símbolo de resistência e seu legado é celebrado no Dia da Consciência Negra, 20 de novembro.',
  traje: 'Roupa de campo simples, resistente para o trabalho na terra',
  profissao: 'Agricultor',
  itemCultural: 'Berimbau',
  comidaTipica: 'Feijoada',
  imagePath: 'assets/characters/zumbi.png',
  audioPath: 'assets/audio/characters/zumbi-narration.mp3',
  itemIconPath: 'assets/icons/items/berimbau.svg',
  attributes: {
    usaTurbante: false,
    usaCocar: false,
    temPercussao: true,
    comidaFrita: false,
    usaRoupasColoridas: false,
    trabalhaArtesanato: false,
    temArco: false,
    comidaDeFeijao: true,
    temInstrumentoPercussao: true,
    ehPescador: false,
    usaGrafismoCorporal: false,
    temAtabaque: false,
    temBerimbau: true,
    temMascaraDeMadeira: false,
    usaCapulana: false,
    usaPanoDaCosta: false,
  },
}

const AMARA: Character = {
  id: 'amara',
  name: 'Amara',
  phase: 1,
  origin: 'Angola e Moçambique, África',
  originFact:
    'Amara tem raízes nos povos Bantu de Angola e Moçambique, trazidos ao Brasil durante o período colonial. Sua cultura influenciou profundamente a linguagem, a culinária e as artes do Brasil.',
  culturalFact:
    'Os povos Bantu trouxeram ao Brasil a capoeira, o jongo, o samba de roda, a culinária à base de dendê e o uso da capulana, um tecido colorido cheio de significado cultural.',
  traje: 'Capulana colorida com padrões geométricos e miçangas',
  profissao: 'Tecelã',
  itemCultural: 'Máscara de madeira',
  comidaTipica: 'Muamba',
  imagePath: 'assets/characters/amara.png',
  audioPath: 'assets/audio/characters/amara-narration.mp3',
  itemIconPath: 'assets/icons/items/mascara-madeira.svg',
  attributes: {
    usaTurbante: false,
    usaCocar: false,
    temPercussao: false,
    comidaFrita: false,
    usaRoupasColoridas: true,
    trabalhaArtesanato: true,
    temArco: false,
    comidaDeFeijao: false,
    temInstrumentoPercussao: false,
    ehPescador: false,
    usaGrafismoCorporal: false,
    temAtabaque: false,
    temBerimbau: false,
    temMascaraDeMadeira: true,
    usaCapulana: true,
    usaPanoDaCosta: false,
  },
}

// ── Phase 2 — Stubs ───────────────────────────────────────────────────────────

const YARA: Character = {
  id: 'yara',
  name: 'Yara',
  phase: 2,
  origin: 'Povos Guarani, Brasil',
  originFact: 'Stub — conteúdo a ser preenchido.',
  culturalFact: 'Stub — conteúdo a ser preenchido.',
  traje: 'Stub',
  profissao: 'Stub',
  itemCultural: 'Stub',
  comidaTipica: 'Stub',
  imagePath: 'assets/characters/yara.png',
  audioPath: 'assets/audio/characters/yara-narration.mp3',
  itemIconPath: 'assets/icons/items/stub.svg',
  attributes: {},
}

const BABATUNDE: Character = {
  id: 'babatunde',
  name: 'Babatunde',
  phase: 2,
  origin: 'Povos Fon, Benin',
  originFact: 'Stub — conteúdo a ser preenchido.',
  culturalFact: 'Stub — conteúdo a ser preenchido.',
  traje: 'Stub',
  profissao: 'Stub',
  itemCultural: 'Stub',
  comidaTipica: 'Stub',
  imagePath: 'assets/characters/babatunde.png',
  audioPath: 'assets/audio/characters/babatunde-narration.mp3',
  itemIconPath: 'assets/icons/items/stub.svg',
  attributes: {},
}

const CAUÃ: Character = {
  id: 'caua',
  name: 'Cauã',
  phase: 2,
  origin: 'Povos Xavante, Brasil',
  originFact: 'Stub — conteúdo a ser preenchido.',
  culturalFact: 'Stub — conteúdo a ser preenchido.',
  traje: 'Stub',
  profissao: 'Stub',
  itemCultural: 'Stub',
  comidaTipica: 'Stub',
  imagePath: 'assets/characters/caua.png',
  audioPath: 'assets/audio/characters/caua-narration.mp3',
  itemIconPath: 'assets/icons/items/stub.svg',
  attributes: {},
}

const NANDI: Character = {
  id: 'nandi',
  name: 'Nandi',
  phase: 2,
  origin: 'Povos Zulu, África do Sul',
  originFact: 'Stub — conteúdo a ser preenchido.',
  culturalFact: 'Stub — conteúdo a ser preenchido.',
  traje: 'Stub',
  profissao: 'Stub',
  itemCultural: 'Stub',
  comidaTipica: 'Stub',
  imagePath: 'assets/characters/nandi.png',
  audioPath: 'assets/audio/characters/nandi-narration.mp3',
  itemIconPath: 'assets/icons/items/stub.svg',
  attributes: {},
}

// ── Phase 3 — Stubs ───────────────────────────────────────────────────────────

const TAINÁ: Character = {
  id: 'taina',
  name: 'Tainá',
  phase: 3,
  origin: 'Povos Kayapó, Brasil',
  originFact: 'Stub — conteúdo a ser preenchido.',
  culturalFact: 'Stub — conteúdo a ser preenchido.',
  traje: 'Stub',
  profissao: 'Stub',
  itemCultural: 'Stub',
  comidaTipica: 'Stub',
  imagePath: 'assets/characters/taina.png',
  audioPath: 'assets/audio/characters/taina-narration.mp3',
  itemIconPath: 'assets/icons/items/stub.svg',
  attributes: {},
}

const KOFI: Character = {
  id: 'kofi',
  name: 'Kofi',
  phase: 3,
  origin: 'Povos Akan, Gana',
  originFact: 'Stub — conteúdo a ser preenchido.',
  culturalFact: 'Stub — conteúdo a ser preenchido.',
  traje: 'Stub',
  profissao: 'Stub',
  itemCultural: 'Stub',
  comidaTipica: 'Stub',
  imagePath: 'assets/characters/kofi.png',
  audioPath: 'assets/audio/characters/kofi-narration.mp3',
  itemIconPath: 'assets/icons/items/stub.svg',
  attributes: {},
}

const IARA: Character = {
  id: 'iara',
  name: 'Iara',
  phase: 3,
  origin: 'Povos Yanomami, Brasil',
  originFact: 'Stub — conteúdo a ser preenchido.',
  culturalFact: 'Stub — conteúdo a ser preenchido.',
  traje: 'Stub',
  profissao: 'Stub',
  itemCultural: 'Stub',
  comidaTipica: 'Stub',
  imagePath: 'assets/characters/iara.png',
  audioPath: 'assets/audio/characters/iara-narration.mp3',
  itemIconPath: 'assets/icons/items/stub.svg',
  attributes: {},
}

const ADISA: Character = {
  id: 'adisa',
  name: 'Adisa',
  phase: 3,
  origin: 'Povos Mandinga, África Ocidental',
  originFact: 'Stub — conteúdo a ser preenchido.',
  culturalFact: 'Stub — conteúdo a ser preenchido.',
  traje: 'Stub',
  profissao: 'Stub',
  itemCultural: 'Stub',
  comidaTipica: 'Stub',
  imagePath: 'assets/characters/adisa.png',
  audioPath: 'assets/audio/characters/adisa-narration.mp3',
  itemIconPath: 'assets/icons/items/stub.svg',
  attributes: {},
}

// ── Phase 4 — Stubs ───────────────────────────────────────────────────────────

const TUPÃ: Character = {
  id: 'tupa',
  name: 'Tupã',
  phase: 4,
  origin: 'Povos Tupinambá, Brasil',
  originFact: 'Stub — conteúdo a ser preenchido.',
  culturalFact: 'Stub — conteúdo a ser preenchido.',
  traje: 'Stub',
  profissao: 'Stub',
  itemCultural: 'Stub',
  comidaTipica: 'Stub',
  imagePath: 'assets/characters/tupa.png',
  audioPath: 'assets/audio/characters/tupa-narration.mp3',
  itemIconPath: 'assets/icons/items/stub.svg',
  attributes: {},
}

const EFUA: Character = {
  id: 'efua',
  name: 'Efua',
  phase: 4,
  origin: 'Povos Ewe, Togo',
  originFact: 'Stub — conteúdo a ser preenchido.',
  culturalFact: 'Stub — conteúdo a ser preenchido.',
  traje: 'Stub',
  profissao: 'Stub',
  itemCultural: 'Stub',
  comidaTipica: 'Stub',
  imagePath: 'assets/characters/efua.png',
  audioPath: 'assets/audio/characters/efua-narration.mp3',
  itemIconPath: 'assets/icons/items/stub.svg',
  attributes: {},
}

const KUARAY: Character = {
  id: 'kuaray',
  name: 'Kuaray',
  phase: 4,
  origin: 'Povos Mbyá-Guarani, Brasil',
  originFact: 'Stub — conteúdo a ser preenchido.',
  culturalFact: 'Stub — conteúdo a ser preenchido.',
  traje: 'Stub',
  profissao: 'Stub',
  itemCultural: 'Stub',
  comidaTipica: 'Stub',
  imagePath: 'assets/characters/kuaray.png',
  audioPath: 'assets/audio/characters/kuaray-narration.mp3',
  itemIconPath: 'assets/icons/items/stub.svg',
  attributes: {},
}

const SANGO: Character = {
  id: 'sango',
  name: 'Sango',
  phase: 4,
  origin: 'Povos Hausa, Nigéria',
  originFact: 'Stub — conteúdo a ser preenchido.',
  culturalFact: 'Stub — conteúdo a ser preenchido.',
  traje: 'Stub',
  profissao: 'Stub',
  itemCultural: 'Stub',
  comidaTipica: 'Stub',
  imagePath: 'assets/characters/sango.png',
  audioPath: 'assets/audio/characters/sango-narration.mp3',
  itemIconPath: 'assets/icons/items/stub.svg',
  attributes: {},
}

// ── Export ────────────────────────────────────────────────────────────────────

export const characters: Character[] = [
  // Phase 1
  AIE,
  KOJO,
  ZUMBI,
  AMARA,
  // Phase 2
  YARA,
  BABATUNDE,
  CAUÃ,
  NANDI,
  // Phase 3
  TAINÁ,
  KOFI,
  IARA,
  ADISA,
  // Phase 4
  TUPÃ,
  EFUA,
  KUARAY,
  SANGO,
]

export const phase1Characters: Character[] = characters.filter(c => c.phase === 1)
