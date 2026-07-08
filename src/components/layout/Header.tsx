"use client";

import { useAppStore } from "@/lib/store";
import { useProgress } from "@/hooks/useProgress";
import { days } from "@/data/days";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Settings,
  Sun,
  Moon,
  Menu,
  Home,
  BookOpen,
  Code2,
  ClipboardCheck,
  BarChart3,
  BookMarked,
  Newspaper,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navItems = [
  { view: "home" as const, label: "Home", icon: Home },
  { view: "days" as const, label: "Days", icon: BookOpen },
  { view: "playground" as const, label: "Playground", icon: Code2 },
  { view: "assessments" as const, label: "Tests", icon: ClipboardCheck },
  { view: "ai-news" as const, label: "AI News", icon: Newspaper },
  { view: "progress" as const, label: "Progress", icon: BarChart3 },
  { view: "references" as const, label: "References", icon: BookMarked },
];

export function Header() {
  const navigate = useAppStore((s) => s.navigate);
  const view = useAppStore((s) => s.view);
  const setSidebarOpen = useAppStore((s) => s.setSidebarOpen);
  const setSearchOpen = useAppStore((s) => s.setSearchOpen);
  const desktopSidebarOpen = useAppStore((s) => s.desktopSidebarOpen);
  const toggleDesktopSidebar = useAppStore((s) => s.toggleDesktopSidebar);
  const { setTheme } = useTheme();
  const { progress } = useProgress();

  const completed = days.filter(
    (d) => progress[d.dayNumber]?.completed,
  ).length;
  const pct = Math.round((completed / days.length) * 100);

  return (
    <header className="sticky top-0 z-30 h-14 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-2 px-3 lg:px-6">
        {/* Mobile: open sidebar sheet */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>
        {/* Desktop: toggle lessons sidebar (collapse for more room, e.g. in Playground) */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:inline-flex"
          onClick={toggleDesktopSidebar}
          aria-label={desktopSidebarOpen ? "Hide lessons panel" : "Show lessons panel"}
          title={desktopSidebarOpen ? "Hide lessons panel" : "Show lessons panel"}
        >
          {desktopSidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
        </Button>

        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-2 shrink-0"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            P
          </div>
          <span className="font-semibold text-sm hidden sm:block">
            Python &amp; AI Handbook
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5 ml-4">
          {navItems.map((item) => (
            <Button
              key={item.view}
              variant={view === item.view ? "secondary" : "ghost"}
              size="sm"
              className="text-xs h-8"
              onClick={() => navigate(item.view)}
            >
              <item.icon className="h-4 w-4 mr-1.5" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="flex-1" />

        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-2"
          onClick={() => setSearchOpen(true)}
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline text-xs text-muted-foreground">
            Search...
          </span>
          <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
            /
          </kbd>
        </Button>

        {/* Progress mini-indicator */}
        <Badge
          variant="secondary"
          className="hidden sm:flex h-7 gap-1.5 px-2"
          title={`${completed} of ${days.length} days complete`}
        >
          <div className="h-1.5 w-12 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-[10px] font-mono">{pct}%</span>
        </Badge>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() =>
            setTheme(
              document.documentElement.classList.contains("dark")
                ? "light"
                : "dark",
            )
          }
          aria-label="Toggle dark mode"
        >
          <Sun className="h-4 w-4 hidden dark:block" />
          <Moon className="h-4 w-4 dark:hidden" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => navigate("settings")}
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}

export { navItems };
