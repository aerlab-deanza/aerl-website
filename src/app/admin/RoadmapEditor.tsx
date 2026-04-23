"use client"
import { useState } from "react"
import {
  CheckCircle2, Circle, Clock, ChevronDown,
  Plus, X, Cpu, Wrench, Layers, Settings,
} from "lucide-react"
import type { Track, Week } from "@/types"

// ─── helpers ──────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

const TRACK_ICONS = [Wrench, Cpu, Layers]
function trackIcon(index: number) {
  const Icon = TRACK_ICONS[index] ?? Layers
  return <Icon className="h-3.5 w-3.5" />
}

const STATUS_OPTIONS: {
  value: Week["status"]
  label: string
  Icon: React.ElementType
  classes: string
}[] = [
  {
    value: "pending",
    label: "Pending",
    Icon: Circle,
    classes:
      "border-border/60 text-muted-foreground hover:border-border data-[active=true]:bg-muted/60 data-[active=true]:text-foreground data-[active=true]:border-border",
  },
  {
    value: "in-progress",
    label: "In Progress",
    Icon: Clock,
    classes:
      "border-amber-400/30 text-amber-400/60 hover:border-amber-400/60 data-[active=true]:bg-amber-400/10 data-[active=true]:text-amber-400 data-[active=true]:border-amber-400/60",
  },
  {
    value: "completed",
    label: "Completed",
    Icon: CheckCircle2,
    classes:
      "border-emerald-500/30 text-emerald-500/60 hover:border-emerald-500/60 data-[active=true]:bg-emerald-500/10 data-[active=true]:text-emerald-500 data-[active=true]:border-emerald-500/60",
  },
]

// ─── shared style constants ───────────────────────────────────────────────────

const inputCls =
  "w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring"

const addBtnCls =
  "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground border border-dashed border-border/60 hover:border-border rounded-lg px-3 py-1.5 transition-colors"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
        {label}
      </p>
      {children}
    </div>
  )
}

// ─── TrackSettings ────────────────────────────────────────────────────────────

