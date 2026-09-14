import "server-only";

import type { KnowledgeDocument } from "@/shared/ai";

function delay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId() {
  return `doc_${Math.random().toString(36).slice(2, 9)}`;
}

const documents: KnowledgeDocument[] = [
  {
    id: "doc_1",
    tenantId: null,
    courseId: "crs_101",
    courseTitle: "Data Structures & Algorithms",
    fileName: "Trees & BSTs - Lecture Notes.pdf",
    fileType: "pdf",
    fileSizeMb: 2.4,
    uploadedAt: "3d ago",
    processingStatus: "indexed",
    chunkCount: 48,
    lastIndexedAt: "3d ago",
  },
  {
    id: "doc_2",
    tenantId: null,
    courseId: "crs_101",
    courseTitle: "Data Structures & Algorithms",
    fileName: "Graph Algorithms.pptx",
    fileType: "pptx",
    fileSizeMb: 5.1,
    uploadedAt: "1d ago",
    processingStatus: "processing",
    chunkCount: null,
    lastIndexedAt: null,
  },
  {
    id: "doc_3",
    tenantId: null,
    courseId: "crs_102",
    courseTitle: "Database Management Systems",
    fileName: "Normalization - Module 3.pdf",
    fileType: "pdf",
    fileSizeMb: 1.8,
    uploadedAt: "5d ago",
    processingStatus: "indexed",
    chunkCount: 32,
    lastIndexedAt: "5d ago",
  },
];

export async function getKnowledgeDocuments(): Promise<KnowledgeDocument[]> {
  await delay();
  return [...documents];
}

export async function uploadDocument(input: {
  courseId: string;
  courseTitle: string;
  fileName: string;
  fileType: string;
  fileSizeMb: number;
}): Promise<{ ok: true; document: KnowledgeDocument } | { ok: false; error: string }> {
  await delay();

  const document: KnowledgeDocument = {
    id: generateId(),
    tenantId: null,
    courseId: input.courseId,
    courseTitle: input.courseTitle,
    fileName: input.fileName,
    fileType: input.fileType,
    fileSizeMb: input.fileSizeMb,
    uploadedAt: "Just now",
    processingStatus: "queued",
    chunkCount: null,
    lastIndexedAt: null,
  };
  documents.unshift(document);

  // Simulate the pipeline progressing asynchronously.
  setTimeout(() => {
    document.processingStatus = "processing";
  }, 1500);
  setTimeout(() => {
    document.processingStatus = "indexed";
    document.chunkCount = Math.floor(Math.random() * 40) + 10;
    document.lastIndexedAt = "Just now";
  }, 4000);

  return { ok: true, document };
}

export async function deleteDocument(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const index = documents.findIndex((d) => d.id === id);

  if (index === -1) return { ok: false, error: "Document not found." };

  documents.splice(index, 1);
  return { ok: true };
}

export async function reindexDocument(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const document = documents.find((d) => d.id === id);

  if (!document) return { ok: false, error: "Document not found." };

  document.processingStatus = "processing";
  setTimeout(() => {
    document.processingStatus = "indexed";
    document.chunkCount = Math.floor(Math.random() * 40) + 10;
    document.lastIndexedAt = "Just now";
  }, 2500);

  return { ok: true };
}

/** Mock "test the course AI" — same idea as Student's chat, minus persistence. */
export async function testCourseAi(question: string): Promise<{ answer: string }> {
  await delay(500);
  return {
    answer: `Based on your uploaded materials, here's a grounded answer to "${question.slice(0, 60)}" — this is a preview of how students will see responses once this course's knowledge base is fully indexed.`,
  };
}
