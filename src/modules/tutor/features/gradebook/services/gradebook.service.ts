import "server-only";

import type { GradebookRow } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function letterFor(percent: number) {
  if (percent >= 85) return "A";
  if (percent >= 70) return "B";
  if (percent >= 60) return "C";
  if (percent >= 50) return "D";
  return "F";
}

const rows: GradebookRow[] = [
  { id: "gb_1", studentName: "Chidinma Okoro", courseCode: "CSC 301", assignmentAvg: 90, quizAvg: 78, examScore: null, overallPercent: 84, letterGrade: letterFor(84) },
  { id: "gb_2", studentName: "Amina Yusuf", courseCode: "CSC 301", assignmentAvg: 74, quizAvg: 70, examScore: null, overallPercent: 72, letterGrade: letterFor(72) },
  { id: "gb_3", studentName: "Emeka Nwosu", courseCode: "CSC 305", assignmentAvg: 86, quizAvg: 82, examScore: null, overallPercent: 84, letterGrade: letterFor(84) },
  { id: "gb_4", studentName: "Tunde Bakare", courseCode: "CSC 305", assignmentAvg: 65, quizAvg: 60, examScore: null, overallPercent: 63, letterGrade: letterFor(63) },
];

export async function getGradebookRows(): Promise<GradebookRow[]> {
  await delay();
  return [...rows];
}

export async function overrideOverallGrade(
  id: string,
  overallPercent: number
): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const row = rows.find((r) => r.id === id);
  if (!row) return { ok: false, error: "Record not found." };

  row.overallPercent = overallPercent;
  row.letterGrade = letterFor(overallPercent);
  return { ok: true };
}
