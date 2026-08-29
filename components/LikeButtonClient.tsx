"use client";
import { useEffect, useRef, useState } from "react";

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

  // 連打抑止 (250ms)
  const lastClickRef = useRef(0);

  // マウント直後に最新カウントと「自分は押し済か」を取り直す（ISR ズレ対策）
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/likes?target=${encodeURIComponent(targetId)}`);
        if (!res.ok) return;
        const data = (await res.json()) as { count: number; already: boolean };
        if (!cancelled) {
          setCount(Number(data.count));
          setAlready(!!data.already);
        }
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [targetId]);

  const handleClick = async () => {
    if (already) return;
    const now = Date.now();
    if (now - lastClickRef.current < 250) return;
    lastClickRef.current = now;

    setPending(true);
    setCount((c) => c + 1); // 楽観更新
    setAlready(true);
    try {
      const res = await fetch("/api/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: targetId }),
      });
      if (!res.ok) throw new Error("like failed");
      const row = (await res.json()) as { new_count: number; already: boolean };
      setCount(Number(row.new_count));
      setAlready(true);
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
        border: `1.5px solid ${liked ? "var(--danger)" : "var(--accent-soft-bd)"}`,
        background: liked ? "var(--danger-soft)" : "var(--surface)",
        color: liked ? "var(--danger-soft-fg)" : "var(--accent-soft-fg)",
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
          background: liked ? "var(--danger-soft)" : "var(--bg-sunken)",
          padding: "2px 9px",
          borderRadius: 999,
          fontSize: "0.85rem",
          color: liked ? "var(--danger-soft-fg)" : "var(--ink)",
        }}
        suppressHydrationWarning
      >
        {count}
      </span>
    </button>
  );
}
