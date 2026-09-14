import "server-only";

import type { GradesOverview } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MOCK_GRADES: GradesOverview = {
  gpa: 3.72,
  courseSummaries: [
    { courseId: "crs_101", courseTitle: "Data Structures & Algorithms", courseCode: "CSC 301", currentPercent: 88, letterGrade: "A" },
    { courseId: "crs_102", courseTitle: "Database Management Systems", courseCode: "CSC 305", currentPercent: 79, letterGrade: "B+" },
    { courseId: "crs_103", courseTitle: "Technical Writing", courseCode: "GST 205", currentPercent: 94, letterGrade: "A" },
    { courseId: "crs_104", courseTitle: "Operating Systems", courseCode: "CSC 307", currentPercent: 71, letterGrade: "B" },
  ],
  rows: [
    { id: "row_1", courseTitle: "Data Structures & Algorithms", courseCode: "CSC 301", assessment: "Quiz 3", score: 18, maxScore: 20, weightPercent: 10 },
    { id: "row_2", courseTitle: "Data Structures & Algorithms", courseCode: "CSC 301", assessment: "Assignment 1", score: 27, maxScore: 30, weightPercent: 15 },
    { id: "row_3", courseTitle: "Database Management Systems", courseCode: "CSC 305", assessment: "Assignment 2", score: 27, maxScore: 30, weightPercent: 15 },
    { id: "row_4", courseTitle: "Technical Writing", courseCode: "GST 205", assessment: "Essay Draft 1", score: 19, maxScore: 20, weightPercent: 20 },
    { id: "row_5", courseTitle: "Operating Systems", courseCode: "CSC 307", assessment: "Process Report", score: 14, maxScore: 20, weightPercent: 15 },
  ],
};

export async function getGradesOverview(): Promise<GradesOverview> {
  await delay();
  return MOCK_GRADES;
}
