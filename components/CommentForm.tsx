"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const MAX_BODY = 1000;

function shortId(uid: string | null) {
  if (!uid) return "abcd";
  return uid.replace(/-/g, "").slice(0, 4);
}

export function CommentForm({
  targetId,
  userId,
  onPosted,
}: {
  targetId: string;
  userId: string | null;
  onPosted: () => void | Promise<void>;
}) {
  const [body, setBody] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [isGoogle, setIsGoogle] = useState(false);
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null);
  if (!supabaseRef.current) supabaseRef.current = createClient();

  // 既ログイン者の名前を引っ張る（Google なら name、匿名なら "ゲスト#xxxx"）
  useEffect(() => {
    if (!userId) {
      setDisplayName("");
      setIsGoogle(false);
      return;
    }
    supabaseRef.current!.auth.getUser().then(({ data }) => {
      const u = data.user;
      if (!u) return;
      const name = (u.user_metadata?.full_name as string | undefined) ||
        (u.user_metadata?.name as string | undefined);
      const provider = u.app_metadata?.provider as string | undefined;
      if (provider && provider !== "anonymous" && name) {
        setDisplayName(name);
        setIsGoogle(true);
      } else {
        setDisplayName(`ゲスト#${shortId(u.id)}`);
        setIsGoogle(false);
      }
    });
  }, [userId]);

  const ensureSession = useCallback(async () => {
    const supabase = supabaseRef.current!;
    if (userId) return userId;
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) throw error;
    return data.user!.id;
  }, [userId]);

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
      const supabase = supabaseRef.current!;
      const uid = await ensureSession();
      const finalName = isGoogle && displayName ? displayName : `ゲスト#${shortId(uid)}`;
      const { error: insertError } = await supabase.from("comments").insert({
        target_id: targetId,
        user_id: uid,
        display_name: finalName,
        is_anonymous: !isGoogle,
        body: trimmed,
      });
      if (insertError) {
        setError("投稿に失敗しました。少し時間を置いて再度お試しください。");
      } else {
        setBody("");
        await onPosted();
      }
    } catch {
      setError("投稿に失敗しました。");
    } finally {
      setPending(false);
    }
  };

  const handleGoogleLogin = async () => {
    const supabase = supabaseRef.current!;
    const origin = window.location.origin;
    const next = window.location.pathname;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}` },
    });
  };

  const handleSignOut = async () => {
    await supabaseRef.current!.auth.signOut();
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
          border: "1.5px solid var(--line)",
          background: "var(--bg-soft)",
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
          {userId
            ? `投稿者：${displayName || "（読み込み中）"}${isGoogle ? "（Google）" : "（匿名）"}`
            : "未ログイン：匿名で投稿できます"}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {!isGoogle && (
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn btn-ghost"
              style={{ padding: "8px 14px", fontSize: "0.85rem" }}
            >
              Google でログイン
            </button>
          )}
          {userId && (
            <button
              type="button"
              onClick={handleSignOut}
              className="btn btn-ghost"
              style={{ padding: "8px 14px", fontSize: "0.85rem" }}
            >
              ログアウト
            </button>
          )}
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
