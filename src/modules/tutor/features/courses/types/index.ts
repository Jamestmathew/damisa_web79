import type { TutorCourseSummary } from "@/modules/tutor/shared/types";

export interface CourseModuleSummary {
  id: string;
  title: string;
  lessonCount: number;
}

export interface TutorCourseDetails extends TutorCourseSummary {
  description: string;
  creditUnits: number;
  modules: CourseModuleSummary[];
}
