import { FileText, PlayCircle, Paperclip } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { LessonDetails } from "../types";

const CONTENT_ICON = {
  video: PlayCircle,
  reading: FileText,
  resource: Paperclip,
} as const;

export function LessonPlayer({ lesson }: { lesson: LessonDetails }) {
  const Icon = CONTENT_ICON[lesson.contentType];

  return (
    <Card>
      {lesson.contentType === "video" ? (
        <div className="flex aspect-video items-center justify-center rounded-t-lg bg-foreground/90">
          <Icon className="size-12 text-background/80" />
        </div>
      ) : null}
      <CardContent className="space-y-3 p-6">
        {lesson.contentType !== "video" && (
          <Icon className="size-6 text-muted-foreground" />
        )}
        <h2 className="text-lg font-semibold text-foreground">{lesson.title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{lesson.body}</p>
      </CardContent>
    </Card>
  );
}
