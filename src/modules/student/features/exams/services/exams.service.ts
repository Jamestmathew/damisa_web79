import "server-only";

import type { ExamSummary } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MOCK_EXAMS: ExamSummary[] = [
  {
    id: "exam_1",
    courseId: "crs_103",
    courseTitle: "GST 205 · Technical Writing",
    title: "Mid-Semester Exam",
    date: "Aug 7, 2026",
    time: "10:00 AM",
    venue: "LT2",
    durationMinutes: 90,
    status: "upcoming",
  },
  {
    id: "exam_2",
    courseId: "crs_101",
    courseTitle: "CSC 301 · Data Structures & Algorithms",
    title: "Final Examination",
    date: "Aug 20, 2026",
    time: "9:00 AM",
    venue: "Main Hall",
    durationMinutes: 120,
    status: "upcoming",
  },
  {
    id: "exam_3",
    courseId: "crs_104",
    courseTitle: "CSC 307 · Operating Systems",
    title: "Mid-Semester Exam",
    date: "Jul 15, 2026",
    time: "2:00 PM",
    venue: "LT1",
    durationMinutes: 90,
    status: "completed",
  },
];

export async function getExams(): Promise<ExamSummary[]> {
  await delay();
  return MOCK_EXAMS;
}
