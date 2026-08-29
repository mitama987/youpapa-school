import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getUid } from "@/lib/identity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/likes?target=<kind:slug>
 * → { count, already } 現在のいいね数と「自分は押し済か」。
 * 旧 RLS 構成では le_read_own ポリシーが user_id 絞り込みを暗黙に担っていたが、
 * ここでは WHERE で明示する。
 */
export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("target") ?? "";
  if (target.length === 0 || target.length > 120) {
    return NextResponse.json({ error: "invalid target" }, { status: 400 });
  }
  try {
    const rows = await sql`select count from likes where target_id = ${target}`;
    const count = rows.length > 0 ? Number(rows[0].count) : 0;

    let already = false;
    const uid = await getUid();
    if (uid) {
      const ev = await sql`
        select 1 from like_events
        where target_id = ${target} and user_id = ${uid}::uuid
        limit 1`;
      already = ev.length > 0;
    }
    return NextResponse.json({ count, already });
  } catch (e) {
    console.error("[api/likes] error", e);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
