import "server-only";

import type { LessonDetails } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Mock lookup. Real implementation would fetch by (courseId, lessonId) from
 * the backend; this generates a plausible lesson so every module/lesson
 * link produced by CourseModulesList resolves to a working page.
 */
export async function getLessonById(courseId: string, lessonId: string): Promise<LessonDetails> {
  await delay();

  return {
    id: lessonId,
    moduleId: lessonId.replace(/-lesson-\d+$/, ""),
    courseId,
    courseTitle: "Course",
    title: "Introduction & Overview",
    contentType: "video",
    durationMinutes: 12,
    completed: false,
    body: "This lesson introduces the core concepts covered in this module, building on what you've learned so far and setting up the problems you'll solve in the following lessons.",
    nextLessonId: null,
    previousLessonId: null,
  };
}
