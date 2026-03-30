import { Track, Committee, Project, Event, Resource } from "@/types";

export const tracks: Track[] = [
  {
    id: "track-a",
    name: "Track A — Physical Drone Build",
    slug: "physical-drone-build",
    shortDescription: "Taking a quadcopter from bare frame through procurement, wiring, calibration, and first hover.",
    overallGoal: "Assemble, integrate, test, and safely hover a physical quadcopter platform. Leave behind a documented, reproducible build.",
    finalHandoff: "Final technical report, BOM, wiring diagram, test logs, and a documented hardware platform the next team can continue from.",
    weeks: [
      {
        weekNumber: 1,
        title: "Scope lock & system definition",
        goal: "Define drone class and frame size, write success criteria, assign owners, create repo/docs, write top-level architecture.",
        tasks: [
          { id: "a1-1", description: "Define drone class and frame size" },
          { id: "a1-2", description: "Write success criteria" },
          { id: "a1-3", description: "Assign owners" },
          { id: "a1-4", description: "Create repo, docs hub, parts tracker" },
          { id: "a1-5", description: "Write top-level system architecture" }
        ],
        deliverables: [
          { id: "d-a1-1", description: "Mission statement" },
          { id: "d-a1-2", description: "System block diagram" },
          { id: "d-a1-3", description: "Team ownership list" },
          { id: "d-a1-4", description: "First BOM draft" },
          { id: "d-a1-5", description: "Written success criteria" }
        ],
        successCheck: "Are all components conceptually represented in the block diagram with clear owners?",
        status: "completed"
      },
      {
        weekNumber: 2,
        title: "Procurement & workspace setup",
        goal: "Finalize BOM, order components, setup workspace.",
        tasks: [
          { id: "a2-1", description: "Finalize and lock BOM" },
          { id: "a2-2", description: "Order frame and major components" },
          { id: "a2-3", description: "Identify workspace and storage" },
          { id: "a2-4", description: "Write safety procedures" },
          { id: "a2-5", description: "Create assembly checklist and test log template" }
        ],
        deliverables: [
          { id: "d-a2-1", description: "Locked BOM with budget" },
          { id: "d-a2-2", description: "Order tracker" },
          { id: "d-a2-3", description: "Safety rules" },
          { id: "d-a2-4", description: "Workspace plan" },
          { id: "d-a2-5", description: "Meeting cadence" }
        ],
        status: "in-progress"
      },
      {
        weekNumber: 3,
        title: "Electrical & integration planning",
        goal: "Map power and signal paths, define placement.",
        tasks: [
          { id: "a3-1", description: "Map power path" },
          { id: "a3-2", description: "Map signal path" },
          { id: "a3-3", description: "Define component placement" },
          { id: "a3-4", description: "Sketch wiring layout" },
          { id: "a3-5", description: "Identify missing connectors and consumables" }
        ],
        deliverables: [
          { id: "d-a3-1", description: "Wiring diagram v1" },
          { id: "d-a3-2", description: "Integration layout sketch" },
          { id: "d-a3-3", description: "Placement map" },
          { id: "d-a3-4", description: "Consumables list" }
        ],
        status: "pending"
      },
      {
        weekNumber: 4,
        title: "Frame assembly & dry fit",
        goal: "Assemble the physical frame and test hardware clearances.",
        tasks: [
          { id: "a4-1", description: "Assemble frame" },
          { id: "a4-2", description: "Dry-fit major components" },
          { id: "a4-3", description: "Check clearances and center of mass" },
          { id: "a4-4", description: "Revise mounting plan if needed" },
          { id: "a4-5", description: "Label components" }
        ],
        deliverables: [
          { id: "d-a4-1", description: "Assembled bare frame" },
          { id: "d-a4-2", description: "Dry-fit photos" },
          { id: "d-a4-3", description: "Mechanical integration notes" },
          { id: "d-a4-4", description: "Updated placement plan" }
        ]
      },
      {
        weekNumber: 5,
        title: "Power system integration",
        goal: "Route primary power lines and inspect high-current joints.",
        tasks: [
          { id: "a5-1", description: "Mount motors and ESCs" },
          { id: "a5-2", description: "Route power wiring" },
          { id: "a5-3", description: "Integrate power distribution" },
          { id: "a5-4", description: "Inspect solder joints and connectors" },
          { id: "a5-5", description: "Verify polarity" },
          { id: "a5-6", description: "Sign off pre-power checklist" }
        ],
        deliverables: [
          { id: "d-a5-1", description: "Installed power hardware" },
          { id: "d-a5-2", description: "Wiring inspection log" },
          { id: "d-a5-3", description: "Pre-power checklist" },
          { id: "d-a5-4", description: "Updated as-built wiring diagram" }
        ]
      },
      {
        weekNumber: 6,
        title: "Control electronics & signal wiring",
        goal: "Isolate and connect the flight controller sensors and comms.",
        tasks: [
          { id: "a6-1", description: "Mount flight controller with vibration isolation" },
          { id: "a6-2", description: "Connect ESC signal lines" },
          { id: "a6-3", description: "Connect receiver and sensors" },
          { id: "a6-4", description: "Label ports and connections" },
          { id: "a6-5", description: "Write first power-on procedure" }
        ],
        deliverables: [
          { id: "d-a6-1", description: "Complete signal integration" },
          { id: "d-a6-2", description: "Connection table" },
          { id: "d-a6-3", description: "Vibration isolation notes" },
          { id: "d-a6-4", description: "First power-on checklist" }
        ]
      },
      {
        weekNumber: 7,
        title: "First power-on & subsystem check",
        goal: "Safely boot systems and verify telemetry streams without propellers.",
        tasks: [
          { id: "a7-1", description: "Controlled power-on with no propellers" },
          { id: "a7-2", description: "Verify FC boot" },
          { id: "a7-3", description: "Verify receiver communication" },
          { id: "a7-4", description: "Verify sensor readouts" },
          { id: "a7-5", description: "Check each motor output" },
          { id: "a7-6", description: "Identify wrong motor directions" }
        ],
        deliverables: [
          { id: "d-a7-1", description: "Power-on test log" },
          { id: "d-a7-2", description: "Subsystem verification checklist" },
          { id: "d-a7-3", description: "Issue list with owners" },
          { id: "d-a7-4", description: "Corrected config notes" }
        ]
      },
      {
        weekNumber: 8,
        title: "Calibration & motor validation",
        goal: "Lock down all orientation and mixing parameters.",
        tasks: [
          { id: "a8-1", description: "Calibrate accelerometer, gyro, compass" },
          { id: "a8-2", description: "Verify frame orientation" },
          { id: "a8-3", description: "Verify radio channels" },
          { id: "a8-4", description: "Confirm motor order and direction" },
          { id: "a8-5", description: "Perform controlled spin tests" },
          { id: "a8-6", description: "Document config values" }
        ],
        deliverables: [
          { id: "d-a8-1", description: "Calibration record" },
          { id: "d-a8-2", description: "Motor mapping sheet" },
          { id: "d-a8-3", description: "Control-direction verification sheet" },
          { id: "d-a8-4", description: "Final pre-prop checklist" }
        ]
      },
      {
        weekNumber: 9,
        title: "Bench & restrained thrust testing",
        goal: "Load test the power distribution and observe mechanical behavior.",
        tasks: [
          { id: "a9-1", description: "Install props under controlled procedure" },
          { id: "a9-2", description: "Perform restrained thrust tests" },
          { id: "a9-3", description: "Observe vibration, heating, wiring under load" },
          { id: "a9-4", description: "Inspect fasteners after each run" },
          { id: "a9-5", description: "Log anomalies" }
        ],
        deliverables: [
          { id: "d-a9-1", description: "Restrained test report" },
          { id: "d-a9-2", description: "Vibration and thermal observations" },
          { id: "d-a9-3", description: "Corrective action list" },
          { id: "d-a9-4", description: "Hover readiness review" }
        ]
      },
      {
        weekNumber: 10,
        title: "Hover test preparation",
        goal: "Plan field abort procedures and conduct final pre-flight checks.",
        tasks: [
          { id: "a10-1", description: "Select and confirm test site" },
          { id: "a10-2", description: "Assign test-day roles" },
          { id: "a10-3", description: "Define and rehearse abort procedure" },
          { id: "a10-4", description: "Create hover test checklist" },
          { id: "a10-5", description: "Do full end-to-end inspection" }
        ],
        deliverables: [
          { id: "d-a10-1", description: "Hover test checklist" },
          { id: "d-a10-2", description: "Field safety plan" },
          { id: "d-a10-3", description: "Role assignment sheet" },
          { id: "d-a10-4", description: "Go/no-go criteria sheet" }
        ]
      },
      {
        weekNumber: 11,
        title: "First hover tests",
        goal: "Attempt controlled manual flight and tune primary PID values.",
        tasks: [
          { id: "a11-1", description: "Conduct first hover per checklist" },
          { id: "a11-2", description: "Keep durations short" },
          { id: "a11-3", description: "Inspect after every attempt" },
          { id: "a11-4", description: "Adjust one variable between runs" },
          { id: "a11-5", description: "Record stability, drift, vibration, temperature" }
        ],
        deliverables: [
          { id: "d-a11-1", description: "Hover test logs" },
          { id: "d-a11-2", description: "Post-test inspection record" },
          { id: "d-a11-3", description: "Tuning and issues list" },
          { id: "d-a11-4", description: "Decision on second session" }
        ]
      },
      {
        weekNumber: 12,
        title: "Packaging, docs & handoff",
        goal: "Lock system, tag a release, and prepare hardware for next cohort.",
        tasks: [
          { id: "a12-1", description: "Run second hover if justified" },
          { id: "a12-2", description: "Fix only small critical issues" },
          { id: "a12-3", description: "Finalize wiring and physical documentation" },
          { id: "a12-4", description: "Write system overview and continuation guide" },
          { id: "a12-5", description: "Archive settings, diagrams, photos" },
          { id: "a12-6", description: "Tag v1.0 release" }
        ],
        deliverables: [
          { id: "d-a12-1", description: "Final technical report" },
          { id: "d-a12-2", description: "Final BOM and wiring diagram" },
          { id: "d-a12-3", description: "Build/test log archive" },
          { id: "d-a12-4", description: "Next-cohort handoff document" },
          { id: "d-a12-5", description: "Presentation/demo package" }
        ]
      }
    ]
  },
  {
    id: "track-b",
    name: "Track B — Simulation & Controls",
    slug: "simulation-controls",
    shortDescription: "A Python-based 6-DOF flight dynamics simulation running in parallel with the physical build.",
    overallGoal: "Develop a documented simulation environment, linearize dynamics, and design and test a feedback controller in software.",
    finalHandoff: "v1.0 repo release, documented simulation environment, and a handoff guide for the next controls team.",
    weeks: [
      {
        weekNumber: 1,
        title: "Repo setup, toolchain & scope",
        goal: "Define infrastructure, select simulation language, and log early assumptions.",
        tasks: [
          { id: "b1-1", description: "Choose simulation language/toolchain" },
          { id: "b1-2", description: "Create repo and folder structure" },
          { id: "b1-3", description: "Define assumptions scope" },
          { id: "b1-4", description: "Write assumptions log v1" },
          { id: "b1-5", description: "Define success criteria" }
        ],
        deliverables: [
          { id: "d-b1-1", description: "Repo with folder structure" },
          { id: "d-b1-2", description: "Toolchain decision doc" },
          { id: "d-b1-3", description: "Assumptions log" },
          { id: "d-b1-4", description: "Success criteria" }
        ],
        status: "completed"
      },
      {
        weekNumber: 2,
        title: "Dynamics research & assumptions log",
        goal: "Review rigid body dynamics literature and explicitly define variables.",
        tasks: [
          { id: "b2-1", description: "Review rigid body dynamics literature" },
          { id: "b2-2", description: "Define the state vector" },
          { id: "b2-3", description: "Document motor and aerodynamic assumptions" },
          { id: "b2-4", description: "Lock linearization approach around hover" },
          { id: "b2-5", description: "Record simplifications" }
        ],
        deliverables: [
          { id: "d-b2-1", description: "Signed assumptions log" },
          { id: "d-b2-2", description: "State vector definition" },
          { id: "d-b2-3", description: "Literature references" },
          { id: "d-b2-4", description: "Linearization plan" }
        ],
        status: "completed"
      },
      {
        weekNumber: 3,
        title: "Equations of motion & state vector",
        goal: "Translate math to code and implement motor thrust modeling.",
        tasks: [
          { id: "b3-1", description: "Implement simplified 6-DOF equations" },
          { id: "b3-2", description: "Implement state vector" },
          { id: "b3-3", description: "Implement motor thrust/torque model" },
          { id: "b3-4", description: "Verify units and sign conventions" },
          { id: "b3-5", description: "Write unit tests" }
        ],
        deliverables: [
          { id: "d-b3-1", description: "Dynamics model script" },
          { id: "d-b3-2", description: "Unit test suite" },
          { id: "d-b3-3", description: "Equations of motion documentation" }
        ],
        status: "in-progress"
      },
      {
        weekNumber: 4,
        title: "Linearization & open-loop simulation",
        goal: "Step motor inputs and identify instability.",
        tasks: [
          { id: "b4-1", description: "Linearize around hover equilibrium" },
          { id: "b4-2", description: "Implement simulation time loop" },
          { id: "b4-3", description: "Apply step motor inputs and log trajectories" },
          { id: "b4-4", description: "Verify physically plausible behavior" },
          { id: "b4-5", description: "Identify instability or incorrect behavior" }
        ],
        deliverables: [
          { id: "d-b4-1", description: "Linearized model" },
          { id: "d-b4-2", description: "Simulation time loop" },
          { id: "d-b4-3", description: "First open-loop plots" }
        ]
      },
      {
        weekNumber: 5,
        title: "Open-loop plots & model validation",
        goal: "Ensure mathematical models accurately reflect expected physical truths.",
        tasks: [
          { id: "b5-1", description: "Generate 3–5 open-loop scenarios" },
          { id: "b5-2", description: "Document expected vs actual behavior" },
          { id: "b5-3", description: "Confirm reproducibility on fresh clone" },
          { id: "b5-4", description: "Fix remaining model issues" },
          { id: "b5-5", description: "Write model documentation section" }
        ],
        deliverables: [
          { id: "d-b5-1", description: "Open-loop simulation plots" },
          { id: "d-b5-2", description: "Validation notes" },
          { id: "d-b5-3", description: "Reproducibility confirmation" },
          { id: "d-b5-4", description: "Model documentation v1" }
        ]
      },
      {
        weekNumber: 6,
        title: "PID / LQR design & implementation",
        goal: "Implement roll, pitch, and yaw control loops over the simulation.",
        tasks: [
          { id: "b6-1", description: "Choose controller type and document rationale" },
          { id: "b6-2", description: "Implement roll, pitch, yaw control loops" },
          { id: "b6-3", description: "Define performance targets" },
          { id: "b6-4", description: "Connect controller to simulation" },
          { id: "b6-5", description: "Run first closed-loop tests" }
        ],
        deliverables: [
          { id: "d-b6-1", description: "Controller implementation" },
          { id: "d-b6-2", description: "Performance targets" },
          { id: "d-b6-3", description: "First closed-loop results" },
          { id: "d-b6-4", description: "Controller design documentation" }
        ]
      },
      {
        weekNumber: 7,
        title: "Gain tuning & performance metrics",
        goal: "Dial in parameters until system meets step and state convergence goals.",
        tasks: [
          { id: "b7-1", description: "Tune gains or LQR weights" },
          { id: "b7-2", description: "Test step, ramp, sinusoidal inputs" },
          { id: "b7-3", description: "Measure rise time, overshoot, settling time, steady-state error" },
          { id: "b7-4", description: "Keep tuning log" },
          { id: "b7-5", description: "Document rationale for final gains" }
        ],
        deliverables: [
          { id: "d-b7-1", description: "Tuning log" },
          { id: "d-b7-2", description: "Performance metric plots" },
          { id: "d-b7-3", description: "Untuned vs tuned comparison" },
          { id: "d-b7-4", description: "Final gain values" }
        ]
      },
      {
        weekNumber: 8,
        title: "Edge cases & disturbance testing",
        goal: "Simulate failure modes and impulse disturbances to prove controller robustness.",
        tasks: [
          { id: "b8-1", description: "Test large initial angle errors" },
          { id: "b8-2", description: "Apply impulse disturbances" },
          { id: "b8-3", description: "Test parameter variations" },
          { id: "b8-4", description: "Document failure modes" },
          { id: "b8-5", description: "Refine controller if needed" }
        ],
        deliverables: [
          { id: "d-b8-1", description: "Edge case test report" },
          { id: "d-b8-2", description: "Disturbance rejection plots" },
          { id: "d-b8-3", description: "Known limitations document" },
          { id: "d-b8-4", description: "Updated controller if applicable" }
        ]
      },
      {
        weekNumber: 9,
        title: "Reproducibility check & code cleanup",
        goal: "Ensure anyone can clone, run, and understand the simulation stack.",
        tasks: [
          { id: "b9-1", description: "Fresh clone test" },
          { id: "b9-2", description: "Refactor for readability" },
          { id: "b9-3", description: "Remove dead code" },
          { id: "b9-4", description: "Add docstrings / inline documentation" },
          { id: "b9-5", description: "Resolve open issues" }
        ],
        deliverables: [
          { id: "d-b9-1", description: "Reproducibility report" },
          { id: "d-b9-2", description: "Clean documented codebase" },
          { id: "d-b9-3", description: "Closed GitHub issues" }
        ]
      },
      {
        weekNumber: 10,
        title: "Architecture doc & onboarding guide",
        goal: "Extensively document 'what we tried' to preserve institutional memory.",
        tasks: [
          { id: "b10-1", description: "Write system architecture doc" },
          { id: "b10-2", description: "Write onboarding guide" },
          { id: "b10-3", description: "Document design choices and reasoning" },
          { id: "b10-4", description: "Document what did not work" },
          { id: "b10-5", description: "Get peer review from someone outside the simulation team" }
        ],
        deliverables: [
          { id: "d-b10-1", description: "Architecture document" },
          { id: "d-b10-2", description: "Onboarding guide" },
          { id: "d-b10-3", description: "Design decision log" },
          { id: "d-b10-4", description: "“What we tried” documentation" }
        ]
      },
      {
        weekNumber: 11,
        title: "Technical report & final plots",
        goal: "Compile logic and testing data into the Cycle 1 close-out report.",
        tasks: [
          { id: "b11-1", description: "Write final technical report" },
          { id: "b11-2", description: "Generate final plots" },
          { id: "b11-3", description: "Write cycle 2 custom FCS roadmap" },
          { id: "b11-4", description: "Peer review internally" },
          { id: "b11-5", description: "Archive outputs in /handoff" }
        ],
        deliverables: [
          { id: "d-b11-1", description: "Final technical report" },
          { id: "d-b11-2", description: "Final plot set" },
          { id: "d-b11-3", description: "Cycle 2 roadmap draft" },
          { id: "d-b11-4", description: "Archived outputs" }
        ]
      },
      {
        weekNumber: 12,
        title: "Handoff package & cycle 2 roadmap",
        goal: "Hold transition sessions and tag release to unblock Cycle 2.",
        tasks: [
          { id: "b12-1", description: "Finalize cycle 2 roadmap" },
          { id: "b12-2", description: "Tag v1.0 release" },
          { id: "b12-3", description: "Hold handoff meeting with next simulation lead" },
          { id: "b12-4", description: "Archive settings, scripts, and figures" },
          { id: "b12-5", description: "Contribute to joint final presentation" }
        ],
        deliverables: [
          { id: "d-b12-1", description: "Finalized cycle 2 roadmap" },
          { id: "d-b12-2", description: "v1.0 repo release" },
          { id: "d-b12-3", description: "Handoff meeting notes" },
          { id: "d-b12-4", description: "Joint presentation contribution" }
        ]
      }
    ]
  }
];

