import { NextResponse } from "next/server";
import { getUid } from "@/lib/identity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** 現在の匿名 uid（未発行なら null）。Cookie は発行しない（読み取りのみ）。 */
export async function GET() {
  const uid = await getUid();
  return NextResponse.json({ uid });
}
