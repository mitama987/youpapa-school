import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
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
  // 認可: app_metadata.role === 'admin' のみ。匿名/未ログインは / へ。
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const role = (userData.user?.app_metadata?.role as string | undefined) ?? null;
  if (!userData.user || role !== "admin") {
    redirect("/");
  }

  // service_role で全コメントを取得（status=hidden も）
  const admin = createAdminClient();
  const { data: comments } = await admin
    .from("comments")
    .select("id,target_id,display_name,body,status,created_at,user_id")
    .order("created_at", { ascending: false })
    .limit(100);
  const { data: reports } = await admin
    .from("reports")
    .select("comment_id, count:comment_id")
    .order("comment_id", { ascending: false });

  // 通報数を comment_id 単位で集計
  const reportCount = new Map<string, number>();
  (reports ?? []).forEach((r: { comment_id: string }) => {
    reportCount.set(r.comment_id, (reportCount.get(r.comment_id) ?? 0) + 1);
  });

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
        {(comments ?? []).length === 0 ? (
          <p style={{ color: "var(--muted)", margin: 0 }}>コメントなし。</p>
        ) : (
          (comments as AdminComment[]).map((c) => (
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
