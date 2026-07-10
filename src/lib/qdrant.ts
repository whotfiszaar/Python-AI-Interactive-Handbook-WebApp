import crypto from "crypto";

const QDRANT_HOST = "https://a191c4be-198c-4871-af6d-346ea8ec61fe.eu-central-1-0.aws.cloud.qdrant.io";
const QDRANT_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIiwic3ViamVjdCI6ImFwaS1rZXk6ZTllNTYyZjAtODdmNS00MzgyLWIwNGYtYjM1OTEzNDM4OTcwIn0.sefhkJBMQrRUijPq825jrge-vIVlwnvVAI4CcRvgC0M";
const COLLECTION_NAME = "user_interactions";
const VECTOR_SIZE = 384;

/**
 * Initialize Qdrant collection if it does not exist.
 */
export async function initQdrantCollection() {
  try {
    const checkRes = await fetch(`${QDRANT_HOST}/collections/${COLLECTION_NAME}`, {
      method: "GET",
      headers: {
        "api-key": QDRANT_API_KEY,
      },
    });

    if (checkRes.ok) {
      console.log(`Qdrant collection '${COLLECTION_NAME}' already exists.`);
      return;
    }

    console.log(`Qdrant collection '${COLLECTION_NAME}' does not exist. Creating...`);
    const createRes = await fetch(`${QDRANT_HOST}/collections/${COLLECTION_NAME}`, {
      method: "PUT",
      headers: {
        "api-key": QDRANT_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vectors: {
          size: VECTOR_SIZE,
          distance: "Cosine",
        },
      }),
    });

    if (!createRes.ok) {
      const errText = await createRes.text();
      console.error(`Failed to create Qdrant collection: ${errText}`);
    } else {
      console.log(`Successfully created Qdrant collection '${COLLECTION_NAME}'.`);
    }
  } catch (error) {
    console.error("Error initializing Qdrant collection:", error);
  }
}

/**
 * Log a user interaction to Qdrant Vector DB.
 */
export async function logQdrantInteraction(
  userId: number,
  username: string,
  eventType: string,
  description: string,
  details: any = {}
) {
  try {
    // Make sure collection exists
    await initQdrantCollection();

    const pointId = crypto.randomUUID();
    // 384-dimensional zero vector as a dummy vector for metadata indexing
    const dummyVector = new Array(VECTOR_SIZE).fill(0.0);

    const payload = {
      userId,
      username,
      eventType,
      description,
      timestamp: new Date().toISOString(),
      details: typeof details === "string" ? details : JSON.stringify(details),
    };

    const res = await fetch(`${QDRANT_HOST}/collections/${COLLECTION_NAME}/points?wait=true`, {
      method: "PUT",
      headers: {
        "api-key": QDRANT_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        points: [
          {
            id: pointId,
            vector: dummyVector,
            payload: payload,
          },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`Failed to log interaction to Qdrant: ${errText}`);
    } else {
      console.log(`Log interaction successfully upserted to Qdrant (ID: ${pointId})`);
    }
  } catch (error) {
    console.error("Error logging interaction to Qdrant:", error);
  }
}

/**
 * Back up user credentials to Qdrant.
 */
export async function backupUserToQdrant(user: {
  id: number;
  username: string;
  passwordHash: string;
  name: string;
  securityQuestion: string;
  securityAnswer: string;
}) {
  await logQdrantInteraction(
    user.id,
    user.username,
    "user_account_backup",
    `Backup credentials for user: ${user.username}`,
    {
      passwordHash: user.passwordHash,
      name: user.name,
      securityQuestion: user.securityQuestion,
      securityAnswer: user.securityAnswer
    }
  );
}

/**
 * Retrieve and reconstruct a user from Qdrant backup if missing from local SQLite.
 */
export async function syncUserFromQdrant(username: string): Promise<any> {
  try {
    const { db } = await import("./db");
    
    const res = await fetch(`${QDRANT_HOST}/collections/${COLLECTION_NAME}/points/scroll`, {
      method: "POST",
      headers: {
        "api-key": QDRANT_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          must: [
            { key: "eventType", match: { value: "user_account_backup" } },
            { key: "username", match: { value: username.trim().toLowerCase() } }
          ]
        },
        limit: 1,
        with_payload: true
      }),
    });

    if (!res.ok) {
      console.error(`Qdrant scroll failed: ${await res.text()}`);
      return null;
    }

    const data = await res.json();
    const point = data.result?.points?.[0];
    if (!point) return null;

    const payload = point.payload;
    let details: any = {};
    if (payload.details) {
      try {
        details = typeof payload.details === "string" ? JSON.parse(payload.details) : payload.details;
      } catch (e) {
        console.error("Failed to parse details payload:", e);
      }
    }

    // Recreate the user in local SQLite database
    const createdUser = await db.user.create({
      data: {
        id: payload.userId,
        username: payload.username,
        passwordHash: details.passwordHash || "",
        name: details.name || "",
        securityQuestion: details.securityQuestion || "",
        securityAnswer: details.securityAnswer || "",
      }
    });

    // Recreate default settings
    await db.settings.upsert({
      where: { userId: createdUser.id },
      update: {
        studentName: createdUser.name,
      },
      create: {
        userId: createdUser.id,
        darkMode: false,
        fontSize: 16,
        apiKeys: "{}",
        studentName: createdUser.name,
      }
    });

    console.log(`Successfully synced user ${username} from Qdrant to SQLite.`);
    return createdUser;
  } catch (error) {
    console.error("Error syncing user from Qdrant:", error);
    return null;
  }
}
