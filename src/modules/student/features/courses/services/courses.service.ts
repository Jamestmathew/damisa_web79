import "server-only";

import type { CourseSummary } from "@/modules/student/shared/types";
import type { CourseDetails } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const MOCK_COURSES: CourseDetails[] = [
  {
    id: "crs_101",
    title: "Data Structures & Algorithms",
    code: "CSC 301",
    instructor: "Dr. A. Bello",
    instructorTitle: "Associate Professor, Computer Science",
    thumbnailColor: "bg-blue-500",
    progressPercent: 72,
    creditUnits: 3,
    description:
      "Covers core data structures (lists, trees, graphs, hash tables) and algorithmic techniques for searching, sorting, and optimization.",
    modules: [
      { id: "mod_1", title: "Arrays & Linked Lists", lessonCount: 6, completedLessonCount: 6 },
      { id: "mod_2", title: "Trees & Binary Search Trees", lessonCount: 5, completedLessonCount: 4 },
      { id: "mod_3", title: "Graph Algorithms", lessonCount: 5, completedLessonCount: 1 },
    ],
  },
  {
    id: "crs_102",
    title: "Database Management Systems",
    code: "CSC 305",
    instructor: "Dr. F. Yusuf",
    instructorTitle: "Senior Lecturer, Computer Science",
    thumbnailColor: "bg-emerald-500",
    progressPercent: 48,
    creditUnits: 3,
    description: "Relational modeling, normalization, SQL, transactions, and an introduction to NoSQL databases.",
    modules: [
      { id: "mod_1", title: "Relational Model & ER Diagrams", lessonCount: 4, completedLessonCount: 4 },
      { id: "mod_2", title: "SQL Fundamentals", lessonCount: 6, completedLessonCount: 2 },
      { id: "mod_3", title: "Normalization", lessonCount: 4, completedLessonCount: 0 },
    ],
  },
  {
    id: "crs_103",
    title: "Technical Writing",
    code: "GST 205",
    instructor: "Mrs. C. Okafor",
    instructorTitle: "Lecturer, General Studies",
    thumbnailColor: "bg-amber-500",
    progressPercent: 90,
    creditUnits: 2,
    description: "Principles of clear technical communication, report writing, and academic documentation standards.",
    modules: [
      { id: "mod_1", title: "Foundations of Technical Writing", lessonCount: 3, completedLessonCount: 3 },
      { id: "mod_2", title: "Reports & Proposals", lessonCount: 4, completedLessonCount: 4 },
      { id: "mod_3", title: "Documentation Standards", lessonCount: 3, completedLessonCount: 2 },
    ],
  },
  {
    id: "crs_104",
    title: "Operating Systems",
    code: "CSC 307",
    instructor: "Dr. M. Suleiman",
    instructorTitle: "Associate Professor, Computer Science",
    thumbnailColor: "bg-purple-500",
    progressPercent: 30,
    creditUnits: 3,
    description: "Processes, threads, scheduling, memory management, and file systems.",
    modules: [
      { id: "mod_1", title: "Processes & Threads", lessonCount: 5, completedLessonCount: 3 },
      { id: "mod_2", title: "Scheduling Algorithms", lessonCount: 4, completedLessonCount: 0 },
    ],
  },
];

export async function getCourses(): Promise<CourseSummary[]> {
  await delay();
  return MOCK_COURSES.map(({ description, instructorTitle, modules, ...summary }) => summary);
}

export async function getCourseById(courseId: string): Promise<CourseDetails | null> {
  await delay();
  return MOCK_COURSES.find((course) => course.id === courseId) ?? null;
}
