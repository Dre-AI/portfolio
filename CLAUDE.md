# Ndiga Dee Creative Co. — Studio Site

Source of truth: `docs/superpowers/specs/2026-10-04-ndiga-dee-creative-co-design.md`. Read it before any design or build work. `docs/BRIEF.md` is the short version.

## Ground rules
- One phase per session (see `docs/PROMPTS.md`), from a written plan in `docs/superpowers/plans/`. Commit at the end of each phase.
- All copy lives in `src/data/*.ts`. Never hard-code copy in components. Never publish `[brackets]`, `TODO` or `TBD`. `npm test` enforces this.
- Never add a phone number anywhere on the site.
- The `#longliveAI` tag is retired (2026-10-05). Do not use it anywhere on the site.
- AI speed claims stay qualitative unless Derrick supplies a real before/after. Never invent a metric.
- Render work items through `publicView()` from `src/data/work.ts` so unapproved concepts stay anonymous.
- Logo: the existing DN monogram in `brand/`. Do not design a new mark.
- Build URLs from `import.meta.env.BASE_URL`.
- Design lead: `design-taste-frontend`. Critique/polish: `impeccable`. Review: UI UX Pro Max. Planning/review/verification: ECC.
- Motion respects `prefers-reduced-motion` and never hides content from people who can't or don't scroll.
- Keep `#hero-canvas` and the motion `data-*` hooks (`data-section`, `data-pipeline`, `data-step`, `data-card`, `data-timeline`).
- Performance budget: Lighthouse 90+ on mobile; hero frames ≤ 6 MB desktop / ≤ 2.5 MB mobile.

## Development
- `npm test` runs the content and docs tests (Node built-in test runner).
- Start the dev server in background mode: `astro dev --background` (manage with `astro dev stop | status | logs`).
- Docs: https://docs.astro.build
