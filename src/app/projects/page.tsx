import { PageHeader } from "@/components/layout/PageHeader"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { ProjectCard } from "@/components/cards/ProjectCard"
import { featuredProjects } from "@/lib/data"

export default function ProjectsPage() {
  const activeProjects = featuredProjects.filter((p) => p.status === "Active")
  const futureProjects = featuredProjects.filter((p) => p.status === "Future Direction" || p.status === "Planning")

  return (
    <>
      <SectionWrapper className="pb-8">
        <PageHeader
          title="Projects"
          description="Two active engineering efforts this cycle, and one longer-term direction they're building toward. Everything is in-progress, tracked on the roadmap, and documented as we go."
        />
      </SectionWrapper>

      {/* Active Projects */}
      <SectionWrapper className="pt-0">
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
