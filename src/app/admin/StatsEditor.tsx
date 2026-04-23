"use client";
import { useState } from "react";
import type { Stat } from "@/lib/stats";

export function StatsEditor({ initial }: { initial: Stat[] }) {
  const [committed, setCommitted] = useState<Stat[]>(initial);
  const [stats, setStats] = useState<Stat[]>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const isDirty = JSON.stringify(stats) !== JSON.stringify(committed);

  const update = (index: number, field: keyof Stat, value: string) => {
    setStats((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
    setStatus("idle");
  };

  const cancel = () => {
    setStats(committed);
    setStatus("idle");
  };

  const save = async () => {
    setStatus("saving");
    const res = await fetch("/api/admin/stats", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stats),
    });
    if (res.ok) {
      setCommitted(stats);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
            Site statistics
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Shown on the home page and About page.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {isDirty && (
            <button
              onClick={cancel}
              className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            onClick={save}
            disabled={status === "saving" || !isDirty}
            className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : status === "error" ? "Error — retry" : "Save changes"}
          </button>
        </div>
      </div>

      <div className="divide-y divide-border">
        {stats.map((stat, i) => (
          <div key={stat.label} className="px-6 py-5 grid gap-3 sm:grid-cols-[140px_1fr_2fr]">
            <div className="flex items-start pt-1">
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                {stat.label}
              </span>
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] uppercase tracking-widest text-muted-foreground/60">
                Value
              </label>
              <input
                type="text"
                value={stat.value}
                onChange={(e) => update(i, "value", e.target.value)}
                className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] uppercase tracking-widest text-muted-foreground/60">
                Description
              </label>
              <input
                type="text"
                value={stat.description}
                onChange={(e) => update(i, "description", e.target.value)}
                className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
