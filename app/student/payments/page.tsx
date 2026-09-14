import type { Metadata } from "next";

import { PageHeader } from "@/shared/components";
import { getStudentPayments, StudentPaymentsTable } from "@/modules/student/features/payments";

export const metadata: Metadata = { title: "Payments" };

export default async function StudentPaymentsPage() {
  const payments = await getStudentPayments();

  return (
    <div>
      <PageHeader title="Payments" description="Your payment history and status" />
      <StudentPaymentsTable payments={payments} />
    </div>
  );
}
