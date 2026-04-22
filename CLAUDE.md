# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server on localhost:3000 (Turbopack)
npm run build    # Production build — runs TypeScript + ESLint checks
npm run lint     # ESLint only
```

The build must pass cleanly before any PR. There is no test suite.

## Architecture

**Next.js 16 App Router** with MDX support. Pages are `.tsx` or `.mdx` under `src/app/`. The `next.config.ts` enables `reactCompiler`, Turbopack, and MDX page extensions.

### Content layer

All dynamic site content lives in two files:

- **`src/lib/data.ts`** — roadmap tracks, committees, projects, events, resources. This is the single source of truth for everything data-driven. New contributors update content here without touching components.
- **`src/lib/site-content.ts`** — static copy: mission pillars, leadership team, core values, committee model, join prompts, etc.

Types are enforced via **`src/types/index.ts`** (`Track`, `Week`, `Committee`, `Project`, `Event`, `Resource`). All content must conform — TypeScript will catch violations at build time.

### Navigation and routing

- **`src/config/site.ts`** — `siteConfig.mainNav` drives the navbar. Keep to 6 items max.
- **`src/config/docs.ts`** — `docsSections` drives the documentation sidebar (`DocsSidebar`). Add new doc pages here.

### Documentation section

Pages under `src/app/documentation/` are `.mdx` files. They share a layout (`src/app/documentation/layout.tsx`) that renders a two-column grid: `DocsSidebar` + article panel. Add new doc pages as `.mdx` files and register them in `src/config/docs.ts`.

### Component conventions

- **`src/components/layout/`** — `Navbar`, `Footer`, `PageHeader`, `SectionWrapper`. Use `SectionWrapper` to wrap page sections for consistent horizontal padding.
- **`src/components/cards/`** — typed card components for events, projects, resources, teams.
- **`src/components/blocks/`** — reusable page-level blocks (`CTA`, `EmptyState`).
- **`src/components/ui/`** — shadcn-derived primitives (button, badge, card, input, etc.).
- **`src/components/docs/`** — docs-specific components (`DocsSidebar`, `DocsLinkCard`, `StatCard`).

Reach for existing components before writing raw markup. `SectionWrapper`, `PageHeader`, and card components exist specifically to maintain visual consistency.

### Styling

Tailwind CSS v4 with `oklch` design tokens defined in `src/app/globals.css`. Dark mode is on by default (`defaultTheme="dark"`, system override disabled). Use `cn()` from `src/lib/utils.ts` for conditional class merging.

### MDX

`mdx-components.tsx` at the repo root defines custom element mappings for MDX pages (headings, paragraphs, code blocks, etc.). Modify this file to change how MDX content renders globally.
