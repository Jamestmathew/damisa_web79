import "server-only";

import type { PolicyDocument } from "../types";

function delay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId() {
  return `pol_${Math.random().toString(36).slice(2, 9)}`;
}

const policies: PolicyDocument[] = [
  {
    id: "pol_1",
    title: "Academic Integrity Policy",
    fileName: "academic-integrity-policy.pdf",
    fileType: "pdf",
    fileSizeMb: 1.2,
    uploadedAt: "2w ago",
    processingStatus: "indexed",
  },
  {
    id: "pol_2",
    title: "Student Code of Conduct",
    fileName: "student-code-of-conduct.pdf",
    fileType: "pdf",
    fileSizeMb: 0.8,
    uploadedAt: "1mo ago",
    processingStatus: "indexed",
  },
];

export async function getPolicyDocuments(): Promise<PolicyDocument[]> {
  await delay();
  return [...policies];
}

export async function uploadPolicyDocument(input: {
  title: string;
  fileName: string;
  fileType: string;
  fileSizeMb: number;
}): Promise<{ ok: true; policy: PolicyDocument } | { ok: false; error: string }> {
  await delay();

  const policy: PolicyDocument = {
    id: generateId(),
    title: input.title,
    fileName: input.fileName,
    fileType: input.fileType,
    fileSizeMb: input.fileSizeMb,
    uploadedAt: "Just now",
    processingStatus: "queued",
  };
  policies.unshift(policy);

  setTimeout(() => {
    policy.processingStatus = "processing";
  }, 1500);
  setTimeout(() => {
    policy.processingStatus = "indexed";
  }, 4000);

  return { ok: true, policy };
}

export async function deletePolicyDocument(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const index = policies.findIndex((p) => p.id === id);

  if (index === -1) return { ok: false, error: "Policy document not found." };

  policies.splice(index, 1);
  return { ok: true };
}
