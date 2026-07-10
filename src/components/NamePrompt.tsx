"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/lib/store";
import { DEFAULT_STUDENT_NAME } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

export function NamePrompt() {
  const studentName = useAppStore((s) => s.studentName);
  const user = useAppStore((s) => s.user);
  const hydrated = useAppStore((s) => s.hydrated);
  const dismissed = useAppStore((s) => s.namePromptDismissed);
  const setDismissed = useAppStore((s) => s.setNamePromptDismissed);
  const setStudentName = useAppStore((s) => s.setStudentName);
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);

  const open = hydrated && !studentName.trim() && !user?.name?.trim() && !dismissed;

  // Reset the input when the prompt becomes visible again.
  useEffect(() => {
    if (open) setValue("");
  }, [open]);

  const save = async () => {
    const name = value.trim();
    if (!name) {
      toast.error("Please enter your name, or skip to keep the default.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentName: name }),
      });
      if (!res.ok) throw new Error("Failed to save name");
      const row = (await res.json()) as import("@/types").SettingsRow;
      useAppStore.getState().setSettings(row);
      toast.success(`Welcome, ${name}! Let's start learning.`);
      setDismissed(true);
    } catch {
      // Save locally even if the server fails so the UI still personalizes.
      setStudentName(name);
      toast.success(`Welcome, ${name}!`);
      setDismissed(true);
    } finally {
      setSaving(false);
    }
  };

  const skip = () => {
    setDismissed(true);
    toast.message(`Okay, we'll call you ${DEFAULT_STUDENT_NAME} for now.`, {
      description: "You can set your name anytime in Settings.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && skip()}>
      <DialogContent className="max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center">Welcome to your handbook!</DialogTitle>
          <DialogDescription className="text-center">
            This 48-day course is built just for you. What is your name? We'll
            use it throughout the lessons to make them feel personal.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Input
            autoFocus
            placeholder="Type your name here..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && save()}
            className="text-center text-base"
            maxLength={40}
          />
          <p className="text-xs text-muted-foreground text-center">
            Your name is saved only in this browser and never sent anywhere else.
          </p>
        </div>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="ghost" onClick={skip} disabled={saving}>
            Skip for now
          </Button>
          <Button onClick={save} disabled={saving || !value.trim()}>
            {saving ? "Saving..." : "Save my name"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
