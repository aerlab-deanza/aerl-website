import { PageHeader } from "@/components/layout/PageHeader"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { collaboratorAreas, joinPrompts, sponsorAreas } from "@/lib/site-content"
import { siteConfig } from "@/config/site"

const contributionAreas = [
  {
    id: "controls",
    label: "Controls & Dynamics",
    description:
      "You like math and want to understand dynamic systems at the equation level — PID, LQR, rigid body dynamics, and state-space models.",
  },
  {
    id: "simulation",
    label: "Simulation & Software",
    description:
      "You write Python and want to model physical systems before hardware exists — numerical integration, system behavior, and validation.",
  },
  {
    id: "electronics",
    label: "Electronics & Power",
    description:
      "You care about power paths, signal integrity, connectors, regulators, and reading datasheets until the system behaves the way it should.",
  },
  {
    id: "hardware",
    label: "Hardware & Fabrication",
    description:
      "You like building physical prototypes — mechanical integration, mounts, tolerances, packaging, and making the real system match the model.",
  },
  {
    id: "documentation",
    label: "Documentation & Ops",
    description:
      "You think documentation is the difference between a real lab and a hobby project. You write clearly and care about handoff.",
  },
  {
    id: "unsure",
    label: "Not Sure Yet",
    description:
      "You don't know exactly where you fit. That's fine — tell us what you're trying to learn and we'll find where you're useful.",
  },
]

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
            <form className="space-y-5 flex-1 flex flex-col">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Ada" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Lovelace" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Student Email</Label>
                <Input id="email" type="email" placeholder="ada@student.deanza.edu" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="major">Major / Background</Label>
                <Input id="major" placeholder="e.g. Computer Science, Electrical Engineering" required />
              </div>

              <div className="space-y-2 pt-2">
                <Label htmlFor="area">Where do you think you&apos;d contribute?</Label>
                <select
                  id="area"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="" disabled>Select an area</option>
                  {contributionAreas.map((area) => (
                    <option key={area.id} value={area.id}>{area.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 pt-2">
                <Label htmlFor="why">What do you want to build or learn here?</Label>
                <textarea
                  id="why"
                  className="flex min-h-[110px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Be specific. What draws you to this kind of work and what do you hope to get out of it?"
                  required
                />
              </div>

              <div className="mt-auto pt-6">
                <Button type="button" className="w-full h-11 text-base font-semibold">Submit Inquiry</Button>
              </div>
            </form>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
