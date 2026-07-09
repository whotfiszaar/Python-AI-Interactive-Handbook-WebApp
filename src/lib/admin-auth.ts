import { db } from "@/lib/db";

/**
 * Admin authentication helper.
 * Checks the admin password from the request body or header against the
 * stored admin password in the Settings table.
 */
export async function isAdminAuthorized(
  req: Request,
): Promise<boolean> {
  try {
    // Check Authorization header: Bearer <password>
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      const settings = await db.settings.findUnique({ where: { id: 1 } });
      return settings?.adminPassword === token;
    }
    // Also check x-admin-password header
    const adminPw = req.headers.get("x-admin-password");
    if (adminPw) {
      const settings = await db.settings.findUnique({ where: { id: 1 } });
      return settings?.adminPassword === adminPw;
    }
    return false;
  } catch {
    return false;
  }
}

export function unauthorizedResponse() {
  return Response.json(
    { error: "Unauthorized. Admin password required." },
    { status: 401 },
  );
}
