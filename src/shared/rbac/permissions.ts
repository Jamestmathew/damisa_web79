import type { Permission, Role } from "./types";

/**
 * The single source of truth for what each role can do. To extend for a
 * future Super Admin role: add `super_admin: [...]` here (typically every
 * permission, plus future platform-level ones) — no other file changes.
 */
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  student: ["students:view_profile", "payments:view_own", "ai:chat"],
  tutor: [
    "students:view_profile",
    "ai:manage_knowledge_base",
    "courses:manage_own",
    "assignments:manage_own",
    "quizzes:manage_own",
    "exams:manage_own",
    "gradebook:manage_own",
    "attendance:manage_own",
  ],
  admin: [
    "users:create",
    "users:edit",
    "users:activate",
    "users:deactivate",
    "users:archive",
    "users:reset_password",
    "users:view_all",
    "students:view_profile",
    "students:edit_profile",
    "academic_records:manage",
    "payments:view_all",
    "payments:record",
    "payments:verify",
    "payments:filter",
    "ai:manage_governance",
  ],
  super_admin: [
    "users:create",
    "users:edit",
    "users:activate",
    "users:deactivate",
    "users:archive",
    "users:reset_password",
    "users:view_all",
    "students:view_profile",
    "students:edit_profile",
    "academic_records:manage",
    "payments:view_all",
    "payments:record",
    "payments:verify",
    "payments:filter",
    "ai:manage_governance",
    "admins:create",
    "admins:edit",
    "admins:activate",
    "admins:deactivate",
    "admins:archive",
    "offices:view_all",
    "ai:manage_policies",
  ],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some((permission) => hasPermission(role, permission));
}
