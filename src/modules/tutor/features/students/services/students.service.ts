import "server-only";

import type { TutorStudent } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const students: TutorStudent[] = [
  { id: "std_1", name: "Chidinma Okoro", email: "c.okoro@student.school.edu", courseTitle: "Data Structures & Algorithms", courseCode: "CSC 301", progressPercent: 72, averageGrade: 88, attendancePercent: 96 },
  { id: "std_2", name: "Amina Yusuf", email: "a.yusuf@student.school.edu", courseTitle: "Data Structures & Algorithms", courseCode: "CSC 301", progressPercent: 45, averageGrade: 74, attendancePercent: 88 },
  { id: "std_3", name: "Emeka Nwosu", email: "e.nwosu@student.school.edu", courseTitle: "Database Management Systems", courseCode: "CSC 305", progressPercent: 60, averageGrade: 81, attendancePercent: 91 },
  { id: "std_4", name: "Tunde Bakare", email: "t.bakare@student.school.edu", courseTitle: "Database Management Systems", courseCode: "CSC 305", progressPercent: 30, averageGrade: 65, attendancePercent: 79 },
];

/** Tutors can only view their own students — this simulates that filter server-side. */
export async function getTutorStudents(): Promise<TutorStudent[]> {
  await delay();
  return [...students];
}

export async function getTutorStudentById(id: string): Promise<TutorStudent | null> {
  await delay();
  return students.find((s) => s.id === id) ?? null;
}
