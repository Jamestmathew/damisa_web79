export interface TutorAssignment {
  id: string;
  courseId: string;
  courseCode: string;
  title: string;
  dueAt: string;
  maxScore: number;
  submittedCount: number;
  gradedCount: number;
  totalStudents: number;
}

export type SubmissionGradeStatus = "not_submitted" | "submitted" | "graded" | "late";

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentName: string;
  submittedAt: string | null;
  status: SubmissionGradeStatus;
  score: number | null;
  submissionText: string | null;
}

export type AssignmentActionResult =
  | { ok: true; message: string }
  | { ok: false; error: string; fieldErrors?: Partial<Record<string, string>> };
