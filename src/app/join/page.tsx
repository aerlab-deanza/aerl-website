"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/PageHeader"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { collaboratorAreas, joinPrompts, sponsorAreas } from "@/lib/site-content"
import { siteConfig } from "@/config/site"
import { CheckCircle2 } from "lucide-react"

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

interface FormState {
  firstName: string
  lastName: string
  email: string
  major: string
  area: string
  why: string
}

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  major: "",
  area: "",
  why: "",
}

export default function JoinPage() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const set = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    setErrorMsg("")

    const areaLabel = contributionAreas.find(a => a.id === form.area || a.label === form.area)?.label || form.area;

    const res = await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, area: areaLabel }),
    })

    if (res.ok) {
      setStatus("success")
      setForm(EMPTY)
    } else {
      const data = await res.json().catch(() => ({}))
      setErrorMsg(data.error ?? "Something went wrong — please try again.")
      setStatus("error")
    }
  }

  return (
    <>
      <SectionWrapper className="pb-8">
        <PageHeader
          title="Join / Contact"
          description="Recruitment, sponsor conversations, and collaborator outreach live in one place. If you want to understand why machines work, not just assemble them, start here."
        />
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="grid gap-10 md:gap-14 md:grid-cols-2">
          {/* Left column — info (shown second on mobile, first on desktop) */}
          <div className="space-y-10 order-2 md:order-1">
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
                  Email:{" "}
                  <a className="text-primary hover:underline" href={siteConfig.links.email}>
                    aerl@deanza.edu
                  </a>
                </p>
                <p>
                  GitHub:{" "}
                  <a className="text-primary hover:underline" href={siteConfig.links.github} target="_blank" rel="noreferrer">
                    github.com/aerlab-deanza
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right column — form (shown first on mobile) */}
          <div className="rounded-xl border bg-card text-card-foreground p-5 sm:p-6 shadow-sm flex flex-col order-1 md:order-2">
            <h3 className="font-semibold text-xl mb-6">Application</h3>

            {status === "success" ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-12">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="h-7 w-7 text-emerald-500" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">Application received</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    We&apos;ll be in touch at the email you provided.
                  </p>
                </div>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 mt-2 transition-colors"
                >
                  Submit another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Ada"
                      required
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                      disabled={status === "submitting"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Lovelace"
                      required
                      value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      disabled={status === "submitting"}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ada@student.deanza.edu"
                    required
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    disabled={status === "submitting"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="major">Major / Background</Label>
                  <Input
                    id="major"
                    placeholder="e.g. Computer Science, Electrical Engineering"
                    required
                    value={form.major}
                    onChange={(e) => set("major", e.target.value)}
                    disabled={status === "submitting"}
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <Label htmlFor="area">Where do you think you&apos;d contribute?</Label>
                  <select
                    id="area"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                    value={form.area}
                    onChange={(e) => set("area", e.target.value)}
                    disabled={status === "submitting"}
                  >
                    <option value="" disabled>Select an area</option>
                    {contributionAreas.map((area) => (
                      <option key={area.id} value={area.label}>{area.label}</option>
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
                    value={form.why}
                    onChange={(e) => set("why", e.target.value)}
                    disabled={status === "submitting"}
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-destructive">{errorMsg}</p>
                )}

                <div className="mt-auto pt-6">
                  <Button
                    type="submit"
                    className="w-full h-11 text-base font-semibold"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Submitting…" : "Submit Inquiry"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
