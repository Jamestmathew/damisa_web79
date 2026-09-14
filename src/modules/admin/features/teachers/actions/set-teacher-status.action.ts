"use server";

import { revalidatePath } from "next/cache";

import { ADMIN_ROUTES } from "@/modules/admin/shared/constants";
import { setTeacherStatus } from "../services/teachers.service";
import type { UserStatus } from "@/modules/admin/shared/types";

export async function setTeacherStatusAction(
  id: string,
  status: UserStatus
): Promise<{ ok: true } | { ok: false; error: string }> {
  const result = await setTeacherStatus(id, status);

  if (result.ok) {
    revalidatePath(ADMIN_ROUTES.teachers);
  }

  return result;
}
