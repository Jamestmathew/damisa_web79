import "server-only";

import type { Department } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateId() {
  return `dept_${Math.random().toString(36).slice(2, 9)}`;
}

const departments: Department[] = [
  { id: "dept_1", name: "Computer Science", code: "CSC", headOfDepartment: "Dr. A. Bello", courseCount: 12, teacherCount: 8 },
  { id: "dept_2", name: "General Studies", code: "GST", headOfDepartment: "Mrs. C. Okafor", courseCount: 6, teacherCount: 5 },
  { id: "dept_3", name: "Accounting", code: "ACC", headOfDepartment: "Mr. B. Adeyemi", courseCount: 9, teacherCount: 6 },
];

export async function getDepartments(): Promise<Department[]> {
  await delay();
  return [...departments];
}

export async function createDepartment(input: {
  name: string;
  code: string;
  headOfDepartment: string;
}): Promise<{ ok: true; department: Department } | { ok: false; error: string }> {
  await delay();

  if (departments.some((d) => d.code.toLowerCase() === input.code.toLowerCase())) {
    return { ok: false, error: "A department with this code already exists." };
  }

  const department: Department = {
    id: generateId(),
    name: input.name,
    code: input.code.toUpperCase(),
    headOfDepartment: input.headOfDepartment,
    courseCount: 0,
    teacherCount: 0,
  };
  departments.push(department);

  return { ok: true, department };
}

export async function updateDepartment(
  id: string,
  input: { name: string; code: string; headOfDepartment: string }
): Promise<{ ok: true; department: Department } | { ok: false; error: string }> {
  await delay();
  const department = departments.find((d) => d.id === id);

  if (!department) return { ok: false, error: "Department not found." };

  department.name = input.name;
  department.code = input.code.toUpperCase();
  department.headOfDepartment = input.headOfDepartment;

  return { ok: true, department };
}

export async function deleteDepartment(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await delay();
  const index = departments.findIndex((d) => d.id === id);

  if (index === -1) return { ok: false, error: "Department not found." };

  departments.splice(index, 1);
  return { ok: true };
}
