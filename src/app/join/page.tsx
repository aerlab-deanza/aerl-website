import { PageHeader } from "@/components/layout/PageHeader"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const contributionAreas = [
  {
    id: "controls",
    label: "Controls & Dynamics",
    description:
      "You like math and want to understand flight control at the equation level — PID, LQR, rigid body dynamics, state-space.",
  },
  {
    id: "simulation",
    label: "Simulation & Software",
    description:
      "You write Python and want to build something that models physical systems — numerical integration, motor modeling, dynamics validation.",
  },
  {
    id: "electronics",
    label: "Electronics & Power",
    description:
      "Wiring a drone correctly is precise, methodical work. You read datasheets. You care about getting it right the first time.",
  },
  {
    id: "hardware",
    label: "Hardware & Fabrication",
    description:
      "You like building physical things — frame assembly, component mounting, vibration isolation, mechanical integration.",
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
          title="Join AERL"
          description="We're looking for students who want to do real engineering work — not watch it happen. Beginners welcome, if you're serious."
        />
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="grid gap-14 md:grid-cols-2">
          {/* Left: Copy */}
          <div className="space-y-10">

            <div className="space-y-3">
              <h3 className="text-2xl font-bold tracking-tight">Who We&apos;re Looking For</h3>
              <p className="text-muted-foreground leading-relaxed">
                You don&apos;t need to have done this before. You need to be serious about learning it.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                AERL is early — we&apos;re building the lab&apos;s culture and systems at the same time. There&apos;s room for people at different knowledge levels, as long as they show up and do the work.
              </p>
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

            <div className="space-y-3">
              <h3 className="text-xl font-bold tracking-tight">What to Expect</h3>
              <ul className="space-y-2.5 text-muted-foreground text-sm">
                <li className="flex gap-2">
                  <span className="text-primary font-bold shrink-0">—</span>
                  <span>We work in a structured quarterly cycle. Right now it&apos;s Cycle 1: two parallel tracks, 12 weeks of scoped work, ending in a tagged release and handoff documentation.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold shrink-0">—</span>
                  <span>Meetings run on a regular cadence — track syncs, cross-track check-ins, and a final release session.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold shrink-0">—</span>
                  <span>Showing up matters. Finishing your piece matters. Writing it down matters. If you join, you&apos;re committing to your track for the cycle, not just attending sometimes.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold shrink-0">—</span>
                  <span>Beginners welcome. We&apos;d rather have a beginner who asks good questions and documents carefully than an expert who goes quiet and disappears.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Application Form */}
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
                <Button type="button" className="w-full h-11 text-base font-semibold">Submit Application</Button>
              </div>
            </form>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
