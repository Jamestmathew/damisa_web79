import { z } from "zod";

const questionSchema = z.object({
  prompt: z.string().min(3, "Question is required"),
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .min(2, "At least 2 options required")
    .max(6, "At most 6 options"),
  correctOptionIndex: z.coerce.number().int().min(0),
});

export const quizFormSchema = z.object({
  courseId: z.string().min(1, "Course is required"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  durationMinutes: z.coerce.number().int().min(1, "Must be at least 1 minute"),
  questions: z.array(questionSchema).min(1, "Add at least one question"),
});

export type QuizFormSchema = z.infer<typeof quizFormSchema>;
