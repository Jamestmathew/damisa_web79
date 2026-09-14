import "server-only";

import type { AttendanceSession } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const sessions: Record<string, AttendanceSession> = {
  crs_101: {
    courseId: "crs_101",
    courseCode: "CSC 301",
    date: "Today",
    students: [
      { studentId: "std_1", studentName: "Chidinma Okoro", mark: "present" },
      { studentId: "std_2", studentName: "Amina Yusuf", mark: "present" },
    ],
  },
  crs_102: {
    courseId: "crs_102",
    courseCode: "CSC 305",
    date: "Today",
    students: [
      { studentId: "std_3", studentName: "Emeka Nwosu", mark: "present" },
      { studentId: "std_4", studentName: "Tunde Bakare", mark: "absent" },
    ],
  },
};

export async function getAttendanceSession(courseId: string): Promise<AttendanceSession | null> {
  await delay();
  return sessions[courseId] ?? null;
}

export async function saveAttendance(
  courseId: string,
  marks: Record<string, AttendanceSession["students"][number]["mark"]>
): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const session = sessions[courseId];
  if (!session) return { ok: false, error: "Session not found." };

  session.students = session.students.map((student) => ({
    ...student,
    mark: marks[student.studentId] ?? student.mark,
  }));

  return { ok: true };
}
