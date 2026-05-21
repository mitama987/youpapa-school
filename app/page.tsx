import { createClient } from "@/lib/supabase/server";
import styles from "./page.module.css";

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
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>シクミ</h1>
        <p>副業 × AI × 自動化を学ぶ無料アカデミー（Next.js + Supabase 移行中）</p>

        <section style={{ marginTop: 24, padding: 16, border: "1px solid #444", borderRadius: 8 }}>
          <h2 style={{ marginTop: 0, fontSize: "1rem" }}>Supabase connection</h2>
          <p>
            status: <strong>{supabaseStatus}</strong>
          </p>
          <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>{supabaseDetail}</p>
        </section>

        <p style={{ marginTop: 24, fontSize: "0.85rem", opacity: 0.6 }}>
          Phase 1: scaffold deployed. Next: コンテンツ移植 → いいね/コメント機能。
        </p>
      </main>
    </div>
  );
}
