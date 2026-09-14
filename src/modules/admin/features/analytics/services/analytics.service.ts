import "server-only";

import type { AnalyticsOverview } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getAnalyticsOverview(): Promise<AnalyticsOverview> {
  await delay();

  return {
    metrics: [
      { label: "Course completion rate", value: "78%", hint: "+4% vs last semester" },
      { label: "Average quiz score", value: "74%", hint: "Across all courses" },
      { label: "Avg. session length", value: "22 min", hint: "Per active user" },
      { label: "Support tickets", value: "12", hint: "Open this week" },
    ],
    enrollmentByDepartment: [
      { label: "CSC", value: 480 },
      { label: "ACC", value: 310 },
      { label: "GST", value: 620 },
      { label: "ENG", value: 210 },
    ],
    weeklyActiveUsers: [
      { label: "Mon", value: 920 },
      { label: "Tue", value: 1040 },
      { label: "Wed", value: 980 },
      { label: "Thu", value: 1120 },
      { label: "Fri", value: 860 },
    ],
  };
}
