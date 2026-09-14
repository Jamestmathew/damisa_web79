"use server";

import { revalidatePath } from "next/cache";

import { requirePermission } from "@/shared/rbac";
import { TUTOR_ROUTES } from "@/modules/tutor/shared/constants";
import { overrideOverallGrade } from "../services/gradebook.service";

export async function overrideGradeAction(
  id: string,
  overallPercent: number
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requirePermission("gradebook:manage_own");

  const result = await overrideOverallGrade(id, overallPercent);

  if (result.ok) revalidatePath(TUTOR_ROUTES.gradebook);

  return result;
}
