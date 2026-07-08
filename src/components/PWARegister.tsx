"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, X, RefreshCw } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "pwa-install-dismissed";

export function PWARegister() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [updateReady, setUpdateReady] = useState(false);
  // Compute the initial installed state lazily so we don't setState in an effect.
  const [installed, setInstalled] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(display-mode: standalone)").matches;
  });

  useEffect(() => {
    // Only register in the browser.
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    // Register the service worker.
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((reg) => {
        // Check for updates on load.
        reg.update().catch(() => {});
        // Listen for a new waiting service worker.
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setUpdateReady(true);
            }
          });
        });
      })
      .catch((e) => {
        console.warn("SW registration failed", e);
      });

    window.addEventListener("appinstalled", () => {
      setInstalled(true);
      setShowInstall(false);
    });

    // Capture the install prompt event so we can trigger it from our button.
    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
      // Only show our banner if the user hasn't dismissed it before.
      try {
        const dismissed = localStorage.getItem(DISMISS_KEY);
        if (!dismissed) setShowInstall(true);
      } catch {
        setShowInstall(true);
      }
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome === "accepted") {
      setInstalled(true);
    }
    setInstallEvent(null);
    setShowInstall(false);
  };

  const dismissInstall = () => {
    setShowInstall(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const applyUpdate = () => {
    navigator.serviceWorker?.controller?.postMessage("skipWaiting");
    // Reload once the new controller takes over.
    navigator.serviceWorker?.addEventListener("controllerchange", () => {
      window.location.reload();
    });
    // Fallback reload after a short delay.
    setTimeout(() => window.location.reload(), 1500);
  };

  return (
    <>
      {/* Install prompt banner */}
      {showInstall && !installed && (
        <div className="fixed bottom-20 md:bottom-4 right-4 z-40 max-w-xs animate-in slide-in-from-bottom-4 duration-300">
          <Card className="p-4 shadow-lg border-primary/30">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <Download className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">Install the app</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Add the handbook to your home screen for offline access.
                </p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" className="h-7 text-xs" onClick={handleInstall}>
                    Install
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs"
                    onClick={dismissInstall}
                  >
                    Not now
                  </Button>
                </div>
              </div>
              <button
                onClick={dismissInstall}
                className="text-muted-foreground hover:text-foreground shrink-0"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Update ready toast */}
      {updateReady && (
        <div className="fixed bottom-20 md:bottom-4 right-4 z-40 max-w-xs animate-in slide-in-from-bottom-4 duration-300">
          <Card className="p-4 shadow-lg border-emerald-500/30">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 shrink-0">
                <RefreshCw className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">Update available</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  A new version of the handbook is ready.
                </p>
                <Button
                  size="sm"
                  className="h-7 text-xs mt-3"
                  onClick={applyUpdate}
                >
                  Update now
                </Button>
              </div>
              <button
                onClick={() => setUpdateReady(false)}
                className="text-muted-foreground hover:text-foreground shrink-0"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
