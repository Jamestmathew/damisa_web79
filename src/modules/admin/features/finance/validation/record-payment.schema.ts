import { z } from "zod";

export const recordPaymentSchema = z.object({
  payerName: z.string().min(2, "Payer name must be at least 2 characters"),
  payerEmail: z.string().email("Enter a valid email address"),
  purpose: z.string().min(2, "Purpose is required"),
  amountNaira: z.coerce.number().positive("Amount must be greater than zero"),
  reference: z.string().min(2, "Reference is required"),
});

export type RecordPaymentSchema = z.infer<typeof recordPaymentSchema>;
