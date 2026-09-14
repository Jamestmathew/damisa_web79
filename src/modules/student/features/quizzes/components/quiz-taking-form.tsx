"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormStatusMessage } from "@/modules/auth/components/ui";

import { submitQuizAction } from "../actions/submit-quiz.action";
import type { QuizDetails, QuizResult } from "../types";

import { QuizResultCard } from "./quiz-result-card";

interface QuizTakingFormProps {
  quiz: QuizDetails;
}

export function QuizTakingForm({ quiz }: QuizTakingFormProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const allAnswered = quiz.questions.every((q) => Boolean(answers[q.id]));

  function handleSubmit() {
    setError(null);
    startTransition(async () => {
      const response = await submitQuizAction(quiz.id, answers);
      if (!response.ok) {
        setError(response.error);
        return;
      }
      setResult(response.data);
    });
  }

  if (result) {
    return <QuizResultCard result={result} />;
  }

  return (
    <div className="space-y-4">
      {error ? <FormStatusMessage variant="error" message={error} /> : null}

      {quiz.questions.map((question, index) => (
        <Card key={question.id}>
          <CardContent className="space-y-3 p-5">
            <p className="text-sm font-medium text-foreground">
              {index + 1}. {question.prompt}
            </p>
            <div className="space-y-2">
              {question.options.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-input px-3 py-2 text-sm has-[:checked]:border-primary has-[:checked]:bg-secondary"
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.id}
                    checked={answers[question.id] === option.id}
                    onChange={() => setAnswers((prev) => ({ ...prev, [question.id]: option.id }))}
                    className="h-4 w-4 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={handleSubmit} disabled={!allAnswered || isPending}>
        {isPending ? "Submitting..." : "Submit quiz"}
      </Button>
    </div>
  );
}
