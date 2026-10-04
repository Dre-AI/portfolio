# Phase 3: Build the Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild every page on the Phase 2 design system with the new content, in Derrick's first-person freelancer voice. That covers the home page, `/work/[slug]`, `/about` and `404`. Make the hero tell its four beats as you scroll and end without the dark gap. Then delete the legacy portfolio code.

**Architecture:**
- Pages are static Astro components reading only from `src/data/*.ts`.
- Small pure helpers (beat/frame maths, contact config) live in `src/lib/` or `src/scripts/motion/` with `node:test` unit tests.
- Motion stays progressive enhancement. Every page reads completely with JS off and under reduced motion.
- The only motion work in this phase is the hero (beats + hand-off). Section reveals and the work glide stay in Phase 4.

**Tech Stack:** Astro 7, plain CSS tokens (`src/styles/global.css`), GSAP + ScrollTrigger + Lenis (existing), `playwright-core` (existing dev dep) for screenshots, Node 24 `node:test`.

**Spec:** `docs/superpowers/specs/2026-10-04-ndiga-dee-creative-co-design.md` (§2 positioning is now *freelancer, first person*). **Design lead:** `design-taste-frontend` (dials 8/7/3). Style reference: `/styleguide`.

## Global Constraints
- **Voice:** first person singular ("I", "my"). Never "we", "our", "us", "the team". Brand name `Ndiga Dee Creative Co.`; founder line `Derrick Ndiga, Freelance Full-Stack & AI Developer`.
- **Tag** exactly `#longliveAI`. **No phone number** anywhere. No `[brackets]`, `TODO`, `TBD`, em or en dashes, or more than one `·` per line in copy.
- All copy in `src/data/*.ts`; components never hard-code visible strings (aria-labels included).
- Speed and quality claims are qualitative and tied to a reason; never invented numbers.
- Work items render only through `publicView()`. The unapproved cleaning concept shows **no client name, no live link and no screenshot** (its site carries the client's branding).
- ONE accent (`--accent` pale cyan). Buttons/tags pill; cards/inputs/media `--radius-card`. No gradient text. No eyebrow label above every section (max 1 per 3 sections). One label per CTA intent: contact = `Start a project` everywhere; booking (`Book a free call`) appears only in the contact section.
- Keep `#hero-canvas` and the `data-section`, `data-pipeline`, `data-step`, `data-card`, `data-timeline` hooks.
- Reduced motion / no JS: the hero shows the poster plus all four beats stacked; nothing is hidden.
- Mobile: single column below 768px; no pinned section longer than one screen on mobile.
- Site base stays `/portfolio/` for now (custom domain later); build URLs from `import.meta.env.BASE_URL` via `base` in `src/lib/content.ts`.
- Conventional commits; `npm test` and `npm run build` green at the end of every task.

---

### Task 0: Branch

- [ ] `git checkout rebrand/phase-2-design-system && git checkout -b rebrand/phase-3-build`
- [ ] `npm test` → all pass; `npm run build` → `Complete!`

---

### Task 1: Copy in Derrick's voice, plus decided changes

**Files:** Modify `src/data/studio.ts`, `src/data/services.ts`, `src/data/process.ts`, `src/data/work.ts`, `tests/studio.test.ts`, `tests/offer.test.ts`, `tests/work.test.ts`. Create `src/data/contact.ts`, `tests/contact.test.ts`.

**Interfaces produced:**
- `WorkLabel` gains `'built-for'`; `labelText('built-for')` returns `'Built for'`.
- `src/data/contact.ts`: `export const contactConfig = { web3formsKey: '', calLink: '' }`, `export const hasForm = (c = contactConfig) => c.web3formsKey.trim().length > 0`, `export const hasBooking = (c = contactConfig) => /^https:\/\/cal\.com\//.test(c.calLink)`.
- `studio.ts` keeps every existing export name and shape (`studio`, `heroBeats`, `aiBenefits`, `founder`, `ctas`, `contactCopy`). Add `studio.city = 'Nairobi, Kenya'` (footer and contact only), `ctas.about = 'About me'`, and `export const nav = [{ label: 'Work', href: '#work' }, { label: 'About', href: 'about/' }, { label: 'Contact', href: '#contact' }]`. Hrefs are relative to `base`.

- [ ] **Step 1: Tests first.**
  - In `tests/studio.test.ts`, change the founder assertion to `'Derrick Ndiga, Freelance Full-Stack & AI Developer'`, and add:

```ts
import { services } from '../src/data/services.ts';
import { processSection } from '../src/data/process.ts';

test('copy speaks in the first person, never as a team', () => {
  const all = JSON.stringify({ studio, heroBeats, aiBenefits, founder, ctas, contactCopy, services, processSection });
  assert.doesNotMatch(all, /\b(we|our|ours|us|we're|we'll|the team)\b/i);
});

test('first AI benefit promises early options and better results, without a hard deadline', () => {
  assert.doesNotMatch(aiBenefits[0].text, /first week/i);
  assert.match(aiBenefits[0].text, /early/i);
  assert.match(aiBenefits[0].text, /better/i);
});
```

  - In `tests/work.test.ts`, add: `assert.equal(featuredWork.find((w) => w.slug === 'keton-consulting')!.label, 'built-for')` and `assert.equal(labelText('built-for'), 'Built for')` (import `labelText`).
  - Create `tests/contact.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contactConfig, hasForm, hasBooking } from '../src/data/contact.ts';

test('contact services start unconfigured and fall back to email', () => {
  assert.equal(hasForm(), contactConfig.web3formsKey !== '');
  assert.equal(hasForm({ web3formsKey: ' ', calLink: '' }), false);
  assert.equal(hasForm({ web3formsKey: 'abc-123', calLink: '' }), true);
});

test('booking only accepts a cal.com https link', () => {
  assert.equal(hasBooking({ web3formsKey: '', calLink: 'https://cal.com/derrick/intro' }), true);
  assert.equal(hasBooking({ web3formsKey: '', calLink: 'http://cal.com/x' }), false);
  assert.equal(hasBooking({ web3formsKey: '', calLink: 'https://evil.example/cal.com/' }), false);
});
```

- [ ] **Step 2:** `npm test` → the new tests FAIL.
- [ ] **Step 3: Rewrite copy.** Keep meaning and length; switch to first person and keep every existing test passing:
  - **`studio.subline`:** `'Websites, brands and growth for ambitious businesses. Designed by a person, built faster with AI.'`
  - **`studio.manifesto`:** `'Taste is human. Speed is the machine’s. On every project, AI drafts, explores and checks, so my hours go into the decisions that make the work good. You see real options sooner, launch sooner and skip the shortcuts. #longliveAI'`
  - **`studio.footerNote`:** `'Designed and built in Nairobi by Derrick, with AI. #longliveAI'`
  - **`aiBenefits[0]`:** title `'Real options, early'`; text `'AI explores many directions in hours, so you react to real designs early in the project, and the result is better for it: the strongest idea wins, not the first one.'`
  - **`aiBenefits[3]`:** title `'A person stays in charge'`; text `'I review every design and every line of code before it reaches you.'`
  - **`founder.role`:** `'Freelance Full-Stack & AI Developer'`. **`founder.bio`:** first person, as now, but mention working under the Ndiga Dee Creative Co. name.
  - **`contactCopy.intro`:** `'Tell me about the project. I reply within two working days.'`
  - **`contactCopy.success`:** `'Thanks, your brief is in. I will reply within two working days.'`
  - **`contactCopy.error`:** keep it, but in the first person.
  - **`services`:** any "we"/"our" becomes "I"/"my", e.g. Brand aiAngle `'I explore many visual directions in hours, then refine the best one by hand.'`
  - **`processSection`:** heading `'Why I finish sooner'`; intro `'Same craft, less waiting. Here is where AI takes time out of a project.'`; any step text with "we" becomes "I".
  - **`work.ts`:** Keton `label: 'built-for'`.
  - **`ctas.emailUs`:** `'Email me'`.
- [ ] **Step 4:** Create `src/data/contact.ts` with the interface above and a comment: "Paste the Web3Forms access key and Cal.com link here when ready; until then the form falls back to email and the booking button is hidden."
- [ ] **Step 5:** `npm test` → PASS; `npm run build` → Complete. Commit `feat: first-person freelancer copy and contact config`.

---

### Task 2: Site shell (head, header, footer)

**Files:** Modify `src/layouts/Base.astro`, `src/components/Header.astro`, `src/components/Footer.astro`. Create `tests/shell.test.ts`.

**Interfaces:** `Base.astro` props unchanged (`title?`, `description?`, `noindex?`). Default title `` `${studio.name}: ${founder.role}` `` and default description `studio.subline`.

- [ ] **Step 1: Test first** `tests/shell.test.ts`. It reads the three files as text and asserts:
  - none of them imports `data/profile`, `data/site`, `data/projects` or `data/experience` (Base may import `data/experience` only if it still builds Person JSON-LD from it; prefer `founder`);
  - Base contains `"@type": "Organization"` and `"@type": "Person"` JSON-LD built from `studio` and `founder`, with `sameAs` from `founder.links`;
  - Header uses `nav` from `studio.ts` and `ctas.startProject`;
  - Footer renders `studio.footerNote` and `studio.city`.

  Run it → FAIL.
- [ ] **Step 2: Base.** Swap the `profile` imports for `studio`/`founder`. JSON-LD: one `Organization` (name, url = site + base, logo = `${base}icon-512.png`, founder → Person) and one `Person` (name, jobTitle = `founder.role`, email, sameAs). Keep the font preloads, the motion gate, `theme-color` `#0a0b0d` and the OG tags (image stays `og.png` until Task 9).
- [ ] **Step 3: Header.**
  - **Left:** `Monogram` (height 26) plus the wordmark `studio.name` in `.display` at `--step-0`. The wordmark is hidden below 480px; the monogram stays and gets `aria-label={studio.name}`.
  - **Right:** the `nav` links, then a `.btn.primary` `ctas.startProject` → `#contact`.
  - One line on desktop, height ≤ 72px.
  - Keep the existing scroll/glass behaviour, but use `--z-nav` and remove the glow box-shadows (legacy `--glow-*` / `--edge` look).
  - Nav hrefs: `#...` anchors resolve to `${base}#...` on non-home pages.
- [ ] **Step 4: Footer.** Monogram, `studio.footerNote`, `studio.city`, email (`mailto:`), LinkedIn, GitHub, and `© {year} {studio.name}`. No phone number.
- [ ] **Step 5:** `npm test`, `npm run build`. Commit `feat: studio site shell`.

---

### Task 3: Hero with scroll beats and a clean ending

**Files:** Create `src/scripts/motion/heroMath.ts` and `tests/heroMath.test.ts`. Rewrite `src/components/Hero.astro`. Modify `src/scripts/motion/hero.ts`.

**Interfaces:**
- `heroMath.ts` (pure, no DOM):
  - `export function frameAt(progress: number, count: number, filmEnd: number): number`. The film reaches its last frame at `progress = filmEnd` and holds after that; the result is clamped to `0..count-1`.
  - `export function beatAt(progress: number, starts: number[]): number`. Returns the index of the last start ≤ progress, minimum 0.
- Markup: each beat is `<div class="beat-slide" data-beat={i}>`. `hero.ts` toggles `.is-active` on the current one.

**Why the gap happens (fix target):** the last ~20% of the film is near-black with a small cluster, the copy fades out at 70%, and the next section adds ~10rem of top padding. The fix:
- The film finishes at 88% of the pin.
- Beat 4 (studio name + monogram + tag + CTA) fades in over the cluster from 85%.
- The last 8% of the pin cross-fades the hero to `--bg` while the next section has `padding-top: var(--space-2xl)` only.
- The hero's bottom edge fades into `--bg` with a gradient, so there is no hard dark band.

- [ ] **Step 1: Test first** `tests/heroMath.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { frameAt, beatAt } from '../src/scripts/motion/heroMath.ts';

test('film reaches the last frame at filmEnd and holds', () => {
  assert.equal(frameAt(0, 217, 0.88), 0);
  assert.equal(frameAt(0.88, 217, 0.88), 216);
  assert.equal(frameAt(1, 217, 0.88), 216);
  assert.equal(frameAt(0.44, 217, 0.88), 108);
  assert.equal(frameAt(-1, 217, 0.88), 0);
});

test('beat index follows the starts', () => {
  const starts = [0, 0.3, 0.6, 0.85];
  assert.equal(beatAt(0, starts), 0);
  assert.equal(beatAt(0.29, starts), 0);
  assert.equal(beatAt(0.3, starts), 1);
  assert.equal(beatAt(0.7, starts), 2);
  assert.equal(beatAt(0.99, starts), 3);
});
```

  Run it → FAIL.
- [ ] **Step 2:** Implement `heroMath.ts` (≈15 lines, `Math.round` for frames). `npm test` → PASS.
- [ ] **Step 3: Rewrite `Hero.astro`.**
  - Keep `#hero`, `data-section="hero"`, the poster `<img>`, `#hero-canvas` (with `data-base` and `data-frames`) and the `--start-desktop/--start-mobile` background.
  - Copy container `[data-hero-copy]` holds:
    - the label row `studio.heroLabels.join(' · ')` in `.label`;
    - four `.beat-slide` blocks from `heroBeats`:
      - beat 0: `h1` with `heading`, `.lead` with `text`, CTAs from `ctas` (first `.btn.primary` → `#contact`, second `.btn.ghost` → `#work`);
      - beats 1-2: heading in `p.beat` (the h1 is beat 0 only), text in `.lead`;
      - beat 3: `Monogram` (height 72), heading in `p.beat`, the tag in `.label`, and `ctas.startProject` as `.btn.primary`.
  - Layout: copy in the left half on desktop (≤ 36rem wide), the film filling the section (cover, anchored right-bottom so Derrick stays right). On mobile the copy sits in the lower part over a bottom scrim (`linear-gradient(to top, var(--bg) 0, transparent 60%)`), at least 4.5:1 for text.
  - **Static/reduced motion (default CSS):** all four beat slides stacked in normal flow under the hero's first screen, beats 1-3 separated by `--space-xl`. **With `.motion-hero` on `<html>`:** slides are absolutely stacked in one grid cell, `opacity: 0` and `visibility: hidden` unless `.is-active`, with a 400ms opacity transition.
  - A bottom fade: `.hero::after` gradient from transparent to `var(--bg)` over the last 20vh.
  - Remove the old status pill, the profile/CV code and the `.grad-text` span. Scoped styles may not set `letter-spacing` on headings.
- [ ] **Step 4: Update `hero.ts`.**
  - Pin length: `PIN_SCREENS = { desktop: 3, mobile: 1 }`.
  - Frame index: `frameAt(self.progress, set.count, FILM_END)` with `FILM_END = 0.88`.
  - Beats: `beatAt(self.progress, starts)`, where `starts` comes from `data-starts` on the copy container (rendered from `heroBeats.map(b => b.at)`). Toggle `.is-active` only when the index changes.
  - Replace the old copy fade with a hand-off: `timeline.to(hero, { '--handoff': 1, ease: 'none', duration: 0.08 }, 0.92)`, where CSS uses `--handoff` to fade the canvas to 40% and darken the scrim.
  - Beat 0 is active on load.
  - Cleanup removes `.is-active` and restores beat 0.
  - Keep the frame loading/streaming code as it is.
- [ ] **Step 5: Next-section spacing.** The first section after the hero gets `padding-top: var(--space-2xl)` via `#hero + section` (or the pin-spacer equivalent `.pin-spacer:has(> #hero) + section`).
- [ ] **Step 6: Verify in a browser** (dev server config `portfolio` in `.claude/launch.json`, `http://localhost:4321/portfolio/`):
  - Scroll the whole hero at desktop and at 375px.
  - Each beat appears at its point, and beat 4 shows the monogram over the cluster.
  - No dark band longer than ~10vh before the next section.
  - With `prefers-reduced-motion: reduce` (emulate in devtools or a JS media check) all four beats are visible.
- [ ] **Step 7:** `npm test`, `npm run build`. Commit `feat: hero beats and seamless hand-off`.

---

### Task 4: Home sections, part 1 (manifesto and services)

**Files:** Create `src/components/Manifesto.astro`, `src/components/Services.astro`. Modify `src/pages/index.astro`.

- [ ] **Manifesto.** Full-width statement, `.display` at `--step-3`, ≤ 22ch per line, with `#longliveAI` set in `.label` + accent after it. Section `id="manifesto"`, `data-section="manifesto"`. Wrap each word in `<span>` (Phase 4 animates them); the text must read normally without JS.
- [ ] **Services.**
  - Layout: one large first service, the other two stacked beside it (asymmetric 2fr/1fr grid on desktop, one column on mobile). Not three equal cards.
  - Each service shows a Phosphor icon (from `@phosphor-icons/core/assets/regular/{icon}.svg`, inlined with `currentColor`), the title (h3), the summary, deliverables as `.tags`, and the `aiAngle` in a `.label`-styled line with an accent marker.
  - Section `id="services"`, h2 from a new `sections.services` string `'What I make'` in `studio.ts`. Section headings live in `export const sections = { services: 'What I make', work: 'Selected work', moreBuilds: 'More builds', about: 'Who you work with', contact: contactCopy.heading }` in `studio.ts`.
- [ ] `index.astro` order: Header, Hero, Manifesto, Services, (Process, Work, Founder, Contact come in Tasks 5-6), Footer. Keep the motion loader script.
- [ ] `npm test`, `npm run build`, quick visual check at desktop and 375px. Commit `feat: manifesto and services sections`.

---

### Task 5: Home sections, part 2 (process, work, founder)

**Files:** Rewrite `src/components/Pipeline.astro` → reads `processSection`. Rewrite `src/components/Work.astro` and `src/components/ProjectCard.astro`. Create `src/components/Founder.astro`. Modify `src/pages/index.astro`.

- [ ] **Process (`Pipeline.astro`).**
  - Keep `id="how"`, `data-section="pipeline"`, `ol[data-pipeline] > li[data-step]` so `src/scripts/motion/pipeline.ts` still works.
  - Each step shows the icon, title, then two lines: `usual` (muted, with a line-through-free "Usually" label from data) and `withAI` (fg). Add `processSection.usualLabel = 'Usually'` and `processSection.withAILabel = 'With AI'` to `process.ts`.
  - Check `pipeline.ts` still runs (no console errors) and fix only selectors if needed.
- [ ] **Work.**
  - `id="work"`. Featured items come from `featuredWork.map(publicView)` as cards (`data-card`).
  - Each card shows: cover image if `item.cover` exists in `public/` (via `publicFileExists`) and the item is not an unapproved concept; `labelText(item.label)`, plus for `built-for` the title reads "Built for Keton Consulting" by composing `labelText` + title; title; summary; service tags; and a link to `${base}work/${slug}/`.
  - Without a cover: a chrome-surface placeholder block (`background: var(--chrome)` at 12% opacity over `--surface`) with the Monogram. No fake screenshots.
  - Layout: a two-column staggered grid on desktop (the second column offset down by `--space-3xl`), one column on mobile. The horizontal glide is Phase 4.
  - Below that, `moreBuilds` as a compact list grouped in two columns (title + summary + stack tags + "View code" link when `repoUrl`).
- [ ] **Founder.** `id="founder"`: Derrick's photo (`public/founder.webp`, generated in this step from `hero-src/keyframes/K1.png` with PIL/ffmpeg: 900px wide, WebP q 80, crop to 4:5 around the face), name, `founder.role`, `founder.bio`, and a link `ctas.about` → `${base}about/`. Photo has an `alt` from `founder.photoAlt = 'Derrick Ndiga'` (add it to data). Layout: photo left 5/12, text right, collapsing on mobile.
- [ ] `index.astro` order: …Services, Pipeline, Work, Founder, Contact (Task 6), Footer. Delete `Proof` and `About` from the page (no real metrics yet; spec §5 item 6 says proof only with real numbers).
- [ ] `npm test`, `npm run build`, visual check. Commit `feat: process, work and founder sections`.

---

### Task 6: Contact section

**Files:** Rewrite `src/components/Contact.astro`. Create `src/scripts/contact-form.ts`.

- [ ] **Markup.**
  - `id="contact"`, h2 `contactCopy.heading`, intro `contactCopy.intro`.
  - Left: the brief form using `.field` blocks: name, email, service `<select>` from `services` titles, budget `<select>` from `contactCopy.budgets`, timeline `<select>` from `contactCopy.timelines`, message `<textarea>`.
  - A hidden honeypot `<input name="botcheck" class="visually-hidden" tabindex="-1" autocomplete="off">`, and a submit `.btn.primary` with `contactCopy.formLabels.submit`.
  - A status `<p role="status" aria-live="polite">` below the form.
  - Right: email link (`ctas.emailUs` → `mailto:founder.email`), LinkedIn, GitHub, `studio.city`, and if `hasBooking()` a `.btn.ghost` `ctas.bookCall` → `contactConfig.calLink` (`target="_blank" rel="noopener"`).
- [ ] **Behaviour:**
  - If `hasForm()`: the form posts to `https://api.web3forms.com/submit` with a hidden `access_key`. `contact-form.ts` intercepts submit, validates (required name, email pattern, message ≥ 10 chars), sets `aria-invalid` and per-field `.error` text, posts with `fetch` as JSON, shows `contactCopy.success` / `contactCopy.error`, and disables the button while sending.
  - If not `hasForm()`: the form `action` is `mailto:{email}` with `method="post" enctype="text/plain"`, and a `.help` line under the button from a new `contactCopy.fallbackNote = 'This opens your email app with your brief filled in.'`.
  - No JS: the form still submits natively in both modes.
- [ ] Validation error strings come from data: add `contactCopy.errors = { name: 'Please add your name.', email: 'Enter an email like name@example.com', message: 'A sentence or two about the project helps.' }` (replacing `emailError`; update the style guide reference).
- [ ] `npm test`, `npm run build`. In the browser, submit the empty form and check that errors show and focus moves to the first invalid field. Commit `feat: contact section with brief form and email fallback`.

---

### Task 7: Case study pages

**Files:** Create `src/pages/work/[slug].astro`, `scripts/capture-work.mjs`, `public/work/*.webp` (generated). Create `tests/workPages.test.ts`.

- [ ] **Test first** `tests/workPages.test.ts`: import `featuredWork, publicView` and assert:
  - every featured slug is unique;
  - after `publicView`, no unapproved item has `liveUrl`;
  - the page file `src/pages/work/[slug].astro` exists and contains `getStaticPaths` and `publicView`.
- [ ] **Screenshot script** `scripts/capture-work.mjs`:
  - Uses `playwright-core` with the installed Chrome (`chromium.launch({ channel: 'chrome' })`) to capture 1440×900 screenshots of every featured item that has a `liveUrl` after `publicView` and is not a concept.
  - Waits for network idle, then writes `public/work/{slug}.webp` via a PNG → WebP conversion (sharp is not installed: use ffmpeg `-c:v libwebp -quality 78`, as `scripts/extract-frames.sh` does).
  - Skips any URL that fails, with a clear console message.
  - Run it. If Keton (ketonconsulting.com) times out, leave it without a cover; the card placeholder handles it.
- [ ] **Page.**
  - `getStaticPaths` over `featuredWork.map(publicView)`.
  - Layout: back link to `${base}#work`; label (+ "Built for" composition); title in h1; summary as `.lead`; cover image if present; sections Brief, Approach, Result (headings from a new `sections.case = { brief: 'The brief', approach: 'What I built', result: 'Result', stack: 'Stack', ai: 'Where AI saved time' }` in `studio.ts`); `aiNote` only if present; stack tags; "Visit live site" / "View code" buttons when the URLs exist; "Next project" link cycling through featured items.
  - `<Base title={...} description={item.summary}>`.
- [ ] `npm test`, `npm run build` (4 pages under `dist/work/`), visual check of one page. Commit `feat: case study pages and live-site screenshots`.

---

### Task 8: About page and 404

**Files:** Create `src/pages/about.astro`, `src/pages/404.astro`. Rewrite `src/components/Timeline.astro` (reads `experience`/`education`). Modify `src/data/experience.ts`. Extend `tests/studio.test.ts` (or a new `tests/experience.test.ts`) to run `findContentIssues` over `experience`, `education`, `capabilities`.

- [ ] **`experience.ts`:** first entry becomes `{ org: 'Ndiga Dee Creative Co.', role: 'Freelance Full-Stack & AI Developer', period: 'Apr 2026 - Present', note: 'Websites, web apps and brands for small businesses, built faster with AI.' }`. Replace any en dashes in periods with hyphens (`'2025 - 2027'`). Capabilities groups stay, regrouped to match the services: Web & apps, Brand & creative, Growth, AI & automation, Infrastructure & security.
- [ ] **`about.astro`:**
  - Founder photo + h1 `founder.name` + `founder.role` + bio.
  - The `Timeline` component (keeps `data-section="timeline"` and `ol[data-timeline]`) with heading `sections.experience = 'Experience'`.
  - Education list (`sections.education = 'Education'`).
  - Capabilities as grouped `.tags` (`sections.capabilities = 'What I work with'`).
  - Closing CTA `ctas.startProject` → `${base}#contact`.
- [ ] **`404.astro`:** Monogram, `notFound = { heading: 'This page drifted off.', text: 'The link may be old. Everything I make starts from the home page.', cta: 'Back to home' }` from `studio.ts`, and a `.btn.primary` to `${base}`. `noindex`.
- [ ] `npm test`, `npm run build`, visual check. Commit `feat: about and 404 pages`.

---

### Task 9: Remove legacy code and harden the guards

**Files:**
- Delete: `src/data/profile.ts`, `src/data/site.ts`, `src/data/projects.ts`, `src/components/Proof.astro`, `src/components/About.astro`, and any now-unused motion script (`counters.ts` if nothing uses `data-count`; remove it from `motion/index.ts`).
- Modify: `src/lib/content.ts`, `src/lib/guards.ts`, `src/styles/global.css`, `.github/workflows/deploy.yml`, `public/site.webmanifest`, `scripts/og-image.mjs`, `package.json`.
- Create: `tests/allData.test.ts`, `scripts/check-dist.mjs`.

- [ ] **Test first** `tests/allData.test.ts`. Dynamically import every file in `src/data/` (`readdirSync`) and run `findContentIssues` over all their exports, asserting `[]`. Add to `tests/guards.test.ts`:
  - `lorem`, `XX%` and `{{x}}` are flagged as placeholders;
  - `#long-live-ai` and `#longliveAIs` are flagged as tag misspellings;
  - `Order 123456789012` is not flagged as a phone (add a leading `\b` and require 9-12 digits with separators or a `+`).

  Make them pass by updating `guards.ts`: PLACEHOLDER adds `lorem`, `\bX{2,}\b`, `\{\{`; TAG_LIKE becomes `/#?long[\s_-]*live[\s_-]*a\.?i\w*/gi` and any match other than exactly `#longliveAI` is an issue.
- [ ] `src/lib/content.ts`: `isReady` reuses `findContentIssues` (`isReady = (t) => !!t && findContentIssues(t).length === 0`).
- [ ] Remove the legacy token aliases from `global.css` (`--accent-2`, `--glow-1/2/3`, `--gradient`, `--glass`, `--edge`, `--radius-control`) after `grep -rn` shows no remaining use; fix any remaining use first. Remove the `.grad-text` rule.
- [ ] `public/site.webmanifest`: name/short_name from the studio, `theme_color` and `background_color` `#0a0b0d`. `scripts/og-image.mjs`: re-render `public/og.png` with the studio name, `studio.headline` and `#longliveAI` on `--bg`, using Archivo for the headline (run it).
- [ ] `scripts/check-dist.mjs`: after the build, fail (exit 1) if any file in `dist/` contains `/bazaar/i` while the concept is unapproved (import `featuredWork` to check `clientApproved`). Add `"check:dist": "node scripts/check-dist.mjs"` and `"verify": "npm test && npm run build && npm run check:dist"` to `package.json`.
- [ ] `.github/workflows/deploy.yml`: run `npm test` before the build and `npm run check:dist` after it.
- [ ] `npm run verify` → all green. Commit `chore: remove legacy portfolio code and harden copy guards`.

---

### Task 10: Verification and hand-off

- [ ] `npm run verify` green.
- [ ] Browser walk-through at 1440px and 375px:
  - home (every section, hero beats and the ending), one case page, about, 404, styleguide;
  - check keyboard tab order, visible focus and the form errors;
  - under reduced motion, the hero beats are all visible.
- [ ] Run `node ~/.agents/skills/impeccable/scripts/detect.mjs --json src/components src/pages src/styles` → no findings (or each one justified in the hand-off).
- [ ] Hand back to Derrick: screenshots of the hero beats and each page, the list of slots still waiting (Web3Forms key, Cal.com link, real metrics, aiNotes, durations), and the merge recommendation for PR #1.
