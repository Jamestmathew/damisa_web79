import "server-only";

import { getTutorCourseById } from "@/modules/tutor/features/courses/services/courses.service";
import type { TutorAnnouncement } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId() {
  return `tan_${Math.random().toString(36).slice(2, 9)}`;
}

const announcements: TutorAnnouncement[] = [
  { id: "tan_1", courseId: "crs_101", courseCode: "CSC 301", title: "Class moved to LT2 this week", body: "Lectures will hold in LT2 instead of the usual venue.", postedAt: "2h ago" },
];

export async function getTutorAnnouncements(): Promise<TutorAnnouncement[]> {
  await delay();
  return [...announcements].reverse();
}

export async function createTutorAnnouncement(input: {
  courseId: string;
  title: string;
  body: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const course = await getTutorCourseById(input.courseId);

  announcements.push({
    id: generateId(),
    courseId: input.courseId,
    courseCode: course?.code ?? input.courseId,
    title: input.title,
    body: input.body,
    postedAt: "Just now",
  });

  return { ok: true };
}

export async function deleteTutorAnnouncement(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const index = announcements.findIndex((a) => a.id === id);
  if (index === -1) return { ok: false, error: "Announcement not found." };

  announcements.splice(index, 1);
  return { ok: true };
}
