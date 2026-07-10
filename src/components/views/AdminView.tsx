"use client";

import { useState, useEffect, useCallback } from "react";
import { useAppStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Shield,
  Lock,
  BookOpen,
  Youtube,
  BookMarked,
  BarChart3,
  Plus,
  Pencil,
  Trash2,
  X,
  LogOut,
  Save,
  Loader2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type AdminTab = "days" | "videos" | "references" | "progress" | "users";

export function AdminView() {
  const isAdmin = useAppStore((s) => s.isAdmin);
  const adminPassword = useAppStore((s) => s.adminPassword);
  const setAdminAuth = useAppStore((s) => s.setAdminAuth);
  const setAdminLogout = useAppStore((s) => s.setAdminLogout);
  const navigate = useAppStore((s) => s.navigate);
  const [pwInput, setPwInput] = useState("");
  const [authing, setAuthing] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("days");

  const handleAuth = async () => {
    setAuthing(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwInput }),
      });
      const data = await res.json();
      if (data.authorized) {
        setAdminAuth(pwInput);
        toast.success("Admin access granted");
      } else {
        toast.error("Wrong password");
      }
    } catch {
      toast.error("Authentication failed");
    } finally {
      setAuthing(false);
    }
  };

  // Password gate
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto py-12">
        <Card className="p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Admin Access</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Enter the admin password to manage content, videos, references, and
            view progress reports.
          </p>
          <div className="space-y-3">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Admin password"
                value={pwInput}
                onChange={(e) => setPwInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                className="pl-9 text-center"
                autoFocus
              />
            </div>
            <Button
              className="w-full"
              onClick={handleAuth}
              disabled={authing || !pwInput}
            >
              {authing ? "Verifying..." : "Unlock Admin"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Default password: <code className="font-mono">admin123</code>.
              Change it in Settings after first login.
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => navigate("home")}
            >
              Back to home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const tabs: { id: AdminTab; label: string; icon: any }[] = [
    { id: "days", label: "Days", icon: BookOpen },
    { id: "videos", label: "Videos", icon: Youtube },
    { id: "references", label: "References", icon: BookMarked },
    { id: "progress", label: "Progress", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
            <p className="text-xs text-muted-foreground">
              Manage all content and student accounts. Changes are synced with the database.
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => {
            setAdminLogout();
            navigate("home");
            toast.info("Logged out of admin");
          }}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "days" && <DaysManager adminPassword={adminPassword} />}
      {activeTab === "videos" && <VideosManager adminPassword={adminPassword} />}
      {activeTab === "references" && (
        <ReferencesManager adminPassword={adminPassword} />
      )}
      {activeTab === "progress" && <ProgressViewer />}
      {activeTab === "users" && <UsersManager adminPassword={adminPassword} />}
    </div>
  );
}

// ===========================================================================
// DAYS MANAGER (full content editor)
// ===========================================================================

interface DayRow {
  id: number;
  dayNumber: number;
  title: string;
  phase: string;
  objectives: string;
  content: string;
  exercises: string;
  quiz: string;
  teacherNotes: string;
  explainToFriend: string;
  realWorldExamples: string;
  thingsToGoogle: string;
  setupInstructions: string;
  expectedOutput: string;
  debugging: string;
}

