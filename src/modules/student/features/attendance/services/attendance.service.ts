import "server-only";

import type { AttendanceOverview } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MOCK_ATTENDANCE: AttendanceOverview = {
  summary: {
    presentPercent: 94,
    totalSessions: 32,
    presentCount: 30,
    absentCount: 1,
    lateCount: 1,
  },
  records: [
    { id: "att_1", date: "Jul 28, 2026", courseTitle: "Data Structures & Algorithms", courseCode: "CSC 301", mark: "present" },
    { id: "att_2", date: "Jul 28, 2026", courseTitle: "Database Management Systems", courseCode: "CSC 305", mark: "present" },
    { id: "att_3", date: "Jul 27, 2026", courseTitle: "Operating Systems", courseCode: "CSC 307", mark: "late" },
    { id: "att_4", date: "Jul 26, 2026", courseTitle: "Technical Writing", courseCode: "GST 205", mark: "present" },
    { id: "att_5", date: "Jul 24, 2026", courseTitle: "Data Structures & Algorithms", courseCode: "CSC 301", mark: "absent" },
  ],
};

export async function getAttendanceOverview(): Promise<AttendanceOverview> {
  await delay();
  return MOCK_ATTENDANCE;
}
