import "server-only";

import type { AdminClass } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId() {
  return `cls_${Math.random().toString(36).slice(2, 9)}`;
}

const classes: AdminClass[] = [
  { id: "cls_1", name: "CSC 301 - Section A", department: "Computer Science", teacher: "Dr. A. Bello", studentCount: 42, schedule: "Mon & Wed, 9:00 AM" },
  { id: "cls_2", name: "CSC 305 - Section A", department: "Computer Science", teacher: "Dr. F. Yusuf", studentCount: 38, schedule: "Mon & Thu, 1:00 PM" },
  { id: "cls_3", name: "GST 205 - Section B", department: "General Studies", teacher: "Mrs. C. Okafor", studentCount: 65, schedule: "Tue, 10:00 AM" },
];

export async function getClasses(): Promise<AdminClass[]> {
  await delay();
  return [...classes];
}

export async function createClass(input: {
  name: string;
  department: string;
  teacher: string;
  schedule: string;
}): Promise<{ ok: true; class: AdminClass } | { ok: false; error: string }> {
  await delay();

  const newClass: AdminClass = {
    id: generateId(),
    name: input.name,
    department: input.department,
    teacher: input.teacher,
    schedule: input.schedule,
    studentCount: 0,
  };
  classes.push(newClass);

  return { ok: true, class: newClass };
}

export async function updateClass(
  id: string,
  input: { name: string; department: string; teacher: string; schedule: string }
): Promise<{ ok: true; class: AdminClass } | { ok: false; error: string }> {
  await delay();
  const found = classes.find((c) => c.id === id);

  if (!found) return { ok: false, error: "Class not found." };

  found.name = input.name;
  found.department = input.department;
  found.teacher = input.teacher;
  found.schedule = input.schedule;

  return { ok: true, class: found };
}

export async function deleteClass(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const index = classes.findIndex((c) => c.id === id);

  if (index === -1) return { ok: false, error: "Class not found." };

  classes.splice(index, 1);
  return { ok: true };
}