export const committees: Committee[] = [
  {
    name: "Controls & Dynamics",
    description: "Studying rigid body dynamics, state-space representations, and control theory. Applying it to quadcopter attitude and stabilization.",
    focusArea: "PID, LQR, attitude control, mixing.",
    roadmapSupport: "Core contributors to Track B simulation and controller design.",
    icon: "Cpu",
  },
  {
    name: "Simulation & Software",
    description: "Writing and maintaining the Python simulation environment used to model flight dynamics and validate controllers before any hardware tests.",
    focusArea: "Numerical simulation, physical modeling, software validation.",
    roadmapSupport: "Drives Track B weeks 3–9.",
    icon: "Box",
  },
  {
    name: "Electronics & Power",
    description: "Wiring the drone correctly — power distribution, ESC connections, flight controller signal lines, and sensor interfaces.",
    focusArea: "Power paths, signal wiring, connector integrity.",
    roadmapSupport: "Core contributors to Track A wiring and power integration.",
    icon: "Zap",
  },
  {
    name: "Hardware & Fabrication",
    description: "Physical assembly of the drone platform — frame, motor mounts, component placement, and vibration isolation.",
    focusArea: "Frame assembly, mounting, mechanical integration.",
    roadmapSupport: "Drives Track A physical build weeks 3–9.",
    icon: "Wrench",
  },
  {
    name: "Documentation & Ops",
    description: "Writing test logs, maintaining the BOM, coordinating field sessions, and making sure the Week 12 handoff package is actually usable.",
    focusArea: "Test documentation, safety protocols, handoff artifacts.",
    roadmapSupport: "Active in both tracks throughout the cycle.",
    icon: "FileText",
  },
];

