"use client";
import { useState } from "react";

const MAX_BODY = 1000;

function shortId(uid: string | null) {
  if (!uid) return "abcd";
  return uid.replace(/-/g, "").slice(0, 4);
}

/**
 * 匿名コメント投稿フォーム。
 * 2026-08 の Neon 移行で Google ログイン（認証バッジ）は廃止し、
 * サーバー発行の署名付き Cookie による匿名 ID に一本化した。
 */
export function CommentForm({
  targetId,
  userId,
  onPosted,
}: {
  targetId: string;
  userId: string | null;
  onPosted: (uid?: string) => void | Promise<void>;
}) {
  const [body, setBody] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayName = userId ? `ゲスト#${shortId(userId)}` : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = body.trim();
    if (trimmed.length === 0) {
      setError("内容を入力してください。");
      return;
    }
    if (trimmed.length > MAX_BODY) {
      setError(`本文は ${MAX_BODY} 文字以内にしてください。`);
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target_id: targetId, body: trimmed }),
      });
      if (!res.ok) {
        setError("投稿に失敗しました。少し時間を置いて再度お試しください。");
      } else {
        const data = (await res.json()) as { uid?: string };
        setBody("");
        await onPosted(data.uid);
      }
    } catch {
      setError("投稿に失敗しました。");
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 4 }}>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="感想・質問・気づきをどうぞ（最大 1000 文字）"
        rows={3}
        maxLength={MAX_BODY + 50}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid var(--border-default)",
          background: "var(--bg-surface)",
          color: "var(--ink)",
          fontFamily: "var(--font)",
          fontSize: "0.95rem",
          lineHeight: 1.6,
          resize: "vertical",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginTop: 8,
          flexWrap: "wrap",
          fontSize: "0.85rem",
          color: "var(--muted)",
        }}
      >
        <div suppressHydrationWarning>
          {userId ? `投稿者：${displayName}（匿名）` : "匿名で投稿できます"}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            type="submit"
            disabled={pending || body.trim().length === 0}
            className="btn btn-primary"
            style={{ padding: "8px 16px", fontSize: "0.9rem" }}
          >
            {pending ? "送信中…" : userId ? "投稿する" : "匿名で投稿"}
          </button>
        </div>
      </div>
      {error && (
        <p style={{ color: "var(--call-warn-fg)", fontSize: "0.85rem", margin: "8px 0 0" }}>
          {error}
        </p>
      )}
    </form>
  );
}
