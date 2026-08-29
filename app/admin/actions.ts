"use server";
import { revalidatePath } from "next/cache";
import { sql } from "@/lib/db";
import { grantAdmin, isAdmin } from "@/lib/admin";

async function ensureAdmin() {
  if (!(await isAdmin())) {
    throw new Error("forbidden");
  }
}

/** /admin のパスワードフォーム。一致すれば admin Cookie を発行して再描画。 */
export async function adminLogin(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  await grantAdmin(password);
  revalidatePath("/admin");
}

export async function setStatus(id: string, status: "visible" | "hidden") {
  await ensureAdmin();
  if (status !== "visible" && status !== "hidden") throw new Error("bad status");
  await sql`update comments set status = ${status} where id = ${id}::uuid`;
  revalidatePath("/admin");
}

export async function deleteComment(id: string) {
  await ensureAdmin();
  await sql`delete from comments where id = ${id}::uuid`;
  revalidatePath("/admin");
}
