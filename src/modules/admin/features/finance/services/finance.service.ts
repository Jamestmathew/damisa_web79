import "server-only";

import type { PaymentRecord } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId() {
  return `pay_${Math.random().toString(36).slice(2, 9)}`;
}

const payments: PaymentRecord[] = [
  { id: "pay_1", payerName: "Chidinma Okoro", payerEmail: "c.okoro@student.school.edu", purpose: "Tuition - Fall 2026", amountNaira: 185000, method: "card", status: "paid", recordedAt: "2h ago", reference: "TXN-88213" },
  { id: "pay_2", payerName: "Tunde Bakare", payerEmail: "t.bakare@student.school.edu", purpose: "Acceptance Fee", amountNaira: 25000, method: "bank_transfer", status: "paid", recordedAt: "5h ago", reference: "TXN-88214" },
  { id: "pay_3", payerName: "Amina Yusuf", payerEmail: "a.yusuf@student.school.edu", purpose: "Tuition - Fall 2026", amountNaira: 185000, method: "bank_transfer", status: "pending", recordedAt: "1d ago", reference: "TXN-88215" },
  { id: "pay_4", payerName: "Emeka Nwosu", payerEmail: "e.nwosu@student.school.edu", purpose: "Hostel Fee", amountNaira: 60000, method: "cash", status: "pending", recordedAt: "2d ago", reference: "TXN-88216" },
];

export async function getPayments(): Promise<PaymentRecord[]> {
  await delay();
  return [...payments];
}

export async function recordManualPayment(input: {
  payerName: string;
  payerEmail: string;
  purpose: string;
  amountNaira: number;
  reference: string;
}): Promise<{ ok: true; payment: PaymentRecord } | { ok: false; error: string }> {
  await delay();

  if (payments.some((p) => p.reference === input.reference)) {
    return { ok: false, error: "A payment with this reference already exists." };
  }

  const payment: PaymentRecord = {
    id: generateId(),
    payerName: input.payerName,
    payerEmail: input.payerEmail,
    purpose: input.purpose,
    amountNaira: input.amountNaira,
    reference: input.reference,
    method: "manual",
    status: "pending",
    recordedAt: "Just now",
  };
  payments.unshift(payment);

  return { ok: true, payment };
}

export async function verifyPayment(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const payment = payments.find((p) => p.id === id);

  if (!payment) return { ok: false, error: "Payment not found." };

  payment.status = "paid";
  return { ok: true };
}