function DaysManager({ adminPassword }: { adminPassword: string }) {
  const [days, setDays] = useState<DayRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDay, setEditingDay] = useState<DayRow | null>(null);
  const [editFields, setEditFields] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/days", {
        headers: { "x-admin-password": adminPassword },
      });
      if (res.ok) setDays(await res.json());
    } catch {
      toast.error("Failed to load days");
    } finally {
      setLoading(false);
    }
  }, [adminPassword]);

  useEffect(() => {
    void load();
  }, [load]);

  const openEditor = (day: DayRow) => {
    setEditingDay(day);
    // Parse JSON arrays back to newline-separated strings for editing.
    const parse = (s: string) => {
      try {
        const arr = JSON.parse(s);
        return Array.isArray(arr) ? arr.join("\n") : s;
      } catch {
        return s;
      }
    };
    setEditFields({
      title: day.title,
      phase: day.phase,
      objectives: parse(day.objectives),
      teacherNotes: day.teacherNotes,
      explainToFriend: day.explainToFriend,
      realWorldExamples: parse(day.realWorldExamples),
      thingsToGoogle: parse(day.thingsToGoogle),
      setupInstructions: day.setupInstructions,
      expectedOutput: day.expectedOutput,
      debugging: parse(day.debugging),
      content: day.content,
      exercises: day.exercises,
      quiz: day.quiz,
    });
  };

  const handleSave = async () => {
    if (!editingDay) return;
    setSaving(true);
    try {
      const parseLines = (s: string) =>
        s.split("\n").map((l) => l.trim()).filter(Boolean);
      const body: Record<string, unknown> = {
        title: editFields.title,
        phase: editFields.phase,
        objectives: parseLines(editFields.objectives),
        teacherNotes: editFields.teacherNotes,
        explainToFriend: editFields.explainToFriend,
        realWorldExamples: parseLines(editFields.realWorldExamples),
        thingsToGoogle: parseLines(editFields.thingsToGoogle),
        setupInstructions: editFields.setupInstructions,
        expectedOutput: editFields.expectedOutput,
        debugging: parseLines(editFields.debugging),
      };
      const res = await fetch(`/api/admin/days/${editingDay.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        toast.success("Day updated successfully");
        setEditingDay(null);
        void load();
      } else {
        toast.error("Failed to update");
      }
    } catch {
      toast.error("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this day? This cannot be undone.")) return;
    try {
      await fetch(`/api/admin/days/${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": adminPassword },
      });
      toast.success("Day deleted");
      void load();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const updateField = (field: string, value: string) => {
    setEditFields((prev) => ({ ...prev, [field]: value }));
  };

  if (loading)
    return <p className="text-sm text-muted-foreground py-8">Loading days...</p>;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {days.length} days in database. Click any day to edit all content.
        </p>
      </div>
      <Card className="divide-y divide-border">
        {days.map((day) => (
          <div
            key={day.id}
            className="flex items-center gap-3 p-3 hover:bg-accent/30"
          >
            <Badge variant="outline" className="shrink-0">
              Day {day.dayNumber}
            </Badge>
            <Badge
              variant="secondary"
              className={cn(
                "shrink-0 text-[10px]",
                day.phase === "python" && "text-emerald-600",
                day.phase === "theory" && "text-amber-600",
                day.phase === "practical" && "text-violet-600",
              )}
            >
              {day.phase}
            </Badge>
            <span className="flex-1 text-sm truncate">{day.title}</span>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0"
                onClick={() => openEditor(day)}
                title="Edit full content"
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 hover:text-red-500"
                onClick={() => handleDelete(day.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </Card>

      {/* Full content editor dialog */}
      <Dialog open={!!editingDay} onOpenChange={(o) => !o && setEditingDay(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Edit Day {editingDay?.dayNumber}: {editingDay?.title}
            </DialogTitle>
          </DialogHeader>
          {editingDay && (
            <div className="space-y-4">
              {/* Title and Phase */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <Label>Title</Label>
                  <Input
                    value={editFields.title ?? ""}
                    onChange={(e) => updateField("title", e.target.value)}
                    className="h-8"
                  />
                </div>
                <div>
                  <Label>Phase</Label>
                  <select
                    value={editFields.phase ?? "python"}
                    onChange={(e) => updateField("phase", e.target.value)}
                    className="w-full h-8 rounded-md border border-border bg-background px-2 text-sm"
                  >
                    <option value="python">Python</option>
                    <option value="theory">Theory</option>
                    <option value="practical">Practical</option>
                  </select>
                </div>
              </div>

              {/* Objectives (one per line) */}
              <div>
                <Label>Learning Objectives (one per line)</Label>
                <Textarea
                  value={editFields.objectives ?? ""}
                  onChange={(e) => updateField("objectives", e.target.value)}
                  className="min-h-[80px] text-sm"
                  placeholder="Understand variables\nLearn data types"
                />
              </div>

              {/* Teacher Notes */}
              <div>
                <Label>Teacher Notes</Label>
                <Textarea
                  value={editFields.teacherNotes ?? ""}
                  onChange={(e) => updateField("teacherNotes", e.target.value)}
                  className="min-h-[80px] text-sm"
                  placeholder="Tips for explaining tricky parts..."
                />
              </div>

              {/* Explain to Friend (theory days) */}
              <div>
                <Label>Explain to a Friend (theory days)</Label>
                <Textarea
                  value={editFields.explainToFriend ?? ""}
                  onChange={(e) => updateField("explainToFriend", e.target.value)}
                  className="min-h-[60px] text-sm"
                />
              </div>

              {/* Real world examples (one per line) */}
              <div>
                <Label>Real World Examples (one per line)</Label>
                <Textarea
                  value={editFields.realWorldExamples ?? ""}
                  onChange={(e) => updateField("realWorldExamples", e.target.value)}
                  className="min-h-[60px] text-sm"
                />
              </div>

              {/* Things to Google (one per line) */}
              <div>
                <Label>Things to Google (one per line)</Label>
                <Textarea
                  value={editFields.thingsToGoogle ?? ""}
                  onChange={(e) => updateField("thingsToGoogle", e.target.value)}
                  className="min-h-[60px] text-sm"
                />
              </div>

              {/* Setup Instructions (practical days) */}
              <div>
                <Label>Setup Instructions (practical days)</Label>
                <Textarea
                  value={editFields.setupInstructions ?? ""}
                  onChange={(e) => updateField("setupInstructions", e.target.value)}
                  className="min-h-[60px] text-sm"
                />
              </div>

              {/* Expected Output (practical days) */}
              <div>
                <Label>Expected Output (practical days)</Label>
                <Textarea
                  value={editFields.expectedOutput ?? ""}
                  onChange={(e) => updateField("expectedOutput", e.target.value)}
                  className="min-h-[60px] text-sm font-mono text-xs"
                />
              </div>

              {/* Debugging tips (one per line) */}
              <div>
                <Label>Debugging Tips (one per line)</Label>
                <Textarea
                  value={editFields.debugging ?? ""}
                  onChange={(e) => updateField("debugging", e.target.value)}
                  className="min-h-[60px] text-sm"
                />
              </div>

              <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                Note: Content blocks, exercises, and quiz questions are stored as
                JSON and can only be edited via the seed script or direct DB
                access. The fields above cover all the commonly-edited text
                fields.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingDay(null)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5 mr-1" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ===========================================================================
// VIDEOS MANAGER
// ===========================================================================

interface VideoRow {
  id: number;
  videoId: string;
  playlistId: string;
  title: string;
  channel: string;
  durationLabel: string;
  dayRange: string;
  sortOrder: number;
}

function VideosManager({ adminPassword }: { adminPassword: string }) {
  const [videos, setVideos] = useState<VideoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newVideo, setNewVideo] = useState({
    videoId: "",
    title: "",
    channel: "",
    durationLabel: "",
    dayRange: "",
    why: "",
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/videos", {
        headers: { "x-admin-password": adminPassword },
      });
      if (res.ok) setVideos(await res.json());
    } catch {
      toast.error("Failed to load videos");
    } finally {
      setLoading(false);
    }
  }, [adminPassword]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleAdd = async () => {
    if (!newVideo.videoId || !newVideo.title) {
      toast.error("Video ID and title are required");
      return;
    }
    try {
      const res = await fetch("/api/admin/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify({
          ...newVideo,
          topicRange: newVideo.dayRange,
          days: [],
          topics: [],
          sortOrder: videos.length,
        }),
      });
      if (res.ok) {
        toast.success("Video added");
        setAdding(false);
        setNewVideo({
          videoId: "",
          title: "",
          channel: "",
          durationLabel: "",
          dayRange: "",
          why: "",
        });
        void load();
      }
    } catch {
      toast.error("Failed to add video");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this video?")) return;
    await fetch(`/api/admin/videos/${id}`, {
      method: "DELETE",
      headers: { "x-admin-password": adminPassword },
    });
    toast.success("Video deleted");
    void load();
  };

  if (loading)
    return <p className="text-sm text-muted-foreground py-8">Loading videos...</p>;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{videos.length} videos</p>
        <Button size="sm" className="gap-1" onClick={() => setAdding(true)}>
          <Plus className="h-3.5 w-3.5" />
          Add Video
        </Button>
      </div>
      <Card className="divide-y divide-border">
        {videos.map((v) => (
          <div key={v.id} className="flex items-center gap-3 p-3 hover:bg-accent/30">
            <div className="flex h-10 w-16 shrink-0 items-center justify-center rounded bg-muted overflow-hidden">
              {v.videoId ? (
                <img
                  src={`https://i.ytimg.com/vi/${v.videoId}/default.jpg`}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <Youtube className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{v.title}</p>
              <p className="text-xs text-muted-foreground">
                {v.channel} &middot; {v.durationLabel} &middot; {v.dayRange}
              </p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 hover:text-red-500"
              onClick={() => handleDelete(v.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </Card>

      {/* Add video dialog */}
      <Dialog open={adding} onOpenChange={setAdding}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add YouTube Video</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>YouTube Video ID (11 chars)</Label>
              <Input
                value={newVideo.videoId}
                onChange={(e) =>
                  setNewVideo({ ...newVideo, videoId: e.target.value })
                }
                placeholder="e.g. _uQrJ0TkZlc"
              />
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={newVideo.title}
                onChange={(e) =>
                  setNewVideo({ ...newVideo, title: e.target.value })
                }
                placeholder="Video title"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Channel</Label>
                <Input
                  value={newVideo.channel}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, channel: e.target.value })
                  }
                  placeholder="Channel name"
                />
              </div>
              <div>
                <Label>Duration</Label>
                <Input
                  value={newVideo.durationLabel}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, durationLabel: e.target.value })
                  }
                  placeholder="e.g. ~15min"
                />
              </div>
            </div>
            <div>
              <Label>Day Range</Label>
              <Input
                value={newVideo.dayRange}
                onChange={(e) =>
                  setNewVideo({ ...newVideo, dayRange: e.target.value })
                }
                placeholder="e.g. Days 1-5"
              />
            </div>
            <div>
              <Label>Why this video</Label>
              <Textarea
                value={newVideo.why}
                onChange={(e) =>
                  setNewVideo({ ...newVideo, why: e.target.value })
                }
                placeholder="Why this video is recommended"
                className="min-h-[60px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdding(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd}>Add Video</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ===========================================================================
// REFERENCES MANAGER
// ===========================================================================

interface RefSectionRow {
  id: number;
  sectionId: string;
  title: string;
  kind: string;
  items: { id: number }[];
}

function ReferencesManager({ adminPassword }: { adminPassword: string }) {
  const [sections, setSections] = useState<RefSectionRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/references", {
        headers: { "x-admin-password": adminPassword },
      });
      if (res.ok) setSections(await res.json());
    } catch {
      toast.error("Failed to load references");
    } finally {
      setLoading(false);
    }
  }, [adminPassword]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this reference section and all its items?")) return;
    await fetch(`/api/admin/references/${id}`, {
      method: "DELETE",
      headers: { "x-admin-password": adminPassword },
    });
    toast.success("Section deleted");
    void load();
  };

  if (loading)
    return (
      <p className="text-sm text-muted-foreground py-8">Loading references...</p>
    );

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{sections.length} sections</p>
      <Card className="divide-y divide-border">
        {sections.map((s) => (
          <div
            key={s.id}
            className="flex items-center gap-3 p-3 hover:bg-accent/30"
          >
            <BookMarked className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{s.title}</p>
              <p className="text-xs text-muted-foreground">
                {s.kind} &middot; {s.items.length} items
              </p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 hover:text-red-500"
              onClick={() => handleDelete(s.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ===========================================================================
// PROGRESS VIEWER
// ===========================================================================

function ProgressViewer() {
  const [data, setData] = useState<{
    summary: {
      studentName: string;
      totalDays: number;
      completedDays: number;
      completionPct: number;
      totalAssessments: number;
      passedAssessments: number;
      totalNotebooks: number;
      lastActivity: string | null;
    };
    progress: { dayNumber: number; completed: boolean; bookmarked: boolean; lastVisited: string; notes: string }[];
    scores: { id: number; assessmentId: string; score: number; total: number; completedAt: string }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const adminPassword = useAppStore((s) => s.adminPassword);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/progress", {
        headers: { "x-admin-password": adminPassword },
      });
      if (res.ok) setData(await res.json());
    } catch {
      toast.error("Failed to load progress");
    } finally {
      setLoading(false);
    }
  }, [adminPassword]);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading || !data)
    return (
      <p className="text-sm text-muted-foreground py-8">Loading progress...</p>
    );

  const { summary } = data;

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="p-4">
          <p className="text-2xl font-bold text-primary">
            {summary.completionPct}%
          </p>
          <p className="text-xs text-muted-foreground">
            {summary.completedDays}/{summary.totalDays} days complete
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-2xl font-bold text-emerald-600">
            {summary.passedAssessments}
          </p>
          <p className="text-xs text-muted-foreground">
            of {summary.totalAssessments} assessments
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-2xl font-bold text-blue-600">
            {summary.totalNotebooks}
          </p>
          <p className="text-xs text-muted-foreground">notebooks saved</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm font-bold truncate">{summary.studentName}</p>
          <p className="text-xs text-muted-foreground">
            {summary.lastActivity
              ? new Date(summary.lastActivity).toLocaleDateString()
              : "No activity"}
          </p>
        </Card>
      </div>

      {/* Day progress table */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-3">Day Progress</h3>
        <div className="grid grid-cols-6 sm:grid-cols-8 gap-1">
          {data.progress.map((p) => (
            <div
              key={p.dayNumber}
              className={cn(
                "h-8 rounded text-[10px] flex items-center justify-center font-mono",
                p.completed
                  ? "bg-emerald-500 text-white"
                  : p.bookmarked
                    ? "bg-amber-400 text-white"
                    : "bg-muted text-muted-foreground",
              )}
              title={`Day ${p.dayNumber}: ${p.completed ? "Complete" : "Incomplete"}`}
            >
              {p.dayNumber}
            </div>
          ))}
        </div>
      </Card>

      {/* Assessment scores */}
      {data.scores.length > 0 && (
        <Card className="p-4">
          <h3 className="text-sm font-semibold mb-3">Assessment Scores</h3>
          <div className="space-y-1">
            {data.scores.slice(0, 10).map((s) => {
              const pct = Math.round((s.score / s.total) * 100);
              return (
                <div
                  key={s.id}
                  className="flex items-center justify-between text-xs p-2 rounded hover:bg-accent/30"
                >
                  <span className="font-medium truncate flex-1">
                    {s.assessmentId}
                  </span>
                  <span
                    className={cn(
                      "font-mono font-bold ml-2",
                      pct >= 70 ? "text-emerald-600" : "text-amber-600",
                    )}
                  >
                    {s.score}/{s.total} ({pct}%)
                  </span>
                  <span className="text-muted-foreground ml-3">
                    {new Date(s.completedAt).toLocaleDateString()}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}

// ===========================================================================
// USERS MANAGER
// ===========================================================================

interface UserRow {
  id: number;
  username: string;
  name: string;
  securityQuestion: string;
  createdAt: string;
}

function UsersManager({ adminPassword }: { adminPassword: string }) {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [updating, setUpdating] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        headers: { "x-admin-password": adminPassword },
      });
      if (res.ok) {
        setUsers(await res.json());
      } else {
        toast.error("Failed to load users");
      }
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [adminPassword]);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const handleUpdatePassword = async () => {
    if (!selectedUser || !newPassword.trim()) return;
    setUpdating(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify({
          username: selectedUser.username,
          newPassword: newPassword.trim(),
        }),
      });
      if (res.ok) {
        toast.success(`Password updated for user @${selectedUser.username}`);
        setResetDialogOpen(false);
        setNewPassword("");
      } else {
        const data = await res.json();
        toast.error(data.error ?? "Failed to update password");
      }
    } catch {
      toast.error("Failed to update password");
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteUser = async (username: string) => {
    if (!confirm(`Are you sure you want to permanently delete the account @${username}? This will also delete all their progress, notes, notebooks, and assessment scores.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/users?username=${encodeURIComponent(username)}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": adminPassword,
        },
      });
      if (res.ok) {
        toast.success(`Account @${username} deleted successfully`);
        setUsers((prev) => prev.filter((u) => u.username !== username));
      } else {
        const data = await res.json();
        toast.error(data.error ?? "Failed to delete account");
      }
    } catch {
      toast.error("Failed to delete account");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">User Manager</h2>
            <p className="text-sm text-muted-foreground">
              Monitor active users, update passwords, or delete student accounts. All changes are synced with the servers.
            </p>
          </div>
          <Badge variant="secondary" className="font-mono">
            {users.length} Registered
          </Badge>
        </div>

        {users.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">No users registered yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground text-xs uppercase">
                  <th className="py-3 px-4 font-medium">Username</th>
                  <th className="py-3 px-4 font-medium">Full Name</th>
                  <th className="py-3 px-4 font-medium">Security Challenge</th>
                  <th className="py-3 px-4 font-medium">Joined Date</th>
                  <th className="py-3 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-accent/20 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-foreground">@{user.username}</td>
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Q:</span> {user.securityQuestion}
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedUser(user);
                          setResetDialogOpen(true);
                        }}
                      >
                        Reset Password
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                        onClick={() => handleDeleteUser(user.username)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password for @{selectedUser?.username}</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <Label htmlFor="admin-new-pw">New Password</Label>
            <Input
              id="admin-new-pw"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResetDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdatePassword} disabled={updating || !newPassword.trim()}>
              {updating ? "Saving..." : "Update Password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
