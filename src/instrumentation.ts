export async function register() {
  // Run schema migrations on server startup (once per cold start)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { ensureReady } = await import("@/lib/db");
    await ensureReady();
  }
}
