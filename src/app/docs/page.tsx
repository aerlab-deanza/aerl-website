import { PageHeader } from "@/components/layout/PageHeader"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { EmptyState } from "@/components/blocks/EmptyState"

export default function DocsPage() {
  return (
    <>
      <SectionWrapper className="pb-8">
        <PageHeader 
          title="System Documentation" 
          description="Centralized technical knowledge base for all active AERL architectures, SOPs, and validation logs."
        />
      </SectionWrapper>
      
      <SectionWrapper className="pt-0">
        <EmptyState 
          title="Documentation Node Offline"
          description="The internal engineering wiki is currently securely firewalled or being migrated. Future architecture will support full markdown-based SOPs."
        />
      </SectionWrapper>
    </>
  )
}
