import "server-only";
import { neon } from "@neondatabase/serverless";

// Neon Postgres (プロジェクト "shikumi") への HTTP 接続。
// 旧 Supabase Data API (supabase-js) から 2026-08 に移行。
// クエリはすべてサーバー側（Server Components / Route Handlers / Server Actions）から実行し、
// 旧 RLS ポリシー相当のアクセス制御は各クエリの WHERE 句で明示する。
const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL is not set");
}

export const sql = neon(url);

// uid 未確定時に「誰にもマッチしない」比較対象として使うセンチネル UUID
// （randomUUID は v4 を返すため zero-UUID と衝突しない）
export const NIL_UUID = "00000000-0000-0000-0000-000000000000";
