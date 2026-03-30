import { PageHeader } from "@/components/layout/PageHeader"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { EventCard } from "@/components/cards/EventCard"
import { events } from "@/lib/data"

export default function EventsPage() {
  return (
    <>
      <SectionWrapper className="pb-8">
        <PageHeader
          title="Milestones & Events"
          description="Build milestones, lab sessions, test days, and end-of-cycle reviews for the current build cycle."
        />
      </SectionWrapper>
      
      <SectionWrapper className="pt-0">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Upcoming Events</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {events.filter(e => e.status === "upcoming").map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight mb-4 text-muted-foreground">Past Milestones</h2>
          <div className="grid gap-6 md:grid-cols-2 opacity-70">
            {events.filter(e => e.status === "past").map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
