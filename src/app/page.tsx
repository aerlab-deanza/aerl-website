import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, ChevronRight, Circle, Clock } from "lucide-react"
import * as Icons from "lucide-react"
import { LucideIcon } from "lucide-react"

import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { ProjectCard } from "@/components/cards/ProjectCard"
import { CTA } from "@/components/blocks/CTA"

import { featuredProjects, committees, tracks } from "@/lib/data"
import { coreValues, labStats, missionPillars, visionStatements } from "@/lib/site-content"
import { cn } from "@/lib/utils"

const linkButtonBase =
  "inline-flex items-center justify-center rounded-lg border border-transparent text-sm font-medium transition-all"
const linkButtonLg = `${linkButtonBase} h-12 px-8`
const linkButtonDefault = "bg-primary text-primary-foreground hover:bg-primary/85"
const linkButtonOutline = "border-border bg-background hover:bg-muted hover:text-foreground"
const linkButtonGhost = "hover:bg-muted hover:text-foreground"
const linkButtonSm = `${linkButtonBase} h-8 rounded-md px-3 text-[0.8rem]`

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
  const iconMap = Icons as unknown as Record<string, LucideIcon>
  const IconComponent = iconMap[icon] ?? Icons.Users
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

function QuickStatCard({
  label,
  value,
  description,
}: {
  label: string
  value: string
  description: string
}) {
  return (
    <div className="aerl-panel p-5">
      <p className="aerl-kicker">{label}</p>
      <p className="mt-3 font-heading text-4xl font-bold text-foreground">{value}</p>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <SectionWrapper className="pb-12 pt-10 md:pt-16">
        <div className="grid gap-10 xl:grid-cols-[1.05fr_minmax(0,0.95fr)] xl:items-center">
          <div className="space-y-6">
            <p className="aerl-kicker">Applied Engineering Research Lab</p>
            <h1 className="font-heading text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Build full-stack engineering systems from first principles.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
              AERL is where you derive equations, simulate systems, build real prototypes, and document the work
              well enough for the next team to continue instead of reverse engineering from scratch.
            </p>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              Our current flagship effort is the Flight Control System project, but the lab is broader than a single
              platform. If you want to understand why machines work, not just assemble them, join AERL.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/projects" className={`${linkButtonLg} ${linkButtonDefault}`}>
                Explore Projects
              </Link>
              <Link href="/documentation" className={`${linkButtonLg} ${linkButtonOutline}`}>
                Open Documentation
              </Link>
              <Link href="/join" className={`${linkButtonLg} ${linkButtonGhost}`}>
                Join or Partner
              </Link>
            </div>
          </div>

          <div className="aerl-grid-panel overflow-hidden p-3">
            <div className="rounded-[1.6rem] border border-border/70 bg-background/25 p-2">
              <Image
                src="/fcs/fcs-technical-approach.png"
                alt="AERL flagship prototype with axes, signal traces, and validation overlays"
                width={1408}
                height={768}
                priority
                className="h-auto w-full rounded-[1.3rem] object-cover"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="py-0">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {labStats.map((stat) => (
            <QuickStatCard key={stat.label} {...stat} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="aerl-panel p-6 md:p-8">
            <p className="aerl-kicker">Mission</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground">Why the lab exists</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
              {missionPillars.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="aerl-panel p-6 md:p-8">
            <p className="aerl-kicker">Vision</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground">What we are trying to build</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
              {visionStatements.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="mb-8 max-w-2xl">
          <p className="aerl-kicker">Values</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground">Engineering culture that survives handoff</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            The lab is designed to feel closer to a serious engineering environment than a generic club page: scoped work, technical ownership, validation, and documentation that matters.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {coreValues.map((value) => (
            <div key={value.title} className="aerl-panel p-6">
              <h3 className="font-heading text-2xl font-semibold text-foreground">{value.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{value.summary}</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                {value.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="aerl-kicker">Flagship Project</p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground">Current flagship projects</h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              The public site stays high-level. The deep technical details now live under the integrated documentation section.
            </p>
          </div>
          <Link href="/documentation/projects/fcs" className={cn(linkButtonBase, linkButtonOutline, "hidden md:inline-flex h-9 px-4")}>
            FCS documentation <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="aerl-grid-panel mb-6 p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="aerl-kicker">Flight Control System Project</p>
              <h3 className="mt-3 font-heading text-3xl font-bold text-foreground">One project hub, from overview to validation logs</h3>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                The FCS hub covers objectives, architecture, committees, theory, validation targets, and logs for a Teensy-based custom flight control stack running on a quadcopter test platform.
              </p>
            </div>
            <div className="grid gap-3 text-sm">
              <Link href="/documentation/projects/fcs" className="aerl-action-link justify-between">
                FCS overview <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/documentation/projects/fcs/technical-approach" className="aerl-action-link justify-between">
                Technical approach <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/documentation/projects/fcs/logs" className="aerl-action-link justify-between">
                Logs and results <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-muted/20 py-14">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="aerl-kicker">Current Build Cycle</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground">Execution status across both tracks</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground max-w-[620px]">
              Two parallel tracks. One shared goal: leave behind systems that work and documentation the next team can actually use.
            </p>
          </div>
          <Link href="/roadmap" className={cn(linkButtonSm, linkButtonGhost, "hidden md:inline-flex")}>
            Full roadmap <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {tracks.map((track) => (
            <BuildStatusCard key={track.id} track={track} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <p className="aerl-kicker">Committees</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground">Ways to contribute</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
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
        description="AERL is open to De Anza students, sponsors, and collaborators who want serious engineering work, clear ownership, and documentation that leaves the next team stronger."
        buttonText="Apply to Join"
        buttonLink="/join"
      />
    </>
  )
}
