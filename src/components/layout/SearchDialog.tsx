"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/lib/store";
import { useSearch } from "@/hooks/useSearch";
import { BookOpen, FileText, ClipboardCheck, BookMarked } from "lucide-react";
import { cn } from "@/lib/utils";

const typeIcon = {
  day: BookOpen,
  lesson: FileText,
  assessment: ClipboardCheck,
  reference: BookMarked,
};

const typeLabel = {
  day: "Lesson",
  lesson: "Content",
  assessment: "Test",
  reference: "Reference",
};

export function SearchDialog() {
  const open = useAppStore((s) => s.searchOpen);
  const setOpen = useAppStore((s) => s.setSearchOpen);
  const navigate = useAppStore((s) => s.navigate);
  const { query, setQuery, results } = useSearch();

  // keyboard shortcut "/"
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && !open) {
        const target = e.target as HTMLElement;
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        )
          return;
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, setOpen]);

  const handleSelect = (result: (typeof results)[number]) => {
    if (result.type === "day" || result.type === "lesson") {
      navigate("day", { dayNumber: result.dayNumber! });
    } else if (result.type === "assessment") {
      navigate("assessment", { assessmentId: result.assessmentId! });
    } else if (result.type === "reference") {
      navigate("references", { assessmentId: result.referenceId });
    }
    setOpen(false);
    setQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Search the handbook</DialogTitle>
        </DialogHeader>
        <Input
          autoFocus
          placeholder="Search days, lessons, assessments, references..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-none border-0 border-b focus-visible:ring-0 h-12 text-base"
        />
        <div className="max-h-[60vh] overflow-y-auto">
          {query && results.length === 0 && (
            <p className="p-8 text-center text-sm text-muted-foreground">
              No results for &quot;{query}&quot;
            </p>
          )}
          {!query && (
            <p className="p-8 text-center text-sm text-muted-foreground">
              Type to search across all 48 days, assessments, and references.
            </p>
          )}
          {results.length > 0 && (
            <ul className="py-2">
              {results.map((r, i) => {
                const Icon = typeIcon[r.type];
                return (
                  <li key={i}>
                    <button
                      onClick={() => handleSelect(r)}
                      className={cn(
                        "w-full flex items-start gap-3 px-4 py-2.5 text-left hover:bg-accent transition-colors",
                      )}
                    >
                      <Icon className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {r.label}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {r.description}
                        </p>
                      </div>
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground shrink-0">
                        {typeLabel[r.type]}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
