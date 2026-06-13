import { createClient } from "@/lib/supabase/server";
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
  const supabase = await createClient();

  // user_id は返さず is_mine だけ返す RPC 経由（匿名性リーク対策）
  const [{ data: comments }, { data: userData }] = await Promise.all([
    supabase.rpc("get_comments", { p_target: targetId, p_limit: 20 }),
    supabase.auth.getUser(),
  ]);

  const initialComments = (comments ?? []) as CommentRow[];
  const currentUserId = userData.user?.id ?? null;

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
