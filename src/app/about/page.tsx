import Image from "next/image"
import { PageHeader } from "@/components/layout/PageHeader"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { committeeModel, coreValues, labStats, leadershipTeam, missionPillars, technicalLeadOpenings, visionStatements } from "@/lib/site-content"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      <SectionWrapper className="pb-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <PageHeader
              title="About AERL"
              description="A student engineering research lab at De Anza College. We derive models, simulate systems, build prototypes, and publish work the next cohort can continue."
              className="md:pb-0 md:pt-4"
            />
          </div>
          <div className="aerl-grid-panel overflow-hidden p-2">
            <div className="rounded-[1.1rem] border border-border/50 bg-background/20 overflow-hidden">
              <Image
                src="/fcs/aerl-hero-composite.png"
                alt="AERL Composite Hero"
                width={800}
                height={500}
                priority
                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="aerl-panel p-6 md:p-8">
            <h2 className="font-heading text-3xl font-bold text-foreground">What AERL is</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              AERL is where students build full-stack engineering systems. We start from first principles, derive
              the equations, simulate the behavior, and then push the design into hardware, software, validation,
              documentation, and handoff.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              The current flagship work is the Flight Control System project, but the lab is not defined by one
              vehicle. The point is to understand why machines work, not just assemble them, and to leave behind
              systems the next team can understand and extend.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/roadmap" className="aerl-action-link">
                See the build cycle <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/documentation" className="aerl-action-link">
                Open documentation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {labStats.map((stat) => (
              <div key={stat.label} className="aerl-panel p-5">
                <p className="aerl-kicker">{stat.label}</p>
                <p className="mt-3 font-heading text-4xl font-bold text-foreground">{stat.value}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="aerl-panel p-6 md:p-8">
            <p className="aerl-kicker">Mission</p>
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
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground">How the lab operates</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {coreValues.map((value) => (
            <div key={value.title} className="aerl-panel p-6">
              <h3 className="font-heading text-2xl font-semibold text-foreground">{value.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{value.summary}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="aerl-panel p-6 md:p-8">
            <p className="aerl-kicker">Leadership Team</p>
            <div className="mt-5 overflow-hidden rounded-2xl border border-border/70">
              <table className="min-w-full text-left text-sm">
                <tbody>
                  {leadershipTeam.map((member) => (
                    <tr key={`${member.role}-${member.name}`} className="border-b border-border/60 last:border-0">
                      <th className="bg-background/35 px-4 py-3 font-semibold text-foreground">{member.role}</th>
                      <td className="px-4 py-3 text-muted-foreground">{member.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="aerl-panel p-6 md:p-8">
              <p className="aerl-kicker">Lab Structure</p>
              <div className="mt-4 space-y-4">
                {committeeModel.map((committee) => (
                  <div key={committee.name} className="rounded-2xl border border-border/60 bg-background/25 p-4">
                    <h3 className="font-semibold text-foreground">{committee.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{committee.scope}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="aerl-panel p-6 md:p-8">
              <p className="aerl-kicker">Open Technical Leads</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                {technicalLeadOpenings.map((role) => (
                  <li key={role} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                We are still filling final committee lead assignments and documenting the full roster by year and major.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
