export interface Deliverable {
  id: string;
  description: string;
}

export interface Task {
  id: string;
  description: string;
}

export interface Week {
  weekNumber: number;
  title: string;
  goal: string;
  tasks: Task[];
  deliverables: Deliverable[];
  successCheck?: string;
  optionalNotes?: string;
  status?: "pending" | "in-progress" | "completed";
}

export interface Track {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription?: string;
  overallGoal: string;
  weeks: Week[];
  finalHandoff?: string;
}

export interface Committee {
  id?: string;
  name: string;
  description: string;
  focusArea?: string;
  roadmapSupport?: string;
  icon: string; // Map to lucide-react names
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  link: string;
  status?: "Active" | "Future Direction" | "Planning" | "In Development" | "Validation" | "Deployed";
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  type: string;
  status: "upcoming" | "past";
}

export interface Resource {
  title: string;
  description: string;
  category: string;
  link: string;
}
