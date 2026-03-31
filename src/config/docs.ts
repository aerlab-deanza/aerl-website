export interface DocsNavItem {
  title: string;
  href: string;
  description?: string;
}

export interface DocsNavSection {
  title: string;
  items: DocsNavItem[];
}

export const docsSections: DocsNavSection[] = [
  {
    title: "Start Here",
    items: [
      {
        title: "Documentation Home",
        href: "/documentation",
        description: "Orientation, scope, and the current flagship documentation.",
      },
      {
        title: "Projects",
        href: "/documentation/projects",
        description: "Project-level technical hubs and deep links.",
      },
      {
        title: "Resources",
        href: "/documentation/resources",
        description: "Papers, repositories, and technical writeups.",
      },
    ],
  },
  {
    title: "FCS Project",
    items: [
      {
        title: "FCS Overview",
        href: "/documentation/projects/fcs",
        description: "Objectives, scope, success metrics, and section map.",
      },
      {
        title: "Technical Approach",
        href: "/documentation/projects/fcs/technical-approach",
        description: "Architecture, control loops, interfaces, and tooling.",
      },
      {
        title: "Theory and Background",
        href: "/documentation/projects/fcs/theory",
        description: "Dynamics, coordinate frames, estimation, and PID foundations.",
      },
      {
        title: "Timeline and Validation",
        href: "/documentation/projects/fcs/timeline-validation",
        description: "Phases, requirements, and validation status.",
      },
      {
        title: "Logs and Results",
        href: "/documentation/projects/fcs/logs",
        description: "Bench results, assembly history, and follow-up actions.",
      },
      {
        title: "Committees",
        href: "/documentation/projects/fcs/committees",
        description: "Committee responsibilities and engineering ownership.",
      },
    ],
  },
];
