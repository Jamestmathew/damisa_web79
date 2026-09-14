import "server-only";

import type { AdmissionApplication } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const applications: AdmissionApplication[] = [
  { id: "adm_1", applicantName: "Chidinma Okoro", email: "chidinma.okoro@gmail.com", program: "B.Sc Computer Science", session: "2026/2027", submittedAt: "2h ago", status: "pending" },
  { id: "adm_2", applicantName: "Tunde Bakare", email: "tunde.bakare@gmail.com", program: "B.Sc Accounting", session: "2026/2027", submittedAt: "5h ago", status: "approved" },
  { id: "adm_3", applicantName: "Amina Yusuf", email: "amina.yusuf@gmail.com", program: "B.Eng Civil Engineering", session: "2026/2027", submittedAt: "1d ago", status: "pending" },
  { id: "adm_4", applicantName: "Ibrahim Sani", email: "ibrahim.sani@gmail.com", program: "B.Sc Computer Science", session: "2026/2027", submittedAt: "2d ago", status: "rejected" },
];

export async function getAdmissionApplications(): Promise<AdmissionApplication[]> {
  await delay();
  return [...applications];
}

export async function setAdmissionStatus(
  id: string,
  status: AdmissionApplication["status"]
): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const application = applications.find((a) => a.id === id);

  if (!application) return { ok: false, error: "Application not found." };

  application.status = status;
  return { ok: true };
}
