import "server-only";

import type { ChatConversation, ChatConversationSummary, ChatMessage } from "@/shared/ai";

function delay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

const conversations: ChatConversation[] = [
  {
    id: "conv_1",
    tenantId: null,
    title: "Big-O of tree traversal",
    courseTitle: "CSC 301 · Data Structures & Algorithms",
    updatedAt: "1h ago",
    messages: [
      {
        id: "msg_1",
        role: "user",
        content: "What's the time complexity of an in-order traversal of a balanced BST?",
        createdAt: "1h ago",
      },
      {
        id: "msg_2",
        role: "assistant",
        content:
          "In-order traversal visits every node exactly once, so it runs in O(n) time regardless of whether the tree is balanced, where n is the number of nodes.",
        citations: [
          {
            id: "cit_1",
            documentName: "Trees & BSTs - Lecture Notes.pdf",
            courseTitle: "CSC 301",
            snippet: "Traversal algorithms visit each node once, giving linear time complexity...",
          },
        ],
        createdAt: "1h ago",
      },
    ],
  },
  {
    id: "conv_2",
    tenantId: null,
    title: "Normalization vs denormalization",
    courseTitle: "CSC 305 · Database Management Systems",
    updatedAt: "1d ago",
    messages: [
      {
        id: "msg_3",
        role: "user",
        content: "When would I choose to denormalize a schema?",
        createdAt: "1d ago",
      },
      {
        id: "msg_4",
        role: "assistant",
        content:
          "Denormalization is usually chosen for read-heavy workloads where join costs outweigh the benefits of eliminating redundancy — for example, reporting dashboards or caching layers.",
        citations: [
          {
            id: "cit_2",
            documentName: "Normalization - Module 3.pdf",
            courseTitle: "CSC 305",
            snippet: "Denormalization trades storage and update complexity for read performance...",
          },
        ],
        createdAt: "1d ago",
      },
    ],
  },
];

export async function getConversations(): Promise<ChatConversationSummary[]> {
  await delay();
  return conversations
    .map((c) => ({
      id: c.id,
      title: c.title,
      courseTitle: c.courseTitle,
      updatedAt: c.updatedAt,
      lastMessagePreview: c.messages[c.messages.length - 1]?.content.slice(0, 80) ?? "",
    }))
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export async function getConversationById(id: string): Promise<ChatConversation | null> {
  await delay();
  return conversations.find((c) => c.id === id) ?? null;
}

export async function createConversation(): Promise<ChatConversation> {
  await delay();
  const conversation: ChatConversation = {
    id: generateId("conv"),
    tenantId: null,
    title: "New conversation",
    courseTitle: null,
    updatedAt: "Just now",
    messages: [],
  };
  conversations.unshift(conversation);
  return conversation;
}

/**
 * Mock RAG reply: in a real implementation this calls the LLM + vector
 * search over Tutor-uploaded, Admin-governed knowledge documents. Here it
 * just echoes a plausible answer with a fabricated citation so the UI
 * (citations, sources) has something real to render against.
 */
export async function sendMessage(
  conversationId: string,
  content: string
): Promise<{ ok: true; message: ChatMessage } | { ok: false; error: string }> {
  await delay(400);
  const conversation = conversations.find((c) => c.id === conversationId);

  if (!conversation) {
    return { ok: false, error: "Conversation not found." };
  }

  const userMessage: ChatMessage = {
    id: generateId("msg"),
    role: "user",
    content,
    createdAt: "Just now",
  };

  const assistantMessage: ChatMessage = {
    id: generateId("msg"),
    role: "assistant",
    content: `Here's what I found related to "${content.slice(0, 60)}": this draws on your course materials to give a grounded answer, with the source cited below.`,
    citations: [
      {
        id: generateId("cit"),
        documentName: "Course Material - Week 4.pdf",
        courseTitle: conversation.courseTitle ?? "General",
        snippet: "Relevant excerpt from the uploaded course material...",
      },
    ],
    createdAt: "Just now",
  };

  conversation.messages.push(userMessage, assistantMessage);
  conversation.updatedAt = "Just now";
  if (conversation.title === "New conversation") {
    conversation.title = content.slice(0, 48);
  }

  return { ok: true, message: assistantMessage };
}
