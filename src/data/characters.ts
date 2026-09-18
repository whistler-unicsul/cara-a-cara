import type { Character } from '@/types'

// ── Fase 1 — Povos Originários ────────────────────────────────────────────────

const AIE: Character = {
  id: 'aie',
  name: 'Aiê',
  phase: 1,
  origin: 'Povos Tupi, Amazônia',
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
    usaCocar: true,
    ehPescador: true,
    usaArcoFlecha: true,
    usaRoupasColoridas: true,
    trabalhaArtesanato: false,
    tocaFlauta: false,
    ehCurandeiro: false,
    ehCacador: false,
    usaLabrete: false,
    tocaMaraca: false,
    teceCestos: false,
    fazMicanga: false,
  },
}

const YARA: Character = {
  id: 'yara',
  name: 'Yara',
  phase: 1,
  origin: 'Povos Guarani, Sul do Brasil',
  originFact:
    'Yara vive nas matas do Sul do Brasil com seu povo Guarani, que percorreu grandes distâncias em busca da "Terra sem Males" — um paraíso prometido que guia sua espiritualidade até hoje.',
  culturalFact:
    'Os Guarani deram ao Brasil palavras como jaguar e nhanduti. Sua língua é oficial no Paraguai e influenciou todo o vocabulário da região sul.',
  traje: 'Vestido de fibras naturais com pinturas vermelhas e pretas e adornos de sementes coloridas',
  profissao: 'Curandeira',
  itemCultural: 'Flauta de bambu (mimby)',
  comidaTipica: 'Chipa',
  imagePath: 'assets/characters/yara.png',
  audioPath: 'assets/audio/characters/yara-narration.mp3',
  itemIconPath: 'assets/icons/items/flauta-bambu.svg',
  attributes: {
    usaCocar: false,
    ehPescador: false,
    usaArcoFlecha: false,
    usaRoupasColoridas: true,
    trabalhaArtesanato: true,
    tocaFlauta: true,
    ehCurandeiro: true,
    ehCacador: false,
    usaLabrete: false,
    tocaMaraca: false,
    teceCestos: false,
    fazMicanga: true,
  },
}

const CAUA: Character = {
  id: 'caua',
  name: 'Cauã',
  phase: 1,
  origin: 'Povos Xavante, Mato Grosso',
  originFact:
    'Cauã é do povo Xavante, guerreiros do cerrado do Mato Grosso, conhecidos por sua resistência às invasões. Foram um dos últimos povos a ter contato com os não-indígenas, na década de 1940.',
  culturalFact:
    'Os Xavante têm uma das culturas musicais mais ricas do Brasil, com cerimônias de canto coletivo (wai\'á) que duram dias inteiros. São guardiões do cerrado e de sua biodiversidade.',
  traje: 'Tanga de algodão, cocar de penas de arara, pintura facial elaborada em preto e vermelho e brincos de madeira',
  profissao: 'Caçador',
  itemCultural: 'Borduna',
  comidaTipica: 'Carne assada com batata-doce',
  imagePath: 'assets/characters/caua.png',
  audioPath: 'assets/audio/characters/caua-narration.mp3',
  itemIconPath: 'assets/icons/items/borduna.svg',
  attributes: {
    usaCocar: true,
    ehPescador: false,
    usaArcoFlecha: true,
    usaRoupasColoridas: false,
    trabalhaArtesanato: false,
    tocaFlauta: false,
    ehCurandeiro: false,
    ehCacador: true,
    usaLabrete: false,
    tocaMaraca: false,
    teceCestos: false,
    fazMicanga: false,
  },
}

