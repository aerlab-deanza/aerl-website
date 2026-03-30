import { PageHeader } from "@/components/layout/PageHeader"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { EmptyState } from "@/components/blocks/EmptyState"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <>
      <SectionWrapper className="pb-8">
        <PageHeader 
          title="Internal Ops Dashboard" 
          description="Internal portal for managing hardware requisition, simulation cluster access, and inter-division workflows."
        />
      </SectionWrapper>
      
      <SectionWrapper className="pt-0">
        <div className="mb-4">
          <Button variant="outline">Authenticate via SSO</Button>
        </div>
        <EmptyState 
          title="Secure Environment"
          description="Authentication required. This workspace is restricted to active project cohorts and leads."
        />
      </SectionWrapper>
    </>
  )
}
