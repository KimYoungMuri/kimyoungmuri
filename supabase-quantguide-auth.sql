-- Run this in your Supabase project: SQL Editor → New query → paste and run.
-- Creates tables for QuantGuide username/password login and question status storage.

-- Users for QuantGuide (username + password; separate from any existing auth)
create table if not exists public.quantguide_users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password_hash text not null,
  created_at timestamptz default now()
);

-- Question status per user (which questions are unsolved/attempted/solved)
create table if not exists public.question_statuses (
  user_id uuid not null references public.quantguide_users(id) on delete cascade,
  question_id text not null,
  status text not null check (status in ('unsolved', 'attempted', 'solved')),
  primary key (user_id, question_id)
);

-- RLS enabled: only your API (using service_role key) can access these tables; anon key cannot.
alter table public.quantguide_users enable row level security;
alter table public.question_statuses enable row level security;
