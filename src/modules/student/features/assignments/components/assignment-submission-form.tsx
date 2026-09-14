"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton, FormStatusMessage } from "@/modules/auth/components/ui";

import { submitAssignmentAction } from "../actions/submit-assignment.action";
import {
  assignmentSubmissionSchema,
  type AssignmentSubmissionSchema,
} from "../validation/submission.schema";
import type { AssignmentActionResult } from "../types";

interface AssignmentSubmissionFormProps {
  assignmentId: string;
  existingSubmission: string | null;
}

export function AssignmentSubmissionForm({
  assignmentId,
  existingSubmission,
}: AssignmentSubmissionFormProps) {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<AssignmentActionResult | null>(null);

  const form = useForm<AssignmentSubmissionSchema>({
    resolver: zodResolver(assignmentSubmissionSchema),
    defaultValues: { assignmentId, submissionText: existingSubmission ?? "" },
  });

  function onSubmit(values: AssignmentSubmissionSchema) {
    setState(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.set("assignmentId", values.assignmentId);
      formData.set("submissionText", values.submissionText);

      const result = await submitAssignmentAction(null, formData);
      setState(result);

      if (!result.ok && result.fieldErrors?.submissionText) {
        form.setError("submissionText", { message: result.fieldErrors.submissionText });
      }
    });
  }

  return (
    <Form {...form}>
      {state ? (
        <FormStatusMessage
          variant={state.ok ? "success" : "error"}
          message={state.ok ? state.message : state.error}
        />
      ) : null}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField
          control={form.control}
          name="submissionText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your submission</FormLabel>
              <FormControl>
                <Textarea rows={8} placeholder="Write or paste your submission here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton type="submit" isLoading={isPending} loadingText="Submitting...">
          {existingSubmission ? "Update submission" : "Submit assignment"}
        </LoadingButton>
      </form>
    </Form>
  );
}
