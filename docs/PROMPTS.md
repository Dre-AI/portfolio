# Claude Code session prompts

Run each phase in a fresh Claude Code session, from the repo root. Paste the prompt, review the plan it proposes, then let it build. Commit and push after each phase; GitHub Actions deploys automatically.

---

## Step 0 — one-time setup (do this yourself, in a terminal)

**1. Back up the current site before replacing it:**
```bash
git clone https://github.com/Dre-AI/portfolio.git && cd portfolio
git checkout -b old-site && git push -u origin old-site   # keeps your current site safe
git checkout main
```
Copy everything from this starter pack into the repo (replace the old files on `main`), then:
```bash
npm install
npm run dev
```

**2. Point GitHub Pages at Actions:** in the repo, go to Settings → Pages → Build and deployment → Source: **GitHub Actions**.

**3. Install the skills** (Node 22+ and Python 3 needed):
```bash
# Taste Skill (design lead)
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"

# ECC (guided installer: choose Global user + Standard hooks)
npx ecc-universal@2.2.2 setup
```
Then, inside Claude Code:
```
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
/plugin marketplace add kaankiziltug/logo-design-skill
/plugin install logo-design@logo-design-skill
```
Restart Claude Code and run `/plugin list` to confirm everything is enabled.

> Phase 1 (scaffold, base path, deploy workflow, content data, semantic skeleton) is **already done** in this pack. Start at Phase 1b.

---

## Phase 1b — Identity (Logo Design Skill)
```
Use the logo-design skill. Brief: a personal monogram for Derrick Ndiga, an AI & Automation Engineer in Nairobi. Initials "DN". It must feel precise, calm and technical — premium minimal like Apple/Linear, not "techy" clichés (no circuit boards, robots, brains or glowing gradients). It will be used at 16px as a favicon, in the site nav, on an OG image and on my CV. Show me the concept overview and your recommendation, then stop.
```
After you pick a direction:
```
Go with concept [X]. Produce the kit: final SVG mark, one-colour and reversed versions, and the favicon / app-icon / web-manifest set. Put web assets in public/ and replace public/favicon.svg. Commit.
```

## Phase 2 — Design system (Taste Skill)
```
Read CLAUDE.md and docs/BRIEF.md. Use the design-taste-frontend skill to create the design system for this portfolio: clean minimal premium (Apple/Linear spirit), neutral palette with ONE accent that works with the DN monogram in public/. Propose 3 accent options and 2 font pairings and show me before deciding. Then implement the tokens in src/styles/global.css (keep the existing variable names), self-host the fonts, and build a /styleguide page showing colours, type scale, buttons, tags and a project card in light and dark mode. Don't touch the homepage layout yet.
```

## Phase 3 — Static build (no animation)
```
Read CLAUDE.md. Using the design system from Phase 2, design and build the full homepage in src/pages/index.astro from the data in src/data/. Extract components (Hero, Proof, Pipeline, ProjectCase, Timeline, Contact) into src/components/. Zero animation this phase: it must look finished standing still, on a 375px phone and a 1440px desktop. Project screenshots are in public/work/ (use Astro's <Image> for WebP output). Keep all data-* hooks. When done, use the ui-ux-pro-max skill to review accessibility, contrast, spacing and focus states, and fix what it finds.
```

## Phase 4 — Motion layer
```
Read CLAUDE.md and the motion rules in docs/BRIEF.md §6. Add GSAP + ScrollTrigger and Lenis. Build: (1) the pinned "How my automations work" section: turn [data-pipeline] into an SVG flow diagram whose steps light up and connect as you scroll; (2) the experience timeline line drawing on scroll; (3) metric counters in #proof; (4) restrained reveal on project cards — one orchestrated moment per section, not fade-up on everything. Reduced motion = static final states. On mobile, no pin longer than one screen. Look at references/ for timing inspiration. Show me the plan first.
```

## Phase 5 — Hero sequence (Google Flow)
```
Read CLAUDE.md and docs/BRIEF.md §10. The Flow clips are in hero-src/. Run scripts/extract-frames.sh to produce desktop and mobile WebP frame sets in public/hero/. Build a canvas scrubber on #hero-canvas: preload the first ~10 frames immediately and the rest in the background, draw the frame that matches scroll progress through the hero, handle devicePixelRatio and resize, pick the mobile set under 768px, and show a static poster frame for reduced-motion or when Save-Data is on. The headline fades as the sequence resolves. Check total frame weight against the budget.
```

## Phase 6 — Polish & ship
```
Read CLAUDE.md. Final pass: run Lighthouse (mobile) and fix everything under 90; generate public/og.png (1200×630) using the monogram and headline; add a sitemap (@astrojs/sitemap); verify JSON-LD; test keyboard navigation and reduced motion; check there are no [brackets] or TODO left in src/data. Then use the ui-ux-pro-max skill for a last review and give me a launch checklist.
```
