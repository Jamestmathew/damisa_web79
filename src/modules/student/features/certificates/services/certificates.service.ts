import "server-only";

import type { Certificate } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: "cert_1",
    courseTitle: "Technical Writing",
    courseCode: "GST 205",
    issuedAt: "Jun 2, 2026",
    credentialId: "CERT-GST205-2026-0142",
  },
];

export async function getCertificates(): Promise<Certificate[]> {
  await delay();
  return MOCK_CERTIFICATES;
}
