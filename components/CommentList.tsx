"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { CommentRow } from "./CommentThread";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";

export function CommentList({
  targetId,
  initialComments,
  initialUserId,
}: {
  targetId: string;
  initialComments: CommentRow[];
  initialUserId: string | null;
}) {
  const [comments, setComments] = useState<CommentRow[]>(initialComments);
  const [userId, setUserId] = useState<string | null>(initialUserId);
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null);
  if (!supabaseRef.current) supabaseRef.current = createClient();

  // クライアントマウント時にセッション状態を再同期
  useEffect(() => {
    const supabase = supabaseRef.current!;
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const refresh = useCallback(async () => {
    const supabase = supabaseRef.current!;
    // user_id は返さず is_mine だけ返す RPC 経由（匿名性リーク対策）
    const { data } = await supabase.rpc("get_comments", {
      p_target: targetId,
      p_limit: 20,
    });
    if (data) setComments(data as CommentRow[]);
  }, [targetId]);

  const handleDelete = async (id: string) => {
    const supabase = supabaseRef.current!;
    setComments((prev) => prev.filter((c) => c.id !== id)); // 楽観更新
    const { error } = await supabase.from("comments").delete().eq("id", id);
    if (error) await refresh();
  };

  return (
    <>
      <CommentForm targetId={targetId} userId={userId} onPosted={refresh} />
      <div style={{ marginTop: 18 }}>
        {comments.length === 0 ? (
          <p style={{ color: "var(--muted)", margin: 0 }}>
            まだコメントはありません。最初のひとことをどうぞ。
          </p>
        ) : (
          comments.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              isOwn={c.is_mine}
              canReport={!!userId && !c.is_mine}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </>
  );
}
