"use client";

import { Playground } from "@/components/playground/Playground";

export function PlaygroundView() {
  return (
    <div className="h-[calc(100vh-3.5rem-4rem)] md:h-[calc(100vh-3.5rem)] flex flex-col">
      <Playground />
    </div>
  );
}
