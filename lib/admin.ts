import "server-only";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

// /admin（モデレーター画面）の簡易認証。
// 旧 Supabase Auth の app_metadata.role === 'admin' を、
// env の ADMIN_TOKEN と照合する httpOnly Cookie に置き換える。
// Cookie には生トークンではなく HMAC(token) を保存する。

const COOKIE_NAME = "yps_admin";
const MAX_AGE_SEC = 60 * 60 * 24 * 30; // 30日

function token(): string {
  const t = process.env.ADMIN_TOKEN;
  if (!t) throw new Error("ADMIN_TOKEN is not set");
  return t;
}

function cookieValue(): string {
  return createHmac("sha256", token()).update("yps-admin-session").digest("base64url");
}

export async function isAdmin(): Promise<boolean> {
  try {
    const store = await cookies();
    const raw = store.get(COOKIE_NAME)?.value;
    if (!raw) return false;
    const a = Buffer.from(raw);
    const b = Buffer.from(cookieValue());
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/** パスワードが一致したら admin Cookie を発行する。Server Action から呼ぶ。 */
export async function grantAdmin(password: string): Promise<boolean> {
  const a = Buffer.from(password);
  const b = Buffer.from(token());
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  const store = await cookies();
  store.set(COOKIE_NAME, cookieValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: MAX_AGE_SEC,
  });
  return true;
}
