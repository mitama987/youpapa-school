import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  let supabaseStatus: "ok" | "fail" = "fail";
  let supabaseDetail = "";
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.getSession();
    supabaseStatus = error ? "fail" : "ok";
    supabaseDetail = error?.message ?? "session endpoint reachable";
  } catch (e) {
    supabaseDetail = e instanceof Error ? e.message : String(e);
  }

  return (
    <main style={{ padding: 40, fontFamily: "system-ui", maxWidth: 720, margin: "0 auto" }}>
      <h1>シクミ</h1>
      <p>副業 × AI × 自動化を学ぶ無料アカデミー（Next.js + Supabase 移行中）</p>

      <section
        style={{
          marginTop: 24,
          padding: 16,
          border: "1px solid #444",
          borderRadius: 8,
          fontFamily: "ui-monospace, monospace",
          fontSize: "0.9rem",
        }}
      >
        <strong>Supabase connection</strong>
        <div style={{ marginTop: 8 }}>
          status:{" "}
          <span style={{ color: supabaseStatus === "ok" ? "#10b981" : "#ef4444" }}>
            {supabaseStatus}
          </span>
        </div>
        <div style={{ opacity: 0.7 }}>{supabaseDetail}</div>
      </section>

      <p style={{ marginTop: 24, fontSize: "0.85rem", opacity: 0.6 }}>
        Phase 1: scaffold deployed. Next: コンテンツ移植 → いいね / コメント機能。
      </p>
    </main>
  );
}
