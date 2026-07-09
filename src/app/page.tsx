"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useAppInit } from "@/hooks/useAppInit";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileSidebar } from "@/components/layout/MobileNav";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { HomeView } from "@/components/views/HomeView";
import { DaysListView } from "@/components/views/DaysListView";
import { DayDetailView } from "@/components/views/DayDetailView";
import { PlaygroundView } from "@/components/views/PlaygroundView";
import { AssessmentsListView } from "@/components/views/AssessmentsListView";
import { AssessmentDetailView } from "@/components/views/AssessmentDetailView";
import { ProgressView } from "@/components/views/ProgressView";
import { ReferencesView } from "@/components/views/ReferencesView";
import { AINewsView } from "@/components/views/AINewsView";
import { SettingsView } from "@/components/views/SettingsView";
import { AdminView } from "@/components/views/AdminView";
import { AnnexuresView } from "@/components/views/AnnexuresView";
import { NamePrompt } from "@/components/NamePrompt";
import { PWARegister } from "@/components/PWARegister";
import { PyodidePreloader } from "@/components/PyodidePreloader";
import { APIKeyDialog } from "@/components/APIKeyDialog";

function CurrentView() {
  const view = useAppStore((s) => s.view);
  switch (view) {
    case "home":
      return <HomeView />;
    case "days":
      return <DaysListView />;
    case "day":
      return <DayDetailView />;
    case "playground":
      return <PlaygroundView />;
    case "assessments":
      return <AssessmentsListView />;
    case "assessment":
      return <AssessmentDetailView />;
    case "progress":
      return <ProgressView />;
    case "references":
      return <ReferencesView />;
    case "ai-news":
      return <AINewsView />;
    case "settings":
      return <SettingsView />;
    case "admin":
      return <AdminView />;
    case "annexures":
      return <AnnexuresView />;
    default:
      return <HomeView />;
  }
}

export default function Home() {
  useAppInit();
  const view = useAppStore((s) => s.view);
  const navigate = useAppStore((s) => s.navigate);
  const isPlayground = view === "playground";

  // Deep-link support: read the initial view from ?view= on first load
  // (used by PWA manifest shortcuts) and keep the URL in sync on navigation.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const v = params.get("view") as import("@/types").ViewName | null;
    if (v) {
      navigate(v, {
        dayNumber: params.get("day") ? Number(params.get("day")) : undefined,
        assessmentId: params.get("assessment") ?? undefined,
      });
      // Clean the URL so refreshes don't re-trigger navigation.
      window.history.replaceState({}, "", "/");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <MobileSidebar />
        <main className="flex-1 min-w-0 flex flex-col">
          {isPlayground ? (
            <CurrentView />
          ) : (
            <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12">
              <CurrentView />
            </div>
          )}
        </main>
      </div>
      <BottomTabBar />
      <SearchDialog />
      <NamePrompt />
      <PWARegister />
      <PyodidePreloader />
      <APIKeyDialog />
    </div>
  );
}
