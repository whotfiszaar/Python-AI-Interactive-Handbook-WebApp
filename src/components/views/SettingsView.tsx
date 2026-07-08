"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  EyeOff,
  KeyRound,
  CheckCircle2,
  Loader2,
  Download,
  Upload,
  Trash2,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ApiKeys {
  openrouter?: string;
}

export function SettingsView() {
  const settings = useAppStore((s) => s.settings);
  const setSettings = useAppStore((s) => s.setSettings);
  const setStudentName = useAppStore((s) => s.setStudentName);
  const { theme, setTheme } = useTheme();

  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<"ok" | "fail" | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    if (settings) {
      setDarkMode(settings.darkMode);
      setFontSize(settings.fontSize);
      setName(settings.studentName ?? "");
      try {
        const keys = JSON.parse(settings.apiKeys) as ApiKeys;
        setApiKey(keys.openrouter ?? "");
      } catch {
        setApiKey("");
      }
    }
  }, [settings]);

  const applyDarkMode = (value: boolean) => {
    setDarkMode(value);
    setTheme(value ? "dark" : "light");
    void saveSettings({ darkMode: value });
  };

  const applyFontSize = (value: number) => {
    setFontSize(value);
    document.documentElement.style.fontSize = `${value}px`;
    void saveSettings({ fontSize: value });
  };

  const saveName = async () => {
    const trimmed = name.trim();
    setStudentName(trimmed);
    await saveSettings({ studentName: trimmed });
    toast.success(
      trimmed
        ? `Great! We'll call you ${trimmed} from now on.`
        : "Name cleared. The default will be used.",
    );
  };

  const saveApiKey = async () => {
    const keys: ApiKeys = { openrouter: apiKey.trim() };
    await saveSettings({ apiKeys: keys });
    toast.success("API key saved");
  };

  const testConnection = async () => {
    if (!apiKey.trim()) {
      toast.error("Enter your API key first");
      return;
    }
    setTesting(true);
    setTestResult(null);
    try {
      // save first, then test via playground route
      const keys: ApiKeys = { openrouter: apiKey.trim() };
      await saveSettings({ apiKeys: keys });
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
      const data = (await res.json()) as {
        ok?: boolean;
        output?: string;
        error?: string;
      };
      if (data.ok) {
        setTestResult("ok");
        toast.success("Connection works! The API responded.");
      } else {
        setTestResult("fail");
        toast.error(data.error ?? "Connection failed");
      }
    } catch (e) {
      setTestResult("fail");
      toast.error("Connection failed");
    } finally {
      setTesting(false);
    }
  };

  const saveSettings = async (patch: Partial<{
    darkMode: boolean;
    fontSize: number;
    apiKeys: unknown;
  }>) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error("Failed");
      const row = (await res.json()) as Awaited<ReturnType<typeof Object>>;
      setSettings(row as unknown as import("@/types").SettingsRow);
    } catch {
      toast.error("Could not save settings");
    }
  };

  const exportData = async () => {
    try {
      const [progressRes, scoresRes, notebooksRes, settingsRes] =
        await Promise.all([
          fetch("/api/progress"),
          fetch("/api/assessments"),
          fetch("/api/notebooks"),
          fetch("/api/settings"),
        ]);
      const data = {
        exportedAt: new Date().toISOString(),
        progress: await progressRes.json(),
        assessments: await scoresRes.json(),
        notebooks: await notebooksRes.json(),
        settings: await settingsRes.json(),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `python-ai-handbook-backup-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Data exported");
    } catch {
      toast.error("Export failed");
    }
  };

  const importData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text) as {
        progress?: unknown[];
        assessments?: unknown[];
        notebooks?: unknown[];
        settings?: unknown;
      };
      // Restore progress
      if (Array.isArray(data.progress)) {
        for (const p of data.progress as Array<Record<string, unknown>>) {
          await fetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(p),
          });
        }
      }
      if (Array.isArray(data.assessments)) {
        for (const s of data.assessments as Array<Record<string, unknown>>) {
          await fetch("/api/assessments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(s),
          });
        }
      }
      toast.success("Data imported. Reload to see updates.");
    } catch {
      toast.error("Import failed. Check the file format.");
    }
  };

  const clearAllProgress = async () => {
    try {
      const progressRes = await fetch("/api/progress");
      const rows = (await progressRes.json()) as Array<{ dayNumber: number }>;
      for (const r of rows) {
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dayNumber: r.dayNumber,
            completed: false,
            bookmarked: false,
            notes: "",
          }),
        });
      }
      toast.success("All progress cleared");
      setTimeout(() => window.location.reload(), 1000);
    } catch {
      toast.error("Could not clear progress");
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Customize your learning experience.
        </p>
      </div>

      {/* Profile */}
      <Card className="p-5">
        <h2 className="font-semibold mb-1">Your name</h2>
        <p className="text-xs text-muted-foreground mb-4">
          This name is used throughout the handbook to make lessons feel
          personal. It is saved only in this browser.
        </p>
        <div className="flex gap-2">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveName()}
            placeholder="Type your name..."
            maxLength={40}
          />
          <Button onClick={saveName} className="shrink-0">
            Save name
          </Button>
        </div>
        {settings?.studentName?.trim() ? (
          <p className="text-xs text-emerald-600 mt-2">
            Currently using: <span className="font-medium">{settings.studentName}</span>
          </p>
        ) : (
          <p className="text-xs text-muted-foreground mt-2">
            No name set yet. The default placeholder will be used until you add one.
          </p>
        )}
      </Card>

      {/* Appearance */}
      <Card className="p-5">
        <h2 className="font-semibold mb-4">Appearance</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {darkMode ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <Label htmlFor="dark-mode">Dark mode</Label>
            </div>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={applyDarkMode}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Font size</Label>
              <Badge variant="outline" className="font-mono">
                {fontSize}px
              </Badge>
            </div>
            <Slider
              value={[fontSize]}
              onValueChange={(v) => applyFontSize(v[0])}
              min={14}
              max={22}
              step={1}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Adjusts the base text size across the app.
            </p>
          </div>
        </div>
      </Card>

      {/* API key */}
      <Card className="p-5">
        <h2 className="flex items-center gap-2 font-semibold mb-1">
          <KeyRound className="h-4 w-4" />
          OpenRouter API Key
        </h2>
        <p className="text-xs text-muted-foreground mb-4">
          Your key is stored only in this browser&apos;s database and is used only
          when running AI code in the playground. It is never sent anywhere except
          directly to OpenRouter from the server.
        </p>
        <div className="space-y-3">
          <div className="relative">
            <Input
              type={showKey ? "text" : "password"}
              placeholder="sk-or-v1-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="pr-10 font-mono text-sm"
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
          <div className="flex gap-2">
            <Button onClick={saveApiKey} variant="outline" size="sm">
              Save key
            </Button>
            <Button
              onClick={testConnection}
              disabled={testing}
              size="sm"
              className="gap-1.5"
            >
              {testing ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <CheckCircle2 className="h-3.5 w-3.5" />
              )}
              Test connection
            </Button>
            {testResult === "ok" && (
              <Badge className="bg-emerald-500 text-white">Working</Badge>
            )}
            {testResult === "fail" && (
              <Badge className="bg-red-500 text-white">Failed</Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Get a free key at{" "}
            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              openrouter.ai/keys
            </a>
            .
          </p>
        </div>
      </Card>

      {/* Data management */}
      <Card className="p-5">
        <h2 className="font-semibold mb-4">Data</h2>
        <div className="flex flex-wrap gap-2">
          <Button onClick={exportData} variant="outline" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" />
            Export data
          </Button>
          <Label
            htmlFor="import-file"
            className="inline-flex items-center gap-1.5 h-8 px-3 text-xs rounded-md border cursor-pointer hover:bg-accent"
          >
            <Upload className="h-4 w-4" />
            Import data
          </Label>
          <Input
            id="import-file"
            type="file"
            accept="application/json"
            className="hidden"
            onChange={importData}
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="gap-1.5">
                <Trash2 className="h-4 w-4" />
                Clear all progress
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear all progress?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will reset all day completions, bookmarks, and notes. This
                  cannot be undone. Assessment scores and notebooks are kept.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={clearAllProgress}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Yes, clear everything
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Card>
    </div>
  );
}
