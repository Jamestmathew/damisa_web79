import Link from "next/link";
import { CheckCircle2, Circle, PlayCircle } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { STUDENT_ROUTES } from "@/modules/student/shared/constants";
import type { CourseModule } from "../types";

export function CourseModulesList({
  courseId,
  modules,
}: {
  courseId: string;
  modules: CourseModule[];
}) {
  return (
    <div className="space-y-4">
      {modules.map((module) => {
        const isComplete = module.completedLessonCount === module.lessonCount;

        return (
          <Card key={module.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">{module.title}</CardTitle>
              <span className="text-xs text-muted-foreground">
                {module.completedLessonCount}/{module.lessonCount} lessons
              </span>
            </CardHeader>
            <CardContent>
              <Link
                href={STUDENT_ROUTES.lesson(courseId, `${module.id}-lesson-1`)}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                {isComplete ? (
                  <CheckCircle2 className="size-4" />
                ) : module.completedLessonCount > 0 ? (
                  <PlayCircle className="size-4" />
                ) : (
                  <Circle className="size-4" />
                )}
                {isComplete ? "Review module" : "Continue module"}
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
