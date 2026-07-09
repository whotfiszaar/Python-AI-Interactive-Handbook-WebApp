"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Cpu, Layers, HelpCircle } from "lucide-react";
import { systemDesignAnnexure, softwareConceptsAnnexure, systemDesignQuiz, softwareConceptsQuiz } from "@/data/annexures";
import { LessonContent } from "@/components/lesson/LessonContent";
import { QuizBlock } from "@/components/lesson/QuizBlock";

export function AnnexuresView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
            <Layers className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Course Annexures</h1>
            <p className="text-sm text-muted-foreground">
              Deep-dives into System Design and Software Concepts. Interactive diagrams, analogies, and code examples for core understanding.
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="mt-2">
          AI Theory Phase, Bonus Material
        </Badge>
      </div>

      {/* Annexure A: System Design */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Cpu className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Annexure A: System Design Theory</h2>
        </div>
        <LessonContent blocks={systemDesignAnnexure} />
      </Card>

      {/* Annexure A Quiz */}
      <div>
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-3">
          <HelpCircle className="h-5 w-5 text-primary" />
          Annexure A Quiz
        </h2>
        <QuizBlock questions={systemDesignQuiz} />
      </div>

      {/* Annexure B: Software Concepts */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Annexure B: Common Software Concepts</h2>
        </div>
        <LessonContent blocks={softwareConceptsAnnexure} />
      </Card>

      {/* Annexure B Quiz */}
      <div>
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-3">
          <HelpCircle className="h-5 w-5 text-primary" />
          Annexure B Quiz
        </h2>
        <QuizBlock questions={softwareConceptsQuiz} />
      </div>
    </div>
  );
}
