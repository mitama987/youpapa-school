-- シクミ：匿名性リーク修正 (1/2) — コメント表示用 RPC
--
-- 背景: comments は anon/authenticated に全列 select 許可されており、
--   ブラウザから user_id(auth UUID) を直接取得できた → 「匿名」コメントの名寄せ/実名紐付けが可能だった。
-- 対策: 表示は user_id を返さず is_mine(=自分の投稿か) 真偽値だけ返す security definer RPC 経由にする。
--   （like_once / increment_like と同じ流儀。ビューは security_definer_view linter 警告に当たるため RPC を採用）
--
-- 本ファイルは「追加のみ」。user_id 列の select 剥奪は 20260613120100 で行う
-- （新コード稼働前に剥奪すると旧デプロイが壊れるため、デプロイ後に適用するゼロダウンタイム順序）。

create or replace function public.get_comments(p_target text, p_limit int default 20)
returns table (
  id           uuid,
  target_id    text,
  display_name text,
  is_anonymous boolean,
  body         text,
  status       text,
  created_at   timestamptz,
  is_mine      boolean
)
language sql
security definer
set search_path = public
as $$
  select
    c.id,
    c.target_id,
    c.display_name,
    c.is_anonymous,
    c.body,
    c.status,
    c.created_at,
    (c.user_id = (select auth.uid())) as is_mine
  from public.comments c
  where c.target_id = p_target
    and (c.status = 'visible' or c.user_id = (select auth.uid()))
  order by c.created_at desc
  limit greatest(1, least(coalesce(p_limit, 20), 100));
$$;

comment on function public.get_comments is
  '指定 target の表示用コメント一覧。user_id は返さず is_mine 真偽値のみ返す。RLS read ポリシー（visible or 自分）と同じ可視範囲を where で再現。';

revoke all on function public.get_comments(text, int) from public;
grant execute on function public.get_comments(text, int) to anon, authenticated;
