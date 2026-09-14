import "server-only";

import type { SystemSettings } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const settings: SystemSettings = {
  institutionName: "Kabba Institute of Technology",
  academicSession: "2026/2027",
  supportEmail: "support@school.edu",
  allowManualPaymentRecording: true,
};

export async function getSystemSettings(): Promise<SystemSettings> {
  await delay();
  return { ...settings };
}

export async function updateSystemSettings(
  input: SystemSettings
): Promise<{ ok: true; settings: SystemSettings }> {
  await delay();
  Object.assign(settings, input);
  return { ok: true, settings: { ...settings } };
}
