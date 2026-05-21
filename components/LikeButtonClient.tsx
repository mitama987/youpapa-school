"use client";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LikeButtonClient({
  targetId,
  initialCount,
  initialAlready,
}: {
  targetId: string;
  initialCount: number;
  initialAlready: boolean;
}) {
  const [count, setCount] = useState(initialCount);
  const [already, setAlready] = useState(initialAlready);
  const [pending, setPending] = useState(false);
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null);
  if (!supabaseRef.current) supabaseRef.current = createClient();

  // 連打抑止 (250ms)
  const lastClickRef = useRef(0);

  // マウント直後に最新カウントと「自分は押し済か」を取り直す（ISR ズレ対策）
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const supabase = supabaseRef.current!;
        const { data: row } = await supabase
          .from("likes")
          .select("count")
          .eq("target_id", targetId)
          .maybeSingle();
        if (!cancelled && row?.count != null) setCount(Number(row.count));

        const { data: userData } = await supabase.auth.getUser();
        if (userData.user) {
          const { data: ev } = await supabase
            .from("like_events")
            .select("target_id")
            .eq("target_id", targetId)
            .maybeSingle();
          if (!cancelled) setAlready(!!ev);
        }
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [targetId]);

  const ensureSession = async () => {
    const supabase = supabaseRef.current!;
    const { data } = await supabase.auth.getUser();
    if (data.user) return data.user.id;
    const { data: signed, error } = await supabase.auth.signInAnonymously();
    if (error || !signed.user) throw error ?? new Error("anon signin failed");
    return signed.user.id;
  };

  const handleClick = async () => {
    if (already) return;
    const now = Date.now();
    if (now - lastClickRef.current < 250) return;
    lastClickRef.current = now;

    setPending(true);
    setCount((c) => c + 1); // 楽観更新
    setAlready(true);
    try {
      await ensureSession();
      const { data, error } = await supabaseRef.current!.rpc("like_once", {
        p_target: targetId,
      });
      if (!error && Array.isArray(data) && data[0]) {
        const row = data[0] as { new_count: number; already: boolean };
        setCount(Number(row.new_count));
        setAlready(!!row.already || true);
      }
    } catch {
      // 失敗時はロールバック
      setCount((c) => Math.max(0, c - 1));
      setAlready(false);
    } finally {
      setPending(false);
    }
  };

  const liked = already;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending || liked}
      aria-label={liked ? `いいね済 ${count} 件` : `いいね ${count} 件 — クリックで +1`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 18px",
        borderRadius: 999,
        border: `1.5px solid ${liked ? "#ef4444" : "var(--accent-soft-bd)"}`,
        background: liked ? "#fff1f1" : "var(--surface)",
        color: liked ? "#b91c1c" : "var(--orange-d)",
        fontWeight: 800,
        fontSize: "0.95rem",
        cursor: pending ? "wait" : liked ? "default" : "pointer",
        transition: "transform 0.1s, background 0.15s, border-color 0.15s",
      }}
      onMouseDown={(e) => {
        if (!liked) e.currentTarget.style.transform = "scale(0.96)";
      }}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <span aria-hidden style={{ fontSize: "1.15rem" }}>
        {liked ? "❤️" : "🧡"}
      </span>
      <span suppressHydrationWarning>{liked ? "いいね済" : "いいね"}</span>
      <span
        style={{
          minWidth: 18,
          textAlign: "center",
          background: liked ? "#fee2e2" : "var(--bg-soft)",
          padding: "2px 9px",
          borderRadius: 999,
          fontSize: "0.85rem",
          color: liked ? "#7f1d1d" : "var(--ink)",
        }}
        suppressHydrationWarning
      >
        {count}
      </span>
    </button>
  );
}
