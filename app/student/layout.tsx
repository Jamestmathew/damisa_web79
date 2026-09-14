import { requireRole } from "@/shared/rbac";
import { StudentShell } from "@/modules/student/layout";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireRole(["student"]);

  return (
    <StudentShell studentName={session.name} studentEmail={session.email}>
      {children}
    </StudentShell>
  );
}
