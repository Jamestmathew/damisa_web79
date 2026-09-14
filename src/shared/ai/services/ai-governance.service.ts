import "server-only";

import type { AiGovernancePolicy } from "../types";

function delay(ms = 150) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Single tenant for now (`tenantId: null`). When multi-tenancy lands, this
 * becomes a lookup keyed by tenant instead of a single mutable object, and
 * a future Super Admin layer can seed/override the per-tenant defaults —
 * neither Tutor's nor Admin's code needs to change for that.
 */
const policy: AiGovernancePolicy = {
  tenantId: null,
  aiFeaturesEnabled: true,
  studentChatEnabled: true,
  tutorKnowledgeBaseEnabled: true,
  allowedUploadTypes: ["pdf", "docx", "pptx", "txt", "md"],
  maxUploadSizeMb: 25,
  storageQuotaGb: 50,
  storageUsedGb: 12.4,
};

export async function getAiGovernancePolicy(): Promise<AiGovernancePolicy> {
  await delay();
  return { ...policy };
}

export async function updateAiGovernancePolicy(
  input: Partial<Omit<AiGovernancePolicy, "tenantId" | "storageUsedGb">>
): Promise<{ ok: true; policy: AiGovernancePolicy }> {
  await delay();
  Object.assign(policy, input);
  return { ok: true, policy: { ...policy } };
}
