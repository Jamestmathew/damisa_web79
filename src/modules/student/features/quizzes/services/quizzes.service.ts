import "server-only";

import type { QuizDetails, QuizSummary } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MOCK_QUIZZES: QuizDetails[] = [
  {
    id: "quiz_1",
    courseId: "crs_101",
    courseTitle: "CSC 301 · Data Structures & Algorithms",
    title: "Trees & BSTs Quiz",
    questionCount: 3,
    durationMinutes: 15,
    dueAt: "In 3 days",
    status: "not_started",
    bestScorePercent: null,
    questions: [
      {
        id: "q1",
        prompt: "What is the time complexity of searching in a balanced binary search tree?",
        options: [
          { id: "a", label: "O(1)" },
          { id: "b", label: "O(log n)" },
          { id: "c", label: "O(n)" },
          { id: "d", label: "O(n log n)" },
        ],
      },
      {
        id: "q2",
        prompt: "Which traversal visits nodes in ascending order for a BST?",
        options: [
          { id: "a", label: "Pre-order" },
          { id: "b", label: "Post-order" },
          { id: "c", label: "In-order" },
          { id: "d", label: "Level-order" },
        ],
      },
      {
        id: "q3",
        prompt: "What causes a binary search tree to become unbalanced?",
        options: [
          { id: "a", label: "Random insertion order" },
          { id: "b", label: "Sequential insertion order" },
          { id: "c", label: "Frequent lookups" },
          { id: "d", label: "Using integer keys" },
        ],
      },
    ],
  },
  {
    id: "quiz_2",
    courseId: "crs_102",
    courseTitle: "CSC 305 · Database Management Systems",
    title: "Normalization Quiz",
    questionCount: 2,
    durationMinutes: 10,
    dueAt: "In 5 days",
    status: "completed",
    bestScorePercent: 85,
    questions: [
      {
        id: "q1",
        prompt: "Which normal form eliminates transitive dependencies?",
        options: [
          { id: "a", label: "1NF" },
          { id: "b", label: "2NF" },
          { id: "c", label: "3NF" },
          { id: "d", label: "BCNF" },
        ],
      },
      {
        id: "q2",
        prompt: "A table is in 1NF when...",
        options: [
          { id: "a", label: "It has a primary key" },
          { id: "b", label: "All columns contain atomic values" },
          { id: "c", label: "It has no foreign keys" },
          { id: "d", label: "It is fully normalized" },
        ],
      },
    ],
  },
];

export async function getQuizzes(): Promise<QuizSummary[]> {
  await delay();
  return MOCK_QUIZZES.map(({ questions, ...summary }) => summary);
}

export async function getQuizById(quizId: string): Promise<QuizDetails | null> {
  await delay();
  return MOCK_QUIZZES.find((quiz) => quiz.id === quizId) ?? null;
}

export async function submitQuizAttempt(
  quizId: string,
  answers: Record<string, string>
): Promise<{ ok: true; scorePercent: number; correctCount: number; totalCount: number } | { ok: false; error: string }> {
  await delay();
  const quiz = MOCK_QUIZZES.find((q) => q.id === quizId);

  if (!quiz) {
    return { ok: false, error: "Quiz not found." };
  }

  // Mock grading: option "b" or "c" counts as correct for demo purposes,
  // since there's no real answer key in the mock data set.
  const totalCount = quiz.questions.length;
  const correctCount = Object.values(answers).filter((choice) => choice === "b" || choice === "c").length;
  const scorePercent = Math.round((correctCount / totalCount) * 100);

  quiz.status = "completed";
  quiz.bestScorePercent = Math.max(quiz.bestScorePercent ?? 0, scorePercent);

  return { ok: true, scorePercent, correctCount, totalCount };
}
