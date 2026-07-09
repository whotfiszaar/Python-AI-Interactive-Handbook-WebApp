"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

let mermaidPromise: Promise<typeof import("mermaid")> | null = null;

async function getMermaid() {
  if (mermaidPromise) return mermaidPromise;
  mermaidPromise = import("mermaid");
  return mermaidPromise;
}

/** Light mode color palette (readable on white/light backgrounds). */
const LIGHT_VARS = {
  primaryColor: "#e2e8f0",
  primaryTextColor: "#0f172a",
  primaryBorderColor: "#64748b",
  lineColor: "#475569",
  secondaryColor: "#f1f5f9",
  tertiaryColor: "#f8fafc",
  background: "#ffffff",
  mainBkg: "#e2e8f0",
  secondBkg: "#f1f5f9",
  textColor: "#0f172a",
  nodeBorder: "#64748b",
  clusterBkg: "#f8fafc",
  clusterBorder: "#cbd5e1",
  edgeLabelBackground: "#ffffff",
  actorBkg: "#e2e8f0",
  actorBorder: "#64748b",
  actorTextColor: "#0f172a",
  actorLineColor: "#475569",
  signalColor: "#334155",
  signalTextColor: "#0f172a",
  labelBoxBkgColor: "#f1f5f9",
  labelBoxBorderColor: "#64748b",
  labelTextColor: "#0f172a",
  loopTextColor: "#0f172a",
  noteBkgColor: "#fef3c7",
  noteBorderColor: "#f59e0b",
  noteTextColor: "#78350f",
  activationBorderColor: "#64748b",
  sequenceNumberColor: "#ffffff",
};

/** Dark mode color palette (readable on dark backgrounds). */
const DARK_VARS = {
  primaryColor: "#1e293b",
  primaryTextColor: "#f1f5f9",
  primaryBorderColor: "#475569",
  lineColor: "#94a3b8",
  secondaryColor: "#334155",
  tertiaryColor: "#1e293b",
  background: "#0f172a",
  mainBkg: "#1e293b",
  secondBkg: "#334155",
  textColor: "#f1f5f9",
  nodeBorder: "#475569",
  clusterBkg: "#0f172a",
  clusterBorder: "#334155",
  edgeLabelBackground: "#1e293b",
  actorBkg: "#1e293b",
  actorBorder: "#475569",
  actorTextColor: "#f1f5f9",
  actorLineColor: "#94a3b8",
  signalColor: "#cbd5e1",
  signalTextColor: "#f1f5f9",
  labelBoxBkgColor: "#334155",
  labelBoxBorderColor: "#475569",
  labelTextColor: "#f1f5f9",
  loopTextColor: "#f1f5f9",
  noteBkgColor: "#422006",
  noteBorderColor: "#f59e0b",
  noteTextColor: "#fef3c7",
  activationBorderColor: "#475569",
  sequenceNumberColor: "#0f172a",
};

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  // Re-render the diagram whenever the code or theme changes.
  useEffect(() => {
    let active = true;
    const renderId = `${idRef.current}-${isDark ? "d" : "l"}`;

    (async () => {
      try {
        const m = await getMermaid();
        const vars = isDark ? DARK_VARS : LIGHT_VARS;
        m.default.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: vars,
          flowchart: {
            curve: "basis",
            htmlLabels: true,
            nodeSpacing: 40,
            rankSpacing: 40,
          },
          sequence: {
            actorBkg: vars.actorBkg,
            actorBorder: vars.actorBorder,
            actorTextColor: vars.actorTextColor,
            actorLineColor: vars.actorLineColor,
            signalColor: vars.signalColor,
            signalTextColor: vars.signalTextColor,
            labelBoxBkgColor: vars.labelBoxBkgColor,
            labelBoxBorderColor: vars.labelBoxBorderColor,
            labelTextColor: vars.labelTextColor,
            loopTextColor: vars.loopTextColor,
            noteBkgColor: vars.noteBkgColor,
            noteBorderColor: vars.noteBorderColor,
            noteTextColor: vars.noteTextColor,
            activationBorderColor: vars.activationBorderColor,
            sequenceNumberColor: vars.sequenceNumberColor,
          },
        });
        // Mermaid requires a unique ID for each render. Clear any previous
        // rendered element with this ID to avoid collisions.
        const old = document.getElementById(renderId);
        if (old) old.remove();
        const { svg: out } = await m.default.render(renderId, code);
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
  }, [code, isDark]);

  return (
    <figure
      className={cn(
        "my-4 rounded-lg border border-border bg-muted/30 p-4",
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
