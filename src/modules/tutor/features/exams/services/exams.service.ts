import "server-only";

import { getTutorCourseById } from "@/modules/tutor/features/courses/services/courses.service";
import type { TutorExam } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId() {
  return `exam_${Math.random().toString(36).slice(2, 9)}`;
}

const exams: TutorExam[] = [
  { id: "exam_1", courseId: "crs_101", courseCode: "CSC 301", title: "Final Examination", date: "Aug 20, 2026", time: "9:00 AM", venue: "Main Hall", durationMinutes: 120 },
];

export async function getTutorExams(): Promise<TutorExam[]> {
  await delay();
  return [...exams];
}

export async function scheduleExam(input: {
  courseId: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  durationMinutes: number;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const course = await getTutorCourseById(input.courseId);

  exams.push({
    id: generateId(),
    courseId: input.courseId,
    courseCode: course?.code ?? input.courseId,
    title: input.title,
    date: input.date,
    time: input.time,
    venue: input.venue,
    durationMinutes: input.durationMinutes,
  });

  return { ok: true };
}

export async function deleteExam(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const index = exams.findIndex((e) => e.id === id);
  if (index === -1) return { ok: false, error: "Exam not found." };

  exams.splice(index, 1);
  return { ok: true };
}
