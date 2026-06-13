-- シクミ：匿名性リーク修正 (2/2) — comments.user_id を Data API から隠す
--
-- これが本丸。anon/authenticated から comments の SELECT 権限を剥奪し、
-- user_id 以外の列だけ再付与する。これにより PostgREST 経由で user_id を直接引けなくなる
-- （React コードを直すだけでは anon キー保持者が自分でクエリできるため塞がらない）。
--
-- 行フィルタは既存 RLS ポリシー（visible or 自分）が引き続き適用される。
-- 表示は 20260613120000 で追加した get_comments RPC（user_id を返さず is_mine のみ）経由に切替済み。
-- insert/update/delete の grant は触らない（書込は base table へ、RLS で自分の uid のみ）。
-- delete().eq("id",...) は WHERE で id を参照するため id 列の select 権限を残す。
--
-- 適用順序: get_comments 追加 → 新コードを Vercel デプロイ → 本マイグレーション適用。

revoke select on public.comments from anon;
revoke select on public.comments from authenticated;

grant select (id, target_id, display_name, is_anonymous, body, status, created_at)
  on public.comments to anon, authenticated;
