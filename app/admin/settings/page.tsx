import type { Metadata } from "next";

import { PageHeader } from "@/shared/components";
import { getSystemSettings, SystemSettingsForm } from "@/modules/admin/features/settings";

export const metadata: Metadata = { title: "Settings" };

export default async function AdminSettingsPage() {
  const settings = await getSystemSettings();

  return (
    <div className="max-w-2xl">
      <PageHeader title="System Settings" description="Institution-wide configuration" />
      <SystemSettingsForm settings={settings} />
    </div>
  );
}
