import "server-only";

import { getTutorCourseById } from "@/modules/tutor/features/courses/services/courses.service";
import type { QuizFormSchema } from "../validation/quiz-form.schema";
import type { TutorQuiz } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

const quizzes: TutorQuiz[] = [
  {
    id: "quiz_1",
    courseId: "crs_101",
    courseCode: "CSC 301",
    title: "Trees & BSTs Quiz",
    durationMinutes: 15,
    attemptCount: 52,
    averageScorePercent: 78,
    questions: [
      {
        id: "q1",
        prompt: "What is the time complexity of searching in a balanced BST?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctOptionIndex: 1,
      },
    ],
  },
];

export async function getTutorQuizzes(): Promise<TutorQuiz[]> {
  await delay();
  return [...quizzes];
}

export async function getTutorQuizById(id: string): Promise<TutorQuiz | null> {
  await delay();
  return quizzes.find((q) => q.id === id) ?? null;
}

export async function createQuiz(
  input: QuizFormSchema
): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const course = await getTutorCourseById(input.courseId);

  quizzes.push({
    id: generateId("quiz"),
    courseId: input.courseId,
    courseCode: course?.code ?? input.courseId,
    title: input.title,
    durationMinutes: input.durationMinutes,
    attemptCount: 0,
    averageScorePercent: null,
    questions: input.questions.map((q, i) => ({
      id: `q${i + 1}`,
      prompt: q.prompt,
      options: q.options,
      correctOptionIndex: q.correctOptionIndex,
    })),
  });

  return { ok: true };
}

export async function deleteQuiz(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const index = quizzes.findIndex((q) => q.id === id);
  if (index === -1) return { ok: false, error: "Quiz not found." };

  quizzes.splice(index, 1);
  return { ok: true };
}
