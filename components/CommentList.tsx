"use client";
import { useCallback, useState } from "react";
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

  const refresh = useCallback(async () => {
    try {
      // user_id は返さず is_mine だけ返す API 経由（匿名性リーク対策）
      const res = await fetch(
        `/api/comments?target=${encodeURIComponent(targetId)}&limit=20`,
      );
      if (!res.ok) return;
      const data = (await res.json()) as { comments: CommentRow[] };
      setComments(data.comments);
    } catch {
      // ignore
    }
  }, [targetId]);

  // 投稿完了時: サーバーが uid Cookie を発行しているので状態も同期する
  const handlePosted = useCallback(
    async (uid?: string) => {
      if (uid) setUserId(uid);
      await refresh();
    },
    [refresh],
  );

  const handleDelete = async (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id)); // 楽観更新
    try {
      const res = await fetch(`/api/comments/${id}`, { method: "DELETE" });
      if (!res.ok) await refresh();
    } catch {
      await refresh();
    }
  };

  return (
    <>
      <CommentForm targetId={targetId} userId={userId} onPosted={handlePosted} />
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
              canReport={!c.is_mine}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </>
  );
}
