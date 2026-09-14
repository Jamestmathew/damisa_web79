"use server";

import { requirePermission } from "@/shared/rbac";
import { resetUserPassword } from "../services/users.service";

export async function resetUserPasswordAction(
  id: string
): Promise<{ ok: true; temporaryPassword: string } | { ok: false; error: string }> {
  await requirePermission("users:reset_password");

  return resetUserPassword(id);
}
