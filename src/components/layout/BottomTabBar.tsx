"use client";

import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Home, BookOpen, Code2, ClipboardCheck, MoreHorizontal, BarChart3, BookMarked, Settings, Newspaper } from "lucide-react";
import { navItems } from "./Header";
import { cn } from "@/lib/utils";

export function BottomTabBar() {
  const view = useAppStore((s) => s.view);
  const navigate = useAppStore((s) => s.navigate);

  const tabs = [
    { view: "home" as const, label: "Home", icon: Home },
    { view: "days" as const, label: "Days", icon: BookOpen },
    { view: "playground" as const, label: "Code", icon: Code2 },
    { view: "ai-news" as const, label: "News", icon: Newspaper },
    { view: "assessments" as const, label: "Tests", icon: ClipboardCheck },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 h-16 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 flex items-stretch">
      {tabs.map((tab) => {
        const active = view === tab.view;
        return (
          <button
            key={tab.view}
            onClick={() => navigate(tab.view)}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-0.5 text-xs",
              active ? "text-primary" : "text-muted-foreground",
            )}
          >
            <tab.icon className="h-5 w-5" />
            <span className="text-[10px]">{tab.label}</span>
          </button>
        );
      })}
      <Sheet>
        <SheetTrigger asChild>
          <button className="flex-1 flex flex-col items-center justify-center gap-0.5 text-xs text-muted-foreground">
            <MoreHorizontal className="h-5 w-5" />
            <span className="text-[10px]">More</span>
          </button>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-xl">
          <SheetHeader>
            <SheetTitle>More</SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-3 gap-2 py-4">
            {navItems
              .filter((n) => !["home", "days", "playground", "assessments", "ai-news"].includes(n.view))
              .map((item) => (
                <Button
                  key={item.view}
                  variant={view === item.view ? "secondary" : "outline"}
                  className="flex flex-col h-20 gap-1"
                  onClick={() => navigate(item.view)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              ))}
            <Button
              variant={view === "settings" ? "secondary" : "outline"}
              className="flex flex-col h-20 gap-1"
              onClick={() => navigate("settings")}
            >
              <Settings className="h-5 w-5" />
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
