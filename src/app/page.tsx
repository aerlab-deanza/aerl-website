import Link from "next/link"
import { ArrowRight, CheckCircle2, Clock, Circle } from "lucide-react"
import * as Icons from "lucide-react"
import { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { ProjectCard } from "@/components/cards/ProjectCard"
import { CTA } from "@/components/blocks/CTA"

import { featuredProjects, committees, tracks } from "@/lib/data"

// ─── Build Status Snapshot ────────────────────────────────────────────────────

function TrackStatusIcon({ status }: { status?: string }) {
  if (status === "completed") return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
  if (status === "in-progress") return <Clock className="h-4 w-4 text-amber-400" />
  return <Circle className="h-4 w-4 text-muted-foreground/30" />
}

function BuildStatusCard({ track }: { track: (typeof tracks)[0] }) {
  const currentWeek = track.weeks.find((w) => w.status === "in-progress")
  const completedCount = track.weeks.filter((w) => w.status === "completed").length
  const totalWeeks = track.weeks.length
  const progressPct = Math.round((completedCount / totalWeeks) * 100)

  return (
    <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
            {track.id === "track-a" ? "Track A" : "Track B"}
          </p>
          <h3 className="font-bold text-sm leading-snug">{track.name}</h3>
        </div>
        <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded">
          {completedCount}/{totalWeeks} wks
        </span>
      </div>

      {/* progress bar */}
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {currentWeek && (
        <div className="flex items-start gap-2 pt-1">
          <TrackStatusIcon status="in-progress" />
          <div>
            <p className="text-xs font-semibold">Week {currentWeek.weekNumber}: {currentWeek.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{currentWeek.goal}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Contribution Area Card ────────────────────────────────────────────────────

function ContributionCard({ name, description, icon }: { name: string; description: string; icon: string }) {
  const IconComponent = (Icons as any)[icon] as LucideIcon || Icons.Users
  return (
    <div className="flex gap-4 p-5 rounded-xl border border-border/40 bg-card hover:border-border hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 group">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
        <IconComponent className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-semibold text-sm text-foreground mb-1">{name}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper className="flex flex-col items-center justify-center space-y-10 text-center pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="space-y-5 max-w-3xl">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl lg:leading-[1.1] text-foreground">
            We build real systems.
          </h1>
          <p className="mx-auto max-w-[680px] text-lg text-muted-foreground sm:text-xl leading-relaxed">
            AERL is a student engineering lab at De Anza College. Our current focus is a physical quadcopter build and a parallel simulation & controls track — both designed from first principles, documented so the next team can pick up where we leave off.
          </p>
          <p className="mx-auto max-w-[600px] text-sm text-muted-foreground/70 leading-relaxed">
            We scope real problems, divide the work seriously, and write everything down. If that sounds like what you&apos;re looking for, come build with us.
          </p>
        </div>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button render={<Link href="/roadmap" />} size="lg" className="h-12 px-8">
            See the Build Plan
          </Button>
          <Button render={<Link href="/join" />} variant="outline" size="lg" className="h-12 px-8">
            Join the Lab
          </Button>
          <Button render={<Link href="/about" />} variant="ghost" size="lg" className="h-12 px-8 hidden sm:inline-flex">
            About AERL
          </Button>
        </div>
      </SectionWrapper>

      {/* Current Build Status */}
      <SectionWrapper className="bg-muted/20 py-14">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Current Build Cycle</h2>
            <p className="text-muted-foreground mt-1.5 text-sm max-w-[520px]">
              Two parallel tracks. One shared goal: leave behind systems that work and documentation a new team can actually use.
            </p>
          </div>
          <Button render={<Link href="/roadmap" />} variant="ghost" size="sm" className="hidden md:inline-flex text-sm">
            Full roadmap <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {tracks.map((track) => (
            <BuildStatusCard key={track.id} track={track} />
          ))}
        </div>
      </SectionWrapper>

      {/* Active Projects */}
      <SectionWrapper>
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">What We&apos;re Working On</h2>
            <p className="text-muted-foreground mt-2 max-w-[560px]">
              Two active engineering efforts this cycle, and one longer-term direction they&apos;re building toward.
            </p>
          </div>
          <Button render={<Link href="/projects" />} variant="ghost" className="hidden md:inline-flex">
            All projects <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </SectionWrapper>

      {/* Contribution Areas */}
      <SectionWrapper className="bg-muted/20">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">Ways to Contribute</h2>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            You don&apos;t need to know everything to join. You need to show up, ask good questions, and do the work.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {committees.map((area) => (
            <ContributionCard key={area.name} name={area.name} description={area.description} icon={area.icon} />
          ))}
        </div>
      </SectionWrapper>

      <CTA
        title="Ready to build something real?"
        description="AERL is open to De Anza students who want deep technical experience and are willing to do the work. Beginners welcome — if you're serious about learning."
        buttonText="Apply to Join"
        buttonLink="/join"
      />
    </>
  )
}
