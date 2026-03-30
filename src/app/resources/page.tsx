import { PageHeader } from "@/components/layout/PageHeader"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { ResourceCard } from "@/components/cards/ResourceCard"
import { resourcesData } from "@/lib/data"

export default function ResourcesPage() {
  return (
    <>
      <SectionWrapper className="pb-8">
        <PageHeader 
          title="Lab Resources" 
          description="Technical documentation, safety protocols, and onboarding resources for members."
        />
      </SectionWrapper>
      
      <SectionWrapper className="pt-0">
        <div className="space-y-12">
          {Array.from(new Set(resourcesData.map(r => r.category))).map(category => (
            <div key={category}>
              <h2 className="text-2xl font-bold tracking-tight mb-6">{category}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {resourcesData.filter(r => r.category === category).map((resource) => (
                  <ResourceCard key={resource.title} {...resource} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}
