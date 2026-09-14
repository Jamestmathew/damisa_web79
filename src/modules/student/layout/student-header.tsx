import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logoutAction } from "@/modules/auth/actions/logout.action";

import { StudentMobileNav } from "./student-mobile-nav";
import { StudentBreadcrumbs } from "./student-breadcrumbs";

interface StudentHeaderProps {
  studentName: string;
  studentEmail: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function StudentHeader({ studentName, studentEmail }: StudentHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b border-border bg-background/95 px-4 backdrop-blur">
      <div className="flex items-center gap-2">
        <StudentMobileNav />
        <StudentBreadcrumbs />
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium leading-none text-foreground">{studentName}</p>
          <p className="text-xs text-muted-foreground">{studentEmail}</p>
        </div>
        <Avatar>
          <AvatarFallback>{initials(studentName)}</AvatarFallback>
        </Avatar>
        <form action={logoutAction}>
          <Button type="submit" variant="ghost" size="icon" aria-label="Log out">
            <LogOut className="size-4" />
          </Button>
        </form>
      </div>
    </header>
  );
}
