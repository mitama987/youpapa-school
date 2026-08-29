import { NIL_UUID, sql } from "@/lib/db";
import { getUid } from "@/lib/identity";
import { LikeButtonClient } from "./LikeButtonClient";

/**
 * SSR で likes.count と「自分は押し済か」を取得して初期値として渡す。
 * targetId 規約: "<kind>:<slug>" 例 "lessons:step1"
 * （2026-08: supabase-js → Neon 直接クエリへ移行）
 */
export async function LikeButton({ targetId }: { targetId: string }) {
  let initialCount = 0;
  let initialAlready = false;
  try {
    const uid = (await getUid()) ?? NIL_UUID;
    const [countRows, evRows] = await Promise.all([
      sql`select count from likes where target_id = ${targetId}`,
      sql`select 1 from like_events
          where target_id = ${targetId} and user_id = ${uid}::uuid
          limit 1`,
    ]);
    if (countRows.length > 0 && countRows[0].count != null) {
      initialCount = Number(countRows[0].count);
    }
    initialAlready = evRows.length > 0;
  } catch {
    // SSR 失敗時は 0 / false で初期化（クライアント側で同期する）
  }

  return (
    <LikeButtonClient
      targetId={targetId}
      initialCount={initialCount}
      initialAlready={initialAlready}
    />
  );
}
