"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Eye, EyeOff, CheckCircle2, Loader2, ExternalLink } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

/**
 * Global OpenRouter API key dialog. Can be triggered from anywhere via
 * the `apiKeyDialogOpen` store state. Once set, the key syncs everywhere
 * (stored in the Settings DB table, read by both the playground and the
 * server-side /api/playground route).
 */
export function APIKeyDialog() {
  const open = useAppStore((s) => s.apiKeyDialogOpen);
  const setOpen = useAppStore((s) => s.setAPIKeyDialogOpen);
  const settings = useAppStore((s) => s.settings);
  const setSettings = useAppStore((s) => s.setSettings);

  const [key, setKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<"ok" | "fail" | null>(null);

  // Sync the input with the current stored key when the dialog opens.
  useEffect(() => {
    if (open) {
      try {
        const keys = JSON.parse(settings?.apiKeys ?? "{}");
        setKey(keys.openrouter ?? "");
      } catch {
        setKey("");
      }
      setTestResult(null);
    }
  }, [open, settings]);

  const save = async () => {
    const trimmed = key.trim();
    try {
      const currentKeys = JSON.parse(settings?.apiKeys ?? "{}");
      const newKeys = { ...currentKeys, openrouter: trimmed };
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKeys: newKeys }),
      });
      if (!res.ok) throw new Error("Failed");
      const row = await res.json();
      setSettings(row);
      toast.success(trimmed ? "API key saved" : "API key cleared");
      if (trimmed) setOpen(false);
    } catch {
      toast.error("Could not save API key");
    }
  };

  const test = async () => {
    if (!key.trim()) {
      toast.error("Enter your API key first");
      return;
    }
    setTesting(true);
    setTestResult(null);
    try {
      // Save first, then test via the playground route.
      const currentKeys = JSON.parse(settings?.apiKeys ?? "{}");
      const newKeys = { ...currentKeys, openrouter: key.trim() };
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKeys: newKeys }),
      });
      const res = await fetch("/api/playground", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: `from openai import OpenAI

client = OpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

response = client.chat.completions.create(
    model="tencent/hy3:free",
    messages=[{"role": "user", "content": "Reply with exactly: OK"}]
)

print(response.choices[0].message.content)`,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setTestResult("ok");
        toast.success("Connection works!");
        // Persist the key since the test passed.
        const settingsRes = await fetch("/api/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ apiKeys: newKeys }),
        });
        const row = await settingsRes.json();
        setSettings(row);
      } else {
        setTestResult("fail");
        toast.error(data.error ?? "Connection failed");
      }
    } catch {
      setTestResult("fail");
      toast.error("Connection failed");
    } finally {
      setTesting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <KeyRound className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle>OpenRouter API Key</DialogTitle>
              <DialogDescription>
                Required to run AI code. Get a free key at{" "}
                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline inline-flex items-center gap-0.5"
                >
                  openrouter.ai/keys
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>API Key</Label>
            <div className="relative">
              <Input
                type={showKey ? "text" : "password"}
                placeholder="sk-or-v1-..."
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="pr-10 font-mono text-sm"
                onKeyDown={(e) => e.key === "Enter" && save()}
                autoFocus
              />
              <button
                onClick={() => setShowKey((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                type="button"
              >
                {showKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Your key is stored only in this browser's database and used
            server-side. It is never exposed to the client or sent to any third
            party.
          </p>
          {testResult === "ok" && (
            <div className="flex items-center gap-2 text-sm text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              Connection verified
            </div>
          )}
          {testResult === "fail" && (
            <div className="flex items-center gap-2 text-sm text-red-500">
              <KeyRound className="h-4 w-4" />
              Connection failed. Check your key.
            </div>
          )}
        </div>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={test}
            disabled={testing || !key.trim()}
            className="gap-1.5"
          >
            {testing ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <CheckCircle2 className="h-3.5 w-3.5" />
            )}
            Test
          </Button>
          <Button onClick={save} disabled={!key.trim()}>
            Save Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
