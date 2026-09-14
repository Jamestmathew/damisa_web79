import "server-only";

import { getTutorCourseById } from "@/modules/tutor/features/courses/services/courses.service";
import type { AssignmentSubmission, TutorAssignment } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

const assignments: TutorAssignment[] = [
  { id: "asg_1", courseId: "crs_101", courseCode: "CSC 301", title: "Linked List Implementation", dueAt: "2 days ago", maxScore: 20, submittedCount: 78, gradedCount: 78, totalStudents: 84 },
  { id: "asg_2", courseId: "crs_102", courseCode: "CSC 305", title: "ER Diagram Submission", dueAt: "Tomorrow", maxScore: 15, submittedCount: 40, gradedCount: 12, totalStudents: 74 },
];

const submissions: AssignmentSubmission[] = [
  { id: "sub_1", assignmentId: "asg_2", studentName: "Chidinma Okoro", submittedAt: "Today", status: "submitted", score: null, submissionText: "Attached ER diagram covering Members, Books, Loans." },
  { id: "sub_2", assignmentId: "asg_2", studentName: "Amina Yusuf", submittedAt: "Yesterday", status: "graded", score: 13, submissionText: "ER diagram with 5 entities and relationships." },
  { id: "sub_3", assignmentId: "asg_2", studentName: "Tunde Bakare", submittedAt: null, status: "not_submitted", score: null, submissionText: null },
];

export async function getTutorAssignments(): Promise<TutorAssignment[]> {
  await delay();
  return [...assignments];
}

export async function getSubmissionsByAssignment(assignmentId: string): Promise<AssignmentSubmission[]> {
  await delay();
  return submissions.filter((s) => s.assignmentId === assignmentId);
}

export async function createAssignment(input: {
  courseId: string;
  title: string;
  dueAt: string;
  maxScore: number;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const course = await getTutorCourseById(input.courseId);
  assignments.push({
    id: generateId("asg"),
    courseId: input.courseId,
    courseCode: course?.code ?? input.courseId,
    title: input.title,
    dueAt: input.dueAt,
    maxScore: input.maxScore,
    submittedCount: 0,
    gradedCount: 0,
    totalStudents: course?.studentCount ?? 0,
  });
  return { ok: true };
}

export async function updateAssignment(
  id: string,
  input: { title: string; dueAt: string; maxScore: number }
): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const assignment = assignments.find((a) => a.id === id);
  if (!assignment) return { ok: false, error: "Assignment not found." };

  assignment.title = input.title;
  assignment.dueAt = input.dueAt;
  assignment.maxScore = input.maxScore;
  return { ok: true };
}

export async function gradeSubmission(
  submissionId: string,
  score: number
): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const submission = submissions.find((s) => s.id === submissionId);
  if (!submission) return { ok: false, error: "Submission not found." };

  submission.score = score;
  submission.status = "graded";
  return { ok: true };
}
