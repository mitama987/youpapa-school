import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getUid } from "@/lib/identity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * DELETE /api/comments/:id — 自分のコメントのみ削除可。
 * 旧構成では RLS `comments delete own` が所有者チェックを担っていた。
 * ここでは WHERE user_id = uid で明示する（これが無いと誰でも削除できてしまう）。
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!UUID_RE.test(id)) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }
  const uid = await getUid();
  if (!uid) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const rows = await sql`
      delete from comments
      where id = ${id}::uuid and user_id = ${uid}::uuid
      returning id`;
    if (rows.length === 0) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/comments DELETE] error", e);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
