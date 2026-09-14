"use server";

import { revalidatePath } from "next/cache";

import { STUDENT_ROUTES } from "@/modules/student/shared/constants";
import { appearancePreferencesSchema } from "../validation/preferences.schema";
import { updateAppearancePreferences } from "../services/settings.service";
import type { SettingsActionResult } from "../types";

export async function updateAppearanceAction(
  _prevState: SettingsActionResult | null,
  formData: FormData
): Promise<SettingsActionResult> {
  try {
    const parsed = appearancePreferencesSchema.safeParse({
      theme: formData.get("theme"),
      compactSidebar: formData.get("compactSidebar") === "on",
    });

    if (!parsed.success) {
      return { ok: false, error: "Please fix the errors below" };
    }

    await updateAppearancePreferences(parsed.data);
    revalidatePath(STUDENT_ROUTES.settings);

    return { ok: true, message: "Appearance preferences updated." };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