const TAINA: Character = {
  id: 'taina',
  name: 'Tainá',
  phase: 1,
  origin: 'Povos Kayapó, Pará',
  originFact:
    'Tainá é Kayapó, guardiã da floresta amazônica no Pará e Mato Grosso. Seu povo é famoso por defender sua terra com bravura — e por ter adornos únicos, como o disco no lábio inferior.',
  culturalFact:
    'Os Kayapó são grandes defensores da Amazônia. A liderança Kayapó Raoni viajou o mundo para alertar sobre o desmatamento. Seu povo domina o manejo de mais de 650 plantas medicinais.',
  traje: 'Saia de palha, labrete (disco no lábio), diadema de penas coloridas e pintura corporal geométrica preta',
  profissao: 'Guardiã da floresta',
  itemCultural: 'Maracá',
  comidaTipica: 'Piqui com arroz',
  imagePath: 'assets/characters/taina.png',
  audioPath: 'assets/audio/characters/taina-narration.mp3',
  itemIconPath: 'assets/icons/items/maraca.svg',
  attributes: {
    usaCocar: false,
    ehPescador: false,
    usaArcoFlecha: false,
    usaRoupasColoridas: false,
    trabalhaArtesanato: false,
    tocaFlauta: false,
    ehCurandeiro: false,
    ehCacador: false,
    usaLabrete: true,
    tocaMaraca: true,
    teceCestos: false,
    fazMicanga: false,
  },
}

const IARA: Character = {
  id: 'iara',
  name: 'Iara',
  phase: 1,
  origin: 'Povos Yanomami, Roraima',
  originFact:
    'Iara vive nas serras de Roraima e do Amazonas com os Yanomami, um dos maiores povos indígenas isolados da Amazônia. Vivem em grandes casas comunitárias circulares chamadas xapono.',
  culturalFact:
    'Os Yanomami possuem profundo conhecimento sobre plantas da floresta e desenvolveram uma comunicação com os espíritos da natureza por meio do xamanismo. São símbolo de resistência à garimpagem ilegal.',
  traje: 'Saias de folhas, fios de algodão no nariz e orelhas e pintura vermelha de urucum pelo corpo',
  profissao: 'Coletora e xamã aprendiz',
  itemCultural: 'Cesto trançado',
  comidaTipica: 'Banana assada com mel silvestre',
  imagePath: 'assets/characters/iara.png',
  audioPath: 'assets/audio/characters/iara-narration.mp3',
  itemIconPath: 'assets/icons/items/cesto.svg',
  attributes: {
    usaCocar: false,
    ehPescador: false,
    usaArcoFlecha: false,
    usaRoupasColoridas: false,
    trabalhaArtesanato: true,
    tocaFlauta: false,
    ehCurandeiro: true,
    ehCacador: false,
    usaLabrete: false,
    tocaMaraca: false,
    teceCestos: true,
    fazMicanga: false,
  },
}

const POTIRA: Character = {
  id: 'potira',
  name: 'Potira',
  phase: 1,
  origin: 'Povos Pataxó, Bahia',
  originFact:
    'Potira é Pataxó, povo da Costa do Descobrimento na Bahia — foram dos primeiros indígenas a ter contato com os portugueses em 1500. Resistiram por séculos e hoje lutam pela demarcação de suas terras.',
  culturalFact:
    'Os Pataxó são conhecidos por seu artesanato colorido com miçangas e sementes, e por preservarem a língua Patxohã, que foi revitalizada após quase desaparecer. Vivem próximos a Porto Seguro.',
  traje: 'Saia de palha com miçangas coloridas, colete de sementes, pintura facial em padrões geométricos marrons e vermelhos',
  profissao: 'Artesã',
  itemCultural: 'Colar de sementes e miçangas',
  comidaTipica: 'Cangica',
  imagePath: 'assets/characters/potira.png',
  audioPath: 'assets/audio/characters/potira-narration.mp3',
  itemIconPath: 'assets/icons/items/colar-micanga.svg',
  attributes: {
    usaCocar: false,
    ehPescador: false,
    usaArcoFlecha: false,
    usaRoupasColoridas: true,
    trabalhaArtesanato: true,
    tocaFlauta: false,
    ehCurandeiro: false,
    ehCacador: false,
    usaLabrete: false,
    tocaMaraca: false,
    teceCestos: false,
    fazMicanga: true,
  },
}

// ── Fase 2 — Encontros Coloniais ──────────────────────────────────────────────

const KOJO: Character = {
  id: 'kojo',
  name: 'Kojo',
  phase: 2,
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
  attributes: {},
}

const AMARA: Character = {
  id: 'amara',
  name: 'Amara',
  phase: 2,
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
  attributes: {},
}

