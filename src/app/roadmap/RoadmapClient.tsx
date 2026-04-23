"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle2,
  Circle,
  Clock,
  ChevronDown,
  ChevronRight,
  Target,
  Cpu,
  Wrench,
  AlertTriangle,
  Layers,
  Zap,
  FlaskConical,
  BookOpen,
  Flag,
  Filter,
  type LucideIcon,
} from "lucide-react"

const TRACK_ICONS: LucideIcon[] = [Wrench, Cpu, Layers]
function getTrackIcon(index: number): LucideIcon {
  return TRACK_ICONS[index] ?? Layers
}
import { Badge } from "@/components/ui/badge"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { PageHeader } from "@/components/layout/PageHeader"
import type { Track, Week } from "@/types"

// ─── Phase config ─────────────────────────────────────────────────────────────

type PhaseKey = "planning" | "build" | "integration" | "validation" | "handoff"

interface Phase {
  key: PhaseKey
  label: string
  Icon: React.ElementType
  weekRangeA: [number, number]
  weekRangeB: [number, number]
}

const PHASES: Phase[] = [
  { key: "planning",    label: "Planning",           Icon: Layers,       weekRangeA: [1, 3],   weekRangeB: [1, 3]   },
  { key: "build",       label: "Build / Modeling",   Icon: Wrench,       weekRangeA: [4, 6],   weekRangeB: [4, 6]   },
  { key: "integration", label: "Integration",        Icon: Zap,          weekRangeA: [7, 9],   weekRangeB: [7, 9]   },
  { key: "validation",  label: "Validation",         Icon: FlaskConical, weekRangeA: [10, 11], weekRangeB: [10, 11] },
  { key: "handoff",     label: "Handoff",            Icon: BookOpen,     weekRangeA: [12, 12], weekRangeB: [12, 12] },
]

function getPhaseWeeks(phase: Phase, track: Track): Week[] {
  const [start, end] = track.id === "track-a" ? phase.weekRangeA : phase.weekRangeB
  return track.weeks.filter((w) => w.weekNumber >= start && w.weekNumber <= end)
}

// ─── Status helpers ───────────────────────────────────────────────────────────

function statusConfig(status?: string) {
  if (status === "completed") return {
    Icon: CheckCircle2,
    label: "Completed",
    dot: "text-emerald-500",
    text: "text-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    ring: "ring-emerald-500/20",
    border: "border-l-emerald-500/40",
  }
  if (status === "in-progress") return {
    Icon: Clock,
    label: "In Progress",
    dot: "text-amber-400",
    text: "text-amber-400",
    badge: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    ring: "ring-amber-400/20",
    border: "border-l-amber-400",
  }
  return {
    Icon: Circle,
    label: "Pending",
    dot: "text-muted-foreground/25",
    text: "text-muted-foreground",
    badge: "bg-muted/50 text-muted-foreground border-border/40",
    ring: "ring-border/30",
    border: "border-l-border/30",
  }
}

// ─── Cycle progress bar ───────────────────────────────────────────────────────

function CycleOverviewCard({ track, index }: { track: Track; index: number }) {
  const completed = track.weeks.filter((w) => w.status === "completed").length
  const inProgress = track.weeks.filter((w) => w.status === "in-progress").length
  const total = track.weeks.length
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  const currentWeek = track.weeks.find((w) => w.status === "in-progress")
  const Icon = getTrackIcon(index)
  const trackLabel = `Track ${String.fromCharCode(65 + index)}`

  return (
    <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary/70" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground font-mono">
            {trackLabel}
          </span>
        </div>
        <span className="text-xs font-mono text-muted-foreground">{pct}% complete</span>
      </div>

      <p className="text-sm font-semibold text-foreground leading-snug">{track.name}</p>

      <div className="space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground/60">
          <span>{completed} done · {inProgress} active · {total - completed - inProgress} pending</span>
          <span>Wk 1–{total}</span>
        </div>
      </div>

      {currentWeek && (
        <div className="flex items-start gap-2 rounded-lg bg-amber-400/5 border border-amber-400/15 px-3 py-2.5">
          <Clock className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-0.5">
              Active · Week {currentWeek.weekNumber}
            </span>
            <span className="text-xs font-semibold text-foreground">{currentWeek.title}</span>
          </div>
        </div>
      )}

      <div className="flex items-start gap-2 text-xs text-muted-foreground">
        <Target className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary/50" />
        <span className="leading-relaxed">{track.overallGoal}</span>
      </div>
    </div>
  )
}

