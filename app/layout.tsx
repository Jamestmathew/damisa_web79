import type { Metadata } from "next";

import { getOptionalSession } from "@/modules/auth/lib/route-guard";
import { authService } from "@/modules/auth/services";
import { SessionProvider } from "@/modules/auth/hooks/session-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "App",
  description: "Production app with a self-contained Authentication module",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getOptionalSession();
  const user = session ? await authService.getUserByEmail(session.email) : null;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <SessionProvider user={user}>{children}</SessionProvider>
      </body>
    </html>
  );
}