const ZUMBI: Character = {
  id: 'zumbi',
  name: 'Zumbi',
  phase: 2,
  origin: 'Quilombo dos Palmares, Brasil',
  originFact:
    'Zumbi dos Palmares liderou o maior quilombo do Brasil, onde africanos escravizados e seus descendentes viveram livres por quase cem anos nas matas de Alagoas.',
  culturalFact:
    'Os quilombolas preservaram línguas, religiões, músicas e saberes africanos no Brasil. Zumbi é símbolo de resistência e seu legado é celebrado no Dia da Consciência Negra, 20 de novembro.',
  traje: 'Roupa de campo resistente para o trabalho na terra, com cinto de couro e mocassins',
  profissao: 'Agricultor e líder quilombola',
  itemCultural: 'Berimbau',
  comidaTipica: 'Feijoada',
  imagePath: 'assets/characters/zumbi.png',
  audioPath: 'assets/audio/characters/zumbi-narration.mp3',
  itemIconPath: 'assets/icons/items/berimbau.svg',
  attributes: {},
}

const BABATUNDE: Character = {
  id: 'babatunde',
  name: 'Babatunde',
  phase: 2,
  origin: 'Povos Fon, Benin',
  originFact:
    'Babatunde descende do povo Fon do Reino do Daomé (atual Benin), na África Ocidental. Seu povo era conhecido pelas guerreiras Agojie — as "mulheres-leopardo" — e pela rica tradição espiritual do Vodun.',
  culturalFact:
    'O povo Fon trouxe ao Brasil a tradição do Vodun, que se fundiu com o catolicismo e originou o candomblé Jeje. O vatapá, o dendê e o djembê são heranças diretas dessa cultura.',
  traje: 'Boubou (túnica longa) colorido com bordados dourados e tornozeleiras de bronze',
  profissao: 'Griot (contador de histórias)',
  itemCultural: 'Djembê',
  comidaTipica: 'Vatapá',
  imagePath: 'assets/characters/babatunde.png',
  audioPath: 'assets/audio/characters/babatunde-narration.mp3',
  itemIconPath: 'assets/icons/items/djembe.svg',
  attributes: {},
}

const KOFI: Character = {
  id: 'kofi',
  name: 'Kofi',
  phase: 2,
  origin: 'Povos Akan, Gana',
  originFact:
    'Kofi vem do povo Akan de Gana, Costa do Ouro. Seu povo era famoso por ser grande produtor de ouro e por sua sofisticada organização em clãs matrilineares — onde a família segue a linhagem da mãe.',
  culturalFact:
    'O povo Akan trouxe ao Brasil técnicas de tecelagem, culinária à base de quiabo e a tradição dos grãos-de-guiné, usados até hoje no candomblé e na culinária baiana.',
  traje: 'Kente (tecido listrado em dourado, verde e vermelho) e sandálias de couro',
  profissao: 'Tecelão de kente',
  itemCultural: 'Tecido Kente',
  comidaTipica: 'Quiabo com arroz',
  imagePath: 'assets/characters/kofi.png',
  audioPath: 'assets/audio/characters/kofi-narration.mp3',
  itemIconPath: 'assets/icons/items/kente.svg',
  attributes: {},
}

const MARIA: Character = {
  id: 'maria',
  name: 'Maria',
  phase: 2,
  origin: 'Portugal',
  originFact:
    'Maria veio de Portugal no séc. XIX, fugindo da pobreza do Minho. Trouxe na mala receitas, rendas e uma fé inabalável. Seu povo está no Brasil desde 1500 — colonizadores, imigrantes, aventureiros — e moldou a língua e a religião do país.',
  culturalFact:
    'Portugal deu ao Brasil a língua portuguesa, o catolicismo, a arquitetura barroca, as festas juninas e os doces conventuais como pudim, quindim e pastel de nata.',
  traje: 'Vestido rodado com renda de Viana do Castelo, avental bordado, lenço na cabeça e brincos de filigrana dourada',
  profissao: 'Doceira e rendeira',
  itemCultural: 'Renda de bilro',
  comidaTipica: 'Bacalhau com broa',
  imagePath: 'assets/characters/maria.png',
  audioPath: 'assets/audio/characters/maria-narration.mp3',
  itemIconPath: 'assets/icons/items/renda-bilro.svg',
  attributes: {},
}

// ── Fase 3 — Grande Imigração Europeia ────────────────────────────────────────

