import { PageHeader } from "@/components/layout/PageHeader"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { JoinInquiryForm } from "@/components/forms/JoinInquiryForm"
import { collaboratorAreas, joinPrompts, sponsorAreas } from "@/lib/site-content"
import { siteConfig } from "@/config/site"
import { contributionAreas } from "@/lib/join-form"

export default function JoinPage() {
  return (
    <>
      <SectionWrapper className="pb-8">
        <PageHeader
          title="Join / Contact"
          description="Recruitment, sponsor conversations, and collaborator outreach live in one place. If you want to understand why machines work, not just assemble them, start here."
        />
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="grid gap-14 md:grid-cols-2">
          <div className="space-y-10">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold tracking-tight">Who We&apos;re Looking For</h3>
              <p className="text-muted-foreground leading-relaxed">
                You don&apos;t need to have done this before. You need to be serious about learning it.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                AERL is where we derive models, simulate systems, build prototypes, and explain the results clearly.
                There&apos;s room for people at different knowledge levels, as long as they show up and do the work.
              </p>
            </div>

            <div className="aerl-panel p-5">
              <h3 className="text-xl font-bold tracking-tight text-foreground">What to include when you reach out</h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                {joinPrompts.map((prompt) => (
                  <li key={prompt} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>{prompt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold tracking-tight">Contribution Areas</h3>
              <div className="space-y-3">
                {contributionAreas.map((area) => (
                  <div key={area.id} className="rounded-lg border border-border/40 bg-card p-4">
                    <p className="text-sm font-semibold text-foreground mb-1">{area.label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="aerl-panel p-5">
                <h3 className="text-xl font-bold tracking-tight text-foreground">Sponsors</h3>
                <ul className="mt-4 space-y-2.5 text-sm leading-6 text-muted-foreground">
                  {sponsorAreas.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aerl-panel p-5">
                <h3 className="text-xl font-bold tracking-tight text-foreground">Collaborators</h3>
                <ul className="mt-4 space-y-2.5 text-sm leading-6 text-muted-foreground">
                  {collaboratorAreas.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="aerl-panel p-5">
              <h3 className="text-xl font-bold tracking-tight text-foreground">Official contact channels</h3>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p>
                  Email: <a className="text-primary hover:underline" href={siteConfig.links.email}>aerl@deanza.edu</a>
                </p>
                <p>
                  GitHub: <a className="text-primary hover:underline" href={siteConfig.links.github} target="_blank" rel="noreferrer">github.com/aerl-deanza</a>
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card text-card-foreground p-6 shadow-sm flex flex-col">
            <h3 className="font-semibold text-xl mb-6">Application</h3>
            <JoinInquiryForm />
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
