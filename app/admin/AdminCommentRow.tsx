"use client";
import { useTransition } from "react";
import { deleteComment, setStatus } from "./actions";

type AdminComment = {
  id: string;
  target_id: string;
  display_name: string;
  body: string;
  status: "visible" | "hidden";
  created_at: string;
  user_id: string;
};

function fmtDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function AdminCommentRow({
  comment,
  reportCount,
}: {
  comment: AdminComment;
  reportCount: number;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div
      style={{
        padding: "12px 0",
        borderTop: "1px solid var(--line)",
        opacity: comment.status === "hidden" ? 0.6 : 1,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          fontSize: "0.8rem",
          color: "var(--muted)",
          flexWrap: "wrap",
          marginBottom: 4,
        }}
      >
        <span style={{ fontWeight: 700, color: "var(--ink)" }}>
          {comment.display_name}
        </span>
        <span>{comment.target_id}</span>
        <span suppressHydrationWarning>{fmtDate(comment.created_at)}</span>
        <span
          style={{
            padding: "1px 8px",
            borderRadius: 999,
            background:
              comment.status === "hidden"
                ? "var(--pill-soon-bg)"
                : "var(--pill-live-bg)",
            color:
              comment.status === "hidden"
                ? "var(--pill-soon-fg)"
                : "var(--pill-live-fg)",
          }}
        >
          {comment.status}
        </span>
        {reportCount > 0 && (
          <span style={{ color: "var(--call-warn-fg)" }}>
            通報 {reportCount} 件
          </span>
        )}
      </div>
      <p style={{ margin: "4px 0", whiteSpace: "pre-wrap" }}>{comment.body}</p>
      <div style={{ display: "flex", gap: 12, fontSize: "0.85rem" }}>
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(() =>
              setStatus(comment.id, comment.status === "hidden" ? "visible" : "hidden"),
            )
          }
          style={{
            background: "none",
            border: 0,
            color: "var(--orange-d)",
            cursor: "pointer",
            textDecoration: "underline",
            fontWeight: 700,
            padding: 0,
          }}
        >
          {comment.status === "hidden" ? "再表示" : "非表示にする"}
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            if (!window.confirm("完全に削除します。よろしいですか？")) return;
            startTransition(() => deleteComment(comment.id));
          }}
          style={{
            background: "none",
            border: 0,
            color: "var(--call-warn-fg)",
            cursor: "pointer",
            textDecoration: "underline",
            fontWeight: 700,
            padding: 0,
          }}
        >
          完全削除
        </button>
      </div>
    </div>
  );
}
