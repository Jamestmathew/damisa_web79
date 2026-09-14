"use server";

import { requirePermission } from "@/shared/rbac";
import { testCourseAi } from "../services/knowledge-base.service";

export async function testCourseAiAction(
  question: string
): Promise<{ ok: true; answer: string } | { ok: false; error: string }> {
  await requirePermission("ai:manage_knowledge_base");

  if (!question.trim()) {
    return { ok: false, error: "Please enter a question." };
  }

  const result = await testCourseAi(question.trim());
  return { ok: true, answer: result.answer };
}
