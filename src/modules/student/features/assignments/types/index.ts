import type { SubmissionStatus } from "@/modules/student/shared/types";

export interface AssignmentSummary {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  dueAt: string;
  maxScore: number;
  status: SubmissionStatus;
}

export interface AssignmentDetails extends AssignmentSummary {
  instructions: string;
  submissionText: string | null;
  submittedAt: string | null;
  score: number | null;
  feedback: string | null;
}

export type AssignmentActionResult =
  | { ok: true; message: string }
  | { ok: false; error: string; fieldErrors?: Partial<Record<string, string>> };
