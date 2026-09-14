import "server-only";

import { authService } from "@/modules/auth/services";
import type { AuthUser } from "@/modules/auth/types";

import type { AdminCreatableRole, AdminUserRow } from "../types";

function isManageableByAdmin(
  user: AuthUser,
): user is AuthUser & { role: AdminUserRow["role"] } {
  return user.role === "student" || user.role === "tutor";
}

function toRow(user: AuthUser & { role: AdminUserRow["role"] }): AdminUserRow {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    matricNumber: user.matricNumber ?? null,
    staffId: user.staffId ?? null,
    createdAt: user.createdAt,
  };
}

export async function getUsers(): Promise<AdminUserRow[]> {
  const users = await authService.listUsers();

  // Admin manages Student and Tutor accounts only.
  // Admin accounts are managed exclusively by Super Admin.
  return users.filter(isManageableByAdmin).map(toRow);
}

/**
 * Generates a temporary password for the new account.
 * This is the initial credential given to the newly created user.
 */
function generateTemporaryPassword() {
  return `Welcome-${Math.random().toString(36).slice(2, 8)}`;
}

export async function createUser(input: {
  name: string;
  email: string;
  role: AdminCreatableRole;
  matricNumber?: string | null;
  staffId?: string | null;
}): Promise<
  | { ok: true; temporaryPassword: string }
  | {
      ok: false;
      error: string;
      fieldErrors?: Partial<Record<string, string>>;
    }
> {
  const temporaryPassword = generateTemporaryPassword();

  // Students without a supplied email still need a unique email-like
  // identifier in the current mock auth store.
  const email =
    input.email ||
    `${(input.matricNumber ?? "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")}@students.local`;

  const result = await authService.register({
    name: input.name,
    email,
    password: temporaryPassword,
    confirmPassword: temporaryPassword,
    acceptTerms: true,
    role: input.role,
    status: "active",
    matricNumber: input.matricNumber || null,
    staffId: input.staffId || null,
  });

  if (!result.ok) {
    return {
      ok: false,
      error: result.error,
      fieldErrors: result.fieldErrors,
    };
  }

  return {
    ok: true,
    temporaryPassword,
  };
}

export async function updateUser(
  id: string,
  input: {
    name: string;
    email?: string;
    role: AdminCreatableRole;
    matricNumber?: string | null;
    staffId?: string | null;
  },
): Promise<
  | { ok: true }
  | {
      ok: false;
      error: string;
      fieldErrors?: Partial<Record<string, string>>;
    }
> {
  const result = await authService.updateUserProfile(id, input);

  if (!result.ok) {
    return {
      ok: false,
      error: result.error,
      fieldErrors: result.fieldErrors,
    };
  }

  return { ok: true };
}

export async function setUserStatus(
  id: string,
  status: AdminUserRow["status"],
): Promise<{ ok: true } | { ok: false; error: string }> {
  const result = await authService.setUserStatus(id, status);

  return result.ok ? { ok: true } : { ok: false, error: result.error };
}

export async function resetUserPassword(
  id: string,
): Promise<
  { ok: true; temporaryPassword: string } | { ok: false; error: string }
> {
  const result = await authService.adminResetPassword(id);

  if (!result.ok) {
    return {
      ok: false,
      error: result.error,
    };
  }

  return {
    ok: true,
    temporaryPassword: result.data.temporaryPassword,
  };
}
