"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { codingChallenges } from "@/data/coding-challenges";
import type { CodingChallenge } from "@/types";
import { useAppStore } from "@/lib/store";
import {
  Check, ChevronLeft, ChevronRight, Play, RotateCcw, Lightbulb,
  Trophy, Circle, CheckCircle2, Loader2, Terminal, BookOpen, Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const MonacoEditor = dynamic(
  () => import("@monaco-editor/react").then((m) => m.default),
  { ssr: false, loading: () => (
    <div className="flex items-center justify-center h-full bg-[#1e1e1e] text-slate-400 text-sm gap-2">
      <Loader2 className="h-4 w-4 animate-spin" />Loading editor...
    </div>
  )},
);

function difficultyColor(d: CodingChallenge["difficulty"]) {
  return d === "easy" ? "text-emerald-400" : d === "medium" ? "text-amber-400" : "text-rose-400";
}
function difficultyBg(d: CodingChallenge["difficulty"]) {
  return d === "easy" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    : d === "medium" ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
    : "bg-rose-500/10 text-rose-400 border-rose-500/20";
}

interface TestResult {
  id: number; label: string; passed: boolean;
  expected: string; got: string; hidden: boolean; error?: string;
}

async function loadSolutions(): Promise<Record<number, string>> {
  try {
    const res = await fetch("/api/assessments", { cache: "no-store" });
    if (!res.ok) return {};
    const rows = (await res.json()) as { assessmentId: string; answers: string }[];
    const map: Record<number, string> = {};
    for (const r of rows) {
      if (r.assessmentId.startsWith("code-")) {
        const id = Number(r.assessmentId.replace("code-", ""));
        try { const p = JSON.parse(r.answers) as { code: string }; if (p.code && !map[id]) map[id] = p.code; } catch {}
      }
    }
    return map;
  } catch { return {}; }
}

async function saveSolution(cId: number, code: string, passed: boolean) {
  await fetch("/api/assessments", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ assessmentId: `code-${cId}`, score: passed ? 1 : 0, total: 1, answers: JSON.stringify({ code }) }),
  });
}

async function runTests(challenge: CodingChallenge, code: string): Promise<{ results: TestResult[]; allPassed: boolean }> {
  const results: TestResult[] = [];
  for (const tc of challenge.testCases) {
    try {
      const { runPythonInline } = await import("@/lib/pyodide-runner");
      const inputs = tc.input ? tc.input.split("\n") : [];
      const result = await runPythonInline(code, { inputs, freshGlobals: true });
      const got = (result.stdout || result.stderr || "").trim();
      const expected = tc.expected.trim();
      results.push({ id: tc.id, label: tc.label ?? `Test ${tc.id}`, passed: got === expected, expected, got, hidden: tc.hidden ?? false, error: result.error ?? undefined });
    } catch (e) {
      results.push({ id: tc.id, label: tc.label ?? `Test ${tc.id}`, passed: false, expected: tc.expected, got: "", hidden: tc.hidden ?? false, error: String(e) });
    }
  }
  return { results, allPassed: results.every((r) => r.passed) };
}

