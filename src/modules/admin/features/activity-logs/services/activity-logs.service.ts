import "server-only";

import type { ActivityLogEntry } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const logs: ActivityLogEntry[] = [
  { id: "log_1", actor: "Dr. A. Bello", action: "published a new lesson in", target: "CSC 301", category: "academic", occurredAt: "10m ago" },
  { id: "log_2", actor: "Ngozi Adeyemi", action: "approved admission for", target: "Tunde Bakare", category: "user", occurredAt: "1h ago" },
  { id: "log_3", actor: "System", action: "processed a payment from", target: "Chidinma Okoro", category: "finance", occurredAt: "2h ago" },
  { id: "log_4", actor: "Ngozi Adeyemi", action: "deactivated the account for", target: "Kelechi Eze", category: "user", occurredAt: "1d ago" },
  { id: "log_5", actor: "System", action: "ran the weekly attendance compliance report for", target: "All Departments", category: "system", occurredAt: "2d ago" },
  { id: "log_6", actor: "Ngozi Adeyemi", action: "created a new department:", target: "Accounting", category: "academic", occurredAt: "3d ago" },
];

export async function getActivityLogs(): Promise<ActivityLogEntry[]> {
  await delay();
  return [...logs];
}
