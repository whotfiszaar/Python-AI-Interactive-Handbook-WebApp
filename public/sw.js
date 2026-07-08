/**
 * Service Worker for the Python & AI Handbook PWA.
 *
 * Strategies:
 * - App shell (HTML navigations): network-first, fall back to cached shell offline.
 * - Static assets (JS, CSS, fonts, images): stale-while-revalidate.
 * - API requests: network-first with cache fallback (1 hour max age).
 * - News API: cached for 30 minutes.
 */

const VERSION = "v1.1.0";
const SHELL_CACHE = `shell-${VERSION}`;
const ASSET_CACHE = `assets-${VERSION}`;
const API_CACHE = `api-${VERSION}`;
const NEWS_CACHE = `news-${VERSION}`;

const APP_SHELL = [
  "/",
  "/manifest.webmanifest",
  "/icon.svg",
  "/icon-192.png",
  "/icon-512.png",
  "/icon-maskable-512.png",
  "/apple-touch-icon.png",
  "/favicon.ico",
];

// --- Install: pre-cache the app shell ---
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      // Cache shell resources; ignore individual failures so one bad asset
      // doesn't break the whole install.
      await Promise.allSettled(APP_SHELL.map((url) => cache.add(url)));
      self.skipWaiting();
    })(),
  );
});

// --- Activate: clean up old caches ---
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => ![SHELL_CACHE, ASSET_CACHE, API_CACHE, NEWS_CACHE].includes(k))
          .map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

// --- Fetch: route requests to the right strategy ---
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests.
  if (request.method !== "GET") return;

  // Skip cross-origin requests except the Pyodide CDN (we let those pass through).
  if (url.origin !== self.location.origin) {
    // Allow Pyodide CDN to be cached as assets.
    if (url.hostname.includes("cdn.jsdelivr.net")) {
      event.respondWith(staleWhileRevalidate(request, ASSET_CACHE));
    }
    return;
  }

  // Navigation requests (HTML pages): network-first with shell fallback.
  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  // News API: network-first with 30-min cache fallback (so we always get
  // fresh NewsAPI data when online, and only serve cached when offline).
  if (url.pathname.startsWith("/api/news")) {
    event.respondWith(networkFirstWithTTL(request, NEWS_CACHE, 30 * 60 * 1000));
    return;
  }

  // Other API routes: network-first with cache fallback (5 min TTL).
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirstWithTTL(request, API_CACHE, 5 * 60 * 1000));
    return;
  }

  // Static assets (JS, CSS, fonts, images, etc.): stale-while-revalidate.
  if (
    ["script", "style", "font", "image"].includes(request.destination) ||
    /\.(?:js|css|woff2?|ttf|png|jpg|jpeg|svg|webp|ico)$/.test(url.pathname)
  ) {
    event.respondWith(staleWhileRevalidate(request, ASSET_CACHE));
    return;
  }
});

// --- Strategies ---

async function networkFirstNavigation(request) {
  try {
    const fresh = await fetch(request);
    const cache = await caches.open(SHELL_CACHE);
    cache.put("/", fresh.clone()).catch(() => {});
    return fresh;
  } catch {
    // Offline: serve the cached app shell.
    const cached = await caches.match("/");
    if (cached) return cached;
    return caches.match("/index.html");
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((resp) => {
      if (resp && resp.status === 200) {
        cache.put(request, resp.clone()).catch(() => {});
      }
      return resp;
    })
    .catch(() => cached);
  return cached || network;
}

async function networkFirstWithTTL(request, cacheName, ttlMs) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.status === 200) {
      // Store with a timestamp header so we can expire it.
      const body = await fresh.clone().text();
      const meta = new Response(body, {
        status: fresh.status,
        statusText: fresh.statusText,
        headers: {
          ...Object.fromEntries(fresh.headers.entries()),
          "x-sw-cached-at": String(Date.now()),
        },
      });
      cache.put(request, meta.clone()).catch(() => {});
    }
    return fresh;
  } catch {
    // Offline or failed: serve from cache if within TTL.
    const cached = await cache.match(request);
    if (cached) {
      const cachedAt = Number(cached.headers.get("x-sw-cached-at") || 0);
      if (Date.now() - cachedAt < ttlMs) {
        return cached;
      }
    }
    return cached || Response.error();
  }
}

async function cacheFirstWithTTL(request, cacheName, ttlMs) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) {
    const cachedAt = Number(cached.headers.get("x-sw-cached-at") || 0);
    if (Date.now() - cachedAt < ttlMs) {
      return cached;
    }
  }
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.status === 200) {
      const body = await fresh.clone().text();
      const meta = new Response(body, {
        status: fresh.status,
        statusText: fresh.statusText,
        headers: {
          ...Object.fromEntries(fresh.headers.entries()),
          "x-sw-cached-at": String(Date.now()),
        },
      });
      cache.put(request, meta.clone()).catch(() => {});
    }
    return fresh;
  } catch {
    if (cached) return cached;
    return Response.error();
  }
}

// --- Message: allow the page to trigger an immediate update ---
self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") {
    self.skipWaiting();
  }
});
