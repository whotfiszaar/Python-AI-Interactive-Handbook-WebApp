"use client";

import { useMemo, useState } from "react";
import { useAppStore } from "@/lib/store";
import { useProgress } from "@/hooks/useProgress";
import { days, phaseMeta } from "@/data/days";
import { assessments } from "@/data/assessments";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Certificate } from "@/components/assessment/Certificate";
import { computeStreak, percentage, formatDate } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { Award, TrendingUp, Flame, CheckCircle2, Download } from "lucide-react";

const phases: Array<"python" | "theory" | "practical"> = [
  "python",
  "theory",
  "practical",
];

export function ProgressView() {
  const navigate = useAppStore((s) => s.navigate);
  const scores = useAppStore((s) => s.scores);
  const { progress } = useProgress();
  const displayName = useAppStore((s) => s.displayName);
  const [showCert, setShowCert] = useState(false);

  const completedCount = days.filter(
    (d) => progress[d.dayNumber]?.completed,
  ).length;
  const pct = percentage(completedCount, days.length);
  const streak = computeStreak(
    Object.values(progress).map((p) => p.lastVisited),
  );

  // weeks bar chart (days 1-48 grouped into ~7 day weeks)
  const weekData = useMemo(() => {
    const weeks = [];
    for (let w = 0; w < 7; w++) {
      const start = w * 7 + 1;
      const end = Math.min(start + 6, 48);
      if (start > 48) break;
      const completed = days
        .filter((d) => d.dayNumber >= start && d.dayNumber <= end)
        .filter((d) => progress[d.dayNumber]?.completed).length;
      weeks.push({
        name: `W${w + 1}`,
        days: `${start}-${end}`,
        completed,
      });
    }
    return weeks;
  }, [progress]);

  // streak calendar (last ~12 weeks, like GitHub)
  const streakCalendar = useMemo(() => {
    const cells: { date: Date; studied: boolean }[] = [];
    const studiedDays = new Set(
      Object.values(progress).map((p) => new Date(p.lastVisited).toISOString().slice(0, 10)),
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // 12 weeks = 84 days
    for (let i = 83; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      cells.push({
        date: d,
        studied: studiedDays.has(d.toISOString().slice(0, 10)),
      });
    }
    return cells;
  }, [progress]);

  // assessment scores over time
  const scoreData = useMemo(() => {
    return [...scores]
      .sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime())
      .map((s) => ({
        name: assessments.find((a) => a.id === s.assessmentId)?.title.slice(0, 12) ?? s.assessmentId,
        pct: percentage(s.score, s.total),
        date: formatDate(s.completedAt),
      }));
  }, [scores]);

  const allDaysComplete = completedCount === days.length;
  const passedAssessments = assessments.filter((a) => {
    const matching = scores.filter((s) => s.assessmentId === a.id);
    return matching.some((s) => percentage(s.score, s.total) >= a.passingScore);
  });
  const allAssessmentsPassed = passedAssessments.length === assessments.length;
  const canGetCert = allDaysComplete && allAssessmentsPassed;

  if (showCert) {
    return (
      <div className="space-y-4">
        <Button variant="outline" size="sm" onClick={() => setShowCert(false)}>
          Back to progress
        </Button>
        <Certificate
          studentName={displayName}
          courseTitle="Python & AI Handbook: 48-Day Course"
          completionDate={new Date()}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Your progress</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your journey through all 48 days and assessments.
          </p>
        </div>
        {canGetCert && (
          <Button onClick={() => setShowCert(true)} className="gap-2">
            <Award className="h-4 w-4" />
            Generate certificate
          </Button>
        )}
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="p-4 sm:p-5 flex flex-col items-center">
          {/* Circular progress - responsive, fits within the card */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-muted"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={`${(pct / 100) * 263.9} 263.9`}
                strokeDashoffset="0"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                className="text-emerald-500 transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg sm:text-2xl font-bold">{pct}%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Overall completion
          </p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-amber-600 mb-2">
            <Flame className="h-5 w-5" />
            <span className="text-3xl font-bold text-foreground">{streak}</span>
          </div>
          <p className="text-xs text-muted-foreground">day streak</p>
          <p className="text-[10px] text-muted-foreground mt-1">
            Keep visiting daily to grow it
          </p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-3xl font-bold text-foreground">
              {completedCount}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">days complete</p>
          <p className="text-[10px] text-muted-foreground mt-1">
            of {days.length} total
          </p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <TrendingUp className="h-5 w-5" />
            <span className="text-3xl font-bold text-foreground">
              {passedAssessments.length}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">tests passed</p>
          <p className="text-[10px] text-muted-foreground mt-1">
            of {assessments.length} total
          </p>
        </Card>
      </div>

      {/* Phase breakdown */}
      <Card className="p-5">
        <h2 className="text-sm font-semibold mb-4">Phase breakdown</h2>
        <div className="space-y-3">
          {phases.map((phase) => {
            const phaseDays = days.filter((d) => d.phase === phase);
            const done = phaseDays.filter(
              (d) => progress[d.dayNumber]?.completed,
            ).length;
            const meta = phaseMeta[phase];
            return (
              <div key={phase}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">{meta.label}</span>
                  <span className="text-muted-foreground text-xs">
                    {done} / {phaseDays.length}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${percentage(done, phaseDays.length)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Weekly bar chart */}
      <Card className="p-5">
        <h2 className="text-sm font-semibold mb-4">Days completed per week</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={weekData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-xs" stroke="currentColor" />
            <YAxis domain={[0, 7]} className="text-xs" stroke="currentColor" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              labelFormatter={(l) => {
                const item = weekData.find((w) => w.name === l);
                return `Days ${item?.days}`;
              }}
            />
            <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Streak calendar */}
      <Card className="p-5">
        <h2 className="text-sm font-semibold mb-1">Study streak</h2>
        <p className="text-xs text-muted-foreground mb-4">
          Each square is a day. Green means you visited a lesson that day.
        </p>
        <div className="flex flex-wrap gap-1">
          {streakCalendar.map((c, i) => (
            <div
              key={i}
              title={`${formatDate(c.date)}${c.studied ? " - studied" : ""}`}
              className={`h-3 w-3 rounded-sm ${
                c.studied ? "bg-emerald-500" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </Card>

      {/* Assessment scores over time */}
      {scoreData.length > 0 && (
        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-4">Assessment scores over time</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={scoreData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" stroke="currentColor" />
              <YAxis domain={[0, 100]} className="text-xs" stroke="currentColor" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="pct"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Certificate eligibility */}
      <Card className="p-5">
        <div className="flex items-start gap-3">
          <Award className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h2 className="text-sm font-semibold mb-1">Certificate eligibility</h2>
            {canGetCert ? (
              <>
                <p className="text-sm text-emerald-600 font-medium mb-3">
                  Congratulations! You have completed all days and passed all assessments.
                </p>
                <Button onClick={() => setShowCert(true)} className="gap-2">
                  <Download className="h-4 w-4" />
                  Generate certificate
                </Button>
              </>
            ) : (
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  {allDaysComplete ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className={allDaysComplete ? "text-emerald-600" : "text-muted-foreground"}>
                    Complete all 48 days ({completedCount}/{days.length})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {allAssessmentsPassed ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className={allAssessmentsPassed ? "text-emerald-600" : "text-muted-foreground"}>
                    Pass all assessments ({passedAssessments.length}/{assessments.length})
                  </span>
                </div>
                {!allDaysComplete && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => navigate("days")}
                  >
                    Continue lessons
                  </Button>
                )}
                {!allAssessmentsPassed && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 ml-2"
                    onClick={() => navigate("assessments")}
                  >
                    Take assessments
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
