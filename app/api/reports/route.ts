import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { ensureUid } from "@/lib/identity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * POST /api/reports  body: { comment_id, reason? }
 * unique (comment_id, reporter_id) により二重通報は already:true で返す。
 */
export async function POST(request: NextRequest) {
  let payload: { comment_id?: unknown; reason?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  const commentId = payload.comment_id;
  const reason =
    typeof payload.reason === "string" && payload.reason.length > 0
      ? payload.reason.slice(0, 300)
      : null;
  if (typeof commentId !== "string" || !UUID_RE.test(commentId)) {
    return NextResponse.json({ error: "invalid comment_id" }, { status: 400 });
  }

  try {
    const uid = await ensureUid();
    const rows = await sql`
      insert into reports (comment_id, reporter_id, reason)
      values (${commentId}::uuid, ${uid}::uuid, ${reason})
      on conflict (comment_id, reporter_id) do nothing
      returning id`;
    return NextResponse.json({ ok: true, already: rows.length === 0 });
  } catch (e) {
    // comment_id が存在しない場合は FK 違反になる
    console.error("[api/reports] error", e);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
