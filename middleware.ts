import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { AUTH_ROUTES } from "@/modules/auth/constants";
import { ROLE_HOME_PATH, type Role } from "@/shared/rbac";

const ROLE_PREFIXES: { prefix: string; role: Role }[] = [
  { prefix: "/student", role: "student" },
  { prefix: "/tutor", role: "tutor" },
  { prefix: "/admin", role: "admin" },
  { prefix: "/super-admin", role: "super_admin" },
];

const GUEST_ONLY_PATHS = [AUTH_ROUTES.login, AUTH_ROUTES.forgotPassword];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let role: Role | null = null;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, status")
      .eq("id", user.id)
      .single();

    if (profile?.status === "active") {
      role = profile.role as Role;
    }
  }

  const { pathname } = request.nextUrl;

  const matchedRolePrefix = ROLE_PREFIXES.find((entry) =>
    pathname.startsWith(entry.prefix),
  );

  const isGuestOnly = GUEST_ONLY_PATHS.some((path) =>
    pathname.startsWith(path),
  );

  if (matchedRolePrefix) {
    if (!role) {
      const loginUrl = new URL(AUTH_ROUTES.login, request.url);
      loginUrl.searchParams.set("from", pathname);

      return NextResponse.redirect(loginUrl);
    }

    if (role !== matchedRolePrefix.role) {
      return NextResponse.redirect(new URL(ROLE_HOME_PATH[role], request.url));
    }
  }

  if (isGuestOnly && role) {
    return NextResponse.redirect(new URL(ROLE_HOME_PATH[role], request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/student/:path*",
    "/tutor/:path*",
    "/admin/:path*",
    "/super-admin/:path*",
    "/login",
    "/forgot-password",
  ],
};
