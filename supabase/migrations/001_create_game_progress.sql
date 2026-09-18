-- Migration: 001_create_game_progress
-- Tabela de progresso anônimo de jogo.
-- Sem RLS no MVP: dados são apenas progresso de jogo, sem PII.
-- RLS será adicionado na Melhoria 3 junto com autenticação do professor.

create table public.game_progress (
  session_id       uuid        primary key,
  completed_phases int[]       not null default '{}',
  updated_at       timestamptz not null default now()
);
