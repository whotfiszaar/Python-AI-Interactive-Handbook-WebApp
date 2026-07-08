"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

let mermaidPromise: Promise<{ default: { render: (code: string) => Promise<{ svg: string }>, initialize: (config: any) => void } }> | null = null;

async function getMermaid() {
  if (mermaidPromise) return mermaidPromise;
  mermaidPromise = import("mermaid").then((m) => {
    m.default.initialize({ startOnLoad: false });
    return m;
  });
  return mermaidPromise;
}

interface MermaidBlockProps {
  code: string;
  caption?: string;
  className?: string;
}

export function MermaidBlock({ code, caption, className }: MermaidBlockProps) {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const idRef = useRef(`mmd-${Math.random().toString(36).slice(2, 9)}`);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const m = await getMermaid();
        
        // Dynamically initialize Mermaid based on current theme
        const isDark = resolvedTheme === "dark";
        m.default.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: isDark
            ? {
                primaryColor: "#1e293b",
                primaryTextColor: "#f1f5f9",
                primaryBorderColor: "#475569",
                lineColor: "#94a3b8",
                secondaryColor: "#334155",
                tertiaryColor: "#0f172a",
                background: "#0f172a",
                mainBkg: "#1e293b",
                secondBkg: "#334155",
                textColor: "#f1f5f9",
                nodeBorder: "#475569",
                clusterBkg: "#1e293b",
                clusterBorder: "#334155",
                edgeLabelBackground: "#0f172a",
              }
            : {
                primaryColor: "#f8fafc",
                primaryTextColor: "#0f172a",
                primaryBorderColor: "#cbd5e1",
                lineColor: "#475569",
                secondaryColor: "#e2e8f0",
                tertiaryColor: "#f8fafc",
                background: "#ffffff",
                mainBkg: "#f8fafc",
                secondBkg: "#e2e8f0",
                textColor: "#0f172a",
                nodeBorder: "#cbd5e1",
                clusterBkg: "#f8fafc",
                clusterBorder: "#cbd5e1",
                edgeLabelBackground: "#ffffff",
              },
          flowchart: { curve: "basis", htmlLabels: true },
          sequence: {
            actorBkg: isDark ? "#1e293b" : "#f8fafc",
            actorTextColor: isDark ? "#f1f5f9" : "#0f172a",
            signalColor: isDark ? "#94a3b8" : "#475569",
            signalTextColor: isDark ? "#f1f5f9" : "#0f172a",
            labelBkgColor: isDark ? "#334155" : "#e2e8f0",
            labelTextColor: isDark ? "#f1f5f9" : "#0f172a",
            loopBkgColor: isDark ? "#1e293b" : "#f8fafc",
          },
        });

        const { svg: out } = await m.default.render(idRef.current, code);
        if (active) {
          setSvg(out);
          setError("");
        }
      } catch (e) {
        if (active) {
          setError(e instanceof Error ? e.message : String(e));
          setSvg("");
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [code, resolvedTheme]);

  return (
    <figure
      className={cn(
        "my-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-4",
        className,
      )}
    >
      {error ? (
        <div className="text-xs text-red-500 font-mono p-2 bg-red-50 dark:bg-red-950/30 rounded">
          Diagram error: {error}
        </div>
      ) : svg ? (
        <div
          className="flex justify-center overflow-x-auto [&_svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="flex justify-center items-center h-32 text-sm text-muted-foreground">
          Rendering diagram...
        </div>
      )}
      {caption && (
        <figcaption className="mt-3 text-xs text-muted-foreground text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
