import { z } from "zod";

import { strongPasswordSchema } from "@/modules/auth/validation/register.schema";

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Missing reset token"),
    password: strongPasswordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
