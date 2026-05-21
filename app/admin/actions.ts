"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

async function ensureAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const role = (data.user?.app_metadata?.role as string | undefined) ?? null;
  if (!data.user || role !== "admin") {
    throw new Error("forbidden");
  }
}

export async function setStatus(id: string, status: "visible" | "hidden") {
  await ensureAdmin();
  const admin = createAdminClient();
  const { error } = await admin.from("comments").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}

export async function deleteComment(id: string) {
  await ensureAdmin();
  const admin = createAdminClient();
  const { error } = await admin.from("comments").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}
