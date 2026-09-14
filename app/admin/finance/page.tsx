import type { Metadata } from "next";

import { PageHeader } from "@/shared/components";
import { getPayments, FinanceManager } from "@/modules/admin/features/finance";

export const metadata: Metadata = { title: "Finance" };

export default async function FinancePage() {
  const payments = await getPayments();

  return (
    <div>
      <PageHeader title="Finance" description="Track, verify, and record student payments" />
      <FinanceManager payments={payments} />
    </div>
  );
}
