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
