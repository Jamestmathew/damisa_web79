import "server-only";

import type { CoursePerformanceReport } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const reports: CoursePerformanceReport[] = [
  { courseId: "crs_101", courseCode: "CSC 301", courseTitle: "Data Structures & Algorithms", averageGrade: 81, averageAttendance: 92, completionPercent: 72 },
  { courseId: "crs_102", courseCode: "CSC 305", courseTitle: "Database Management Systems", averageGrade: 76, averageAttendance: 87, completionPercent: 48 },
];

export async function getTutorReports(): Promise<CoursePerformanceReport[]> {
  await delay();
  return [...reports];
}
