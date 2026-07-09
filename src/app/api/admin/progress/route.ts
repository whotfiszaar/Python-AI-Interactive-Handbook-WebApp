import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-auth";

/** GET /api/admin/progress - view all user progress (admin only) */
export async function GET(req: Request) {
  if (!(await isAdminAuthorized(req))) return unauthorizedResponse();
  try {
    const [progress, scores, notebooks, settings] = await Promise.all([
      db.dayProgress.findMany({ orderBy: { dayNumber: "asc" } }),
      db.assessmentScore.findMany({ orderBy: { completedAt: "desc" } }),
      db.notebook.count(),
      db.settings.findUnique({ where: { id: 1 } }),
    ]);

    const completedDays = progress.filter((p) => p.completed).length;
    const totalDays = progress.length;
    const passedAssessments = scores.filter((s) => {
      const pct = Math.round((s.score / s.total) * 100);
      return pct >= 70;
    }).length;

    return NextResponse.json({
      summary: {
        studentName: settings?.studentName ?? "Unknown",
        totalDays,
        completedDays,
        completionPct: totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0,
        totalAssessments: scores.length,
        passedAssessments,
        totalNotebooks: notebooks,
        lastActivity: progress
          .map((p) => p.lastVisited)
          .sort((a, b) => b.getTime() - a.getTime())[0],
      },
      progress,
      scores,
    });
  } catch (e) {
    console.error("GET /api/admin/progress error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
