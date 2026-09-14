import "server-only";

import type { StudentPayment } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const payments: StudentPayment[] = [
  { id: "pay_1", purpose: "Tuition - Fall 2026", amountNaira: 185000, status: "paid", paidAt: "Jul 2, 2026", reference: "TXN-88213" },
  { id: "pay_2", purpose: "Acceptance Fee", amountNaira: 25000, status: "paid", paidAt: "Sep 1, 2025", reference: "TXN-71042" },
  { id: "pay_3", purpose: "Hostel Fee", amountNaira: 60000, status: "pending", paidAt: null, reference: "TXN-88216" },
];

/** In the real backend this filters by the signed-in student's id. */
export async function getStudentPayments(): Promise<StudentPayment[]> {
  await delay();
  return [...payments];
}
