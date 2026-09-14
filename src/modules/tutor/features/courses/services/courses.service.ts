import "server-only";

import type { TutorCourseSummary } from "@/modules/tutor/shared/types";
import type { TutorCourseDetails } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId() {
  return `crs_${Math.random().toString(36).slice(2, 9)}`;
}

const courses: TutorCourseDetails[] = [
  {
    id: "crs_101",
    title: "Data Structures & Algorithms",
    code: "CSC 301",
    studentCount: 84,
    moduleCount: 3,
    status: "published",
    description: "Core data structures and algorithmic techniques for searching, sorting, and optimization.",
    creditUnits: 3,
    modules: [
      { id: "mod_1", title: "Arrays & Linked Lists", lessonCount: 6 },
      { id: "mod_2", title: "Trees & Binary Search Trees", lessonCount: 5 },
      { id: "mod_3", title: "Graph Algorithms", lessonCount: 5 },
    ],
  },
  {
    id: "crs_102",
    title: "Database Management Systems",
    code: "CSC 305",
    studentCount: 74,
    moduleCount: 3,
    status: "published",
    description: "Relational modeling, normalization, SQL, transactions, and an introduction to NoSQL.",
    creditUnits: 3,
    modules: [
      { id: "mod_1", title: "Relational Model & ER Diagrams", lessonCount: 4 },
      { id: "mod_2", title: "SQL Fundamentals", lessonCount: 6 },
      { id: "mod_3", title: "Normalization", lessonCount: 4 },
    ],
  },
  {
    id: "crs_105",
    title: "Advanced Networking",
    code: "CSC 401",
    studentCount: 0,
    moduleCount: 2,
    status: "draft",
    description: "Routing protocols, network security fundamentals, and distributed systems basics.",
    creditUnits: 3,
    modules: [
      { id: "mod_1", title: "Routing Protocols", lessonCount: 4 },
      { id: "mod_2", title: "Network Security", lessonCount: 3 },
    ],
  },
];

export async function getTutorCourses(): Promise<TutorCourseSummary[]> {
  await delay();
  return courses.map(({ description, creditUnits, modules, ...summary }) => summary);
}

export async function getTutorCourseById(courseId: string): Promise<TutorCourseDetails | null> {
  await delay();
  return courses.find((c) => c.id === courseId) ?? null;
}

export async function createCourse(input: {
  title: string;
  code: string;
  description: string;
  creditUnits: number;
}): Promise<{ ok: true; course: TutorCourseDetails } | { ok: false; error: string }> {
  await delay();

  if (courses.some((c) => c.code.toLowerCase() === input.code.toLowerCase())) {
    return { ok: false, error: "A course with this code already exists." };
  }

  const course: TutorCourseDetails = {
    id: generateId(),
    title: input.title,
    code: input.code,
    description: input.description,
    creditUnits: input.creditUnits,
    studentCount: 0,
    moduleCount: 0,
    status: "draft",
    modules: [],
  };
  courses.push(course);

  return { ok: true, course };
}

export async function setCoursePublishStatus(
  courseId: string,
  status: "published" | "draft"
): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const course = courses.find((c) => c.id === courseId);

  if (!course) return { ok: false, error: "Course not found." };

  course.status = status;
  return { ok: true };
}

export async function addCourseModule(
  courseId: string,
  title: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const course = courses.find((c) => c.id === courseId);

  if (!course) return { ok: false, error: "Course not found." };

  course.modules.push({ id: generateId(), title, lessonCount: 0 });
  course.moduleCount = course.modules.length;
  return { ok: true };
}
