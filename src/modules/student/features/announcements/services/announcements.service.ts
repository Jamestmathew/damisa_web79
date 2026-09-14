import "server-only";

import type { Announcement } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "an_1",
    title: "Class moved to LT2 this week",
    body: "CSC 301 lectures will hold in LT2 instead of the usual venue for the rest of this week due to maintenance.",
    courseTitle: "CSC 301",
    postedAt: "2 hours ago",
    isPinned: true,
  },
  {
    id: "an_2",
    title: "Project groups have been posted",
    body: "Check the course page for your assigned project group and initial milestones for the DBMS term project.",
    courseTitle: "CSC 305",
    postedAt: "1 day ago",
    isPinned: false,
  },
  {
    id: "an_3",
    title: "Semester exam timetable released",
    body: "The provisional exam timetable for this semester has been published. Review your schedule and report any clashes.",
    courseTitle: null,
    postedAt: "3 days ago",
    isPinned: true,
  },
];

export async function getAnnouncements(): Promise<Announcement[]> {
  await delay();
  return [...MOCK_ANNOUNCEMENTS].sort((a, b) => Number(b.isPinned) - Number(a.isPinned));
}
