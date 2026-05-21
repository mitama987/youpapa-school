"use client";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LikeButtonClient({
  targetId,
  initialCount,
}: {
  targetId: string;
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount);
  const [pending, setPending] = useState(false);
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null);

  if (!supabaseRef.current) supabaseRef.current = createClient();

  // 連打抑止 (250ms)
  const lastClickRef = useRef(0);

  // マウント直後に最新カウントを取り直す（ISR ズレ対策）
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await supabaseRef
          .current!.from("likes")
          .select("count")
          .eq("target_id", targetId)
          .maybeSingle();
        if (!cancelled && data?.count != null) setCount(Number(data.count));
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [targetId]);

  const handleClick = async () => {
    const now = Date.now();
    if (now - lastClickRef.current < 250) return;
    lastClickRef.current = now;

    setPending(true);
    setCount((c) => c + 1); // 楽観更新
    try {
      const { data, error } = await supabaseRef.current!.rpc("increment_like", {
        p_target: targetId,
      });
      if (!error && typeof data === "number") {
        setCount(data); // サーバ側の正値で同期
      }
    } catch {
      // 失敗時はロールバック
      setCount((c) => Math.max(0, c - 1));
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      aria-label={`いいね ${count} 件 — クリックで +1`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 18px",
        borderRadius: 999,
        border: "1.5px solid var(--accent-soft-bd)",
        background: "var(--surface)",
        color: "var(--orange-d)",
        fontWeight: 800,
        fontSize: "0.95rem",
        cursor: pending ? "wait" : "pointer",
        transition: "transform 0.1s, background 0.15s",
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <span aria-hidden style={{ fontSize: "1.15rem" }}>
        ❤️
      </span>
      <span>いいね</span>
      <span
        style={{
          minWidth: 18,
          textAlign: "center",
          background: "var(--bg-soft)",
          padding: "2px 9px",
          borderRadius: 999,
          fontSize: "0.85rem",
          color: "var(--ink)",
        }}
      >
        {count}
      </span>
    </button>
  );
}