const SOFIA: Character = {
  id: 'sofia',
  name: 'Sofia',
  phase: 3,
  origin: 'Itália',
  originFact:
    'Sofia chegou ao Brasil no final do séc. XIX, vinda da Calábria. Fugindo da miséria, embarcou rumo a São Paulo e ao Rio Grande do Sul, onde fundou colônias que viraram prósperas cidades.',
  culturalFact:
    'Os italianos transformaram a culinária e a cultura do Sudeste e do Sul. O sotaque paulistano tem influência italiana! Trouxeram a pizza, o macarrão, o risoto, o vinho e o espírito da cantina.',
  traje: 'Blusa bordada com flores, saia rodada colorida, avental de renda e lenço vermelho no pescoço',
  profissao: 'Cozinheira e cantineira',
  itemCultural: 'Acordeão',
  comidaTipica: 'Polenta com ragù',
  imagePath: 'assets/characters/sofia.png',
  audioPath: 'assets/audio/characters/sofia-narration.mp3',
  itemIconPath: 'assets/icons/items/acordeao.svg',
  attributes: {},
}

const GRETA: Character = {
  id: 'greta',
  name: 'Greta',
  phase: 3,
  origin: 'Alemanha',
  originFact:
    'Greta veio da Bavária em 1824, numa das primeiras levas de imigrantes alemães. Se instalou no Rio Grande do Sul, onde o frio lembrava a terra natal. Fundou fazendas, escolas e igrejas que ainda existem hoje.',
  culturalFact:
    'Os alemães trouxeram a cultura cervejeira (a Oktoberfest de Blumenau é a maior fora da Alemanha!), a arquitetura enxaimel, o linguiça colonial, o chucrute e uma tradição de trabalho cooperativo.',
  traje: 'Dirndl (vestido típico) com avental bordado, tranças loiras, meias brancas e sapatos de couro marrom',
  profissao: 'Cervejeira e agricultora',
  itemCultural: 'Gaita ponto',
  comidaTipica: 'Marreco assado com chucrute',
  imagePath: 'assets/characters/greta.png',
  audioPath: 'assets/audio/characters/greta-narration.mp3',
  itemIconPath: 'assets/icons/items/gaita.svg',
  attributes: {},
}

const CARMEN: Character = {
  id: 'carmen',
  name: 'Carmen',
  phase: 3,
  origin: 'Espanha',
  originFact:
    'Carmen veio da Andaluzia no início do séc. XX. Se instalou em São Paulo e na Bahia, onde o clima e o jeito de ser lembravam casa. Os espanhóis vieram em grande número trabalhar nas fazendas de café paulistas.',
  culturalFact:
    'Os espanhóis influenciaram a culinária brasileira (o refogado tem raízes espanholas), a música popular e trouxeram práticas agrícolas que transformaram o interior de São Paulo.',
  traje: 'Vestido flamenco vermelho com babados, flor vermelha no cabelo, leque espanhol e brincos longos dourados',
  profissao: 'Dançarina e professora',
  itemCultural: 'Leque e castanholas',
  comidaTipica: 'Paella de frutos do mar',
  imagePath: 'assets/characters/carmen.png',
  audioPath: 'assets/audio/characters/carmen-narration.mp3',
  itemIconPath: 'assets/icons/items/leque.svg',
  attributes: {},
}

const ZOFIA: Character = {
  id: 'zofia',
  name: 'Zófia',
  phase: 3,
  origin: 'Polônia',
  originFact:
    'Zófia chegou ao Paraná em 1890, fugindo da dominação russa e prussiana sobre a Polônia. Com muito trabalho, transformou a mata fechada do interior paranaense em cidades prósperas.',
  culturalFact:
    'Os poloneses trouxeram ao Brasil a tradição dos bordados coloridos, uma culinária robusta para o inverno e a devoção religiosa intensa. Há mais de 200 municípios no Paraná com origem polonesa.',
  traje: 'Sukienka (vestido folclórico) branco com bordados florais coloridos, avental e trança longa com fita',
  profissao: 'Agricultora e bordadeira',
  itemCultural: 'Pisanka (ovo decorado)',
  comidaTipica: 'Pierogi',
  imagePath: 'assets/characters/zofia.png',
  audioPath: 'assets/audio/characters/zofia-narration.mp3',
  itemIconPath: 'assets/icons/items/pisanka.svg',
  attributes: {},
}

