"use client";
import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { CommentRow } from "./CommentThread";

function fmtDate(iso: string) {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${day} ${hh}:${mm}`;
}

export function CommentItem({
  comment,
  isOwn,
  canReport,
  onDelete,
}: {
  comment: CommentRow;
  isOwn: boolean;
  canReport: boolean;
  onDelete: (id: string) => Promise<void> | void;
}) {
  const [reported, setReported] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null);
  if (!supabaseRef.current) supabaseRef.current = createClient();

  const handleReport = async () => {
    const reason = window.prompt("通報理由（任意・300 文字まで）");
    if (reason === null) return;
    setReportError(null);
    const { error } = await supabaseRef.current!.from("reports").insert({
      comment_id: comment.id,
      reporter_id: (await supabaseRef.current!.auth.getUser()).data.user?.id,
      reason: reason || null,
    });
    if (error) {
      if (error.code === "23505") setReported(true); // 二重通報
      else setReportError(error.message);
    } else {
      setReported(true);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("このコメントを削除します。よろしいですか？")) return;
    await onDelete(comment.id);
  };

  const hidden = comment.status === "hidden";

  return (
    <article
      style={{
        padding: "14px 0",
        borderTop: "1px solid var(--line)",
        opacity: hidden ? 0.55 : 1,
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "0.85rem",
          color: "var(--muted)",
          marginBottom: 4,
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span style={{ fontWeight: 700, color: "var(--ink)" }}>
          {comment.display_name}
          {comment.is_anonymous ? "" : " 🔒"}
          {hidden && (
            <span
              style={{
                marginLeft: 8,
                fontSize: "0.7rem",
                background: "var(--pill-soon-bg)",
                color: "var(--pill-soon-fg)",
                padding: "1px 8px",
                borderRadius: 999,
              }}
            >
              非表示
            </span>
          )}
        </span>
        <time dateTime={comment.created_at} suppressHydrationWarning>
          {fmtDate(comment.created_at)}
        </time>
      </header>
      <p
        style={{
          margin: "4px 0 6px",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {comment.body}
      </p>
      <div style={{ display: "flex", gap: 12, fontSize: "0.8rem" }}>
        {isOwn && (
          <button
            type="button"
            onClick={handleDelete}
            style={{
              background: "none",
              border: 0,
              padding: 0,
              color: "var(--call-warn-fg)",
              cursor: "pointer",
              textDecoration: "underline",
              fontWeight: 700,
            }}
          >
            削除
          </button>
        )}
        {canReport && !reported && (
          <button
            type="button"
            onClick={handleReport}
            style={{
              background: "none",
              border: 0,
              padding: 0,
              color: "var(--muted)",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            通報
          </button>
        )}
        {reported && (
          <span style={{ color: "var(--muted)" }}>通報を受け付けました。</span>
        )}
        {reportError && (
          <span style={{ color: "var(--call-warn-fg)" }}>{reportError}</span>
        )}
      </div>
    </article>
  );
}
