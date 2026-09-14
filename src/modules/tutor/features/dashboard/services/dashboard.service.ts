import "server-only";

import type { TutorDashboardData } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getTutorDashboardData(tutorName: string): Promise<TutorDashboardData> {
  await delay();

  return {
    tutorFirstName: tutorName.split(" ")[0] ?? tutorName,
    stats: [
      { label: "My Courses", value: "3", hint: "1 draft", icon: "courses" },
      { label: "Total Students", value: "158", hint: "Across all courses", icon: "students" },
      { label: "Pending Reviews", value: "7", hint: "Assignments awaiting grading", icon: "pending" },
      { label: "Active Quizzes", value: "4", hint: "2 closing this week", icon: "quizzes" },
    ],
    myCourses: [
      { id: "crs_101", title: "Data Structures & Algorithms", code: "CSC 301", studentCount: 84, moduleCount: 6, status: "published" },
      { id: "crs_105", title: "Advanced Networking", code: "CSC 401", studentCount: 0, moduleCount: 2, status: "draft" },
      { id: "crs_102", title: "Database Management Systems", code: "CSC 305", studentCount: 74, moduleCount: 5, status: "published" },
    ],
    upcomingClasses: [
      { id: "cls_1", courseTitle: "CSC 301 - Section A", time: "9:00 AM", status: "completed" },
      { id: "cls_2", courseTitle: "CSC 305 - Section A", time: "1:00 PM", status: "ongoing" },
      { id: "cls_3", courseTitle: "CSC 301 - Section B", time: "3:00 PM", status: "upcoming" },
    ],
    recentActivity: [
      { id: "act_1", studentName: "Chidinma Okoro", action: "submitted", courseTitle: "Linked List Implementation", occurredAt: "10m ago" },
      { id: "act_2", studentName: "Emeka Nwosu", action: "completed", courseTitle: "Trees & BSTs Quiz", occurredAt: "1h ago" },
      { id: "act_3", studentName: "Amina Yusuf", action: "asked a question in", courseTitle: "CSC 305 discussion", occurredAt: "2h ago" },
    ],
    pendingReviews: [
      { id: "asg_1", studentName: "Chidinma Okoro", assignmentTitle: "Linked List Implementation", courseTitle: "CSC 301", status: "submitted" },
      { id: "asg_2", studentName: "Tunde Bakare", assignmentTitle: "ER Diagram Submission", courseTitle: "CSC 305", status: "late" },
    ],
    quizStats: [
      { quizTitle: "Trees & BSTs Quiz", averageScorePercent: 78, attemptCount: 62 },
      { quizTitle: "Normalization Quiz", averageScorePercent: 71, attemptCount: 58 },
    ],
    attendanceRatePercent: 91,
    announcements: [
      { id: "an_1", title: "Class moved to LT2 this week", postedAt: "2h ago" },
      { id: "an_2", title: "Project groups have been posted", postedAt: "1d ago" },
    ],
  };
}