const OLENA: Character = {
  id: 'olena',
  name: 'Olena',
  phase: 3,
  origin: 'Ucrânia',
  originFact:
    'Olena chegou ao Paraná em 1895, vinda da Galícia. Com sua família, desbravou florestas e plantou trigo num solo completamente diferente do que conhecia. O Paraná tem a maior comunidade ucraniana fora da Europa.',
  culturalFact:
    'Os ucranianos trouxeram as pysanky (ovos decorados com padrões geométricos), igrejas ortodoxas de cúpula dourada, o borsch (sopa de beterraba) e mantiveram viva a língua ucraniana por gerações.',
  traje: 'Vyshyvanka (blusa bordada) com padrões geométricos coloridos, saia rodada e coroa de flores (vinok) na cabeça',
  profissao: 'Agricultora e pintora de ovos',
  itemCultural: 'Pysanka (ovo decorado ucraniano)',
  comidaTipica: 'Varenyky',
  imagePath: 'assets/characters/olena.png',
  audioPath: 'assets/audio/characters/olena-narration.mp3',
  itemIconPath: 'assets/icons/items/pysanka.svg',
  attributes: {},
}

const NATASHA: Character = {
  id: 'natasha',
  name: 'Natasha',
  phase: 3,
  origin: 'Rússia',
  originFact:
    'Natasha veio da Rússia no início do séc. XX, fugindo da Revolução Bolchevique. Se instalou em São Paulo e no Paraná, onde fundou escolas e igrejas ortodoxas que ainda funcionam hoje.',
  culturalFact:
    'Os russos e eslavos trouxeram ao Brasil a música clássica (São Paulo tem uma das melhores orquestras do mundo), o balé, a literatura e uma culinária robusta para os invernos do Sul.',
  traje: 'Sarafan (vestido longo azul) com blusa bordada, kokoshnik (chapéu branco bordado) e botas de feltro',
  profissao: 'Professora e musicista',
  itemCultural: 'Balalaica',
  comidaTipica: 'Borscht',
  imagePath: 'assets/characters/natasha.png',
  audioPath: 'assets/audio/characters/natasha-narration.mp3',
  itemIconPath: 'assets/icons/items/balalaica.svg',
  attributes: {},
}

// ── Fase 4 — Novos Horizontes ─────────────────────────────────────────────────

const HANA: Character = {
  id: 'hana',
  name: 'Hana',
  phase: 4,
  origin: 'Japão',
  originFact:
    'Hana chegou ao Brasil no navio Kasato Maru em 1908, junto com os primeiros 781 imigrantes japoneses. Veio trabalhar nas fazendas de café de São Paulo, mas trouxe uma cultura milenar que transformou o Brasil.',
  culturalFact:
    'O Brasil tem a maior comunidade japonesa fora do Japão! Os japoneses trouxeram o sushi, o temaki, técnicas agrícolas avançadas, o judô e a filosofia do capricho — fazer tudo com perfeição.',
  traje: 'Kimono de seda com padrão de sakura (flores de cerejeira), sandálias geta de madeira e kanzashi no cabelo',
  profissao: 'Agricultora e jardineira',
  itemCultural: 'Origami e taiko',
  comidaTipica: 'Temaki',
  imagePath: 'assets/characters/hana.png',
  audioPath: 'assets/audio/characters/hana-narration.mp3',
  itemIconPath: 'assets/icons/items/origami.svg',
  attributes: {},
}

const MEI: Character = {
  id: 'mei',
  name: 'Mei',
  phase: 4,
  origin: 'China',
  originFact:
    'Mei chegou ao Brasil no séc. XIX, vinda de Cantão. Os primeiros chineses vieram trabalhar na construção de ferrovias e no comércio. Hoje a comunidade chinesa é grande em São Paulo, especialmente no bairro da Liberdade.',
  culturalFact:
    'Os chineses trouxeram técnicas de comércio, culinária que influenciou o refogado brasileiro e a tradição do chá. A Liberdade (SP) tem o maior festival de Ano Novo Chinês da América Latina.',
  traje: 'Qipao (vestido) vermelho com bordados dourados de dragão, sapatos bordados e leque de papel',
  profissao: 'Comerciante e cozinheira',
  itemCultural: 'Lanterna de papel',
  comidaTipica: 'Dim sum',
  imagePath: 'assets/characters/mei.png',
  audioPath: 'assets/audio/characters/mei-narration.mp3',
  itemIconPath: 'assets/icons/items/lanterna-papel.svg',
  attributes: {},
}