function TrackSettings({
  track,
  onChange,
  onDelete,
}: {
  track: Track
  onChange: (updated: Track) => void
  onDelete: () => void
}) {
  const [open, setOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const set = (field: keyof Track, value: string) =>
    onChange({ ...track, [field]: value })

  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 overflow-hidden mb-3">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-muted/40 transition-colors"
      >
        <Settings className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs font-semibold text-muted-foreground flex-1">Track settings</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted-foreground/50 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="border-t border-border/40 px-4 pb-4 pt-3 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Track name">
              <input
                type="text"
                value={track.name}
                onChange={(e) => set("name", e.target.value)}
                className={inputCls}
                placeholder="e.g. Track A — Physical Drone Build"
              />
            </Field>
            <Field label="Short description">
              <input
                type="text"
                value={track.shortDescription ?? ""}
                onChange={(e) => set("shortDescription", e.target.value)}
                className={inputCls}
                placeholder="One-line summary"
              />
            </Field>
          </div>

          <Field label="Overall goal">
            <textarea
              value={track.overallGoal}
              onChange={(e) => set("overallGoal", e.target.value)}
              rows={2}
              className={`${inputCls} resize-none`}
              placeholder="What does this track deliver by the end?"
            />
          </Field>

          <Field label="Final handoff (optional)">
            <textarea
              value={track.finalHandoff ?? ""}
              onChange={(e) => set("finalHandoff", e.target.value)}
              rows={2}
              className={`${inputCls} resize-none`}
              placeholder="What artefacts are handed off at the end of the cycle?"
            />
          </Field>

          {/* Delete track */}
          <div className="pt-1 flex items-center gap-3">
            {confirmDelete ? (
              <>
                <span className="text-xs text-destructive">Delete this track and all its weeks?</span>
                <button
                  onClick={onDelete}
                  className="text-xs font-semibold text-destructive border border-destructive/40 rounded-lg px-3 py-1.5 hover:bg-destructive/10 transition-colors"
                >
                  Yes, delete
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                className="text-xs text-destructive/70 hover:text-destructive border border-transparent hover:border-destructive/30 rounded-lg px-3 py-1.5 transition-colors"
              >
                Delete track
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── WeekRow ──────────────────────────────────────────────────────────────────

function WeekRow({
  week,
  onChange,
  onDelete,
}: {
  week: Week
  onChange: (updated: Week) => void
  onDelete: () => void
}) {
  const [open, setOpen] = useState(false)

  const setStatus = (status: Week["status"]) => onChange({ ...week, status })
  const setField = (field: keyof Week, value: string) => onChange({ ...week, [field]: value })

  const addTask = () =>
    onChange({ ...week, tasks: [...week.tasks, { id: uid(), description: "" }] })
  const updateTask = (id: string, desc: string) =>
    onChange({ ...week, tasks: week.tasks.map((t) => (t.id === id ? { ...t, description: desc } : t)) })
  const removeTask = (id: string) =>
    onChange({ ...week, tasks: week.tasks.filter((t) => t.id !== id) })

  const addDeliverable = () =>
    onChange({ ...week, deliverables: [...week.deliverables, { id: uid(), description: "" }] })
  const updateDeliverable = (id: string, desc: string) =>
    onChange({
      ...week,
      deliverables: week.deliverables.map((d) => (d.id === id ? { ...d, description: desc } : d)),
    })
  const removeDeliverable = (id: string) =>
    onChange({ ...week, deliverables: week.deliverables.filter((d) => d.id !== id) })

  return (
    <div className="border border-border/60 rounded-xl bg-card overflow-hidden">
      {/* Row header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground w-12 shrink-0">
          Wk {week.weekNumber}
        </span>

        <span className="flex-1 text-sm text-foreground truncate min-w-0">
          {week.title || <span className="text-muted-foreground italic">Untitled</span>}
        </span>

        {/* Status toggles */}
        <div className="flex gap-1 shrink-0">
          {STATUS_OPTIONS.map(({ value, label, Icon, classes }) => (
            <button
              key={value}
              data-active={week.status === value}
              onClick={() => setStatus(value)}
              title={label}
              className={`flex items-center gap-1 px-2 py-1 rounded-md border text-[10px] font-semibold transition-all duration-100 ${classes}`}
            >
              <Icon className="h-3 w-3" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="shrink-0 p-1.5 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
          title="Edit content"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          />
        </button>
        <button
          onClick={onDelete}
          className="shrink-0 p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
          title="Delete week"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Expanded editor */}
      {open && (
        <div className="border-t border-border/40 px-4 pb-5 pt-4 space-y-4">
          <Field label="Title">
            <input
              type="text"
              value={week.title}
              onChange={(e) => setField("title", e.target.value)}
              className={inputCls}
              placeholder="Week title"
            />
          </Field>

          <Field label="Goal">
            <textarea
              value={week.goal}
              onChange={(e) => setField("goal", e.target.value)}
              rows={2}
              className={`${inputCls} resize-none`}
              placeholder="What should be achieved this week?"
            />
          </Field>

          <Field label="Tasks">
            <div className="space-y-2">
              {week.tasks.map((t) => (
                <div key={t.id} className="flex gap-2">
                  <input
                    type="text"
                    value={t.description}
                    onChange={(e) => updateTask(t.id, e.target.value)}
                    className={`${inputCls} flex-1`}
                    placeholder="Task description"
                  />
                  <button
                    onClick={() => removeTask(t.id)}
                    className="shrink-0 p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              <button onClick={addTask} className={addBtnCls}>
                <Plus className="h-3 w-3" /> Add task
              </button>
            </div>
          </Field>

          <Field label="Deliverables">
            <div className="space-y-2">
              {week.deliverables.map((d) => (
                <div key={d.id} className="flex gap-2">
                  <input
                    type="text"
                    value={d.description}
                    onChange={(e) => updateDeliverable(d.id, e.target.value)}
                    className={`${inputCls} flex-1`}
                    placeholder="Deliverable description"
                  />
                  <button
                    onClick={() => removeDeliverable(d.id)}
                    className="shrink-0 p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              <button onClick={addDeliverable} className={addBtnCls}>
                <Plus className="h-3 w-3" /> Add deliverable
              </button>
            </div>
          </Field>

          <Field label="Success check">
            <input
              type="text"
              value={week.successCheck ?? ""}
              onChange={(e) => setField("successCheck", e.target.value)}
              className={inputCls}
              placeholder="How do we know this week succeeded?"
            />
          </Field>
        </div>
      )}
    </div>
  )
}

// ─── RoadmapEditor ────────────────────────────────────────────────────────────

export function RoadmapEditor({ initial }: { initial: Track[] }) {
  const [committed, setCommitted] = useState<Track[]>(initial)
  const [tracks, setTracks] = useState<Track[]>(initial)
  const [activeTrackId, setActiveTrackId] = useState(initial[0]?.id ?? "")
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  const isDirty = JSON.stringify(tracks) !== JSON.stringify(committed)

  const activeTrack = tracks.find((t) => t.id === activeTrackId) ?? tracks[0]

  // ── track-level mutations ──────────────────────────────────────────────────

  const updateTrack = (updated: Track) =>
    setTracks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))

  const cancel = () => {
    setTracks(committed)
    setActiveTrackId(committed[0]?.id ?? "")
    setSaveStatus("idle")
  }

  const addTrack = () => {
    const id = `track-${uid()}`
    const letter = String.fromCharCode(65 + tracks.length) // A, B, C…
    const newTrack: Track = {
      id,
      name: `Track ${letter}`,
      slug: `track-${letter.toLowerCase()}`,
      shortDescription: "",
      overallGoal: "",
      weeks: [],
    }
    setTracks((prev) => [...prev, newTrack])
    setActiveTrackId(id)
  }

  const deleteTrack = (id: string) => {
    const remaining = tracks.filter((t) => t.id !== id)
    setTracks(remaining)
    if (activeTrackId === id) setActiveTrackId(remaining[0]?.id ?? "")
  }

  // ── week-level mutations ───────────────────────────────────────────────────

  const updateWeek = (weekNumber: number, updatedWeek: Week) =>
    updateTrack({
      ...activeTrack,
      weeks: activeTrack.weeks.map((w) => (w.weekNumber === weekNumber ? updatedWeek : w)),
    })

  const deleteWeek = (weekNumber: number) =>
    updateTrack({
      ...activeTrack,
      weeks: activeTrack.weeks.filter((w) => w.weekNumber !== weekNumber),
    })

  const addWeek = () => {
    const maxNum = Math.max(...activeTrack.weeks.map((w) => w.weekNumber), 0)
    updateTrack({
      ...activeTrack,
      weeks: [
        ...activeTrack.weeks,
        { weekNumber: maxNum + 1, title: "", goal: "", tasks: [], deliverables: [], status: "pending" },
      ],
    })
  }

  // ── persist ────────────────────────────────────────────────────────────────

  const save = async () => {
    setSaveStatus("saving")
    const res = await fetch("/api/admin/roadmap", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tracks),
    })
    if (res.ok) {
      setCommitted(tracks)
      setSaveStatus("saved")
      setTimeout(() => setSaveStatus("idle"), 2500)
    } else {
      setSaveStatus("error")
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
            Roadmap
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage tracks and weeks. Changes go live after saving.
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
            disabled={saveStatus === "saving" || !isDirty}
            className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {saveStatus === "saving"
              ? "Saving…"
              : saveStatus === "saved"
              ? "Saved"
              : saveStatus === "error"
              ? "Error — retry"
              : "Save changes"}
          </button>
        </div>
      </div>

      {/* Track tabs + add track */}
      <div className="flex items-center border-b border-border overflow-x-auto">
        {tracks.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActiveTrackId(t.id)}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTrackId === t.id
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {trackIcon(i)}
            {t.name || `Track ${String.fromCharCode(65 + i)}`}
          </button>
        ))}

        {/* Add track button */}
        <button
          onClick={addTrack}
          className="flex items-center gap-1.5 px-4 py-3 text-xs font-semibold text-muted-foreground hover:text-foreground border-b-2 border-transparent transition-colors whitespace-nowrap ml-1"
        >
          <Plus className="h-3.5 w-3.5" />
          Add track
        </button>
      </div>

      {/* Track body */}
      {activeTrack && (
        <div className="p-4 space-y-2">
          {/* Track-level settings */}
          <TrackSettings
            track={activeTrack}
            onChange={updateTrack}
            onDelete={() => deleteTrack(activeTrack.id)}
          />

          {/* Week rows */}
          {activeTrack.weeks
            .slice()
            .sort((a, b) => a.weekNumber - b.weekNumber)
            .map((week) => (
              <WeekRow
                key={`${activeTrack.id}-${week.weekNumber}`}
                week={week}
                onChange={(updated) => updateWeek(week.weekNumber, updated)}
                onDelete={() => deleteWeek(week.weekNumber)}
              />
            ))}

          {/* Add week */}
          <button
            onClick={addWeek}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-border/60 hover:border-border py-3 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Plus className="h-4 w-4" /> Add week
          </button>
        </div>
      )}

      {/* Empty state when no tracks */}
      {tracks.length === 0 && (
        <div className="p-8 text-center text-sm text-muted-foreground">
          No tracks yet.{" "}
          <button onClick={addTrack} className="text-foreground underline underline-offset-2">
            Add the first one.
          </button>
        </div>
      )}
    </div>
  )
}
