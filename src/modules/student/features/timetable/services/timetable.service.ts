import "server-only";

import type { TimetableSlot } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MOCK_TIMETABLE: TimetableSlot[] = [
  { id: "tt_1", day: "Mon", startTime: "9:00 AM", endTime: "10:30 AM", courseTitle: "Data Structures & Algorithms", courseCode: "CSC 301", venue: "LT2" },
  { id: "tt_2", day: "Mon", startTime: "1:00 PM", endTime: "3:00 PM", courseTitle: "Database Management Systems", courseCode: "CSC 305", venue: "Lab 3" },
  { id: "tt_3", day: "Tue", startTime: "10:00 AM", endTime: "11:30 AM", courseTitle: "Technical Writing", courseCode: "GST 205", venue: "LT1" },
  { id: "tt_4", day: "Wed", startTime: "9:00 AM", endTime: "10:30 AM", courseTitle: "Data Structures & Algorithms", courseCode: "CSC 301", venue: "LT2" },
  { id: "tt_5", day: "Wed", startTime: "2:00 PM", endTime: "4:00 PM", courseTitle: "Operating Systems", courseCode: "CSC 307", venue: "Lab 1" },
  { id: "tt_6", day: "Thu", startTime: "11:00 AM", endTime: "12:30 PM", courseTitle: "Database Management Systems", courseCode: "CSC 305", venue: "LT3" },
  { id: "tt_7", day: "Fri", startTime: "9:00 AM", endTime: "10:00 AM", courseTitle: "Operating Systems", courseCode: "CSC 307", venue: "LT1" },
];

export async function getTimetable(): Promise<TimetableSlot[]> {
  await delay();
  return MOCK_TIMETABLE;
}