const HABIB: Character = {
  id: 'habib',
  name: 'Habib',
  phase: 4,
  origin: 'Líbano',
  originFact:
    'Habib chegou ao Brasil no final do séc. XIX, fugindo da dominação otomana. Com uma mala nas costas e artigos para vender, percorreu as cidades do interior como mascate — o vendedor que chegava onde as lojas não chegavam.',
  culturalFact:
    'Os libaneses e sírios são a maior comunidade árabe fora do Oriente Médio — cerca de 7 milhões de descendentes no Brasil! Trouxeram o kibe, a esfiha, o tabule e uma tradição comercial que marcou o varejo brasileiro.',
  traje: 'Camisa bordada, calça larga, colete de veludo bordado e turbante branco com franjas douradas',
  profissao: 'Comerciante e mascate',
  itemCultural: 'Oud',
  comidaTipica: 'Esfiha e kibe',
  imagePath: 'assets/characters/habib.png',
  audioPath: 'assets/audio/characters/habib-narration.mp3',
  itemIconPath: 'assets/icons/items/oud.svg',
  attributes: {},
}

const FATIMA: Character = {
  id: 'fatima',
  name: 'Fatima',
  phase: 4,
  origin: 'Síria',
  originFact:
    'Fatima veio da Síria no início do séc. XX, trazendo a habilidade de bordar seda que aprendeu com sua avó em Damasco. No Brasil, encontrou uma comunidade acolhedora e fundou seu ateliê em São Paulo.',
  culturalFact:
    'Os sírios trouxeram ao Brasil o pão sírio (base do sanduíche de churrasco!), o tabule, o cuscuz árabe e técnicas de tecelagem em seda. Michel Temer, ex-presidente, é filho de imigrantes sírios.',
  traje: 'Vestido bordado de seda com padrões geométricos dourados, véu colorido e pulseiras de ouro',
  profissao: 'Bordadeira',
  itemCultural: 'Tecido de seda bordado',
  comidaTipica: 'Tabule com pão sírio',
  imagePath: 'assets/characters/fatima.png',
  audioPath: 'assets/audio/characters/fatima-narration.mp3',
  itemIconPath: 'assets/icons/items/seda-bordada.svg',
  attributes: {},
}

const JIHO: Character = {
  id: 'jiho',
  name: 'Ji-ho',
  phase: 4,
  origin: 'Coreia do Sul',
  originFact:
    'Ji-ho chegou ao Brasil nos anos 1960, parte das primeiras levas de imigrantes coreanos. Se instalou no Bom Retiro, em São Paulo, que se tornou o maior polo têxtil da América Latina — movido pelo talento coreano.',
  culturalFact:
    'Os coreanos transformaram o Bom Retiro (SP) no maior polo de moda do Brasil. Trouxeram o kimchi, técnicas têxteis avançadas e uma cultura de dedicação ao trabalho que influenciou muitas famílias.',
  traje: 'Hanbok com jeogori (blusa) e chima (saia longa) em rosa e azul vivo, meias brancas e tranças',
  profissao: 'Estilista e costureira',
  itemCultural: 'Haegeum',
  comidaTipica: 'Kimchi com arroz',
  imagePath: 'assets/characters/jiho.png',
  audioPath: 'assets/audio/characters/jiho-narration.mp3',
  itemIconPath: 'assets/icons/items/haegeum.svg',
  attributes: {},
}

