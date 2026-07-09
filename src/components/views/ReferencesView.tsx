"use client";

import { useMemo, useState } from "react";
import { referenceSections } from "@/data/references";
import { youtubeVideos } from "@/data/youtube";
import { personalizeReference } from "@/hooks/useSubstitute";
import { useAppStore } from "@/lib/store";
import type { ReferenceItem, ReferenceSection } from "@/types";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Printer, Code2, Youtube } from "lucide-react";
import { CodeBlock } from "@/components/lesson/CodeBlock";
import { YouTubeEmbed } from "@/components/references/YouTubeEmbed";

const YOUTUBE_TAB_ID = "youtube-videos";

export function ReferencesView() {
  const studentName = useAppStore((s) => s.studentName);
  // Allow deep-linking to a specific tab (e.g. from search or a day's video button).
  const deepLink = useAppStore((s) => s.referenceTabId);
  const [activeTab, setActiveTab] = useState(
    deepLink ?? referenceSections[0]?.id ?? "",
  );
  const [query, setQuery] = useState("");

  // Personalize all reference sections (memoized on the student's name).
  const sections = useMemo(
    () => referenceSections.map((s) => personalizeReference(s, studentName)),
    [studentName],
  );
  const active = sections.find((s) => s.id === activeTab);

  const filteredItems = useMemo(() => {
    if (!active) return [];
    const q = query.trim().toLowerCase();
    if (!q) return active.items;
    return active.items.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(q),
    );
  }, [active, query]);

  const filteredVideos = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return youtubeVideos;
    return youtubeVideos.filter((v) =>
      JSON.stringify(v).toLowerCase().includes(q),
    );
  }, [query]);

  const handlePrint = () => window.print();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">References</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Cheat sheets, glossaries, video lessons, and quick references for everything in the course.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5" onClick={handlePrint}>
          <Printer className="h-4 w-4" />
          Print
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="overflow-x-auto">
          <TabsList className="w-max">
            {sections.map((s) => (
              <TabsTrigger key={s.id} value={s.id} className="text-xs">
                {s.title}
              </TabsTrigger>
            ))}
            <TabsTrigger value={YOUTUBE_TAB_ID} className="text-xs gap-1">
              <Youtube className="h-3.5 w-3.5 text-red-600" />
              Video Lessons
            </TabsTrigger>
          </TabsList>
        </div>

        {/* YouTube tab */}
        <TabsContent value={YOUTUBE_TAB_ID} className="mt-4">
          <Card className="p-5">
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <div>
                <h2 className="font-semibold flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-red-600" />
                  Video Lessons
                </h2>
                <p className="text-xs text-muted-foreground">
                  Curated YouTube videos mapped to each topic. Play them right here, no redirects.
                </p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter videos..."
                  value={activeTab === YOUTUBE_TAB_ID ? query : ""}
                  onChange={(e) => {
                    setActiveTab(YOUTUBE_TAB_ID);
                    setQuery(e.target.value);
                  }}
                  className="pl-9 h-9"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVideos.map((v) => (
                <YouTubeEmbed key={v.id} video={v} />
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <p className="text-center text-muted-foreground py-8 text-sm">
                No videos match your filter.
              </p>
            )}

            <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
              {youtubeVideos.length} videos covering Python fundamentals (Days 1-15) and AI theory (Days 16-20).
              Videos play embedded in the site using privacy-friendly youtube-nocookie.com.
            </p>
          </Card>
        </TabsContent>

        {/* Standard reference tabs */}
        {sections.map((section) => (
          <TabsContent key={section.id} value={section.id} className="mt-4">
            <Card className="p-5">
              <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                <div>
                  <h2 className="font-semibold">{section.title}</h2>
                  <p className="text-xs text-muted-foreground">
                    {section.description}
                  </p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Filter..."
                    value={activeTab === section.id ? query : ""}
                    onChange={(e) => {
                      setActiveTab(section.id);
                      setQuery(e.target.value);
                    }}
                    className="pl-9 h-9"
                  />
                </div>
              </div>

              {section.id === activeTab && (
                <ReferenceList
                  section={section}
                  items={filteredItems}
                />
              )}
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function ReferenceList({
  section,
  items,
}: {
  section: ReferenceSection;
  items: ReferenceItem[];
}) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        No items match your filter.
      </p>
    );
  }

  switch (section.kind) {
    case "cheatsheet":
      return (
        <div className="grid sm:grid-cols-2 gap-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-border p-3 bg-card"
            >
              <p className="text-xs font-mono font-semibold text-primary mb-1">
                {item.syntax}
              </p>
              <p className="text-xs text-muted-foreground mb-2">
                {item.description}
              </p>
              <pre className="text-xs font-mono bg-muted p-2 rounded text-foreground/80 overflow-x-auto">
                <code>{item.example}</code>
              </pre>
            </div>
          ))}
        </div>
      );
    case "glossary":
      return (
        <div className="space-y-2">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-border p-3 bg-card"
            >
              <p className="font-semibold text-sm text-foreground">
                {item.term}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      );
    case "models":
      return (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted border-b border-border">
                <th className="px-3 py-2 text-left font-semibold">Model</th>
                <th className="px-3 py-2 text-left font-semibold">Provider</th>
                <th className="px-3 py-2 text-left font-semibold">Context</th>
                <th className="px-3 py-2 text-left font-semibold">Best for</th>
                <th className="px-3 py-2 text-left font-semibold">Free</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-border last:border-0 hover:bg-accent/30"
                >
                  <td className="px-3 py-2 font-mono text-xs">{item.model}</td>
                  <td className="px-3 py-2 text-xs">{item.provider}</td>
                  <td className="px-3 py-2 text-xs">{item.contextWindow}</td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">
                    {item.bestFor}
                  </td>
                  <td className="px-3 py-2">
                    {item.free && (
                      <Badge className="bg-emerald-500 text-white text-[10px]">
                        Free
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "snippets":
      return (
        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-border p-3 bg-card"
            >
              <div className="flex items-center gap-2 mb-1">
                <Code2 className="h-4 w-4 text-violet-500" />
                <p className="font-mono text-sm font-semibold text-foreground">
                  {item.term}
                </p>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {item.description}
              </p>
              {item.code && (
                <CodeBlock
                  code={item.code}
                  language={item.language ?? "python"}
                  showRunInPlayground={false}
                />
              )}
            </div>
          ))}
        </div>
      );
    case "errors":
      return (
        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50/30 dark:bg-red-950/10 p-3"
            >
              <p className="font-mono text-xs font-semibold text-red-600 dark:text-red-400 mb-1">
                {item.error}
              </p>
              <p className="text-sm text-foreground/80 mb-2">
                <span className="font-medium">What it means:</span> {item.meaning}
              </p>
              <p className="text-sm text-foreground/80">
                <span className="font-medium text-emerald-600">Fix:</span> {item.fix}
              </p>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}
