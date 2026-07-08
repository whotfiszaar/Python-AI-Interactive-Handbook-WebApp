"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAppStore } from "@/lib/store";
import { useProgress } from "@/hooks/useProgress";
import { getDay, phaseMeta } from "@/data/days";
import { personalizeDay } from "@/hooks/useSubstitute";
import { getVideosForDay, type YouTubeVideo } from "@/data/youtube";
import { LessonContent } from "@/components/lesson/LessonContent";
import { QuizBlock } from "@/components/lesson/QuizBlock";
import { ExerciseBlock } from "@/components/lesson/ExerciseBlock";
import { DayNavigation } from "@/components/lesson/DayNavigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  CheckCircle2,
  Circle,
  Bookmark,
  GraduationCap,
  ChevronDown,
  Target,
  HelpCircle,
  Dumbbell,
  Lightbulb,
  Wrench,
  Terminal,
  AlertCircle,
  Youtube,
  Play,
} from "lucide-react";
import { cn, daysAgo } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { YouTubeEmbed } from "@/components/references/YouTubeEmbed";

export function DayDetailView() {
  const dayNumber = useAppStore((s) => s.dayNumber) ?? 1;
  const navigate = useAppStore((s) => s.navigate);
  const studentName = useAppStore((s) => s.studentName);
  const { progress, toggleComplete, toggleBookmark, saveNotes } = useProgress();

  const rawDay = getDay(dayNumber);
  // Personalize the day whenever the student's name changes (memoized).
  const day = useMemo(
    () => (rawDay ? personalizeDay(rawDay, studentName) : undefined),
    [rawDay, studentName],
  );
  const p = progress[dayNumber];
  const [notes, setNotes] = useState(p?.notes ?? "");
  const [notesOpen, setNotesOpen] = useState(Boolean(p?.notes));
  const [trackedDay, setTrackedDay] = useState(dayNumber);
  const notesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset local state when navigating to a different day (render-time adjustment).
  if (trackedDay !== dayNumber) {
    setTrackedDay(dayNumber);
    const newP = progress[dayNumber];
    setNotes(newP?.notes ?? "");
    setNotesOpen(Boolean(newP?.notes));
  }

  // Record the visit (async, no synchronous setState).
  useEffect(() => {
    const current = progress[dayNumber];
    void saveNotes(dayNumber, current?.notes ?? "");
  }, [dayNumber]);

  if (!day) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Day not found.</p>
        <Button onClick={() => navigate("days")} className="mt-4">
          Back to all days
        </Button>
      </div>
    );
  }

  const meta = phaseMeta[day.phase];

  const handleNotesChange = (value: string) => {
    setNotes(value);
    if (notesTimer.current) clearTimeout(notesTimer.current);
    notesTimer.current = setTimeout(() => {
      void saveNotes(dayNumber, value);
    }, 800);
  };

  const handleComplete = async () => {
    const row = await toggleComplete(dayNumber);
    if (row?.completed) toast.success(`Day ${dayNumber} marked complete!`);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigate("home")}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigate("days")}>Days</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Day {dayNumber}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className={cn("text-xs", meta.color)}>
              {meta.label}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Day {dayNumber} of 48
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{day.title}</h1>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => toggleBookmark(dayNumber)}
          >
            <Bookmark
              className={cn(
                "h-4 w-4",
                p?.bookmarked && "fill-amber-400 text-amber-400",
              )}
            />
            <span className="hidden sm:inline">Bookmark</span>
          </Button>
          <Button
            size="sm"
            className="gap-1.5"
            variant={p?.completed ? "secondary" : "default"}
            onClick={handleComplete}
          >
            {p?.completed ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="hidden sm:inline">Completed</span>
              </>
            ) : (
              <>
                <Circle className="h-4 w-4" />
                <span className="hidden sm:inline">Mark complete</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Objectives */}
      {day.objectives.length > 0 && (
        <Card className="p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold mb-3">
            <Target className="h-4 w-4 text-primary" />
            Learning objectives
          </h2>
          <ol className="list-decimal list-inside space-y-1.5 text-sm text-foreground/90">
            {day.objectives.map((obj, i) => (
              <li key={i} className="leading-relaxed">
                {obj}
              </li>
            ))}
          </ol>
        </Card>
      )}

      {/* Video lesson banner - opens player in-place */}
      {(() => {
        const dayVideos = getVideosForDay(dayNumber);
        if (dayVideos.length === 0) return null;
        return (
          <Card className="p-4 border-red-200 dark:border-red-900/60 bg-red-50/40 dark:bg-red-950/10">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white shrink-0">
                <Youtube className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">Watch a video lesson</p>
                <p className="text-xs text-muted-foreground mb-2">
                  Curated YouTube videos for this topic. Plays right here in the handbook.
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {dayVideos.map((v) => (
                    <YouTubeEmbed key={v.id} video={v} />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        );
      })()}

      {/* Main content */}
      <article>
        <LessonContent blocks={day.content} />
      </article>

      {/* Theory day extras */}
      {day.phase === "theory" && (
        <div className="space-y-4">
          {day.explainToFriend && (
            <Card className="p-5 border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20">
              <h2 className="flex items-center gap-2 text-sm font-semibold mb-2 text-blue-700 dark:text-blue-400">
                <Lightbulb className="h-4 w-4" />
                Explain it to a friend
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {day.explainToFriend}
              </p>
            </Card>
          )}
          {day.realWorldExamples && day.realWorldExamples.length > 0 && (
            <Card className="p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold mb-3">
                <Target className="h-4 w-4 text-emerald-500" />
                Real world examples
              </h2>
              <ul className="space-y-1.5 text-sm text-foreground/90">
                {day.realWorldExamples.map((ex, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-emerald-500 shrink-0">•</span>
                    <span className="leading-relaxed">{ex}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
          {day.thingsToGoogle && day.thingsToGoogle.length > 0 && (
            <Card className="p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold mb-3">
                <Terminal className="h-4 w-4 text-violet-500" />
                Things to Google (with a grown-up)
              </h2>
              <div className="flex flex-wrap gap-2">
                {day.thingsToGoogle.map((g, i) => (
                  <a
                    key={i}
                    href={`https://www.google.com/search?q=${encodeURIComponent(g)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-muted hover:bg-accent transition-colors"
                  >
                    {g}
                  </a>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Practical day extras */}
      {day.phase === "practical" && (
        <div className="space-y-4">
          {day.setupInstructions && (
            <Card className="p-5 border-violet-200 dark:border-violet-900 bg-violet-50/50 dark:bg-violet-950/20">
              <h2 className="flex items-center gap-2 text-sm font-semibold mb-2 text-violet-700 dark:text-violet-400">
                <Wrench className="h-4 w-4" />
                Setup instructions
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                {day.setupInstructions}
              </p>
            </Card>
          )}
          {day.expectedOutput && (
            <Card className="p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold mb-2">
                <Terminal className="h-4 w-4 text-emerald-500" />
                Expected output
              </h2>
              <pre className="text-xs font-mono bg-muted p-3 rounded-md whitespace-pre-wrap text-foreground/80">
                {day.expectedOutput}
              </pre>
            </Card>
          )}
          {day.debugging && day.debugging.length > 0 && (
            <Card className="p-5 border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/20">
              <h2 className="flex items-center gap-2 text-sm font-semibold mb-3 text-amber-700 dark:text-amber-400">
                <AlertCircle className="h-4 w-4" />
                Debugging tips
              </h2>
              <ul className="space-y-1.5 text-sm text-foreground/80">
                {day.debugging.map((d, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-amber-500 shrink-0">•</span>
                    <span className="leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      )}

      {/* Exercises */}
      {day.exercises && day.exercises.length > 0 && (
        <section>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-3">
            <Dumbbell className="h-5 w-5 text-primary" />
            Exercises
          </h2>
          <ExerciseBlock exercises={day.exercises} />
        </section>
      )}

      {/* Quiz */}
      {day.quiz.length > 0 && (
        <section>
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-3">
            <HelpCircle className="h-5 w-5 text-primary" />
            Quick quiz
          </h2>
          <QuizBlock questions={day.quiz} />
        </section>
      )}

      {/* Teacher notes */}
      {day.teacherNotes && (
        <Collapsible className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50/30 dark:bg-blue-950/10">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2 p-4 h-auto rounded-lg">
              <GraduationCap className="h-5 w-5 text-blue-500 shrink-0" />
              <span className="font-semibold text-sm text-blue-700 dark:text-blue-400">
                Teacher notes (for the instructor)
              </span>
              <ChevronDown className="h-4 w-4 ml-auto text-muted-foreground" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-4 pb-4">
              <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                {day.teacherNotes}
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Personal notes */}
      <Card className="p-5">
        <Collapsible open={notesOpen} onOpenChange={setNotesOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2 p-0 h-auto">
              <span className="font-semibold text-sm">My notes for this day</span>
              <ChevronDown className="h-4 w-4 ml-auto text-muted-foreground" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Textarea
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="Write your own notes here. They save automatically."
              className="mt-3 min-h-[120px]"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {notes ? "Saved automatically" : "Notes save as you type."}
              {p?.lastVisited && ` • Last visited ${daysAgo(p.lastVisited)}`}
            </p>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      <DayNavigation dayNumber={dayNumber} />
    </div>
  );
}
