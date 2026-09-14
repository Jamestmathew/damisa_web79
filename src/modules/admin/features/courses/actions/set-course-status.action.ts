"use server";

import { revalidatePath } from "next/cache";

import { ADMIN_ROUTES } from "@/modules/admin/shared/constants";
import { setCourseStatus } from "../services/courses.service";
import type { CoursePublishStatus } from "../types";

export async function setCourseStatusAction(
  id: string,
  status: CoursePublishStatus
): Promise<{ ok: true } | { ok: false; error: string }> {
  const result = await setCourseStatus(id, status);

  if (result.ok) {
    revalidatePath(ADMIN_ROUTES.courses);
  }

  return result;
}
