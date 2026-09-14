import "server-only";

import type { TutorPreferences } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const preferences: TutorPreferences = {
  emailOnSubmission: true,
  emailOnAnnouncementReply: false,
  weeklyDigest: true,
};

export async function getTutorPreferences(): Promise<TutorPreferences> {
  await delay();
  return { ...preferences };
}

export async function updateTutorPreferences(
  input: TutorPreferences
): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  Object.assign(preferences, input);
  return { ok: true };
}
