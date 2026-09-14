import "server-only";

import type { ProgressOverview } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MOCK_PROGRESS: ProgressOverview = {
  overallPercent: 60,
  courses: [
    { courseId: "crs_101", courseTitle: "Data Structures & Algorithms", courseCode: "CSC 301", progressPercent: 72, lessonsCompleted: 11, lessonsTotal: 16 },
    { courseId: "crs_102", courseTitle: "Database Management Systems", courseCode: "CSC 305", progressPercent: 48, lessonsCompleted: 6, lessonsTotal: 14 },
    { courseId: "crs_103", courseTitle: "Technical Writing", courseCode: "GST 205", progressPercent: 90, lessonsCompleted: 9, lessonsTotal: 10 },
    { courseId: "crs_104", courseTitle: "Operating Systems", courseCode: "CSC 307", progressPercent: 30, lessonsCompleted: 3, lessonsTotal: 9 },
  ],
  skills: [
    { skill: "Problem Solving", progressPercent: 78 },
    { skill: "Database Design", progressPercent: 52 },
    { skill: "Written Communication", progressPercent: 88 },
    { skill: "Systems Thinking", progressPercent: 35 },
  ],
};

export async function getProgressOverview(): Promise<ProgressOverview> {
  await delay();
  return MOCK_PROGRESS;
}
