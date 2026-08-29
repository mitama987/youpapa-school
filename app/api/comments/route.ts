import { NextRequest, NextResponse } from "next/server";
import { NIL_UUID, sql } from "@/lib/db";
import { ensureUid, getUid, shortId } from "@/lib/identity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = 1000;

/**
 * GET /api/comments?target=<kind:slug>&limit=20
 * 旧 RPC get_comments(p_target, p_limit) の移植:
 * visible または自分のコメントのみ・user_id は返さず is_mine だけ返す（匿名性リーク対策）。
 */
export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("target") ?? "";
  const rawLimit = Number(request.nextUrl.searchParams.get("limit") ?? 20);
  const limit = Math.max(1, Math.min(Number.isFinite(rawLimit) ? rawLimit : 20, 100));
  if (target.length === 0 || target.length > 120) {
    return NextResponse.json({ error: "invalid target" }, { status: 400 });
  }
  try {
    const uid = (await getUid()) ?? NIL_UUID;
    const rows = await sql`
      select c.id, c.target_id, c.display_name, c.is_anonymous, c.body, c.status,
             c.created_at, (c.user_id = ${uid}::uuid) as is_mine
      from comments c
      where c.target_id = ${target}
        and (c.status = 'visible' or c.user_id = ${uid}::uuid)
      order by c.created_at desc
      limit ${limit}`;
    return NextResponse.json({ comments: rows });
  } catch (e) {
    console.error("[api/comments GET] error", e);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}

/**
 * POST /api/comments  body: { target_id, body }
 * uid は署名付き Cookie（無ければ発行）。display_name はサーバー側で決定し、
 * クライアントからの user_id / display_name の指定は受け付けない
 * （旧 RLS `with check (auth.uid() = user_id)` 相当の防御）。
 */
export async function POST(request: NextRequest) {
  let payload: { target_id?: unknown; body?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  const target = payload.target_id;
  const body = typeof payload.body === "string" ? payload.body.trim() : "";
  if (typeof target !== "string" || target.length === 0 || target.length > 120) {
    return NextResponse.json({ error: "invalid target" }, { status: 400 });
  }
  if (body.length === 0 || body.length > MAX_BODY) {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  try {
    const uid = await ensureUid();
    const displayName = `ゲスト#${shortId(uid)}`;
    await sql`
      insert into comments (target_id, user_id, display_name, is_anonymous, body)
      values (${target}, ${uid}::uuid, ${displayName}, true, ${body})`;
    return NextResponse.json({ ok: true, uid }, { status: 201 });
  } catch (e) {
    console.error("[api/comments POST] error", e);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
