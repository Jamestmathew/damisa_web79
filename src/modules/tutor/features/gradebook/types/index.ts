export interface GradebookRow {
  id: string;
  studentName: string;
  courseCode: string;
  assignmentAvg: number | null;
  quizAvg: number | null;
  examScore: number | null;
  overallPercent: number;
  letterGrade: string;
}
