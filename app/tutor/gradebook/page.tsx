import type { Metadata } from "next";

import { PageHeader } from "@/shared/components";
import { getGradebookRows, GradebookTable } from "@/modules/tutor/features/gradebook";

export const metadata: Metadata = { title: "Gradebook" };

export default async function GradebookPage() {
  const rows = await getGradebookRows();

  return (
    <div>
      <PageHeader title="Gradebook" description="Overall grades across your students" />
      <GradebookTable rows={rows} />
    </div>
  );
}
