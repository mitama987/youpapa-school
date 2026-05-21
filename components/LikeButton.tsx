import { createClient as createServerClient } from "@/lib/supabase/server";
import { LikeButtonClient } from "./LikeButtonClient";

/**
 * SSR で likes.count と「自分は押し済か」を取得して初期値として渡す。
 * targetId 規約: "<kind>:<slug>" 例 "lessons:step1"
 */
export async function LikeButton({ targetId }: { targetId: string }) {
  let initialCount = 0;
  let initialAlready = false;
  try {
    const supabase = await createServerClient();
    const { data: row } = await supabase
      .from("likes")
      .select("count")
      .eq("target_id", targetId)
      .maybeSingle();
    if (row?.count != null) initialCount = Number(row.count);

    const { data: userData } = await supabase.auth.getUser();
    if (userData.user) {
      const { data: ev } = await supabase
        .from("like_events")
        .select("target_id")
        .eq("target_id", targetId)
        .maybeSingle();
      initialAlready = !!ev;
    }
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
