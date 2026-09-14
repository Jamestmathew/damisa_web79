import "server-only";

import type { DashboardData } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Mock data source. Replace the body of this function with a real API/DB
 * call later — the return shape (`DashboardData`) is the contract every
 * widget component already renders against, so nothing else changes.
 */
export async function getDashboardData(studentName: string): Promise<DashboardData> {
  await delay();

  return {
    studentFirstName: studentName.split(" ")[0] ?? studentName,
    stats: [
      { label: "Enrolled Courses", value: "6", hint: "This semester", icon: "courses" },
      { label: "Pending Assignments", value: "3", hint: "Due this week", icon: "assignments" },
      { label: "Current GPA", value: "3.72", hint: "+0.08 last term", icon: "gpa" },
      { label: "Attendance Rate", value: "94%", hint: "Last 30 days", icon: "attendance" },
    ],
    recentCourses: [
      {
        id: "crs_101",
        title: "Data Structures & Algorithms",
        code: "CSC 301",
        instructor: "Dr. A. Bello",
        thumbnailColor: "bg-blue-500",
        progressPercent: 72,
        creditUnits: 3,
      },
      {
        id: "crs_102",
        title: "Database Management Systems",
        code: "CSC 305",
        instructor: "Dr. F. Yusuf",
        thumbnailColor: "bg-emerald-500",
        progressPercent: 48,
        creditUnits: 3,
      },
      {
        id: "crs_103",
        title: "Technical Writing",
        code: "GST 205",
        instructor: "Mrs. C. Okafor",
        thumbnailColor: "bg-amber-500",
        progressPercent: 90,
        creditUnits: 2,
      },
    ],
    upcomingDeadlines: [
      { id: "dl_1", title: "Binary Trees Problem Set", courseTitle: "CSC 301", dueAt: "Tomorrow, 11:59 PM", type: "assignment" },
      { id: "dl_2", title: "Normalization Quiz", courseTitle: "CSC 305", dueAt: "In 3 days", type: "quiz" },
      { id: "dl_3", title: "Mid-Semester Exam", courseTitle: "GST 205", dueAt: "In 6 days", type: "exam" },
    ],
    recentAssignments: [
      { id: "asg_1", title: "Linked List Implementation", courseTitle: "CSC 301", status: "graded" },
      { id: "asg_2", title: "ER Diagram Submission", courseTitle: "CSC 305", status: "submitted" },
      { id: "asg_3", title: "Essay Draft 2", courseTitle: "GST 205", status: "not_submitted" },
    ],
    recentGrades: [
      { id: "grd_1", courseTitle: "CSC 301", assessment: "Quiz 3", score: 18, maxScore: 20 },
      { id: "grd_2", courseTitle: "CSC 305", assessment: "Assignment 2", score: 27, maxScore: 30 },
    ],
    announcements: [
      { id: "an_1", title: "Class moved to LT2 this week", courseTitle: "CSC 301", postedAt: "2h ago" },
      { id: "an_2", title: "Project groups have been posted", courseTitle: "CSC 305", postedAt: "1d ago" },
    ],
    calendarPreview: [
      { id: "cal_1", title: "CSC 301 Lecture", time: "9:00 AM", status: "completed" },
      { id: "cal_2", title: "CSC 305 Lab", time: "1:00 PM", status: "ongoing" },
      { id: "cal_3", title: "GST 205 Tutorial", time: "3:00 PM", status: "upcoming" },
    ],
  };
}
