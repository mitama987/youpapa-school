import { createClient as createServerClient } from "@/lib/supabase/server";
import { LikeButtonClient } from "./LikeButtonClient";

/**
 * SSR で likes.count を取得し、クライアントへ初期値として渡す。
 * targetId の規約: "<kind>:<slug>" 例 "lessons:step1"
 */
export async function LikeButton({ targetId }: { targetId: string }) {
  let initial = 0;
  try {
    const supabase = await createServerClient();
    const { data } = await supabase
      .from("likes")
      .select("count")
      .eq("target_id", targetId)
      .maybeSingle();
    if (data?.count != null) initial = Number(data.count);
  } catch {
    // SSR 失敗時は 0 で初期化（クライアント側で再取得もする）
  }

  return <LikeButtonClient targetId={targetId} initialCount={initial} />;
}
