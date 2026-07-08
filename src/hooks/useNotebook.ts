"use client";

import { useCallback, useEffect, useState } from "react";
import type { NotebookRow, NotebookPayload } from "@/types";
import { toast } from "sonner";

export function useNotebooks() {
  const [notebooks, setNotebooks] = useState<NotebookRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notebooks");
      if (!res.ok) throw new Error("Failed to load notebooks");
      const data = (await res.json()) as NotebookRow[];
      setNotebooks(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (payload: NotebookPayload) => {
    try {
      const res = await fetch("/api/notebooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create notebook");
      const row = (await res.json()) as NotebookRow;
      setNotebooks((prev) => [row, ...prev]);
      return row;
    } catch (e) {
      console.error(e);
      toast.error("Could not create notebook");
      return null;
    }
  }, []);

  const update = useCallback(
    async (id: number, payload: Partial<NotebookPayload>) => {
      try {
        const res = await fetch(`/api/notebooks/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update notebook");
        const row = (await res.json()) as NotebookRow;
        setNotebooks((prev) =>
          prev.map((n) => (n.id === id ? { ...n, ...row } : n)),
        );
        return row;
      } catch (e) {
        console.error(e);
        toast.error("Could not save notebook");
        return null;
      }
    },
    [],
  );

  const remove = useCallback(async (id: number) => {
    try {
      const res = await fetch(`/api/notebooks/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete notebook");
      setNotebooks((prev) => prev.filter((n) => n.id !== id));
      toast.success("Notebook deleted");
      return true;
    } catch (e) {
      console.error(e);
      toast.error("Could not delete notebook");
      return false;
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { notebooks, loading, load, create, update, remove };
}
