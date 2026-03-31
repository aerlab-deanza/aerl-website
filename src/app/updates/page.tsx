import { PageHeader } from "@/components/layout/PageHeader"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { EventCard } from "@/components/cards/EventCard"
import { collaboratorAreas, sponsorAreas, updateThemes } from "@/lib/site-content"
import { events } from "@/lib/data"

export default function UpdatesPage() {
  const upcoming = events.filter((event) => event.status === "upcoming")
  const past = events.filter((event) => event.status === "past")

  return (
    <>
      <SectionWrapper className="pb-8">
        <PageHeader
          title="Updates"
          description="Recruitment, sponsor visibility, collaborator outreach, and cycle milestones all live here."
        />
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="aerl-panel p-6">
            <p className="aerl-kicker">Recruitment</p>
            <h2 className="mt-3 font-heading text-2xl font-bold text-foreground">Where we need help</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              We are recruiting across controls, hardware, electronics, simulation, and documentation. Members who want hands-on experience should start with the join page and the FCS documentation hub.
            </p>
          </div>
          <div className="aerl-panel p-6">
            <p className="aerl-kicker">Sponsors</p>
            <h2 className="mt-3 font-heading text-2xl font-bold text-foreground">Support priorities</h2>
            <ul className="mt-4 space-y-2.5 text-sm leading-6 text-muted-foreground">
              {sponsorAreas.slice(0, 3).map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="aerl-panel p-6">
            <p className="aerl-kicker">Collaborators</p>
            <h2 className="mt-3 font-heading text-2xl font-bold text-foreground">How outside experts can help</h2>
            <ul className="mt-4 space-y-2.5 text-sm leading-6 text-muted-foreground">
              {collaboratorAreas.slice(0, 3).map((item) => (
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
        <div className="aerl-panel p-6 md:p-8">
          <p className="aerl-kicker">What this page tracks over time</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {updateThemes.map((theme) => (
              <div key={theme} className="rounded-2xl border border-border/60 bg-background/25 p-4 text-sm leading-6 text-muted-foreground">
                {theme}
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="mb-8">
          <p className="aerl-kicker">Cycle Milestones</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground">Upcoming milestones</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {upcoming.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="mb-8">
          <p className="aerl-kicker">Recent Activity</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground">Past milestones</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 opacity-80">
          {past.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}
