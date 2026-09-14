import "server-only";

import type { TutorLesson } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId() {
  return `lsn_${Math.random().toString(36).slice(2, 9)}`;
}

const lessons: TutorLesson[] = [
  { id: "lsn_1", courseId: "crs_101", moduleTitle: "Arrays & Linked Lists", title: "Introduction to Arrays", contentType: "video", durationMinutes: 12, body: "Overview of array data structures and their memory layout.", published: true },
  { id: "lsn_2", courseId: "crs_101", moduleTitle: "Arrays & Linked Lists", title: "Singly Linked Lists", contentType: "reading", durationMinutes: 15, body: "Nodes, pointers, and common operations on singly linked lists.", published: true },
  { id: "lsn_3", courseId: "crs_101", moduleTitle: "Trees & Binary Search Trees", title: "BST Traversal Methods", contentType: "video", durationMinutes: 18, body: "In-order, pre-order, and post-order traversal walkthrough.", published: false },
];

export async function getLessonsByCourse(courseId: string): Promise<TutorLesson[]> {
  await delay();
  return lessons.filter((l) => l.courseId === courseId);
}

export async function getLessonById(lessonId: string): Promise<TutorLesson | null> {
  await delay();
  return lessons.find((l) => l.id === lessonId) ?? null;
}

export async function createLesson(input: {
  courseId: string;
  title: string;
  contentType: TutorLesson["contentType"];
  durationMinutes: number;
  body: string;
}): Promise<{ ok: true; lesson: TutorLesson } | { ok: false; error: string }> {
  await delay();

  const lesson: TutorLesson = {
    id: generateId(),
    courseId: input.courseId,
    moduleTitle: "Unassigned",
    title: input.title,
    contentType: input.contentType,
    durationMinutes: input.durationMinutes,
    body: input.body,
    published: false,
  };
  lessons.push(lesson);

  return { ok: true, lesson };
}

export async function updateLesson(
  id: string,
  input: { title: string; contentType: TutorLesson["contentType"]; durationMinutes: number; body: string }
): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const lesson = lessons.find((l) => l.id === id);

  if (!lesson) return { ok: false, error: "Lesson not found." };

  lesson.title = input.title;
  lesson.contentType = input.contentType;
  lesson.durationMinutes = input.durationMinutes;
  lesson.body = input.body;

  return { ok: true };
}

export async function deleteLesson(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const index = lessons.findIndex((l) => l.id === id);

  if (index === -1) return { ok: false, error: "Lesson not found." };

  lessons.splice(index, 1);
  return { ok: true };
}
