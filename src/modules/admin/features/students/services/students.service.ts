import "server-only";

import { authService } from "@/modules/auth/services";
import type { AdminStudent, AdminStudentProfile } from "../types";

function delay(ms = 100) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Academic-domain fields (program/level/enrolledAt) aren't part of Auth's
 * account record — they're enriched here, keyed by email, until a real
 * students table exists in the Supabase backend. The account itself
 * (id/name/email/status) always comes from `authService`, so an
 * activate/deactivate here is the same account Users manages — no
 * separate store to fall out of sync.
 */
const ACADEMIC_PROFILE_BY_EMAIL: Record<string, { program: string; level: string; enrolledAt: string }> = {
  "c.okoro@student.school.edu": { program: "B.Sc Computer Science", level: "200", enrolledAt: "Sep 2025" },
  "t.bakare@student.school.edu": { program: "B.Sc Accounting", level: "300", enrolledAt: "Sep 2024" },
  "a.yusuf@student.school.edu": { program: "B.Eng Civil Engineering", level: "100", enrolledAt: "Sep 2025" },
  "e.nwosu@student.school.edu": { program: "B.Sc Computer Science", level: "400", enrolledAt: "Sep 2022" },
};

function defaultProfile() {
  return { program: "Unassigned", level: "—", enrolledAt: "—" };
}

export async function getStudents(): Promise<AdminStudent[]> {
  await delay();
  const users = await authService.listUsers();

  return users
    .filter((user) => user.role === "student")
    .map((user) => {
      const profile = ACADEMIC_PROFILE_BY_EMAIL[user.email.toLowerCase()] ?? defaultProfile();
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        program: profile.program,
        level: profile.level,
        status: user.status,
        enrolledAt: profile.enrolledAt,
      };
    });
}

export async function setStudentStatus(
  id: string,
  status: AdminStudent["status"]
): Promise<{ ok: true } | { ok: false; error: string }> {
  const result = await authService.setUserStatus(id, status);
  return result.ok ? { ok: true } : { ok: false, error: result.error };
}

const ENROLLMENTS_BY_EMAIL: Record<string, { courseCode: string; courseTitle: string; progressPercent: number; grade: string }[]> = {
  "c.okoro@student.school.edu": [
    { courseCode: "CSC 301", courseTitle: "Data Structures & Algorithms", progressPercent: 72, grade: "A" },
    { courseCode: "CSC 305", courseTitle: "Database Management Systems", progressPercent: 48, grade: "B+" },
  ],
  "t.bakare@student.school.edu": [
    { courseCode: "ACC 201", courseTitle: "Financial Accounting", progressPercent: 55, grade: "B" },
  ],
  "a.yusuf@student.school.edu": [
    { courseCode: "CIV 101", courseTitle: "Engineering Mechanics", progressPercent: 30, grade: "B-" },
  ],
  "e.nwosu@student.school.edu": [
    { courseCode: "CSC 307", courseTitle: "Operating Systems", progressPercent: 90, grade: "A" },
  ],
};

export async function getStudentProfile(id: string): Promise<AdminStudentProfile | null> {
  await delay();
  const students = await getStudents();
  const student = students.find((s) => s.id === id);

  if (!student) return null;

  const enrollments = ENROLLMENTS_BY_EMAIL[student.email.toLowerCase()] ?? [];
  const gradePoints: Record<string, number> = { A: 4, "A-": 3.7, "B+": 3.3, B: 3, "B-": 2.7, C: 2 };
  const gpa =
    enrollments.length === 0
      ? 0
      : enrollments.reduce((sum, e) => sum + (gradePoints[e.grade] ?? 3), 0) / enrollments.length;

  return {
    ...student,
    phone: null,
    enrollments,
    academicSummary: {
      gpa: Math.round(gpa * 100) / 100,
      creditsCompleted: enrollments.length * 3,
      creditsRequired: 120,
    },
  };
}
