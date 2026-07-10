import crypto from "crypto";

const QDRANT_HOST = "https://a191c4be-198c-4871-af6d-346ea8ec61fe.eu-central-1-0.aws.cloud.qdrant.io";
const QDRANT_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIiwic3ViamVjdCI6ImFwaS1rZXk6ZTllNTYyZjAtODdmNS00MzgyLWIwNGYtYjM1OTEzNDM4OTcwIn0.sefhkJBMQrRUijPq825jrge-vIVlwnvVAI4CcRvgC0M";
const COLLECTION_NAME = "user_interactions";
const VECTOR_SIZE = 384;
const DUMMY_VECTOR = new Array(VECTOR_SIZE).fill(0.0);

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Generate a deterministic UUID from a string key (for upsert-style state storage). */
function deterministicId(key: string): string {
  const hash = crypto.createHash("md5").update(key).digest("hex");
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}-${hash.slice(16, 20)}-${hash.slice(20, 32)}`;
}

/** Upsert one or more points to Qdrant. */
async function upsertPoints(points: object[]) {
  const res = await fetch(
    `${QDRANT_HOST}/collections/${COLLECTION_NAME}/points?wait=true`,
    {
      method: "PUT",
      headers: { "api-key": QDRANT_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ points }),
    }
  );
  if (!res.ok) {
    console.error("Qdrant upsert failed:", await res.text());
  }
}

/** Scroll all points matching a filter, handling pagination automatically. */
async function scrollAll(filter: object): Promise<any[]> {
  const allPoints: any[] = [];
  let offset: string | null = null;

  do {
    const body: Record<string, any> = {
      filter,
      limit: 250,
      with_payload: true,
      with_vector: false,
    };
    if (offset) body.offset = offset;

    const res = await fetch(
      `${QDRANT_HOST}/collections/${COLLECTION_NAME}/points/scroll`,
      {
        method: "POST",
        headers: { "api-key": QDRANT_API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      console.error("Qdrant scroll failed:", await res.text());
      break;
    }

    const data = await res.json();
    const points = data.result?.points ?? [];
    allPoints.push(...points);
    offset = data.result?.next_page_offset ?? null;
  } while (offset);

  return allPoints;
}

// ─── Collection Init ─────────────────────────────────────────────────────────

let _collectionReady = false;

export async function initQdrantCollection() {
  if (_collectionReady) return;
  try {
    const checkRes = await fetch(`${QDRANT_HOST}/collections/${COLLECTION_NAME}`, {
      method: "GET",
      headers: { "api-key": QDRANT_API_KEY },
    });

    if (!checkRes.ok) {
      const createRes = await fetch(`${QDRANT_HOST}/collections/${COLLECTION_NAME}`, {
        method: "PUT",
        headers: { "api-key": QDRANT_API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ vectors: { size: VECTOR_SIZE, distance: "Cosine" } }),
      });
      if (!createRes.ok) {
        console.error("Failed to create Qdrant collection:", await createRes.text());
        return;
      }
    }
    _collectionReady = true;
  } catch (error) {
    console.error("Error initializing Qdrant collection:", error);
  }
}

// ─── Generic Interaction Log (append-only, random ID) ───────────────────────

export async function logQdrantInteraction(
  userId: number,
  username: string,
  eventType: string,
  description: string,
  details: any = {}
) {
  try {
    await initQdrantCollection();
    await upsertPoints([
      {
        id: crypto.randomUUID(),
        vector: DUMMY_VECTOR,
        payload: {
          userId,
          username,
          eventType,
          description,
          timestamp: new Date().toISOString(),
          details: typeof details === "string" ? details : JSON.stringify(details),
        },
      },
    ]);
  } catch (error) {
    console.error("Error logging interaction to Qdrant:", error);
  }
}

// ─── Credential Backup ───────────────────────────────────────────────────────

export async function backupUserToQdrant(user: {
  id: number;
  username: string;
  passwordHash: string;
  name: string;
  securityQuestion: string;
  securityAnswer: string;
}) {
  try {
    await initQdrantCollection();
    const pointId = deterministicId(`${user.id}_credentials`);
    await upsertPoints([
      {
        id: pointId,
        vector: DUMMY_VECTOR,
        payload: {
          userId: user.id,
          username: user.username,
          eventType: "user_account_backup",
          description: `Credential backup for ${user.username}`,
          timestamp: new Date().toISOString(),
          details: JSON.stringify({
            passwordHash: user.passwordHash,
            name: user.name,
            securityQuestion: user.securityQuestion,
            securityAnswer: user.securityAnswer,
          }),
        },
      },
    ]);
  } catch (error) {
    console.error("Error backing up user to Qdrant:", error);
  }
}

// ─── Progress Backup ─────────────────────────────────────────────────────────

export async function backupProgressToQdrant(
  userId: number,
  username: string,
  dayNumber: number,
  data: {
    completed: boolean;
    bookmarked: boolean;
    notes: string;
    quizAnswers: string;
    lastVisited: string;
  }
) {
  try {
    await initQdrantCollection();
    const pointId = deterministicId(`${userId}_progress_${dayNumber}`);
    await upsertPoints([
      {
        id: pointId,
        vector: DUMMY_VECTOR,
        payload: {
          userId,
          username,
          eventType: "progress_state",
          dayNumber,
          completed: data.completed,
          bookmarked: data.bookmarked,
          notes: data.notes,
          quizAnswers: data.quizAnswers,
          lastVisited: data.lastVisited,
          updatedAt: new Date().toISOString(),
        },
      },
    ]);
  } catch (error) {
    console.error("Error backing up progress to Qdrant:", error);
  }
}

// ─── Assessment Backup ───────────────────────────────────────────────────────

export async function backupAssessmentToQdrant(
  userId: number,
  username: string,
  data: {
    localId: number;
    assessmentId: string;
    score: number;
    total: number;
    answers: string;
    completedAt: string;
  }
) {
  try {
    await initQdrantCollection();
    // Use deterministic ID based on localId so we don't duplicate on re-backup
    const pointId = deterministicId(`${userId}_assessment_${data.localId}`);
    await upsertPoints([
      {
        id: pointId,
        vector: DUMMY_VECTOR,
        payload: {
          userId,
          username,
          eventType: "assessment_score",
          localId: data.localId,
          assessmentId: data.assessmentId,
          score: data.score,
          total: data.total,
          answers: data.answers,
          completedAt: data.completedAt,
          updatedAt: new Date().toISOString(),
        },
      },
    ]);
  } catch (error) {
    console.error("Error backing up assessment to Qdrant:", error);
  }
}

// ─── Notebook Backup ─────────────────────────────────────────────────────────

export async function backupNotebookToQdrant(
  userId: number,
  username: string,
  data: {
    localId: number;
    name: string;
    cells: string;
    createdAt: string;
    updatedAt: string;
    deleted?: boolean;
  }
) {
  try {
    await initQdrantCollection();
    const pointId = deterministicId(`${userId}_notebook_${data.localId}`);
    await upsertPoints([
      {
        id: pointId,
        vector: DUMMY_VECTOR,
        payload: {
          userId,
          username,
          eventType: "notebook_state",
          localId: data.localId,
          name: data.name,
          cells: data.cells,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          deleted: data.deleted ?? false,
        },
      },
    ]);
  } catch (error) {
    console.error("Error backing up notebook to Qdrant:", error);
  }
}

// ─── Settings Backup ─────────────────────────────────────────────────────────

export async function backupSettingsToQdrant(
  userId: number,
  username: string,
  data: {
    darkMode: boolean;
    fontSize: number;
    apiKeys: string;
    studentName: string;
  }
) {
  try {
    await initQdrantCollection();
    const pointId = deterministicId(`${userId}_settings`);
    await upsertPoints([
      {
        id: pointId,
        vector: DUMMY_VECTOR,
        payload: {
          userId,
          username,
          eventType: "settings_state",
          darkMode: data.darkMode,
          fontSize: data.fontSize,
          apiKeys: data.apiKeys,
          studentName: data.studentName,
          updatedAt: new Date().toISOString(),
        },
      },
    ]);
  } catch (error) {
    console.error("Error backing up settings to Qdrant:", error);
  }
}

// ─── Full User Data Restore ───────────────────────────────────────────────────

/**
 * After syncing a user's credentials from Qdrant, restore ALL their data:
 * progress, assessments, notebooks, and settings.
 */
export async function restoreUserDataFromQdrant(
  userId: number,
  username: string,
  db: any
) {
  try {
    console.log(`Restoring all data for user ${username} (id=${userId}) from Qdrant...`);

    // 1. Restore settings
    const settingsPoints = await scrollAll({
      must: [
        { key: "userId", match: { value: userId } },
        { key: "eventType", match: { value: "settings_state" } },
      ],
    });
    if (settingsPoints.length > 0) {
      const s = settingsPoints[0].payload;
      await db.settings.upsert({
        where: { userId },
        update: {
          darkMode: s.darkMode ?? false,
          fontSize: s.fontSize ?? 16,
          apiKeys: s.apiKeys ?? "{}",
          studentName: s.studentName ?? username,
        },
        create: {
          userId,
          darkMode: s.darkMode ?? false,
          fontSize: s.fontSize ?? 16,
          apiKeys: s.apiKeys ?? "{}",
          studentName: s.studentName ?? username,
        },
      });
      console.log(`  ✓ Settings restored`);
    }

    // 2. Restore progress
    const progressPoints = await scrollAll({
      must: [
        { key: "userId", match: { value: userId } },
        { key: "eventType", match: { value: "progress_state" } },
      ],
    });
    for (const pt of progressPoints) {
      const p = pt.payload;
      await db.dayProgress.upsert({
        where: { dayNumber_userId: { dayNumber: p.dayNumber, userId } },
        update: {
          completed: p.completed ?? false,
          bookmarked: p.bookmarked ?? false,
          notes: p.notes ?? "",
          quizAnswers: p.quizAnswers ?? "{}",
          lastVisited: p.lastVisited ? new Date(p.lastVisited) : new Date(),
        },
        create: {
          dayNumber: p.dayNumber,
          userId,
          completed: p.completed ?? false,
          bookmarked: p.bookmarked ?? false,
          notes: p.notes ?? "",
          quizAnswers: p.quizAnswers ?? "{}",
          lastVisited: p.lastVisited ? new Date(p.lastVisited) : new Date(),
        },
      });
    }
    if (progressPoints.length > 0) console.log(`  ✓ ${progressPoints.length} progress records restored`);

    // 3. Restore assessment scores
    const assessmentPoints = await scrollAll({
      must: [
        { key: "userId", match: { value: userId } },
        { key: "eventType", match: { value: "assessment_score" } },
      ],
    });
    for (const pt of assessmentPoints) {
      const a = pt.payload;
      // Check if this score already exists by localId
      if (a.localId) {
        const existing = await db.assessmentScore.findUnique({ where: { id: a.localId } });
        if (!existing) {
          await db.assessmentScore.create({
            data: {
              id: a.localId,
              assessmentId: a.assessmentId,
              score: a.score ?? 0,
              total: a.total ?? 0,
              answers: a.answers ?? "{}",
              completedAt: a.completedAt ? new Date(a.completedAt) : new Date(),
              userId,
            },
          });
        }
      }
    }
    if (assessmentPoints.length > 0) console.log(`  ✓ ${assessmentPoints.length} assessment scores restored`);

    // 4. Restore notebooks (skip deleted ones)
    const notebookPoints = await scrollAll({
      must: [
        { key: "userId", match: { value: userId } },
        { key: "eventType", match: { value: "notebook_state" } },
      ],
    });
    for (const pt of notebookPoints) {
      const n = pt.payload;
      if (n.deleted) continue;
      if (n.localId) {
        const existing = await db.notebook.findUnique({ where: { id: n.localId } });
        if (!existing) {
          await db.notebook.create({
            data: {
              id: n.localId,
              name: n.name ?? "Untitled",
              cells: n.cells ?? "[]",
              createdAt: n.createdAt ? new Date(n.createdAt) : new Date(),
              updatedAt: n.updatedAt ? new Date(n.updatedAt) : new Date(),
              userId,
            },
          });
        }
      }
    }
    if (notebookPoints.length > 0) console.log(`  ✓ ${notebookPoints.filter((p: any) => !p.payload.deleted).length} notebooks restored`);

    console.log(`✅ All data restored for user ${username}`);
  } catch (error) {
    console.error("Error restoring user data from Qdrant:", error);
  }
}

// ─── Sync User From Qdrant (credentials + all data) ─────────────────────────

export async function syncUserFromQdrant(username: string): Promise<any> {
  try {
    const { db } = await import("./db");

    const points = await scrollAll({
      must: [
        { key: "eventType", match: { value: "user_account_backup" } },
        { key: "username", match: { value: username.trim().toLowerCase() } },
      ],
    });

    if (points.length === 0) return null;

    const payload = points[0].payload;
    let details: any = {};
    if (payload.details) {
      try {
        details = typeof payload.details === "string"
          ? JSON.parse(payload.details)
          : payload.details;
      } catch {}
    }

    // Recreate the user in local SQLite
    const createdUser = await db.user.create({
      data: {
        id: payload.userId,
        username: payload.username,
        passwordHash: details.passwordHash || "",
        name: details.name || "",
        securityQuestion: details.securityQuestion || "",
        securityAnswer: details.securityAnswer || "",
      },
    });

    // Create default settings (will be overwritten if backup exists)
    await db.settings.upsert({
      where: { userId: createdUser.id },
      update: { studentName: createdUser.name },
      create: {
        userId: createdUser.id,
        darkMode: false,
        fontSize: 16,
        apiKeys: "{}",
        studentName: createdUser.name,
      },
    });

    // Restore ALL user data from Qdrant
    await restoreUserDataFromQdrant(createdUser.id, createdUser.username, db);

    console.log(`Successfully synced user ${username} from Qdrant to SQLite.`);
    return createdUser;
  } catch (error) {
    console.error("Error syncing user from Qdrant:", error);
    return null;
  }
}

// ─── Admin Users List ────────────────────────────────────────────────────────

export async function getAllUsersFromQdrant(): Promise<any[]> {
  try {
    const points = await scrollAll({
      must: [{ key: "eventType", match: { value: "user_account_backup" } }],
    });

    return points.map((p: any) => {
      const payload = p.payload;
      let details: any = {};
      if (payload.details) {
        try {
          details = typeof payload.details === "string"
            ? JSON.parse(payload.details)
            : payload.details;
        } catch {}
      }
      return {
        id: payload.userId,
        username: payload.username,
        name: details.name || "",
        securityQuestion: details.securityQuestion || "",
        timestamp: payload.timestamp,
      };
    });
  } catch (error) {
    console.error("Error listing users from Qdrant:", error);
    return [];
  }
}

// ─── Delete User From Qdrant ─────────────────────────────────────────────────

export async function deleteUserFromQdrant(username: string): Promise<boolean> {
  try {
    const res = await fetch(
      `${QDRANT_HOST}/collections/${COLLECTION_NAME}/points/delete`,
      {
        method: "POST",
        headers: { "api-key": QDRANT_API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({
          filter: {
            must: [{ key: "username", match: { value: username.trim().toLowerCase() } }],
          },
        }),
      }
    );
    if (!res.ok) {
      console.error("Qdrant delete user failed:", await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error deleting user from Qdrant:", error);
    return false;
  }
}
