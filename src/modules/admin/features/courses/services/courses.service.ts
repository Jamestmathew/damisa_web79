import "server-only";

import type { AdminCourse } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const courses: AdminCourse[] = [
  { id: "crs_101", title: "Data Structures & Algorithms", code: "CSC 301", department: "Computer Science", instructor: "Dr. A. Bello", enrolledCount: 84, status: "published" },
  { id: "crs_102", title: "Database Management Systems", code: "CSC 305", department: "Computer Science", instructor: "Dr. F. Yusuf", enrolledCount: 76, status: "published" },
  { id: "crs_103", title: "Technical Writing", code: "GST 205", department: "General Studies", instructor: "Mrs. C. Okafor", enrolledCount: 210, status: "published" },
  { id: "crs_104", title: "Operating Systems", code: "CSC 307", department: "Computer Science", instructor: "Dr. M. Suleiman", enrolledCount: 68, status: "draft" },
  { id: "crs_105", title: "Advanced Networking", code: "CSC 401", department: "Computer Science", instructor: "Dr. A. Bello", enrolledCount: 0, status: "draft" },
];

export async function getCourses(): Promise<AdminCourse[]> {
  await delay();
  return [...courses];
}

export async function setCourseStatus(
  id: string,
  status: AdminCourse["status"]
): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const course = courses.find((c) => c.id === id);

  if (!course) return { ok: false, error: "Course not found." };

  course.status = status;
  return { ok: true };
}
