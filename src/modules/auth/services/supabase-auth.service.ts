import "server-only";

import type { AuthResult, AuthUser, LoginPayload } from "@/modules/auth/types";

import { createClient } from "@/supabase/server";

import type { AuthServiceContract } from "./auth-service.contract";

type ProfileRow = {
  id: string;
  name: string;
  role: AuthUser["role"];
  status: AuthUser["status"];
  avatar_url: string | null;
  matric_number: string | null;
  staff_id: string | null;
  created_at: string;
};

function mapProfileToAuthUser(
  profile: ProfileRow,
  email: string,
  emailVerified: boolean,
): AuthUser {
  return {
    id: profile.id,
    name: profile.name,
    email,
    emailVerified,
    avatarUrl: profile.avatar_url,
    createdAt: profile.created_at,
    role: profile.role,
    status: profile.status,
    matricNumber: profile.matric_number,
    staffId: profile.staff_id,
  };
}

export const supabaseAuthService: AuthServiceContract = {
  async login(payload: LoginPayload): Promise<AuthResult<{ user: AuthUser }>> {
    const supabase = await createClient();

    const identifier = payload.identifier.trim();

    /*
     * For this first migration step:
     * - Tutors/Admins/Super Admins log in with email.
     * - Student matric-number login will be implemented separately.
     */
    if (!identifier.includes("@")) {
      return {
        ok: false,
        error: "Student matric-number login will be added next.",
      };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: identifier,
      password: payload.password,
    });

    if (error || !data.user) {
      return {
        ok: false,
        error: "Invalid login credentials.",
      };
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select(
        "id, name, role, status, avatar_url, matric_number, staff_id, created_at",
      )
      .eq("id", data.user.id)
      .single();

    if (profileError || !profile) {
      await supabase.auth.signOut();

      return {
        ok: false,
        error: "User profile not found.",
      };
    }

    if (profile.status !== "active") {
      await supabase.auth.signOut();

      return {
        ok: false,
        error: "This account is not active.",
      };
    }

    return {
      ok: true,
      data: {
        user: mapProfileToAuthUser(
          profile,
          data.user.email ?? identifier,
          Boolean(data.user.email_confirmed_at),
        ),
      },
    };
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return null;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select(
        "id, name, role, status, avatar_url, matric_number, staff_id, created_at",
      )
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return null;
    }

    if (profile.status !== "active") {
      return null;
    }

    return mapProfileToAuthUser(
      profile,
      user.email ?? "",
      Boolean(user.email_confirmed_at),
    );
  },

  async register() {
    return {
      ok: false,
      error: "Account registration is not available.",
    };
  },

  async forgotPassword() {
    return {
      ok: false,
      error: "Password recovery is not implemented yet.",
    };
  },

  async resetPassword() {
    return {
      ok: false,
      error: "Password reset is not implemented yet.",
    };
  },

  async verifyEmail() {
    return {
      ok: false,
      error: "Email verification is handled by Supabase Auth.",
    };
  },

  async changePassword() {
    return {
      ok: false,
      error: "Password change migration is not implemented yet.",
    };
  },

  async getUserByEmail() {
    return null;
  },

  async listUsers() {
    return [];
  },

  async updateUserProfile() {
    return {
      ok: false,
      error: "User management migration is not implemented yet.",
    };
  },

  async adminResetPassword() {
    return {
      ok: false,
      error: "Password reset migration is not implemented yet.",
    };
  },

  async setUserStatus() {
    return {
      ok: false,
      error: "User status migration is not implemented yet.",
    };
  },
};