const ARA: Character = {
  id: 'ara',
  name: 'Ara',
  phase: 4,
  origin: 'Armênia',
  originFact:
    'Ara chegou ao Brasil nos anos 1920, sobrevivente do genocídio armênio (1915). Com a arte de ourives e uma memória viva de sua terra, reconstruiu sua vida em São Paulo, onde a comunidade armênia ainda é vibrante.',
  culturalFact:
    'Os armênios trouxeram ao Brasil a arte da ourivesaria, a tradição dos tapetes bordados e a culinária do Oriente Médio. São Paulo tem uma das maiores comunidades armênicas da América do Sul.',
  traje: 'Taraz armênio: blusa bordada em vermelho e preto, saia longa rodada e chapéu com moedas douradas',
  profissao: 'Ourives',
  itemCultural: 'Duduk (flauta de madeira)',
  comidaTipica: 'Dolma',
  imagePath: 'assets/characters/ara.png',
  audioPath: 'assets/audio/characters/ara-narration.mp3',
  itemIconPath: 'assets/icons/items/duduk.svg',
  attributes: {},
}

// ── Fase 5 — Brasil de Todos (Extra) ─────────────────────────────────────────

const SAMUEL: Character = {
  id: 'samuel',
  name: 'Samuel',
  phase: 5,
  origin: 'Diáspora Judaica, Europa Oriental',
  originFact:
    'Samuel veio da Polônia nos anos 1930, fugindo do nazismo. O Brasil foi um dos poucos países a abrir as portas para famílias judias durante a Segunda Guerra. Se instalou em São Paulo, onde fundou escolas, sinagogas e empresas.',
  culturalFact:
    'A comunidade judaica contribuiu enormemente para as artes, a medicina e o direito no Brasil. Nomes como Clarice Lispector (escritora) e Lasar Segall (pintor) moldaram a cultura nacional.',
  traje: 'Terno sóbrio com kipá (solidéu) na cabeça, talit (xale de orações) listrado e barba cuidada',
  profissao: 'Livreiro',
  itemCultural: 'Menorá',
  comidaTipica: 'Cholent',
  imagePath: 'assets/characters/samuel.png',
  audioPath: 'assets/audio/characters/samuel-narration.mp3',
  itemIconPath: 'assets/icons/items/menora.svg',
  attributes: {},
}

const PIETER: Character = {
  id: 'pieter',
  name: 'Pieter',
  phase: 5,
  origin: 'Holanda',
  originFact:
    'Pieter chegou ao Brasil no séc. XVII com a Companhia das Índias Ocidentais. Os holandeses dominaram o Nordeste por 24 anos (1630-1654), governados por Maurício de Nassau, que transformou Recife numa das cidades mais modernas da América.',
  culturalFact:
    'Os holandeses deixaram no Brasil a liberdade religiosa (foram os primeiros a permitir sinagogas!), a cartografia detalhada do Nordeste e a arquitetura de canais em Recife — "a Veneza brasileira".',
  traje: 'Casaca escura, chapéu de abas largas, gola branca de renda (colarinho holandês séc. XVII) e cinto de couro com fivela',
  profissao: 'Cartógrafo',
  itemCultural: 'Mapa e telescópio',
  comidaTipica: 'Queijo gouda com pão de centeio',
  imagePath: 'assets/characters/pieter.png',
  audioPath: 'assets/audio/characters/pieter-narration.mp3',
  itemIconPath: 'assets/icons/items/telescopio.svg',
  attributes: {},
}

const HELENE: Character = {
  id: 'helene',
  name: 'Hélène',
  phase: 5,
  origin: 'França',
  originFact:
    'Hélène chegou ao Brasil em 1555 com a expedição da França Antártica, que tentou fundar uma colônia na Baía de Guanabara. Os huguenotes (protestantes franceses) fugiam da perseguição religiosa em busca de liberdade.',
  culturalFact:
    'Os franceses influenciaram o Brasil muito antes do séc. XIX. A Missão Artística Francesa de 1816 fundou a Escola de Belas Artes do Rio de Janeiro, moldando toda a arte acadêmica brasileira.',
  traje: 'Vestido renascentista com corpete bordado, saia rodada de veludo, capuz e joias simples de prata',
  profissao: 'Professora e missionária',
  itemCultural: 'Livro e cruz huguenote',
  comidaTipica: 'Crepe',
  imagePath: 'assets/characters/helene.png',
  audioPath: 'assets/audio/characters/helene-narration.mp3',
  itemIconPath: 'assets/icons/items/cruz-huguenote.svg',
  attributes: {},
}

