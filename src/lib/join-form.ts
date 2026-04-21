export const contributionAreas = [
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
] as const

export type JoinInquiryField =
  | "firstName"
  | "lastName"
  | "email"
  | "major"
  | "area"
  | "why"

export type JoinInquiryPayload = Record<JoinInquiryField, string>

export const contributionAreaIds = new Set<string>(
  contributionAreas.map((area) => area.id)
)
