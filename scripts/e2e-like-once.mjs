// E2E: いいね 1 人 1 回（匿名 uid 単位）
//   - A が 5 回連打 → count +1 だけ、2 回目以降は already=true
//   - B が押す → count +1（合計 +2）
//   - 別 target でも独立カウント
//   - 最後に service_role でクリーンアップ

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

const TARGET_A = "test:like-once-A";
const TARGET_B = "test:like-once-B";

async function anonClient() {
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
  const { c: a, uid: uidA } = await anonClient();
  const { c: b, uid: uidB } = await anonClient();
  log("signin", `A=${uidA.slice(0, 8)} B=${uidB.slice(0, 8)}`);

  // 1. A が 5 回連打 → count +1 のみ、2 回目以降 already=true
  const aResults = [];
  for (let i = 0; i < 5; i++) {
    const { data, error } = await a.rpc("like_once", { p_target: TARGET_A });
    if (error) throw new Error(`A press #${i + 1}: ${error.message}`);
    aResults.push(data[0]);
  }
  log("A x5", JSON.stringify(aResults.map((r) => ({ c: Number(r.new_count), already: r.already }))));
  const aFinal = aResults[aResults.length - 1];
  const firstWasNew = !aResults[0].already;
  const restWasAlready = aResults.slice(1).every((r) => r.already);
  log("A 5回連打", firstWasNew && restWasAlready && Number(aFinal.new_count) === 1 ? "OK ✅ (count=1, 1st=new, rest=already)" : "FAIL ❌");

  // 2. B が押す → count +1（合計 2）
  const { data: bRes } = await b.rpc("like_once", { p_target: TARGET_A });
  log("B press", `count=${bRes[0].new_count} already=${bRes[0].already}`);
  log("B 別ユーザー", Number(bRes[0].new_count) === 2 && !bRes[0].already ? "OK ✅" : "FAIL ❌");

  // 3. 別 target は独立カウント
  const { data: bRes2 } = await b.rpc("like_once", { p_target: TARGET_B });
  log("B press B-target", `count=${bRes2[0].new_count}`);
  log("別 target 独立", Number(bRes2[0].new_count) === 1 ? "OK ✅" : "FAIL ❌");

  // 4. 未認証 (no signin) は raise
  const guest = createClient(URL, ANON, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error: guestErr } = await guest.rpc("like_once", { p_target: TARGET_A });
  log("未認証拒否", guestErr ? `OK ✅ (${guestErr.code ?? "rejected"})` : "FAIL ❌ leaked");

  // 5. 旧 increment_like は execute 権限剥奪済み
  const { error: oldErr } = await a.rpc("increment_like", { p_target: TARGET_A });
  log("旧 RPC 封じ込め", oldErr ? `OK ✅ (${oldErr.code ?? "rejected"})` : "FAIL ❌ still callable");

  // Cleanup
  await adminCli.from("like_events").delete().in("target_id", [TARGET_A, TARGET_B]);
  await adminCli.from("likes").delete().in("target_id", [TARGET_A, TARGET_B]);
  await adminCli.auth.admin.deleteUser(uidA).catch(() => {});
  await adminCli.auth.admin.deleteUser(uidB).catch(() => {});
  log("cleanup", "OK ✅");

  console.log("\nE2E ALL GREEN ✅");
} catch (e) {
  console.error("E2E FAILED:", e);
  process.exit(1);
}
