import "server-only";

import type {
  AppearancePreferences,
  NotificationPreferences,
  ProfilePreferences,
  StudentPreferences,
} from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const preferences: StudentPreferences = {
  profile: { displayName: "Demo User", bio: "" },
  notifications: { emailNotifications: true, assignmentReminders: true, announcementAlerts: true },
  appearance: { theme: "system", compactSidebar: false },
};

export async function getPreferences(): Promise<StudentPreferences> {
  await delay();
  return preferences;
}

export async function updateProfilePreferences(data: ProfilePreferences): Promise<{ ok: true }> {
  await delay();
  preferences.profile = data;
  return { ok: true };
}

export async function updateNotificationPreferences(
  data: NotificationPreferences
): Promise<{ ok: true }> {
  await delay();
  preferences.notifications = data;
  return { ok: true };
}

export async function updateAppearancePreferences(
  data: AppearancePreferences
): Promise<{ ok: true }> {
  await delay();
  preferences.appearance = data;
  return { ok: true };
}
