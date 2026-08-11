# Plan: Add a "proof, not promises" showcase to Derrick Ndiga's portfolio

## Goal
Impress a visitor with something that proves real engineering skill — a **live, data-driven**
section — WITHOUT touching the existing Hero/About/Experience/Projects/Skills/Contact/Navbar/
Preloader/Cursor/3D-scene code. We add one new self-contained section and mount it.

## What we'll add (new section only — no edits to existing sections)
1. **`LiveProof.tsx`** — a "Live from my repos" panel pinned between Skills and Contact:
   - **GitHub live stats** (CORS-OK, verified `api.github.com -> 200`): total public repos,
     combined stars, top languages, recent commit count for Dre-AI. Fetched client-side,
     cached, with skeleton + graceful fallback if the API rate-limits.
   - **Live build/uptime pings**: small status dots that fetch the real deployed endpoints
     (`dre-ai.github.io/portfolio`, `dre-ai.github.io/Lumora`, `insightf0rge.streamlit.app`,
     `lumora-api-82c2.onrender.com/api/health`, `taskpilot.onrender.com/`) and show
     green/red "online" state — proves the projects actually run, not just exist.
   - **Mini terminal / code panel**: a typed-out animation showing a real command
     (`git log` style or a Python snippet) to convey craft — pure CSS/framer-motion, no deps.
2. **Mount in App.tsx**: insert `<LiveProof />` between `<Skills />` and `<Contact />`.
   One-line change, isolated to this addition.

## Why this impresses (dev-skill signal)
- It pulls **real data live in the browser** (GitHub API, health checks) — shows you can
  build data-driven UIs, handle async/CORS/caching/error states. That's senior-level.
- It proves your deployed projects are actually live — not static mockups.

## Tech / constraints
- Reuse existing stack (React, TS, Tailwind, framer-motion, three). No new dependencies.
- Keep the dark/neon glass aesthetic (cyan #22d3ee / violet #a855f7).
- All fetches client-side with AbortController + try/catch + skeletons + fallback text
  (so it never breaks the page if an endpoint is asleep/blocked).
- Accessibility: real semantics, aria-labels, reduced-motion respected.

## Execute (after approval) via Claude Code (ECC)
- `claude -p "<detailed prompt>" --model sonnet` scoped to portfolio, build-verified.
- Commit + push + redeploy GitHub Pages; verify live.

## Out of scope (explicitly untouched)
Hero, About, Experience, Projects, Skills, Contact, Navbar, Preloader, Cursor, Scene3D,
design system, routing, deployed backend code.
