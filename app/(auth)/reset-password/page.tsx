import type { Metadata } from "next";

import { AuthCard, AuthHeader, ResetPasswordForm } from "@/modules/auth";

export const metadata: Metadata = { title: "Reset password" };

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token } = await searchParams;

  return (
    <AuthCard>
      <AuthHeader title="Reset your password" description="Choose a new password for your account" />
      <ResetPasswordForm token={token ?? ""} />
    </AuthCard>
  );
}