const ZARA: Character = {
  id: 'zara',
  name: 'Zara',
  phase: 5,
  origin: 'Ciganos Roma, Europa',
  originFact:
    'Zara chegou ao Brasil ainda no período colonial — Portugal degredava ciganos para o Brasil desde o séc. XVII. Os ciganos trouxeram uma cultura vibrante que se misturou ao espírito brasileiro e nunca mais saiu.',
  culturalFact:
    'Os ciganos influenciaram profundamente a música brasileira — o violão tem raízes na guitarra cigana! Palavras como "bucho" e "calango" têm origem romani. Há cerca de 800 mil ciganos no Brasil hoje.',
  traje: 'Saia rodada colorida em camadas (vermelho, laranja e dourado), blusa com ombros à mostra, lenço no cabelo e pulseiras de moedas',
  profissao: 'Dançarina e cartomante',
  itemCultural: 'Violino e baralho de tarô',
  comidaTipica: 'Ensopado cigano',
  imagePath: 'assets/characters/zara.png',
  audioPath: 'assets/audio/characters/zara-narration.mp3',
  itemIconPath: 'assets/icons/items/violino.svg',
  attributes: {},
}

const DILNOZA: Character = {
  id: 'dilnoza',
  name: 'Dilnoza',
  phase: 5,
  origin: 'Bolívia',
  originFact:
    'Dilnoza chegou a São Paulo nos anos 2000, vinda de Cochabamba. Como milhares de bolivianos, veio trabalhar na indústria têxtil do Brás — bairro que abasteceu a moda brasileira por décadas.',
  culturalFact:
    'Os bolivianos são hoje a maior comunidade imigrante em São Paulo — mais de 350 mil pessoas. Transformaram o Brás na capital têxtil do Brasil, trazendo bordados andinos e o ritmo da chicha para as ruas.',
  traje: 'Pollera (saia ampla bordada), manta (xale multicolorido), chapéu-coco e tranças longas com fitas coloridas',
  profissao: 'Costureira e artesã',
  itemCultural: 'Quena (flauta andina)',
  comidaTipica: 'Salteña',
  imagePath: 'assets/characters/dilnoza.png',
  audioPath: 'assets/audio/characters/dilnoza-narration.mp3',
  itemIconPath: 'assets/icons/items/quena.svg',
  attributes: {},
}

const AMARU: Character = {
  id: 'amaru',
  name: 'Amaru',
  phase: 5,
  origin: 'Peru',
  originFact:
    'Amaru chegou ao Rio de Janeiro nos anos 2010, vindo de Cusco — antiga capital do Império Inca. Trouxe sua música andina, que hoje ressoa nas ruas de Copacabana e do centro do Rio.',
  culturalFact:
    'Os peruanos trouxeram ao Brasil o ceviche (que virou febre nos restaurantes!), a gastronomia andina considerada uma das melhores do mundo, e a música dos Andes com charango e quena.',
  traje: 'Poncho de lã de alpaca com padrão geométrico andino em vermelho e ouro, calça de linho e sandálias de couro',
  profissao: 'Músico de rua',
  itemCultural: 'Charango',
  comidaTipica: 'Ceviche',
  imagePath: 'assets/characters/amaru.png',
  audioPath: 'assets/audio/characters/amaru-narration.mp3',
  itemIconPath: 'assets/icons/items/charango.svg',
  attributes: {},
}

// ── Export ────────────────────────────────────────────────────────────────────

export const characters: Character[] = [
  // Fase 1 — Povos Originários
  AIE, YARA, CAUA, TAINA, IARA, POTIRA,
  // Fase 2 — Encontros Coloniais
  KOJO, AMARA, ZUMBI, BABATUNDE, KOFI, MARIA,
  // Fase 3 — Grande Imigração Europeia
  SOFIA, GRETA, CARMEN, ZOFIA, OLENA, NATASHA,
  // Fase 4 — Novos Horizontes
  HANA, MEI, HABIB, FATIMA, JIHO, ARA,
  // Fase 5 — Brasil de Todos (Extra)
  SAMUEL, PIETER, HELENE, ZARA, DILNOZA, AMARU,
]

export const phase1Characters: Character[] = characters.filter(c => c.phase === 1)
