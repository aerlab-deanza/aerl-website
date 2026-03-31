# Applied Engineering Research Lab Website

Public website and documentation hub for the Applied Engineering Research Lab (AERL), built with Astro and Starlight.

## Stack

- Astro
- Starlight
- Markdown/MDX content
- Custom CSS theme in `src/styles/aerl.css`

## Local Development

Run all commands from the project root:

```bash
npm install
ASTRO_TELEMETRY_DISABLED=1 npm run dev
```

Astro will start a local server, usually at `http://localhost:4321`.

## Production Build

```bash
ASTRO_TELEMETRY_DISABLED=1 npm run build
ASTRO_TELEMETRY_DISABLED=1 npm run preview
```

The production output is generated in `dist/`.

## Project Structure

```text
.
├── public/
│   └── fcs/                  # Public image assets used in docs pages
├── src/
│   ├── assets/               # Imported Astro image assets
│   ├── content/
│   │   └── docs/             # Starlight content routes
│   ├── pages/
│   │   └── 404.astro         # Custom branded 404 page
│   └── styles/
│       └── aerl.css          # Site-wide branding and theme overrides
├── astro.config.mjs
├── package.json
└── README.md
```

## Main Content Areas

- `src/content/docs/index.mdx`:
  Homepage
- `src/content/docs/about/`:
  About pages
- `src/content/docs/projects/`:
  Project index and FCS hub
- `src/content/docs/resources.mdx`:
  Papers, repos, and writeups
- `src/content/docs/updates.mdx`:
  Recruitment, sponsor, and collaboration updates
- `src/content/docs/join.mdx`:
  Join and contact page

## Editing Content

- Use `.md` or `.mdx` files under `src/content/docs/` to add or edit pages.
- Use `src/assets/` for Astro-managed images you want optimized at build time.
- Use `public/` for static files you want to reference directly by URL.

## Current Gaps

The site structure and branding are in place, but several content areas still need real data:

- committee lead names
- contact links and official lab email
- sponsor details
- resource links and repositories
- real test logs and project updates

## Notes

- The site uses a custom Astro 404 page instead of the Starlight default.
- If you later choose a production domain, add it to `astro.config.mjs` as the `site` value.
