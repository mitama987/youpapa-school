-- シクミ：コメント + 通報機能 (Phase 4)
--
-- target_id 規約: likes と同じ "<kind>:<slug>" 例 "lessons:step1"

-- ===== comments =====
create table if not exists public.comments (
  id           uuid primary key default gen_random_uuid(),
  target_id    text not null,
  user_id      uuid not null references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 40),
  is_anonymous boolean not null default true,
  body         text not null check (char_length(body) between 1 and 1000),
  status       text not null default 'visible' check (status in ('visible','hidden')),
  created_at   timestamptz not null default now()
);

create index if not exists comments_target_created_idx
  on public.comments(target_id, created_at desc);
create index if not exists comments_user_idx
  on public.comments(user_id);

comment on table public.comments is
  '記事・レッスン等のコメント。status=hidden は通報や admin が伏せたもの。';

-- ===== reports =====
create table if not exists public.reports (
  id          uuid primary key default gen_random_uuid(),
  comment_id  uuid not null references public.comments(id) on delete cascade,
  reporter_id uuid not null references auth.users(id) on delete cascade,
  reason      text check (reason is null or char_length(reason) <= 300),
  created_at  timestamptz not null default now(),
  unique (comment_id, reporter_id)
);

comment on table public.reports is
  'コメント通報。(comment_id, reporter_id) で unique → 同一ユーザーの二重通報を防止。';

-- ===== RLS =====
alter table public.comments enable row level security;
alter table public.reports  enable row level security;

-- comments: visible は全公開 read、自分のは status 問わず読める（hidden 自分のだけは見える）
drop policy if exists "comments read visible or own" on public.comments;
create policy "comments read visible or own"
  on public.comments for select
  using (status = 'visible' or user_id = auth.uid());

-- comments: 認証済みが自分の uid でのみ insert 可
drop policy if exists "comments insert self" on public.comments;
create policy "comments insert self"
  on public.comments for insert
  to authenticated
  with check (auth.uid() = user_id);

-- comments: 自分のコメントのみ update / delete
drop policy if exists "comments update own" on public.comments;
create policy "comments update own"
  on public.comments for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "comments delete own" on public.comments;
create policy "comments delete own"
  on public.comments for delete
  to authenticated
  using (user_id = auth.uid());

-- reports: 認証済みが自分の reporter_id でのみ insert
drop policy if exists "reports insert self" on public.reports;
create policy "reports insert self"
  on public.reports for insert
  to authenticated
  with check (auth.uid() = reporter_id);

-- reports: 自分の通報のみ read
drop policy if exists "reports read own" on public.reports;
create policy "reports read own"
  on public.reports for select
  to authenticated
  using (auth.uid() = reporter_id);

-- Data API grants
grant select, insert, update, delete on public.comments to authenticated;
grant select on public.comments to anon;
grant select, insert on public.reports to authenticated;
