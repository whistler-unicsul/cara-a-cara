# Cara a Cara Brasil

Jogo educativo de dedução estilo "Guess Who" para crianças de 7 a 10 anos. Ensina de forma lúdica como a identidade cultural brasileira foi formada pela mistura de povos indígenas, africanos e imigrantes de diversas origens.

Integrado ao Cruzeiro HUB via `<iframe>`.

---

## Tecnologias

- **React 19 + TypeScript** via Vite
- **React Router v6** para navegação entre telas
- **Supabase** para persistência de progresso (tier gratuito)
- **Vercel** para deploy contínuo
- **Vitest + React Testing Library** para testes unitários e de componente
- **Playwright** para testes E2E

## Pré-requisitos

- Node.js 18+
- Conta no [Supabase](https://supabase.com) (gratuita)
- Conta no [Vercel](https://vercel.com) (gratuita)

## Instalação local

```bash
npm install
cp .env.example .env.local
# preencha VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env.local
npm run dev
```

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Serve o build localmente |
| `npm test` | Executa os testes unitários e de componente |
| `npm run test:watch` | Testes em modo watch |
| `npm run test:e2e` | Executa os testes E2E com Playwright |
| `npm run lint` | Lint com Oxlint |

## Configuração do banco de dados

Execute a migration no seu projeto Supabase:

```sql
-- supabase/migrations/001_create_game_progress.sql
create table public.game_progress (
  session_id       uuid        primary key,
  completed_phases int[]       not null default '{}',
  updated_at       timestamptz not null default now()
);
```

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `VITE_SUPABASE_URL` | URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chave anônima do Supabase |

No Vercel, configure essas variáveis em **Settings → Environment Variables**.

## Estrutura do projeto

```
src/
├── components/   # Componentes reutilizáveis (cartas, perguntas, overlays)
├── context/      # GameProvider e AudioProvider
├── data/         # Dados dos personagens e banco de perguntas
├── hooks/        # useProgress e outros hooks customizados
├── screens/      # Telas do app (Menu, Jogo, Mapa de Fases...)
├── services/     # Supabase e AudioManager
├── styles/       # CSS global e design tokens
└── types/        # Interfaces TypeScript
```

## Fases do jogo (MVP)

| Fase | Personagens |
|---|---|
| Fase 1 *(MVP)* | Aiê, Kojo, Zumbi, Amara |
| Fase 2 | Mariana, Giuseppe, Heinrich, Elena, Bora, Boris |
| Fase 3 | Karim, Fatima, Yumi, Chen, Dae-Ho |
| Fase 4 | Pedro + todos anteriores |

## Acessibilidade

- Fonte Lexend em todo o app
- Narração em áudio para todos os textos
- Alto contraste via `data-theme="high-contrast"`
- Touch targets mínimos de 44×44 px
- Navegação por teclado com foco visível
