import "server-only";

import type { AssignmentDetails, AssignmentSummary } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MOCK_ASSIGNMENTS: AssignmentDetails[] = [
  {
    id: "asg_1",
    courseId: "crs_101",
    courseTitle: "CSC 301 · Data Structures & Algorithms",
    title: "Linked List Implementation",
    dueAt: "2 days ago",
    maxScore: 20,
    status: "graded",
    instructions: "Implement a singly linked list in the language of your choice, supporting insert, delete, and search operations.",
    submissionText: "Submitted a full implementation with unit tests covering edge cases.",
    submittedAt: "3 days ago",
    score: 18,
    feedback: "Solid implementation. Consider handling the empty-list edge case more explicitly.",
  },
  {
    id: "asg_2",
    courseId: "crs_102",
    courseTitle: "CSC 305 · Database Management Systems",
    title: "ER Diagram Submission",
    dueAt: "Tomorrow, 11:59 PM",
    maxScore: 15,
    status: "submitted",
    instructions: "Design an ER diagram for a library management system, including at least 5 entities and their relationships.",
    submissionText: "Attached ER diagram covering Members, Books, Loans, Staff, and Branches.",
    submittedAt: "Today",
    score: null,
    feedback: null,
  },
  {
    id: "asg_3",
    courseId: "crs_103",
    courseTitle: "GST 205 · Technical Writing",
    title: "Essay Draft 2",
    dueAt: "In 4 days",
    maxScore: 10,
    status: "not_submitted",
    instructions: "Revise your first draft based on peer feedback and submit a polished second draft (800-1000 words).",
    submissionText: null,
    submittedAt: null,
    score: null,
    feedback: null,
  },
  {
    id: "asg_4",
    courseId: "crs_104",
    courseTitle: "CSC 307 · Operating Systems",
    title: "Process Scheduling Report",
    dueAt: "3 days ago",
    maxScore: 20,
    status: "missed",
    instructions: "Compare FCFS, SJF, and Round Robin scheduling algorithms with worked examples.",
    submissionText: null,
    submittedAt: null,
    score: null,
    feedback: null,
  },
];

export async function getAssignments(): Promise<AssignmentSummary[]> {
  await delay();
  return MOCK_ASSIGNMENTS.map(({ instructions, submissionText, submittedAt, score, feedback, ...summary }) => summary);
}

export async function getAssignmentById(assignmentId: string): Promise<AssignmentDetails | null> {
  await delay();
  return MOCK_ASSIGNMENTS.find((assignment) => assignment.id === assignmentId) ?? null;
}

export async function submitAssignmentAnswer(
  assignmentId: string,
  submissionText: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const assignment = MOCK_ASSIGNMENTS.find((a) => a.id === assignmentId);

  if (!assignment) {
    return { ok: false, error: "Assignment not found." };
  }

  assignment.submissionText = submissionText;
  assignment.submittedAt = "Just now";
  assignment.status = "submitted";

  return { ok: true };
}
