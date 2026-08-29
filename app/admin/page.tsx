import { sql } from "@/lib/db";
import { isAdmin } from "@/lib/admin";
import { adminLogin } from "./actions";
import { AdminCommentRow } from "./AdminCommentRow";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "モデレーター",
  robots: { index: false, follow: false },
};

type AdminComment = {
  id: string;
  target_id: string;
  display_name: string;
  body: string;
  status: "visible" | "hidden";
  created_at: string;
  user_id: string;
};

export default async function AdminPage() {
  // 認可: ADMIN_TOKEN 照合 Cookie（旧 Supabase app_metadata.role の置き換え）
  if (!(await isAdmin())) {
    return (
      <main style={{ maxWidth: 420, margin: "0 auto", padding: "60px 20px" }}>
        <h1 style={{ fontSize: "1.3rem" }}>モデレーター</h1>
        <form action={adminLogin} style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <input
            type="password"
            name="password"
            placeholder="管理パスワード"
            autoComplete="current-password"
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid var(--border-default)",
              background: "var(--bg-surface)",
              color: "var(--ink)",
            }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: "8px 16px" }}>
            入る
          </button>
        </form>
      </main>
    );
  }

  const comments = (await sql`
    select id, target_id, display_name, body, status, created_at, user_id
    from comments
    order by created_at desc
    limit 100`) as AdminComment[];

  const reports = (await sql`
    select comment_id, count(*)::int as cnt
    from reports
    group by comment_id`) as { comment_id: string; cnt: number }[];

  const reportCount = new Map<string, number>();
  reports.forEach((r) => reportCount.set(r.comment_id, Number(r.cnt)));

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "30px 20px 60px" }}>
      <h1 style={{ fontSize: "1.6rem", margin: "0 0 4px" }}>モデレーター</h1>
      <p style={{ color: "var(--muted)", marginTop: 0 }}>
        全コメント（最新 100 件）と通報。クリックで visible/hidden を切替。
      </p>

      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--line)",
          borderRadius: "var(--radius)",
          padding: 20,
          marginTop: 18,
          boxShadow: "var(--shadow)",
        }}
      >
        {comments.length === 0 ? (
          <p style={{ color: "var(--muted)", margin: 0 }}>コメントなし。</p>
        ) : (
          comments.map((c) => (
            <AdminCommentRow
              key={c.id}
              comment={c}
              reportCount={reportCount.get(c.id) ?? 0}
            />
          ))
        )}
      </div>
    </main>
  );
}
