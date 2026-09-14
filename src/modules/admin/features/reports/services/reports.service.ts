import "server-only";

import type { ReportSummary } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const reports: ReportSummary[] = [
  { id: "rpt_1", title: "Semester Enrollment Report", description: "Enrollment counts by department and program.", category: "academic", generatedAt: "Generated weekly" },
  { id: "rpt_2", title: "Fee Collection Report", description: "Payments collected vs outstanding, by program.", category: "financial", generatedAt: "Generated daily" },
  { id: "rpt_3", title: "Attendance Compliance Report", description: "Classes with attendance rates below 80%.", category: "attendance", generatedAt: "Generated weekly" },
  { id: "rpt_4", title: "Graduation Readiness Report", description: "Final-year students and outstanding requirements.", category: "academic", generatedAt: "Generated monthly" },
];

export async function getReports(): Promise<ReportSummary[]> {
  await delay();
  return [...reports];
}
