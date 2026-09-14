"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { saveAttendanceAction } from "../actions/save-attendance.action";
import type { AttendanceMark, AttendanceSession } from "../types";

const MARK_OPTIONS: { value: AttendanceMark; label: string }[] = [
  { value: "present", label: "Present" },
  { value: "late", label: "Late" },
  { value: "absent", label: "Absent" },
];

export function AttendanceMarker({ session }: { session: AttendanceSession }) {
  const router = useRouter();
  const [marks, setMarks] = useState<Record<string, AttendanceMark>>(
    Object.fromEntries(session.students.map((s) => [s.studentId, s.mark]))
  );
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(false);
    startTransition(async () => {
      const result = await saveAttendanceAction(session.courseId, marks);
      if (result.ok) {
        setSaved(true);
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-3">
      {session.students.map((student) => (
        <Card key={student.studentId}>
          <CardContent className="flex items-center justify-between gap-4 p-4">
            <p className="font-medium text-foreground">{student.studentName}</p>
            <div className="flex gap-1">
              {MARK_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setMarks((prev) => ({ ...prev, [student.studentId]: option.value }))}
                  className={cn(
                    "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                    marks[student.studentId] === option.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input text-muted-foreground hover:bg-accent"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} disabled={isPending}>
          {isPending ? "Saving..." : "Save attendance"}
        </Button>
        {saved ? <span className="text-sm text-success">Saved.</span> : null}
      </div>
    </div>
  );
}
