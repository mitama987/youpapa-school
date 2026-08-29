import "server-only";
import { cookies } from "next/headers";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

// 匿名ユーザー識別。旧 Supabase Auth の signInAnonymously() を、
// HMAC 署名付き httpOnly Cookie（値: "<uuid>.<sig>"）で置き換える。
// 署名により client 側で任意の user_id を偽装できない
// （旧 RLS の `with check (auth.uid() = user_id)` 相当）。
// 旧 auth.users の UUID 形式をそのまま使うため、退避済みデータとも互換。

const COOKIE_NAME = "yps_uid";
const MAX_AGE_SEC = 60 * 60 * 24 * 730; // 2年

function secret(): string {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET is not set");
  return s;
}

function sign(uid: string): string {
  return createHmac("sha256", secret()).update(uid).digest("base64url");
}

export function parseIdentity(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const dot = raw.indexOf(".");
  if (dot <= 0) return null;
  const uid = raw.slice(0, dot);
  const sig = raw.slice(dot + 1);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uid)) return null;
  const expected = sign(uid);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return uid;
}

/** 読み取り専用（Server Component からも安全）。Cookie が無ければ null。 */
export async function getUid(): Promise<string | null> {
  const store = await cookies();
  return parseIdentity(store.get(COOKIE_NAME)?.value);
}

/**
 * uid を取得し、無ければ発行して Cookie をセットする。
 * Cookie を書くため Route Handler / Server Action からのみ呼ぶこと。
 */
export async function ensureUid(): Promise<string> {
  const store = await cookies();
  const existing = parseIdentity(store.get(COOKIE_NAME)?.value);
  if (existing) return existing;
  const uid = randomUUID();
  store.set(COOKIE_NAME, `${uid}.${sign(uid)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SEC,
  });
  return uid;
}

/** "ゲスト#xxxx" 表示用の短縮 ID（旧実装と同じ規約: ハイフン除去の先頭4文字） */
export function shortId(uid: string): string {
  return uid.replace(/-/g, "").slice(0, 4);
}
