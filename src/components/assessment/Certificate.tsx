"use client";

import { useMemo } from "react";
import { Award, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CertificateProps {
  studentName: string;
  courseTitle: string;
  completionDate: Date;
}

function genCertNumber(): string {
  const part = () => Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PAIH-${part()}-${part()}-${part()}`;
}

export function Certificate({
  studentName,
  courseTitle,
  completionDate,
}: CertificateProps) {
  const certNumber = useMemo(() => genCertNumber(), []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 print:space-y-0">
      <div className="flex justify-end print:hidden">
        <Button onClick={handlePrint} className="gap-2" size="sm">
          <Download className="h-4 w-4" />
          Download PDF (Print)
        </Button>
      </div>
      <div
        id="certificate"
        className="relative mx-auto bg-white text-slate-900 shadow-xl print:shadow-none print:w-full"
        style={{
          width: "794px",
          maxWidth: "100%",
          minHeight: "1123px",
          padding: "60px",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        {/* Decorative border */}
        <div
          className="absolute inset-4 border-4 border-double border-slate-300 pointer-events-none"
          style={{ borderRadius: "8px" }}
        />
        <div
          className="absolute inset-6 border border-slate-200 pointer-events-none"
          style={{ borderRadius: "4px" }}
        />

        <div className="relative flex flex-col items-center text-center pt-8">
          <div className="flex items-center justify-center mb-4">
            <Award className="h-16 w-16 text-amber-500" strokeWidth={1.5} />
          </div>
          <p
            className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-2"
            style={{ letterSpacing: "0.3em" }}
          >
            Certificate of Completion
          </p>
          <div className="w-24 h-px bg-slate-300 mb-8" />
          <p className="text-base text-slate-600 mb-2">This certifies that</p>
          <h1
            className="text-4xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {studentName}
          </h1>
          <div className="w-32 h-px bg-slate-300 mb-8" />
          <p className="text-base text-slate-600 mb-1">has successfully completed the</p>
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 px-8">
            {courseTitle}
          </h2>
          <p className="text-sm text-slate-600 max-w-md leading-relaxed mb-8">
            A comprehensive 48-day program covering Python programming, artificial
            intelligence theory, and practical LLM development with LangChain, MCP,
            and Langfuse.
          </p>
          <div className="flex items-center justify-between w-full max-w-md mt-12">
            <div className="text-center">
              <div className="w-40 border-b border-slate-400 pb-1 mb-1" />
              <p className="text-xs text-slate-500">
                {completionDate.toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">
                Date
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Award className="h-10 w-10 text-amber-500" strokeWidth={1} />
              </div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-1">
                Official Seal
              </p>
            </div>
            <div className="text-center">
              <div className="w-40 border-b border-slate-400 pb-1 mb-1" />
              <p className="text-xs text-slate-500">Python &amp; AI Handbook</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">
                Issued By
              </p>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-12 font-mono">
            Certificate No: {certNumber}
          </p>
        </div>
      </div>
    </div>
  );
}
