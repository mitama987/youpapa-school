import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Google OAuth から戻ってきた認可コードを Cookie セッションに交換する。
 * 失敗時は / に戻す。
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/";

  if (!code) {
    return NextResponse.redirect(new URL("/", url.origin));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL("/?auth=error", url.origin));
  }

  // next が外部 URL でないことを確認してからリダイレクト
  const target = next.startsWith("/") ? next : "/";
  return NextResponse.redirect(new URL(target, url.origin));
}
