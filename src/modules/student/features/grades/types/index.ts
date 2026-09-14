export interface CourseGradeRow {
  id: string;
  courseTitle: string;
  courseCode: string;
  assessment: string;
  score: number;
  maxScore: number;
  weightPercent: number;
}

export interface CourseGradeSummary {
  courseId: string;
  courseTitle: string;
  courseCode: string;
  currentPercent: number;
  letterGrade: string;
}

export interface GradesOverview {
  gpa: number;
  courseSummaries: CourseGradeSummary[];
  rows: CourseGradeRow[];
}
