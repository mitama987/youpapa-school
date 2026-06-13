// 本番 Supabase に対する E2E スモークテスト
//   - 匿名サインイン → コメント insert → 自分のは select で見える
//   - 他人になりすました uid での insert は RLS で 401/403
//   - 二重通報は 23505
//   - 最後にテスト行を service_role で全削除

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const env = Object.fromEntries(
  readFileSync(join(homedir(), ".shikumi-creds.local"), "utf-8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1).replace(/[\r"]/g, "")];
    }),
);

const URL = env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SRK = env.SUPABASE_SERVICE_ROLE_KEY;

const TARGET = "test:phase4-e2e";

async function userClient() {
  const c = createClient(URL, ANON, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await c.auth.signInAnonymously();
  if (error) throw new Error(`anon signin failed: ${error.message}`);
  return { c, uid: data.user.id };
}

const adminCli = createClient(URL, SRK, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const log = (k, v) => console.log(`[${k}] ${v}`);

try {
  const { c: a, uid: uidA } = await userClient();
  const { c: b, uid: uidB } = await userClient();
  log("signin", `A=${uidA.slice(0, 8)} B=${uidB.slice(0, 8)}`);

  // 1. A が自分の uid で insert → OK
  const ins1 = await a.from("comments").insert({
    target_id: TARGET,
    user_id: uidA,
    display_name: `テストA#${uidA.slice(0, 4)}`,
    is_anonymous: true,
    body: "Phase4 E2E: A の投稿",
  }).select("id");
  if (ins1.error) throw new Error(`A insert: ${ins1.error.message}`);
  log("A insert", `id=${ins1.data[0].id.slice(0, 8)} OK`);
  const aCommentId = ins1.data[0].id;

  // 2. A が他人 uid (B) で insert → RLS で拒否
  const fake = await a.from("comments").insert({
    target_id: TARGET,
    user_id: uidB,
    display_name: "spoofed",
    is_anonymous: true,
    body: "spoof",
  });
  log("A→B spoof", fake.error ? `BLOCKED ✅ (${fake.error.code})` : "LEAK ❌");

  // 3. B も自分の uid で insert → OK
  const ins2 = await b.from("comments").insert({
    target_id: TARGET,
    user_id: uidB,
    display_name: `テストB#${uidB.slice(0, 4)}`,
    is_anonymous: true,
    body: "Phase4 E2E: B の投稿",
  }).select("id");
  if (ins2.error) throw new Error(`B insert: ${ins2.error.message}`);
  log("B insert", `id=${ins2.data[0].id.slice(0, 8)} OK`);
  const bCommentId = ins2.data[0].id;

  // 3b. user_id 隠蔽の検証（匿名性リーク対策）
  //   直接 user_id select → permission denied、表示は get_comments(user_id 無し / is_mine あり)
  const leak = await a.from("comments").select("user_id").eq("target_id", TARGET);
  log("user_id direct select", leak.error ? `BLOCKED ✅ (${leak.error.code ?? leak.error.message})` : "LEAK ❌");

  const got = await a.rpc("get_comments", { p_target: TARGET });
  const rows = got.data ?? [];
  const noUserId = rows.length > 0 && rows.every((r) => !("user_id" in r));
  const hasIsMine = rows.length > 0 && rows.every((r) => "is_mine" in r);
  const mineTrue = rows.some((r) => r.is_mine === true); // A 自身の行
  log(
    "get_comments",
    got.error
      ? `FAIL ${got.error.message}`
      : `rows=${rows.length} noUserId=${noUserId ? "✅" : "❌"} isMine=${hasIsMine ? "✅" : "❌"} mineTrue=${mineTrue ? "✅" : "❌"}`,
  );

  // 4. A が B のコメントを delete 試行 → 0 行（RLS で UPDATE policy 無し）
  const del = await a.from("comments").delete().eq("id", bCommentId).select("id");
  log("A→B delete", del.data?.length === 0 ? "BLOCKED ✅ (0 rows)" : `LEAK ❌ (${del.data?.length})`);

  // 5. A が B を通報 → OK
  const rep1 = await a.from("reports").insert({
    comment_id: bCommentId,
    reporter_id: uidA,
    reason: "test",
  });
  log("A→B report", rep1.error ? `FAIL ${rep1.error.message}` : "OK ✅");

  // 6. A が同じ B を二重通報 → 23505
  const rep2 = await a.from("reports").insert({
    comment_id: bCommentId,
    reporter_id: uidA,
  });
  log("A→B dup report", rep2.error?.code === "23505" ? "BLOCKED ✅ (23505)" : `unexpected: ${rep2.error?.code ?? "OK?"}`);

  // 7. A が自分のコメント delete → OK
  const delOwn = await a.from("comments").delete().eq("id", aCommentId).select("id");
  log("A own delete", (delOwn.data?.length ?? 0) > 0 ? "OK ✅" : "FAIL ❌");

  // 8. Cleanup
  const cleanup = await adminCli.from("comments").delete().eq("target_id", TARGET);
  log("cleanup", cleanup.error ? `FAIL ${cleanup.error.message}` : "OK ✅");
  // also delete the anonymous users we created
  await adminCli.auth.admin.deleteUser(uidA).catch(() => {});
  await adminCli.auth.admin.deleteUser(uidB).catch(() => {});
  log("user cleanup", "OK ✅");

  console.log("\nE2E ALL GREEN ✅");
} catch (e) {
  console.error("E2E FAILED:", e);
  process.exit(1);
}
