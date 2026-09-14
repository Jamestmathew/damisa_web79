import "server-only";

import { createAdminClient } from "@/supabase/admin";
import {
  getOffices,
  getOrCreateOffice,
  assignAdminToOffice,
  unassignOffice,
} from "@/modules/super-admin/features/offices/services/offices.service";

import type { AdminRow } from "../types";

type AdminProfileRow = {
  id: string;
  name: string;
  role: "student" | "tutor" | "admin" | "super_admin";
  status: AdminRow["status"];
  staff_id: string | null;
  created_at: string;
};

function generateTemporaryPassword() {
  return `Welcome-${Math.random().toString(36).slice(2, 8)}`;
}

export async function getAdmins(): Promise<AdminRow[]> {
  const supabase = createAdminClient();

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, name, role, status, staff_id, created_at, office_id")
    .eq("role", "admin")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load admins: ${error.message}`);
  }

  const offices = await getOffices();

  return (
    (profiles ?? []) as (AdminProfileRow & {
      office_id: string | null;
    })[]
  ).map((profile) => {
    const office = offices.find((office) => office.id === profile.office_id);

    return {
      id: profile.id,
      name: profile.name,
      email: "",
      status: profile.status,
      staffId: profile.staff_id,
      createdAt: profile.created_at,
      officeId: profile.office_id,
      officeName: office?.name ?? null,
    };
  });
}

export async function createAdmin(input: {
  name: string;
  email: string;
  staffId: string;
  officeName?: string;
}): Promise<
  | { ok: true; temporaryPassword: string }
  | {
      ok: false;
      error: string;
      fieldErrors?: Partial<Record<string, string>>;
    }
> {
  const supabase = createAdminClient();

  let officeId: string | undefined;

  if (input.officeName) {
    const officeResult = await getOrCreateOffice(input.officeName);

    if (!officeResult.ok) {
      return {
        ok: false,
        error: officeResult.error,
        fieldErrors: {
          officeName: officeResult.error,
        },
      };
    }

    officeId = officeResult.office.id;
  }

  const temporaryPassword = generateTemporaryPassword();

  const { data, error } = await supabase.auth.admin.createUser({
    email: input.email,
    password: temporaryPassword,
    email_confirm: true,
    user_metadata: {
      name: input.name,
      staff_id: input.staffId,
    },
  });

  if (error || !data.user) {
    return {
      ok: false,
      error: error?.message ?? "Failed to create Admin account.",
    };
  }

  const userId = data.user.id;

  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      name: input.name,
      role: "admin",
      status: "active",
      staff_id: input.staffId,
      office_id: officeId ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (profileError) {
    return {
      ok: false,
      error: `Admin account was created, but the profile could not be configured: ${profileError.message}`,
    };
  }

  return {
    ok: true,
    temporaryPassword,
  };
}

export async function updateAdmin(
  id: string,
  input: {
    name: string;
    email: string;
    staffId: string;
    officeName?: string;
  },
): Promise<
  | { ok: true }
  | {
      ok: false;
      error: string;
      fieldErrors?: Partial<Record<string, string>>;
    }
> {
  const supabase = createAdminClient();

  const { error: authError } = await supabase.auth.admin.updateUserById(id, {
    email: input.email,
    user_metadata: {
      name: input.name,
      staff_id: input.staffId,
    },
  });

  if (authError) {
    return {
      ok: false,
      error: authError.message,
    };
  }

  const { data: currentProfile, error: profileLookupError } = await supabase
    .from("profiles")
    .select("office_id")
    .eq("id", id)
    .single();

  if (profileLookupError || !currentProfile) {
    return {
      ok: false,
      error: "Admin profile not found.",
    };
  }

  let officeId: string | null = null;

  if (input.officeName?.trim()) {
    const officeResult = await getOrCreateOffice(input.officeName);

    if (!officeResult.ok) {
      return {
        ok: false,
        error: officeResult.error,
        fieldErrors: {
          officeName: officeResult.error,
        },
      };
    }

    officeId = officeResult.office.id;
  }

  if (currentProfile.office_id && currentProfile.office_id !== officeId) {
    const unassignResult = await unassignOffice(currentProfile.office_id);

    if (!unassignResult.ok) {
      return {
        ok: false,
        error: unassignResult.error,
      };
    }
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      name: input.name,
      staff_id: input.staffId,
      office_id: officeId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("role", "admin");

  if (profileError) {
    return {
      ok: false,
      error: profileError.message,
    };
  }

  return { ok: true };
}

export async function setAdminStatus(
  id: string,
  status: AdminRow["status"],
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("profiles")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("role", "admin");

  if (error) {
    return {
      ok: false,
      error: error.message,
    };
  }

  return { ok: true };
}

export async function resetAdminPassword(
  id: string,
): Promise<
  { ok: true; temporaryPassword: string } | { ok: false; error: string }
> {
  const supabase = createAdminClient();

  const temporaryPassword = generateTemporaryPassword();

  const { error } = await supabase.auth.admin.updateUserById(id, {
    password: temporaryPassword,
  });

  if (error) {
    return {
      ok: false,
      error: error.message,
    };
  }

  return {
    ok: true,
    temporaryPassword,
  };
}
