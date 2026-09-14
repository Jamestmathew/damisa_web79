import type { Metadata } from "next";

import { PageHeader } from "@/shared/components";
import { getCourses, CoursesManager } from "@/modules/admin/features/courses";

export const metadata: Metadata = { title: "Courses" };

export default async function AdminCoursesPage() {
  const courses = await getCourses();

  return (
    <div>
      <PageHeader title="Course Management" description="Oversee every course across departments" />
      <CoursesManager courses={courses} />
    </div>
  );
}
