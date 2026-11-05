import { DataBarChart } from "@/shared/charts/bar-chart";
import type { Metadata } from "next";

import { requireAuth } from "@/modules/auth/lib/route-guard";
import {
  getSuperAdminDashboardData,
  SuperAdminStatsGrid,
} from "@/modules/super-admin/features/dashboard";
import {
  getOffices,
  OfficesOverviewTable,
} from "@/modules/super-admin/features/offices";
import { PageHeader } from "@/shared/components";

export const metadata: Metadata = { title: "Super Admin Dashboard" };

export default async function SuperAdminDashboardPage() {
  const session = await requireAuth();
  const [data, offices] = await Promise.all([
    getSuperAdminDashboardData(session.name),
    getOffices(),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${data.founderFirstName}`}
        description="Platform-wide oversight"
      />
      <SuperAdminStatsGrid stats={data.stats} />
      <div className="grid gap-6 lg:grid-cols-2">
        <DataBarChart
          title="Students by office"
          description="Current student accounts, up to eight offices"
          points={[...offices]
            .sort((a, b) => b.totalStudents - a.totalStudents)
            .map((o) => ({ label: o.name, value: o.totalStudents }))}
        />
        <DataBarChart
          title="Recorded income by office"
          description="Confirmed manual income, top eight offices"
          format="naira"
          tone="orange"
          points={[...offices]
            .sort((a, b) => b.totalRevenueNaira - a.totalRevenueNaira)
            .map((o) => ({ label: o.name, value: o.totalRevenueNaira }))}
        />
      </div>
      <div>
        <h2 className="mb-3 text-base font-semibold text-foreground">
          Offices
        </h2>
        <OfficesOverviewTable offices={offices} />
      </div>
    </div>
  );
}
