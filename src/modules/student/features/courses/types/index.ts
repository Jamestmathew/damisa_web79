import type { CourseSummary } from "@/modules/student/shared/types";

export interface CourseModule {
  id: string;
  title: string;
  lessonCount: number;
  completedLessonCount: number;
}

export interface CourseDetails extends CourseSummary {
  description: string;
  instructorTitle: string;
  modules: CourseModule[];
}
