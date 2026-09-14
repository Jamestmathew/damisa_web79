import type { Metadata } from "next";

import { PageHeader } from "@/shared/components";
import { getClasses, ClassesManager } from "@/modules/admin/features/classes";
import { getDepartments } from "@/modules/admin/features/departments";

export const metadata: Metadata = { title: "Classes" };

export default async function ClassesPage() {
  const [classes, departments] = await Promise.all([getClasses(), getDepartments()]);

  return (
    <div>
      <PageHeader title="Class Management" description="Manage class sections and schedules" />
      <ClassesManager classes={classes} departmentNames={departments.map((d) => d.name)} />
    </div>
  );
}