export function CodingChallengesView() {
  const isLoggedIn = useAppStore((s) => s.isLoggedIn);
  const [selectedId, setSelectedId] = useState<number>(1);
  const [codes, setCodes] = useState<Record<number, string>>({});
  const [testResults, setTestResults] = useState<Record<number, TestResult[]>>({});
  const [solved, setSolved] = useState<Set<number>>(new Set());
  const [running, setRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [diffFilter, setDiffFilter] = useState<"all" | "easy" | "medium" | "hard">("all");
  const [panelTab, setPanelTab] = useState<"description" | "results">("description");

  const challenge = codingChallenges.find((c) => c.id === selectedId)!;

  useEffect(() => {
    if (!isLoggedIn) return;
    loadSolutions().then((saved) => {
      const codeMap: Record<number, string> = {};
      const solvedSet = new Set<number>();
      for (const c of codingChallenges) {
        codeMap[c.id] = saved[c.id] ?? c.starterCode;
        if (saved[c.id]) solvedSet.add(c.id);
      }
      setCodes(codeMap);
      setSolved(solvedSet);
    });
  }, [isLoggedIn]);

  useEffect(() => { setShowHint(false); setHintIndex(0); setPanelTab("description"); }, [selectedId]);

  const currentCode = codes[selectedId] ?? challenge.starterCode;
  const handleCodeChange = useCallback((val: string | undefined) => {
    setCodes((prev) => ({ ...prev, [selectedId]: val ?? "" }));
  }, [selectedId]);

  const handleReset = () => {
    setCodes((prev) => ({ ...prev, [selectedId]: challenge.starterCode }));
    setTestResults((prev) => ({ ...prev, [selectedId]: [] }));
    toast.info("Code reset to starter.");
  };

  const handleRun = useCallback(async () => {
    setRunning(true); setPanelTab("results");
    try {
      const { results, allPassed } = await runTests(challenge, currentCode);
      setTestResults((prev) => ({ ...prev, [selectedId]: results }));
      if (isLoggedIn) {
        await saveSolution(selectedId, currentCode, allPassed);
        if (allPassed) { setSolved((prev) => new Set(prev).add(selectedId)); toast.success("All tests passed! Solution saved!"); }
        else toast.message(`${results.filter((r) => r.passed).length}/${results.length} tests passed.`);
      }
    } catch (e) { toast.error("Error: " + String(e)); }
    finally { setRunning(false); }
  }, [challenge, currentCode, selectedId, isLoggedIn]);

  const filteredChallenges = useMemo(() =>
    diffFilter === "all" ? codingChallenges : codingChallenges.filter((c) => c.difficulty === diffFilter),
  [diffFilter]);

  const results = testResults[selectedId] ?? [];
  const currentIdx = codingChallenges.findIndex((c) => c.id === selectedId);
  const prevChallenge = currentIdx > 0 ? codingChallenges[currentIdx - 1] : null;
  const nextChallenge = currentIdx < codingChallenges.length - 1 ? codingChallenges[currentIdx + 1] : null;

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-[#0f1117]">
      {/* Problem List */}
      <aside className="hidden lg:flex flex-col w-60 border-r border-slate-800 bg-[#0f1117] overflow-hidden">
        <div className="p-3 border-b border-slate-800 space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium"><Filter className="h-3.5 w-3.5" />Filter</div>
          <div className="flex gap-1 flex-wrap">
            {(["all","easy","medium","hard"] as const).map((d) => (
              <button key={d} onClick={() => setDiffFilter(d)} className={cn("px-2 py-0.5 rounded text-[11px] font-medium capitalize border transition-colors", diffFilter === d ? (d === "all" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : difficultyBg(d as any)) : "border-slate-700 text-slate-500 hover:border-slate-600")}>{d}</button>
            ))}
          </div>
          <div className="text-[10px] text-slate-500">{solved.size}/{codingChallenges.length} solved</div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredChallenges.map((c) => (
            <button key={c.id} onClick={() => setSelectedId(c.id)} className={cn("w-full text-left px-3 py-2 border-b border-slate-800/50 flex items-start gap-2 hover:bg-slate-800/40 transition-colors group", selectedId === c.id && "bg-slate-800/70")}>
              <span className="mt-0.5 shrink-0">{solved.has(c.id) ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Circle className="h-3.5 w-3.5 text-slate-600" />}</span>
              <div className="min-w-0">
                <p className={cn("text-xs font-medium truncate", selectedId === c.id ? "text-white" : "text-slate-300")}>{c.id}. {c.title}</p>
                <p className={cn("text-[10px] capitalize", difficultyColor(c.difficulty))}>{c.difficulty}</p>
              </div>
            </button>
          ))}
        </div>
      </aside>
      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-[#0f1117] shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-slate-400 text-xs font-mono shrink-0">#{challenge.id}</span>
            <h2 className="text-sm font-semibold text-white truncate">{challenge.title}</h2>
            <Badge variant="outline" className={cn("text-[10px] capitalize shrink-0", difficultyBg(challenge.difficulty))}>{challenge.difficulty}</Badge>
            {solved.has(selectedId) && <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[10px] shrink-0 hidden sm:flex gap-1"><Trophy className="h-3 w-3" />Solved</Badge>}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Button size="sm" variant="ghost" className="h-7 px-2 text-slate-400 hover:text-white text-xs hidden sm:flex" onClick={() => setShowHint(!showHint)}><Lightbulb className="h-3.5 w-3.5 mr-1" />Hint</Button>
            <Button size="sm" variant="ghost" className="h-7 px-2 text-slate-400 hover:text-amber-400 text-xs" onClick={handleReset}><RotateCcw className="h-3.5 w-3.5 mr-1" /><span className="hidden sm:inline">Reset</span></Button>
            <Button size="sm" className="h-7 px-3 text-xs bg-emerald-600 hover:bg-emerald-500 text-white gap-1" onClick={handleRun} disabled={running}>
              {running ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Running...</> : <><Play className="h-3.5 w-3.5 fill-current" />Run & Submit</>}
            </Button>
          </div>
        </div>
        {/* Hint */}
        {showHint && challenge.hints && challenge.hints.length > 0 && (
          <div className="flex items-start gap-2 px-4 py-2 bg-amber-950/30 border-b border-amber-900/30 shrink-0">
            <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1"><p className="text-xs text-amber-300">{challenge.hints[hintIndex]}</p>
              {challenge.hints.length > 1 && <button className="text-[10px] text-amber-500 mt-1 hover:text-amber-400" onClick={() => setHintIndex((i) => (i+1)%(challenge.hints?.length??1))}>Next hint ({hintIndex+1}/{challenge.hints.length}) →</button>}
            </div>
            <button onClick={() => setShowHint(false)} className="text-amber-600 hover:text-amber-400 text-xs">x</button>
          </div>
        )}
        {/* Split panel */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left: description / results */}
          <div className="lg:w-80 xl:w-96 flex flex-col border-r border-slate-800 overflow-hidden lg:max-h-full max-h-48 lg:shrink-0">
            <div className="flex border-b border-slate-800 shrink-0">
              {(["description","results"] as const).map((tab) => (
                <button key={tab} onClick={() => setPanelTab(tab)} className={cn("px-4 py-2 text-xs font-medium capitalize transition-colors flex items-center gap-1.5", panelTab === tab ? "text-white border-b-2 border-blue-500" : "text-slate-500 hover:text-slate-300")}>
                  {tab === "description" ? <BookOpen className="h-3.5 w-3.5" /> : <Terminal className="h-3.5 w-3.5" />}
                  {tab}{tab==="results" && results.length > 0 && <span className={cn("ml-1 text-[10px] px-1 rounded", results.every(r=>r.passed) ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400")}>{results.filter(r=>r.passed).length}/{results.length}</span>}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto p-4 text-sm text-slate-300 space-y-4">
              {panelTab === "description" ? (
                <>
                  <p className="leading-relaxed text-[13px]">{challenge.description}</p>
                  {challenge.constraints && <div><h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Constraints</h4><ul className="space-y-1">{challenge.constraints.map((c,i)=><li key={i} className="text-xs text-slate-400 font-mono">{c}</li>)}</ul></div>}
                  {challenge.examples.map((ex,i)=>(
                    <div key={i} className="rounded-lg bg-slate-900 border border-slate-800 overflow-hidden">
                      <div className="px-3 py-1.5 bg-slate-800/60 text-[10px] text-slate-400 uppercase tracking-wide font-medium">Example {i+1}</div>
                      <div className="p-3 space-y-2">
                        {ex.input && <div><span className="text-[10px] text-slate-500 uppercase tracking-wide">Input</span><pre className="text-xs font-mono text-slate-300 mt-1">{ex.input}</pre></div>}
                        <div><span className="text-[10px] text-slate-500 uppercase tracking-wide">Output</span><pre className="text-xs font-mono text-emerald-300 mt-1">{ex.output}</pre></div>
                        {ex.explanation && <p className="text-[11px] text-slate-400 italic">{ex.explanation}</p>}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="space-y-2">
                  {results.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-slate-500 gap-2"><Play className="h-8 w-8 opacity-30" /><p className="text-xs">Run your code to see test results</p></div>
                  ) : results.map((r)=>(
                    <div key={r.id} className={cn("rounded-lg border overflow-hidden", r.passed ? "border-emerald-800/50 bg-emerald-950/20" : "border-rose-800/50 bg-rose-950/20")}>
                      <div className={cn("flex items-center gap-2 px-3 py-1.5", r.passed ? "bg-emerald-900/20" : "bg-rose-900/20")}>
                        {r.passed ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <span className="text-rose-400 text-sm">x</span>}
                        <span className="text-xs font-medium text-white">{r.label}</span>
                        {r.hidden && <span className="text-[10px] text-slate-500 ml-auto">hidden</span>}
                      </div>
                      {!r.passed && (
                        <div className="px-3 py-2 space-y-1">
                          <div><span className="text-[10px] text-slate-500">Expected:</span><pre className="text-[11px] text-emerald-400 font-mono whitespace-pre-wrap">{r.expected}</pre></div>
                          <div><span className="text-[10px] text-slate-500">Got:</span><pre className="text-[11px] text-rose-400 font-mono whitespace-pre-wrap">{r.error ? `Error: ${r.error}` : r.got || "(no output)"}</pre></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Editor */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 min-h-0">
              <MonacoEditor height="100%" language="python" theme="vs-dark" value={currentCode} onChange={handleCodeChange}
                options={{ minimap:{enabled:false}, fontSize:13, lineHeight:22, fontFamily:"'JetBrains Mono','Fira Code',monospace", fontLigatures:true, padding:{top:16,bottom:16}, scrollBeyondLastLine:false, tabSize:4, insertSpaces:true, wordWrap:"on", bracketPairColorization:{enabled:true} }}
              />
            </div>
            <div className="flex items-center justify-between px-4 py-2 border-t border-slate-800 bg-[#0f1117] shrink-0">
              <Button size="sm" variant="ghost" className="h-7 px-2 text-slate-500 hover:text-white text-xs gap-1" onClick={() => prevChallenge && setSelectedId(prevChallenge.id)} disabled={!prevChallenge}><ChevronLeft className="h-4 w-4" />Prev</Button>
              <span className="text-[11px] text-slate-500">{currentIdx+1} / {codingChallenges.length}</span>
              <Button size="sm" variant="ghost" className="h-7 px-2 text-slate-500 hover:text-white text-xs gap-1" onClick={() => nextChallenge && setSelectedId(nextChallenge.id)} disabled={!nextChallenge}>Next<ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
