-- Migration: 002_create_multiplayer_rooms
-- Tabela de salas multiplayer competitivo (PvP).
-- Cada linha representa uma partida ativa ou encerrada.
-- Estado da partida é compartilhado em tempo real via Supabase Realtime.

create table public.multiplayer_rooms (
  room_id              uuid        primary key default gen_random_uuid(),
  room_code            text        unique not null,
  phase                int         not null default 1,
  host_session_id      text        not null,
  guest_session_id     text,
  host_secret_char_id  text,
  guest_secret_char_id text,
  current_turn         text        not null default 'host',
  host_card_states     jsonb       not null default '{}',
  guest_card_states    jsonb       not null default '{}',
  host_asked_q_ids     text[]      not null default '{}',
  guest_asked_q_ids    text[]      not null default '{}',
  last_question_id     text,
  last_answer          boolean,
  last_action          text,
  status               text        not null default 'waiting',
  winner               text,
  created_at           timestamptz not null default now(),
  last_activity_at     timestamptz not null default now()
);
create index on public.multiplayer_rooms (room_code) where status != 'expired';
