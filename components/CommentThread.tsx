import { NIL_UUID, sql } from "@/lib/db";
import { getUid } from "@/lib/identity";
import { CommentList } from "./CommentList";

export type CommentRow = {
  id: string;
  target_id: string;
  is_mine: boolean;
  display_name: string;
  is_anonymous: boolean;
  body: string;
  status: "visible" | "hidden";
  created_at: string;
};

export async function CommentThread({ targetId }: { targetId: string }) {
  // user_id は返さず is_mine だけ返す（匿名性リーク対策。旧 get_comments RPC と同じ可視範囲）
  let initialComments: CommentRow[] = [];
  let currentUserId: string | null = null;
  try {
    currentUserId = await getUid();
    const uid = currentUserId ?? NIL_UUID;
    const rows = await sql`
      select c.id, c.target_id, c.display_name, c.is_anonymous, c.body, c.status,
             c.created_at, (c.user_id = ${uid}::uuid) as is_mine
      from comments c
      where c.target_id = ${targetId}
        and (c.status = 'visible' or c.user_id = ${uid}::uuid)
      order by c.created_at desc
      limit 20`;
    initialComments = rows as CommentRow[];
  } catch {
    // SSR 失敗時は空で初期化（クライアント側で同期する）
  }

  return (
    <section
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius)",
        padding: "26px 28px",
        marginTop: 24,
        boxShadow: "var(--shadow)",
      }}
    >
      <h2
        style={{
          fontSize: "1.15rem",
          marginTop: 0,
          paddingLeft: 12,
          borderLeft: "5px solid var(--orange)",
        }}
      >
        コメント
      </h2>
      <CommentList
        targetId={targetId}
        initialComments={initialComments}
        initialUserId={currentUserId}
      />
    </section>
  );
}
