import { z } from "zod";

export const assignmentSubmissionSchema = z.object({
  assignmentId: z.string().min(1),
  submissionText: z
    .string()
    .min(20, "Your submission should be at least 20 characters")
    .max(10000, "Your submission is too long"),
});

export type AssignmentSubmissionSchema = z.infer<typeof assignmentSubmissionSchema>;
