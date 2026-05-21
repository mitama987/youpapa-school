import "server-only";
import { createClient } from "@supabase/supabase-js";

// service_role キー使用クライアント。
// RLS をバイパスするため、Route Handler / Server Action からのみ使用すること。
// クライアントバンドルに含まれないよう "server-only" でガードする。
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase admin env vars missing");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
