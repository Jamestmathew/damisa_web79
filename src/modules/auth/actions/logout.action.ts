"use server";

import { redirect } from "next/navigation";

import { AUTH_ROUTES } from "@/modules/auth/constants";
import { createClient } from "@/supabase/server";

export async function logoutAction(): Promise<void> {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect(AUTH_ROUTES.afterLogout);
}
