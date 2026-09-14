import { z } from "zod";

export const classFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  department: z.string().min(1, "Department is required"),
  teacher: z.string().min(2, "Teacher is required"),
  schedule: z.string().min(2, "Schedule is required"),
});

export type ClassFormSchema = z.infer<typeof classFormSchema>;
