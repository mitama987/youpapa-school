-- シクミ：いいね 1 人 1 回（匿名 uid 単位）に変更 (Phase 6 Fix 2)
--
-- 旧 increment_like RPC は誰でも何回でも呼べてしまうので封じ込め、
-- 認証必須 + 二重押し防止の like_once に切替。

-- ===== like_events: 押した実績テーブル =====
create table if not exists public.like_events (
  target_id  text not null,
  user_id    uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (target_id, user_id)
);

comment on table public.like_events is
  '誰が何にいいねしたかの実績。(target_id, user_id) PK で二重押し防止。';

alter table public.like_events enable row level security;

-- 自分の行だけ select 可（UI が「自分は押し済か」を判定するため）
drop policy if exists "le_read_own" on public.like_events;
create policy "le_read_own"
  on public.like_events for select
  to authenticated
  using (user_id = auth.uid());

-- insert / update / delete はクライアントから禁止。書込は RPC 経由のみ。

-- Data API grants
grant select on public.like_events to authenticated;

-- ===== 新 RPC: like_once =====
create or replace function public.like_once(p_target text)
returns table(new_count bigint, already boolean)
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted boolean := false;
  cnt bigint;
begin
  if auth.uid() is null then
    raise exception 'auth required';
  end if;
  if p_target is null or length(p_target) = 0 or length(p_target) > 120 then
    raise exception 'invalid target_id';
  end if;

  begin
    insert into public.like_events(target_id, user_id) values (p_target, auth.uid());
    inserted := true;
  exception when unique_violation then
    inserted := false;
  end;

  if inserted then
    insert into public.likes(target_id, count)
      values (p_target, 1)
      on conflict (target_id) do update
        set count = public.likes.count + 1,
            updated_at = now()
      returning count into cnt;
  else
    select count into cnt from public.likes where target_id = p_target;
  end if;

  return query select coalesce(cnt, 0) as new_count, not inserted as already;
end;
$$;

revoke all on function public.like_once(text) from public;
grant execute on function public.like_once(text) to authenticated;

comment on function public.like_once is
  '認証ユーザーがこの target を初めて押したときだけ likes.count を +1。戻り値 (new_count, already)。already=true なら既に押済で no-op。';

-- ===== 旧 increment_like の封じ込め =====
-- drop はしない（ロールバック容易）。execute 権限のみ剥奪して呼べなくする。
revoke execute on function public.increment_like(text) from anon, authenticated;
