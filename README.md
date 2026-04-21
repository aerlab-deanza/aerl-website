# AERL — Applied Engineering Research Lab

The website for **AERL**, a student engineering lab at De Anza College.

This site is the public face of the lab and the reference point for our current build cycle. It's built to be maintainable across student handoffs — the same standard we hold our engineering work to.

---

## What AERL Is

AERL is a student engineering lab at De Anza College focused on building real systems, documenting them well, and leaving behind work the next team can actually use.

Our current direction is a quadcopter build. Two tracks are running in parallel:

- **Track A — Physical Drone Build:** Taking a hardware platform from bare frame through procurement, power integration, wiring, calibration, and first hover.
- **Track B — Simulation & Controls:** Building a Python-based 6-DOF rigid body simulation and implementing a feedback controller for flight dynamics validation.

Both tracks run on a quarterly cycle (Cycle 1). The cycle ends with a tagged release, full documentation, and a handoff package for future members.

---

## What This Site Is

This is not a polished marketing site — it's a working artifact. It serves as:

- A public description of what AERL is and what it's building
- A live view of the current build cycle roadmap
- A recruitment and onboarding surface for prospective members
- A long-term institutional reference — structured so future contributors can update it without confusion

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 + `oklch` design tokens |
| Components | Custom Shadcn UI derivatives |
| Data | `src/lib/data.ts` — centralized, typed |
| Types | `src/types/index.ts` |

---

## Local Development

```bash
git clone https://github.com/aerl-deanza/website.git
cd website
npm install
npm run dev
```

Dev server runs on `localhost:3000` by default (Turbopack).

## Google Sheets-backed inquiries

The Join / Contact form can append submissions directly into a Google Sheet. This is the only write-path using Sheets; the rest of the site content remains code-managed.

Create a Google Cloud service account with access to the target spreadsheet and set these environment variables locally and in Vercel:

```bash
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id
GOOGLE_SHEETS_SHEET_NAME=Join Inquiries
GOOGLE_SHEETS_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_PRIVATE_KEY_ID=optional-private-key-id
```

Expected columns in the sheet:

1. submitted_at
2. first_name
3. last_name
4. email
5. major_background
6. contribution_area
7. inquiry

---

## Content Structure

All dynamic content — roadmap, projects, events, working groups, resources — lives in:

**`src/lib/data.ts`**

This is intentional. New contributors should not need to understand the whole codebase to update content.

### Updating the Build Cycle

1. Open `src/lib/data.ts`
2. Find the `tracks` array
3. Change a week's `status` to `"completed"`, `"in-progress"`, or remove the field (defaults to pending)

Do not use untyped status values — TypeScript validation will catch violations at build time.

### Adding Events or Working Group Members

Append to the `events` or `committees` arrays in `src/lib/data.ts`. Follow the existing object shape exactly — types are enforced via `src/types/index.ts`.

### Site Navigation

Navigation items are configured in `src/config/site.ts` via the `mainNav` array. Add or remove routes there. Keep the nav to 6 items maximum — a long nav adds noise and legitimizes pages that may not yet be real.

---

## Codebase Principles

1. **Readable first.** No clever abstractions without comments. This project will be handed off to students who may not know the codebase.
2. **Type-safe data.** All content must conform to types in `src/types/index.ts`. If you need a new field, add it there.
3. **Use shared components.** `SectionWrapper`, `PageHeader`, and card components exist to maintain visual consistency. Don't reach for raw markup when a component already covers the case.

---

## Before Opening a PR

```bash
npm run build
```

The build must pass TypeScript and ESLint checks cleanly. If it doesn't, fix it first.
