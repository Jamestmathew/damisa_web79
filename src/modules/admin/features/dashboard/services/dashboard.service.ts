import "server-only";

import type { AdminDashboardData } from "../types";

function delay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getAdminDashboardData(adminName: string): Promise<AdminDashboardData> {
  await delay();

  return {
    adminFirstName: adminName.split(" ")[0] ?? adminName,
    stats: [
      { label: "Total Users", value: "2,481", hint: "+64 this month", icon: "users" },
      { label: "Students", value: "2,102", hint: "+51 this month", icon: "students" },
      { label: "Teachers", value: "148", hint: "+3 this month", icon: "teachers" },
      { label: "Active Courses", value: "96", hint: "12 pending review", icon: "courses" },
      { label: "Revenue (MTD)", value: "₦4.2M", hint: "+8% vs last month", icon: "revenue" },
      { label: "Pending Admissions", value: "37", hint: "9 new today", icon: "admissions" },
    ],
    enrollmentTrend: [
      { month: "Mar", count: 180 },
      { month: "Apr", count: 210 },
      { month: "May", count: 195 },
      { month: "Jun", count: 240 },
      { month: "Jul", count: 265 },
    ],
    revenueTrend: [
      { month: "Mar", amountNaira: 3100000 },
      { month: "Apr", amountNaira: 3450000 },
      { month: "May", amountNaira: 3300000 },
      { month: "Jun", amountNaira: 3900000 },
      { month: "Jul", amountNaira: 4200000 },
    ],
    activeUsersCount: 1342,
    activeUsersDelta: "+6.2% from last week",
    recentAdmissions: [
      { id: "adm_1", applicantName: "Chidinma Okoro", program: "B.Sc Computer Science", submittedAt: "2h ago", status: "pending" },
      { id: "adm_2", applicantName: "Tunde Bakare", program: "B.Sc Accounting", submittedAt: "5h ago", status: "approved" },
      { id: "adm_3", applicantName: "Amina Yusuf", program: "B.Eng Civil Engineering", submittedAt: "1d ago", status: "pending" },
    ],
    recentPayments: [
      { id: "pay_1", payerName: "Chidinma Okoro", purpose: "Tuition - Fall 2026", amountNaira: 185000, status: "paid" },
      { id: "pay_2", payerName: "Tunde Bakare", purpose: "Acceptance Fee", amountNaira: 25000, status: "paid" },
      { id: "pay_3", payerName: "Amina Yusuf", purpose: "Tuition - Fall 2026", amountNaira: 185000, status: "pending" },
    ],
    pendingApprovals: [
      { id: "app_1", title: "Chidinma Okoro's admission review", type: "admission", requestedAt: "2h ago" },
      { id: "app_2", title: "CSC 401 course publish request", type: "course", requestedAt: "1d ago" },
      { id: "app_3", title: "New teacher account: Dr. K. Eze", type: "user", requestedAt: "1d ago" },
    ],
    recentActivities: [
      { id: "act_1", actor: "Dr. A. Bello", action: "published a new lesson in", target: "CSC 301", occurredAt: "10m ago" },
      { id: "act_2", actor: "Admin (You)", action: "approved admission for", target: "Tunde Bakare", occurredAt: "1h ago" },
      { id: "act_3", actor: "System", action: "processed a payment from", target: "Chidinma Okoro", occurredAt: "2h ago" },
    ],
    announcements: [
      { id: "an_1", title: "Semester exam timetable released", postedAt: "3d ago" },
      { id: "an_2", title: "Staff meeting scheduled for Friday", postedAt: "5d ago" },
    ],
  };
}