// ─── Phase filter nav ─────────────────────────────────────────────────────────

function PhaseNav({
  track,
  activePhase,
  onSelect,
}: {
  track: Track
  activePhase: PhaseKey | null
  onSelect: (k: PhaseKey | null) => void
}) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 flex-wrap">
      {PHASES.map((phase) => {
        const weeks = getPhaseWeeks(phase, track)
        const done = weeks.filter((w) => w.status === "completed").length
        const active = weeks.some((w) => w.status === "in-progress")
        const pct = weeks.length ? Math.round((done / weeks.length) * 100) : 0
        const isActive = activePhase === phase.key

        return (
          <button
            key={phase.key}
            onClick={() => onSelect(isActive ? null : phase.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all duration-150
              ${isActive
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-muted/40 border-border/40 text-muted-foreground hover:text-foreground hover:bg-muted/70 hover:border-border/70"
              }`}
          >
            <phase.Icon className="h-3.5 w-3.5" />
            {phase.label}
            {active && <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />}
            <span className={`font-mono text-[10px] ${isActive ? "opacity-80" : "opacity-40"}`}>{pct}%</span>
          </button>
        )
      })}
    </div>
  )
}

// ─── Milestone card ───────────────────────────────────────────────────────────

function MilestoneCard({ week }: { week: Week }) {
  const [open, setOpen] = useState(false)
  const s = statusConfig(week.status)

  return (
    <div className={`rounded-xl border bg-card border-l-[3px] ${s.border} transition-all duration-200
      ${week.status === "in-progress" ? "border-border shadow-md shadow-amber-400/5" : "border-border/50"}
      ${open ? "shadow-xl" : "hover:shadow-lg hover:-translate-y-0.5 hover:border-border"}
    `}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-3 sm:gap-4 p-4 sm:p-6 text-left group"
      >
        <div className={`mt-0.5 shrink-0 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full ring-2 ${s.ring} bg-card transition-transform duration-200 group-hover:scale-105`}>
          <s.Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${s.dot}`} />
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
              Week {week.weekNumber}
            </span>
            <Badge className={`text-[10px] h-5 px-2 uppercase font-bold border ${s.badge}`}>
              {s.label}
            </Badge>
          </div>

          <h3 className={`font-bold text-base leading-snug ${week.status === "completed" ? "text-muted-foreground" : "text-foreground"}`}>
            {week.title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed">{week.goal}</p>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className="shrink-0 mt-1.5"
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground/40" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="border-t border-border/40 px-4 sm:px-6 pb-4 sm:pb-6 pt-4 sm:pt-5 space-y-5">
              <div>
                <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Tasks
                </p>
                <ul className="space-y-2">
                  {week.tasks.map((t) => (
                    <li key={t.id} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary/40" />
                      {t.description}
                    </li>
                  ))}
                </ul>
              </div>

              {week.deliverables?.length > 0 && (
                <div>
                  <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground mb-3">
                    Deliverables
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {week.deliverables.map((d) => (
                      <span
                        key={d.id}
                        className="inline-block rounded-lg bg-muted/50 border border-border/40 px-3 py-1.5 text-xs text-muted-foreground"
                      >
                        {d.description}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {week.successCheck && (
                <div className="flex items-start gap-3 rounded-xl bg-primary/5 border border-primary/10 px-4 py-3.5">
                  <Target className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Success check: </span>
                    {week.successCheck}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Phase block ──────────────────────────────────────────────────────────────

function PhaseBlock({
  phase,
  track,
  filtered,
}: {
  phase: Phase
  track: Track
  filtered: boolean
}) {
  const [collapsed, setCollapsed] = useState(false)
  const weeks = getPhaseWeeks(phase, track)
  const done = weeks.filter((w) => w.status === "completed").length
  const active = weeks.some((w) => w.status === "in-progress")

  if (weeks.length === 0) return null

  return (
    <motion.div
      animate={{ opacity: filtered ? 0.2 : 1 }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className={filtered ? "pointer-events-none" : ""}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center gap-2.5 mb-3 group"
      >
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground border border-border/40 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-colors duration-150">
          <phase.Icon className="h-3.5 w-3.5" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors duration-150">
          {phase.label}
        </span>
        <span className="text-[10px] font-mono text-muted-foreground/50">
          Wk {weeks[0]?.weekNumber}–{weeks[weeks.length - 1]?.weekNumber}
        </span>
        {active && (
          <span className="flex items-center gap-1 text-[10px] text-amber-400 font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Active
          </span>
        )}
        <span className="ml-auto text-[10px] font-mono text-muted-foreground/50">{done}/{weeks.length}</span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground/30 transition-transform duration-150 ${collapsed ? "-rotate-90" : ""}`} />
      </button>

      {!collapsed && (
        <div className="space-y-3 pl-0">
          {weeks.map((week) => (
            <MilestoneCard key={week.weekNumber} week={week} />
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ─── Handoff panel ────────────────────────────────────────────────────────────

function HandoffPanel({ track }: { track: Track }) {
  if (!track.finalHandoff) return null
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-3">
      <div className="flex items-center gap-2">
        <Flag className="h-4 w-4 text-primary" />
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
          Cycle 1 — End State
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{track.finalHandoff}</p>
      <p className="text-[11px] text-muted-foreground/60 flex items-center gap-1.5">
        <AlertTriangle className="h-3 w-3" />
        Week 12 is dedicated entirely to this package. No new scope after Week 11 sign-off.
      </p>
    </div>
  )
}

// ─── Track view ───────────────────────────────────────────────────────────────

function TrackView({ track, index }: { track: Track; index: number }) {
  const [activePhase, setActivePhase] = useState<PhaseKey | null>(null)

  return (
    <div className="space-y-8">
      <CycleOverviewCard track={track} index={index} />

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
          <Filter className="h-3.5 w-3.5" /> Filter by phase
        </p>
        <PhaseNav track={track} activePhase={activePhase} onSelect={setActivePhase} />
      </div>

      <div className="space-y-10">
        {PHASES.map((phase) => (
          <PhaseBlock
            key={phase.key}
            phase={phase}
            track={track}
            filtered={activePhase !== null && activePhase !== phase.key}
          />
        ))}
      </div>

      <HandoffPanel track={track} />
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function RoadmapClient({ tracks }: { tracks: Track[] }) {
  const [activeTrack, setActiveTrack] = useState<string>(tracks[0]?.id ?? "")
  const trackIndex = tracks.findIndex((t) => t.id === activeTrack)
  const track = trackIndex >= 0 ? tracks[trackIndex] : tracks[0]
  const resolvedIndex = trackIndex >= 0 ? trackIndex : 0

  return (
    <>
      <SectionWrapper className="pb-0">
        <PageHeader
          title="Current Build Cycle"
          description="Cycle 1 — two parallel tracks running this quarter. Track A is a physical quadcopter build from bare frame to first hover. Track B is a Python-based simulation and controls stack. Both end with a tagged release and handoff documentation."
        />
      </SectionWrapper>

      <SectionWrapper className="pt-6">
        <div className="space-y-8">

          {/* Track switcher */}
          <div className="flex gap-1.5 p-1 rounded-xl bg-muted/40 border border-border/40 w-full">
            {tracks.map((t, i) => {
              const Icon = getTrackIcon(i)
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTrack(t.id)}
                  className={`flex flex-1 items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150
                    ${activeTrack === t.id
                      ? "bg-card text-foreground shadow-sm border border-border/60"
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {t.name}
                </button>
              )
            })}
          </div>

          {/* Track content */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrack}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
              >
                <TrackView track={track} index={resolvedIndex} />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </SectionWrapper>
    </>
  )
}
