-- シクミ：いいね機能 (Phase 3)
--
-- target_id 規約: "<kind>:<slug>"
--   例: "lessons:step1" / "courses:fukugyo-ai" / "articles:fukugyo-ai-start"

create table if not exists public.likes (
  target_id  text primary key,
  count      bigint not null default 0,
  updated_at timestamptz not null default now()
);

comment on table public.likes is 'ページ単位のいいね数。書込は increment_like RPC 経由のみ。';

-- ===== RLS =====
alter table public.likes enable row level security;

-- 既存ポリシーを冪等に再作成
drop policy if exists "likes read all" on public.likes;
create policy "likes read all"
  on public.likes
  for select
  using (true);

-- INSERT/UPDATE/DELETE のポリシーは作らない → デフォルトで anon/authenticated からの直接書込は禁止
-- 書込は下の security definer RPC 経由でのみ可能

-- Data API に likes テーブルを露出（select のみ。加算は RPC 経由）
grant select on public.likes to anon, authenticated;

-- ===== いいね加算 RPC =====
create or replace function public.increment_like(p_target text)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count bigint;
begin
  -- target_id の最低限のバリデーション
  if p_target is null or length(p_target) = 0 or length(p_target) > 120 then
    raise exception 'invalid target_id';
  end if;

  insert into public.likes (target_id, count)
    values (p_target, 1)
    on conflict (target_id) do update
      set count = public.likes.count + 1,
          updated_at = now()
    returning count into new_count;

  return new_count;
end;
$$;

revoke all on function public.increment_like(text) from public;
grant execute on function public.increment_like(text) to anon, authenticated;

comment on function public.increment_like is
  '指定 target_id の likes.count を +1 して新しい count を返す。security definer で RLS をバイパス。';
