import Image from "next/image"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { ProjectCard } from "@/components/cards/ProjectCard"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { featuredProjects } from "@/lib/data"

export default function ProjectsPage() {
  const activeProjects = featuredProjects.filter((p) => p.status === "Active")
  const futureProjects = featuredProjects.filter((p) => p.status === "Future Direction")

  return (
    <>
      <SectionWrapper className="pb-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* Image — right */}
          <div className="aerl-grid-panel overflow-hidden p-2 order-2">
            <div className="rounded-[1.1rem] border border-border/50 bg-background/20 overflow-hidden">
              <Image
                src="/fcs/fcs-technical-approach.png"
                alt="FCS Technical Approach"
                width={800}
                height={500}
                priority
                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* Header text — left */}
          <div className="space-y-4 pb-8 pt-[104px] md:pt-[120px] md:pb-12 order-1">
            <p className="aerl-kicker">Applied Engineering Research Lab</p>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">Projects</h1>
            <p className="max-w-[720px] text-lg leading-8 text-muted-foreground">
              Public-facing project summaries live here. Deep technical material, validation details, theory, and logs now live in the integrated documentation section.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="aerl-grid-panel mb-10 p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="aerl-kicker">Flagship Project Hub</p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground">Flight Control System documentation</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                The FCS hub is the technical backbone of the site: project overview, technical approach, theory, timeline, committee ownership, and the running log of validation work.
              </p>
            </div>
            <div className="grid gap-3 text-sm">
              <Link href="/documentation/projects/fcs" className="aerl-action-link justify-between">
                FCS overview <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/documentation/projects/fcs/technical-approach" className="aerl-action-link justify-between">
                Technical approach <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/documentation/projects/fcs/timeline-validation" className="aerl-action-link justify-between">
                Timeline and validation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active This Cycle
            </span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {activeProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>

        {/* Future Direction */}
        {futureProjects.length > 0 && (
          <div className="mt-16 pt-12 border-t border-border/40">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Future Direction</p>
              <p className="text-sm text-muted-foreground max-w-xl">
                What we&apos;re building toward — not committed for this cycle, but the direction the current work is laying foundations for.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {futureProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </div>
        )}
      </SectionWrapper>
    </>
  )
}
