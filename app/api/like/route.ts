import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { ensureUid } from "@/lib/identity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/like  body: { target }
 * → { new_count, already } 旧 RPC like_once(p_target) の移植。
 * like_events の PK (target_id, user_id) が二重押しを防ぎ、
 * 初回のみ likes.count を +1 する。uid は署名付き Cookie（無ければここで発行）。
 */
export async function POST(request: NextRequest) {
  let target: unknown;
  try {
    ({ target } = await request.json());
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  if (typeof target !== "string" || target.length === 0 || target.length > 120) {
    return NextResponse.json({ error: "invalid target" }, { status: 400 });
  }

  try {
    const uid = await ensureUid();
    const inserted = await sql`
      insert into like_events (target_id, user_id)
      values (${target}, ${uid}::uuid)
      on conflict do nothing
      returning target_id`;

    let count: number;
    if (inserted.length > 0) {
      const rows = await sql`
        insert into likes (target_id, count)
        values (${target}, 1)
        on conflict (target_id) do update
          set count = likes.count + 1, updated_at = now()
        returning count`;
      count = Number(rows[0].count);
    } else {
      const rows = await sql`select count from likes where target_id = ${target}`;
      count = rows.length > 0 ? Number(rows[0].count) : 0;
    }
    return NextResponse.json({ new_count: count, already: inserted.length === 0 });
  } catch (e) {
    console.error("[api/like] error", e);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