export const featuredProjects: Project[] = [
  {
    id: "proj-physical",
    title: "Physical Quadcopter Build",
    description: "Taking a quadcopter from bare frame through procurement, power integration, wiring, calibration, and first hover. Every decision is documented so the next team can understand why, not just what.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Hardware", "Electronics", "Testing"],
    link: "/roadmap",
    status: "Active",
  },
  {
    id: "proj-sim",
    title: "Simulation & Controls Stack",
    description: "A Python-based 6-DOF rigid body simulation for modeling quadcopter flight dynamics and testing feedback controllers in software before they touch hardware.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Python", "Controls", "Dynamics"],
    link: "/roadmap",
    status: "Active",
  },
  {
    id: "proj-fcs",
    title: "Custom Flight Controller",
    description: "Longer-term direction — if Cycle 1 produces clean enough simulation and hardware foundations, we want to move toward a custom flight control system rather than off-the-shelf firmware. Not this cycle, but what we're building toward.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Embedded", "C++", "Future"],
    link: "/projects",
    status: "Future Direction",
  },
];

export const events: Event[] = [
  {
    id: "ev-tracka-kickoff",
    title: "Track A: Procurement & Bare Frame Dry-Fit",
    date: "Sep 15, 2026",
    location: "Lab 304",
    type: "Milestone",
    status: "past",
  },
  {
    id: "ev-trackb-kickoff",
    title: "Track B: State Vector Definition Sync",
    date: "Sep 22, 2026",
    location: "Virtual",
    type: "Workshop",
    status: "past",
  },
  {
    id: "ev-poweron",
    title: "Controlled Power-On Subsystem Check",
    date: "Oct 18, 2026",
    location: "Lab 304 / Test Bench",
    type: "Test Flight",
    status: "upcoming",
  },
  {
    id: "ev-hover",
    title: "First Unrestrained Hover Tests",
    date: "Nov 5, 2026",
    location: "Indoor Flight Arena",
    type: "Test Flight",
    status: "upcoming",
  },
  {
    id: "ev-handoff",
    title: "Cycle 1 Handoff & Release Presentation",
    date: "Nov 20, 2026",
    location: "Engineering Auditorium",
    type: "Milestone",
    status: "upcoming",
  },
];

export const resourcesData: Resource[] = [
  {
    title: "State-Space Linearization Primer",
    description: "Math references for isolating hover equilibriums in 6-DOF contexts.",
    category: "Technical Docs",
    link: "#",
  },
  {
    title: "STM32 Build Toolchain",
    description: "How to clone our standard C/C++ environment for embedded flashing.",
    category: "Software/Tools",
    link: "#",
  },
  {
    title: "Vibration Isolation Best Practices",
    description: "Methods we rely on to decouple IMU feedback from high-RPM noise.",
    category: "Hardware Guides",
    link: "#",
  },
  {
    title: "Cycle 1 Safety Procedure",
    description: "Mandatory reading before applying main lipo power or attaching props.",
    category: "Onboarding",
    link: "#",
  },
  {
    title: "Git & Documentation workflow",
    description: "How to structure pull requests, write reproducible issues, and log test outcomes.",
    category: "Onboarding",
    link: "#",
  },
];
