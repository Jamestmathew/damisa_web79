import "server-only";

import { authService } from "@/modules/auth/services";
import type { AdminTeacher } from "../types";

function delay(ms = 100) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Same pattern as Admin's Students service: accounts come from `authService`
 * (single source of truth), academic-domain fields (department, course
 * count) are enriched here by email until a real backend exists.
 */
const ACADEMIC_PROFILE_BY_EMAIL: Record<string, { department: string; coursesAssigned: number }> = {
  "a.bello@school.edu": { department: "Computer Science", coursesAssigned: 2 },
  "f.yusuf@school.edu": { department: "Computer Science", coursesAssigned: 1 },
  "c.okafor@school.edu": { department: "General Studies", coursesAssigned: 3 },
  "m.suleiman@school.edu": { department: "Computer Science", coursesAssigned: 1 },
};

function defaultProfile() {
  return { department: "Unassigned", coursesAssigned: 0 };
}

function formatJoinedAt(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

export async function getTeachers(): Promise<AdminTeacher[]> {
  await delay();
  const users = await authService.listUsers();

  return users
    .filter((user) => user.role === "tutor")
    .map((user) => {
      const profile = ACADEMIC_PROFILE_BY_EMAIL[user.email.toLowerCase()] ?? defaultProfile();
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        department: profile.department,
        coursesAssigned: profile.coursesAssigned,
        status: user.status,
        joinedAt: formatJoinedAt(user.createdAt),
      };
    });
}

export async function setTeacherStatus(
  id: string,
  status: AdminTeacher["status"]
): Promise<{ ok: true } | { ok: false; error: string }> {
  const result = await authService.setUserStatus(id, status);
  return result.ok ? { ok: true } : { ok: false, error: result.error };
}
