"use server";

import { revalidatePath } from "next/cache";

import { STUDENT_ROUTES } from "@/modules/student/shared/constants";
import { assignmentSubmissionSchema } from "../validation/submission.schema";
import { submitAssignmentAnswer } from "../services/assignments.service";
import type { AssignmentActionResult } from "../types";

export async function submitAssignmentAction(
  _prevState: AssignmentActionResult | null,
  formData: FormData
): Promise<AssignmentActionResult> {
  try {
    const parsed = assignmentSubmissionSchema.safeParse({
      assignmentId: formData.get("assignmentId"),
      submissionText: formData.get("submissionText"),
    });

    if (!parsed.success) {
      return {
        ok: false,
        error: "Please fix the errors below",
        fieldErrors: {
          submissionText: parsed.error.flatten().fieldErrors.submissionText?.[0],
        },
      };
    }

    const result = await submitAssignmentAnswer(parsed.data.assignmentId, parsed.data.submissionText);

    if (!result.ok) {
      return { ok: false, error: result.error };
    }

    revalidatePath(STUDENT_ROUTES.assignmentDetails(parsed.data.assignmentId));

    return { ok: true, message: "Your submission has been recorded." };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
