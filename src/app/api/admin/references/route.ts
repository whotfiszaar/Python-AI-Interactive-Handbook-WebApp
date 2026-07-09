import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-auth";

export async function GET(req: Request) {
  if (!(await isAdminAuthorized(req))) return unauthorizedResponse();
  const sections = await db.referenceSection.findMany({
    orderBy: { sortOrder: "asc" },
    include: { items: { orderBy: { sortOrder: "asc" } } },
  });
  return NextResponse.json(sections);
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthorized(req))) return unauthorizedResponse();
  try {
    const body = await req.json();
    const created = await db.referenceSection.create({
      data: {
        sectionId: body.sectionId,
        title: body.title ?? "",
        description: body.description ?? "",
        kind: body.kind ?? "snippets",
        sortOrder: body.sortOrder ?? 0,
        ...(body.items && body.items.length > 0
          ? {
              items: {
                create: body.items.map(
                  (item: Record<string, unknown>, i: number) => ({
                    term: (item.term as string) ?? "",
                    syntax: (item.syntax as string) ?? "",
                    example: (item.example as string) ?? "",
                    description: (item.description as string) ?? "",
                    code: (item.code as string) ?? "",
                    language: (item.language as string) ?? "python",
                    sortOrder: i,
                  }),
                ),
              },
            }
          : {}),
      },
      include: { items: true },
    });
    return NextResponse.json(created);
  } catch (e) {
    console.error("POST /api/admin/references error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
