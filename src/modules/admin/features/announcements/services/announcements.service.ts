import "server-only";

import type { AdminAnnouncement } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId() {
  return `an_${Math.random().toString(36).slice(2, 9)}`;
}

const announcements: AdminAnnouncement[] = [
  { id: "an_1", title: "Semester exam timetable released", body: "The provisional exam timetable for this semester has been published.", audience: "everyone", postedAt: "3d ago" },
  { id: "an_2", title: "Staff meeting scheduled for Friday", body: "All tutors are required to attend the department meeting this Friday at 2pm.", audience: "tutors", postedAt: "5d ago" },
];

export async function getAdminAnnouncements(): Promise<AdminAnnouncement[]> {
  await delay();
  return [...announcements].reverse();
}

export async function createAnnouncement(input: {
  title: string;
  body: string;
  audience: AdminAnnouncement["audience"];
}): Promise<{ ok: true; announcement: AdminAnnouncement } | { ok: false; error: string }> {
  await delay();
  const announcement: AdminAnnouncement = {
    id: generateId(),
    title: input.title,
    body: input.body,
    audience: input.audience,
    postedAt: "Just now",
  };
  announcements.push(announcement);

  return { ok: true, announcement };
}

export async function updateAnnouncement(
  id: string,
  input: { title: string; body: string; audience: AdminAnnouncement["audience"] }
): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const announcement = announcements.find((a) => a.id === id);

  if (!announcement) return { ok: false, error: "Announcement not found." };

  announcement.title = input.title;
  announcement.body = input.body;
  announcement.audience = input.audience;

  return { ok: true };
}

export async function deleteAnnouncement(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const index = announcements.findIndex((a) => a.id === id);

  if (index === -1) return { ok: false, error: "Announcement not found." };

  announcements.splice(index, 1);
  return { ok: true };
}
