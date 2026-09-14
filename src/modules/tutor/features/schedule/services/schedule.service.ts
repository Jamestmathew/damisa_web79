import "server-only";

import type { TutorScheduleSlot } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const slots: TutorScheduleSlot[] = [
  { id: "sch_1", day: "Mon", startTime: "9:00 AM", endTime: "10:30 AM", courseCode: "CSC 301", courseTitle: "Data Structures & Algorithms", venue: "LT2" },
  { id: "sch_2", day: "Mon", startTime: "1:00 PM", endTime: "3:00 PM", courseCode: "CSC 305", courseTitle: "Database Management Systems", venue: "Lab 3" },
  { id: "sch_3", day: "Wed", startTime: "9:00 AM", endTime: "10:30 AM", courseCode: "CSC 301", courseTitle: "Data Structures & Algorithms", venue: "LT2" },
  { id: "sch_4", day: "Thu", startTime: "11:00 AM", endTime: "12:30 PM", courseCode: "CSC 305", courseTitle: "Database Management Systems", venue: "LT3" },
];

export async function getTutorSchedule(): Promise<TutorScheduleSlot[]> {
  await delay();
  return [...slots];
}
