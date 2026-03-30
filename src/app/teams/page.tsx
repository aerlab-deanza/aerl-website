import { PageHeader } from "@/components/layout/PageHeader"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { TeamCard } from "@/components/cards/TeamCard"
import { committees } from "@/lib/data"

export default function TeamsPage() {
  return (
    <>
      <SectionWrapper className="pb-8">
        <PageHeader 
          title="Committees & Teams" 
          description="AERL is composed of specialized committees that tackle different layers of the autonomous systems stack."
        />
      </SectionWrapper>
      
      <SectionWrapper className="pt-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {committees.map((committee) => (
            <TeamCard key={committee.name} {...committee} />
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}
