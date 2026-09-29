# Derrick Ndiga — Portfolio

Read `docs/BRIEF.md` before any design or build work. It is the source of truth for positioning, design direction, motion rules and the phase plan.

## Ground rules
- Work ONE phase per session (see `docs/PROMPTS.md`). Show a plan before writing code. Commit at the end of each phase.
- All content lives in `src/data/*.ts`. Never hard-code copy in components, and never publish text in [brackets] or `TODO`.
- Never add a phone number anywhere on the site.
- Site is served from `/portfolio/` (see `astro.config.mjs`). Always build URLs from `import.meta.env.BASE_URL`.
- Design lead: Taste Skill (`design-taste-frontend`). Reviewer: UI UX Pro Max. Identity: Logo Design Skill.
- Motion must respect `prefers-reduced-motion` and must never hide content from people who can't or don't scroll.
- Keep `data-section`, `data-pipeline`, `data-step`, `data-card`, `data-timeline` and `#hero-canvas`. The motion layer hooks into these.
- Performance budget: Lighthouse 90+ on mobile; hero frames ≤ 6 MB desktop / ≤ 2.5 MB mobile.

## Development
Start the dev server in background mode: `astro dev --background` (manage with `astro dev stop | status | logs`).
Docs: https://docs.astro.build
