# Phase 2: Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the old cobalt/violet "glowing grid" look with the chrome-futurist system (near-black, silver, one pale-cyan accent, condensed display type, grain), add the hero beat copy, and rebuild `/styleguide` so Derrick can review the whole system on one page.

**Architecture:**
- Tokens stay as CSS custom properties in `src/styles/global.css`. The old token names that components still use are kept as **legacy aliases** pointing at the new palette, so the current pages keep working in the new look until Phase 3 rewires them. A test parses the CSS and checks contrast and the single-accent rule.
- Display type is Archivo Variable on its width axis (condensed), self-hosted via fontsource like Geist.
- Copy additions go in `src/data/studio.ts` and are guarded by the existing copy tests, now extended to ban em and en dashes.

**Tech Stack:** Astro 7, plain CSS tokens, `@fontsource-variable/archivo` (wdth axis), Node 24 `node:test`.

**Spec:** `docs/superpowers/specs/2026-10-04-ndiga-dee-creative-co-design.md`. **Design lead:** `design-taste-frontend`. Design read: portfolio for a founder-led creative studio, chrome-futurist editorial language, native CSS tokens + condensed sans display + Geist Mono. Dials: DESIGN_VARIANCE 8, MOTION_INTENSITY 7, VISUAL_DENSITY 3.

## Global Constraints
- ONE accent: pale cyan `#7de3f0`. No cobalt, violet or any second hue anywhere. Neutrals are cool greys only.
- Dark-only site (brand decision in spec §4). No pure `#000000` or `#ffffff`.
- Text contrast: body text ≥ 4.5:1 against every background it sits on; `--fg` on `--bg` ≥ 7:1.
- Shape rule: buttons and tags are full pill (`--radius-pill`); cards, inputs and media are `--radius-card` (12px). Nothing else.
- Zero em dashes (`—`) and zero en dashes (`–`) in any user-facing copy. Hyphen only.
- Max one middle dot (`·`) per line of visible copy.
- All copy in `src/data/*.ts`; never `[brackets]`, `TODO`, `TBD`, phone numbers; tag spelled exactly `#longliveAI`.
- Grain lives only on a fixed, `pointer-events: none` pseudo-element.
- Keep `#hero-canvas` and every motion `data-*` hook untouched.
- Conventional commit messages.

---

### Task 0: Branch

- [ ] **Step 1:** `git checkout -b rebrand/phase-2-design-system` (from `main`).
- [ ] **Step 2:** `npm test` → all pass; `npm run build` → `Complete!`.

---

### Task 1: Palette tokens with a contrast test

**Files:**
- Create: `tests/tokens.test.ts`
- Modify: `src/styles/global.css` (the header comment, the `:root, [data-theme]` colour block, and the `body::before` / `body::after` rules, currently lines 1-97)

**Interfaces:**
- Produces CSS tokens later tasks use: `--bg`, `--bg-raised`, `--surface`, `--fg`, `--muted`, `--line`, `--line-strong`, `--accent`, `--accent-fg`, `--accent-rgb`, `--chrome`, `--chrome-text`, `--grain-opacity`, `--z-nav`, `--z-overlay`, `--z-grain`.
- Legacy aliases kept (resolve to the new palette): `--accent-2`, `--glow-1`, `--glow-2`, `--glow-3`, `--gradient`, `--glass`, `--edge`.

- [ ] **Step 1: Write the failing test** `tests/tokens.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync('src/styles/global.css', 'utf8');
const rootBlock = css.slice(css.indexOf(':root,'), css.indexOf('}', css.indexOf(':root,')));
const hex = (name: string): string => {
  const m = rootBlock.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})\\b`));
  assert.ok(m, `--${name} must be a 6-digit hex in the :root colour block`);
  return m![1].toLowerCase();
};
const lum = (h: string) => {
  const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(hex(a)), lum(hex(b))].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

test('accent is pale cyan', () => {
  assert.equal(hex('accent'), '#7de3f0');
});

test('text pairs pass WCAG', () => {
  assert.ok(ratio('fg', 'bg') >= 7, 'fg on bg');
  for (const back of ['bg', 'bg-raised', 'surface']) {
    assert.ok(ratio('muted', back) >= 4.5, `muted on ${back}`);
    assert.ok(ratio('accent', back) >= 4.5, `accent on ${back}`);
  }
  assert.ok(ratio('accent-fg', 'accent') >= 4.5, 'accent-fg on accent');
  assert.ok(ratio('line-strong', 'surface') >= 3, 'input borders need 3:1');
});

test('one accent only: no cobalt or violet left anywhere', () => {
  for (const banned of ['#7b8cff', '#22d3ee', '#a78bfa', '167 139 250', '123 140 255']) {
    assert.ok(!css.toLowerCase().includes(banned), `${banned} must be gone`);
  }
});

test('no pure black or white', () => {
  assert.doesNotMatch(css.toLowerCase(), /#000000\b|#ffffff\b|#000\b|#fff\b/);
});

test('grain sits on a fixed, non-interactive layer', () => {
  const after = css.slice(css.indexOf('body::after'), css.indexOf('}', css.indexOf('body::after')));
  assert.match(css, /body::before,\s*body::after\s*\{[^}]*position:\s*fixed[^}]*pointer-events:\s*none/);
  assert.match(after, /--grain-opacity|opacity/);
});
```

- [ ] **Step 2: Run it to confirm it fails.** Run: `npm test`. Expected: FAIL on accent, line-strong and the banned colours.

- [ ] **Step 3: Replace lines 1-97 of `src/styles/global.css`** (from the opening comment through the closing `}` of `body::after`) with:

```css
/*
  Design system: chrome futurist. Near-black cool ground, silver/chrome highlights, ONE pale-cyan accent
  (it matches the glow in the hero film), fine grain. Display type: Archivo condensed; body: Geist;
  labels: Geist Mono. Preview everything at /styleguide. Contrast is checked by tests/tokens.test.ts.

  The site is dark-only. [data-theme] attributes still resolve to these tokens.
  Shape rule: buttons and tags are full pill; cards, inputs and media use --radius-card. Nothing else.
  Legacy aliases at the bottom of the colour block keep Phase 1 components working; Phase 3 removes them.
*/

:root,
[data-theme] {
  --bg: #0a0b0d;
  --bg-raised: #111317;
  --surface: #16191e;
  --fg: #eef1f4;
  --muted: #9aa3ad;
  --line: #2a2f36; /* decorative hairlines only */
  --line-strong: #5b636d; /* input and control borders */
  --accent: #7de3f0;
  --accent-fg: #06171a;
  --accent-rgb: 125 227 240; /* for rgb(var(--accent-rgb) / a) */
  --silver-rgb: 200 207 214;
  --chrome: linear-gradient(180deg, #f4f6f8 0%, #c9d0d7 38%, #6f7780 52%, #dfe4e9 100%);
  --chrome-text: linear-gradient(180deg, #f4f6f8 10%, #b9c1c9 60%, #e6eaee 100%);
  --grain-opacity: 0.07;

  /* Legacy aliases (Phase 1 components). Single accent: everything resolves to cyan or silver. */
  --accent-2: var(--accent);
  --glow-1: var(--accent-rgb);
  --glow-2: var(--accent-rgb);
  --glow-3: var(--silver-rgb);
  --gradient: var(--chrome-text);
  --glass: linear-gradient(180deg, rgb(var(--silver-rgb) / 0.06), rgb(var(--silver-rgb) / 0.015));
  --edge: linear-gradient(180deg, rgb(var(--silver-rgb) / 0.4), rgb(var(--silver-rgb) / 0.08) 40%, rgb(var(--silver-rgb) / 0.03));
  color-scheme: dark;
}

:root {
  /* Type */
  --font-display: 'Archivo Variable', 'Geist Variable', ui-sans-serif, system-ui, sans-serif;
  --font-sans: 'Geist Variable', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-mono: 'Geist Mono Variable', ui-monospace, 'SFMono-Regular', Consolas, monospace;
  --display-width: 72; /* Archivo wdth axis: 62 (narrowest) to 125 */
  --step--1: 0.875rem; /* labels, tags, captions */
  --step-0: 1.0625rem; /* body */
  --step-1: 1.25rem; /* lead paragraph */
  --step-2: clamp(1.375rem, 1.2rem + 0.6vw, 1.625rem); /* h3, card titles */
  --step-3: clamp(2rem, 1.4rem + 2.4vw, 3.5rem); /* h2, section titles (display) */
  --step-4: clamp(2.75rem, 1.6rem + 5vw, 5.75rem); /* h1, hero headline (display) */
  --step-5: clamp(3.25rem, 1.8rem + 6.5vw, 7.5rem); /* hero beat words (display, 3-5 words only) */
  --measure: 65ch;

  /* Space */
  --space-2xs: 0.25rem;
  --space-xs: 0.5rem;
  --space-s: 0.75rem;
  --space-m: 1rem;
  --space-l: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4.5rem;
  --space: clamp(5rem, 12vw, 10rem); /* section padding (density 3: airy) */

  /* Shape */
  --radius-card: 0.75rem;
  --radius-control: var(--radius-card); /* legacy alias: inputs */
  --radius-pill: 999px;

  /* Motion */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-fast: 150ms;
  --dur: 300ms;
  --dur-slow: 600ms;

  /* Layers */
  --z-nav: 50;
  --z-grain: 60;
  --z-overlay: 70;
}

/* ─── Base ─────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
  font: 400 var(--step-0) / 1.6 var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
[data-theme] { background: var(--bg); color: var(--fg); }

/* Depth: a soft silver falloff and a faint cyan breath (behind content), plus fixed film grain on top.
   Both layers are fixed and pointer-events: none, so they never repaint with scroll. */
body::before,
body::after { content: ''; position: fixed; inset: 0; pointer-events: none; }
body::before {
  z-index: -1;
  background:
    radial-gradient(60rem 40rem at 85% -10%, rgb(var(--silver-rgb) / 0.08), transparent 70%),
    radial-gradient(40rem 30rem at 10% 110%, rgb(var(--accent-rgb) / 0.05), transparent 70%);
}
body::after {
  z-index: var(--z-grain);
  opacity: var(--grain-opacity);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

- [ ] **Step 4: Remove the remaining hard-coded old colours.** Run `grep -rn -i "#c7d0ff\|#7b8cff\|#22d3ee\|#a78bfa\|#000\|#fff" src`. In `src/styles/global.css` change `.grad-text` to `background: var(--chrome-text);` (keep the clip lines). Fix any other hit by swapping in `var(--accent)` or `var(--chrome-text)`.
- [ ] **Step 5:** `npm test` → PASS. `npm run build` → `Complete!`.
- [ ] **Step 6: Commit** `git add src/styles/global.css tests/tokens.test.ts src && git commit -m "feat: chrome-futurist palette with one pale-cyan accent"`

---

### Task 2: Condensed display type

**Files:**
- Modify: `package.json` / `package-lock.json` (new dependency)
- Modify: `src/layouts/Base.astro` (font imports + preload)
- Modify: `src/styles/global.css` (heading rules, currently `h1`/`h2` at about lines 108-110 before Task 1; find them by selector)
- Create: `tests/type.test.ts`

**Interfaces:**
- Consumes: `--font-display`, `--display-width`, `--step-3/4/5` from Task 1.
- Produces: class `.display` (condensed display face at any size) and `.beat` (hero beat word size), used by the style guide and Phase 3.

- [ ] **Step 1: Write the failing test** `tests/type.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('Archivo width axis is installed, imported and preloaded', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  assert.ok(pkg.dependencies['@fontsource-variable/archivo']);
  const base = readFileSync('src/layouts/Base.astro', 'utf8');
  assert.match(base, /@fontsource-variable\/archivo\/wdth\.css/);
  assert.match(base, /archivo-latin-wdth-normal\.woff2\?url/);
});

test('headings and display classes use the condensed display face', () => {
  const css = readFileSync('src/styles/global.css', 'utf8');
  assert.match(css, /h1,\s*h2\s*,?\s*\.display\s*\{[^}]*font-family:\s*var\(--font-display\)[^}]*font-variation-settings:\s*'wdth'\s*var\(--display-width\)/);
  assert.match(css, /\.beat\s*\{[^}]*font-size:\s*var\(--step-5\)/);
  assert.doesNotMatch(css, /text-shadow:\s*0 0 42px/); // old neon glow on h2 is gone
});
```

- [ ] **Step 2:** `npm test` → FAIL (package missing).
- [ ] **Step 3: Install.** `npm install @fontsource-variable/archivo@^5.3.0`
- [ ] **Step 4: Import and preload in `src/layouts/Base.astro`.** After the two Geist imports add:

```astro
import '@fontsource-variable/archivo/wdth.css';
import archivoLatin from '@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2?url';
```

and next to the two existing `<link rel="preload" ...>` lines add:

```astro
<link rel="preload" href={archivoLatin} as="font" type="font/woff2" crossorigin />
```

Check the family name the CSS file declares: `grep -o "font-family: '[^']*'" node_modules/@fontsource-variable/archivo/wdth.css | head -1`. If it is not `'Archivo Variable'`, update `--font-display` in `global.css` to match.

- [ ] **Step 5: Replace the heading rules** in `global.css`. Replace the existing `h1 { ... }` and `h2 { ... }` lines with:

```css
h1, h2, .display {
  font-family: var(--font-display);
  font-variation-settings: 'wdth' var(--display-width);
  font-weight: 700;
  letter-spacing: -0.01em;
}
h1 { font-size: var(--step-4); line-height: 0.95; }
h2 { font-size: var(--step-3); line-height: 1; }
.beat { font-size: var(--step-5); line-height: 0.92; }
```

Keep the shared `h1, h2, h3, h4 { margin ... }` rule and the `h3`/`h4` rules as they are.

- [ ] **Step 6:** `npm test` → PASS. `npm run build` → `Complete!`.
- [ ] **Step 7: Commit** `git add package.json package-lock.json src/layouts/Base.astro src/styles/global.css tests/type.test.ts && git commit -m "feat: Archivo condensed display type"`

---

### Task 3: Hero beat copy and dash-free copy rules

**Files:**
- Modify: `src/lib/guards.ts`, `tests/guards.test.ts`
- Modify: `src/data/studio.ts`, `tests/studio.test.ts`
- Modify: `docs/superpowers/specs/2026-10-04-ndiga-dee-creative-co-design.md` (hero label row)

**Interfaces:**
- Consumes: `findContentIssues` from `src/lib/guards.ts`.
- Produces: `export const heroBeats: { at: number; heading: string; text?: string; cta?: 'startProject' | 'seeWork' }[]` in `src/data/studio.ts`. `at` is the scroll progress (0-1) where the beat becomes active. `cta` values are keys of `ctas`.

- [ ] **Step 1: Write failing tests.** Append to `tests/guards.test.ts`:

```ts
test('flags em and en dashes', () => {
  assert.equal(findContentIssues({ a: 'fast — and good' }).length, 1);
  assert.equal(findContentIssues({ a: '1–3 months' }).length, 1);
  assert.deepEqual(findContentIssues({ a: '1-3 months' }), []);
});

test('flags more than one middle dot in a string', () => {
  assert.equal(findContentIssues({ a: 'A · B · C' }).length, 1);
  assert.deepEqual(findContentIssues({ a: 'Founder · Full-Stack & AI Engineer' }), []);
});
```

Append to `tests/studio.test.ts`:

```ts
import { heroBeats } from '../src/data/studio.ts';

test('hero has four beats in scroll order, ending on the studio name', () => {
  assert.equal(heroBeats.length, 4);
  assert.deepEqual(heroBeats.map((b) => b.at), [0, 0.3, 0.6, 0.85]);
  assert.equal(heroBeats[0].heading, studio.headline);
  assert.equal(heroBeats[3].heading, studio.name);
  assert.deepEqual(findContentIssues(heroBeats), []);
});

test('beat headings stay short enough for the beat size', () => {
  for (const b of heroBeats.slice(1)) assert.ok(b.heading.split(' ').length <= 5, b.heading);
});
```

- [ ] **Step 2:** `npm test` → FAIL (`heroBeats` missing; dash and dot rules missing).
- [ ] **Step 3: Extend `src/lib/guards.ts`.** Inside `issuesFor`, after the tag check, add:

```ts
  if (/[–—]/.test(withoutUrls)) issues.push(`${path}: em or en dash (use a hyphen)`);
  if ((withoutUrls.match(/·/g) ?? []).length > 1) issues.push(`${path}: more than one middle dot`);
```

- [ ] **Step 4: Fix existing copy in `src/data/studio.ts`:**
  - `heroLabels: ['AI-native studio', '#longliveAI'],` (Nairobi moves to the footer and contact copy; the taste rules ban locale strips in the hero and allow one middle dot per line).
  - `budgets: ['Under KES 100k', 'KES 100k-300k', 'KES 300k-750k', 'KES 750k+', 'Not sure yet'],`
  - `timelines: ['As soon as possible', 'Within 1 month', '1-3 months', 'Just exploring'],`
  - The existing tests assert `studio.heroLabels.includes(LONG_LIVE_TAG)`; that still holds.
- [ ] **Step 5: Add `heroBeats` to `src/data/studio.ts`** (after `studio`):

```ts
// Hero copy that changes with the film as you scroll (spec §5). `at` = scroll progress where the beat starts.
export const heroBeats: { at: number; heading: string; text?: string; cta?: 'startProject' | 'seeWork' }[] = [
  { at: 0, heading: studio.headline, text: studio.subline, cta: 'startProject' },
  { at: 0.3, heading: 'Taste is human.', text: 'Every design and decision is made by people who care how it lands.' },
  { at: 0.6, heading: 'Speed is the machine’s.', text: 'AI drafts, explores and checks, so you see real options sooner and launch sooner.' },
  { at: 0.85, heading: studio.name, text: studio.tag, cta: 'startProject' },
];
```

- [ ] **Step 6: Update the spec.** In §5 item 1, change the label row to `AI-native studio · #longliveAI` and note "Nairobi appears in the footer and contact section, not the hero."
- [ ] **Step 7:** `npm test` → PASS (all suites). If another data module (old `profile.ts`, `site.ts`, `experience.ts`) now fails the dash rule, do not edit it: those are not scanned by tests and are deleted in Phase 3.
- [ ] **Step 8: Commit** `git add src/lib/guards.ts src/data/studio.ts tests docs/superpowers/specs && git commit -m "feat: hero beat copy and dash-free copy guard"`

---

### Task 4: Rebuild the style guide

**Files:**
- Modify (full rewrite): `src/pages/styleguide.astro`
- Modify: `src/styles/global.css` (component rules for `.btn`, `.btn.primary`, `.btn.ghost`, `.tag`, `.field`, `.card`; replace the existing button/tag/card rules)

**Interfaces:**
- Consumes: tokens (Task 1), `.display`/`.beat` (Task 2), `studio`, `heroBeats`, `ctas`, `contactCopy`, `aiBenefits` from `src/data/studio.ts`, `services` from `src/data/services.ts`, `featuredWork`, `publicView`, `labelText` from `src/data/work.ts`, and the `Monogram` component.
- Produces: component classes Phase 3 reuses: `.btn.primary` (cyan pill, dark text), `.btn.ghost` (transparent pill, `--line-strong` border, light text), `.tag`, `.field` (label above, input, helper, error), `.card`, `.chrome-text`.

- [ ] **Step 1: Component CSS.** In `global.css` replace the existing `.btn*`, `.tags`/`.tag*` and `.card*` rules with:

```css
/* ─── Buttons (pill) ───────────────────────────────────────── */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--space-xs);
  min-height: 2.875rem; padding: 0 1.375rem; white-space: nowrap;
  border-radius: var(--radius-pill); border: 1px solid var(--line-strong);
  background: transparent; color: var(--fg);
  font: 500 0.9375rem / 1.2 var(--font-sans); text-decoration: none; cursor: pointer;
  transition: transform var(--dur-fast) var(--ease-out), background-color var(--dur) var(--ease-out), border-color var(--dur) var(--ease-out);
}
.btn:hover { border-color: var(--fg); }
.btn:active { transform: translateY(1px) scale(0.98); }
.btn.primary { background: var(--accent); border-color: var(--accent); color: var(--accent-fg); }
.btn.primary:hover { background: color-mix(in srgb, var(--accent) 86%, var(--fg)); }
.btn:disabled, .btn[aria-disabled='true'] { opacity: 0.45; cursor: not-allowed; transform: none; }

/* ─── Tags (pill) ──────────────────────────────────────────── */
.tags { display: flex; flex-wrap: wrap; gap: var(--space-xs); padding: 0; margin: 0; list-style: none; }
.tags li, .tag {
  display: inline-flex; align-items: center; min-height: 1.75rem; padding: 0 0.75rem;
  border-radius: var(--radius-pill); border: 1px solid var(--line); color: var(--muted);
  font: 450 0.8125rem / 1.4 var(--font-mono);
}
.tag.accent { color: var(--accent); border-color: rgb(var(--accent-rgb) / 0.4); }

/* ─── Cards ────────────────────────────────────────────────── */
.card {
  position: relative; padding: var(--space-xl); border-radius: var(--radius-card);
  background: var(--glass), var(--bg-raised); border: 1px solid var(--line);
}

/* ─── Form fields: label above, helper, error below ───────── */
.field { display: grid; gap: var(--space-xs); max-width: 32rem; }
.field label { font-weight: 500; }
.field input, .field select, .field textarea {
  min-height: 2.875rem; padding: 0.625rem 0.875rem; border-radius: var(--radius-card);
  border: 1px solid var(--line-strong); background: var(--surface); color: var(--fg); font: inherit;
}
.field textarea { min-height: 8rem; resize: vertical; }
.field :is(input, select, textarea):focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-color: var(--accent); }
.field .help { font-size: var(--step--1); color: var(--muted); margin: 0; }
.field .error { font-size: var(--step--1); color: var(--fg); margin: 0; }
.field [aria-invalid='true'] { border-color: var(--fg); border-width: 2px; }

/* ─── Chrome text (wordmark and the final hero beat only) ─── */
.chrome-text { background: var(--chrome-text); -webkit-background-clip: text; background-clip: text; color: transparent; }
```

Keep every other rule (`.card dt`, `.media-scrim`, motion hooks) unless it references a removed class. Also set `:focus-visible { outline: 2px solid var(--accent); ... }` (it already uses `--accent-2`, which now aliases to cyan; switch it to `--accent`).

- [ ] **Step 2: Rewrite `src/pages/styleguide.astro`** (keep `<Base title=... noindex>`). Sections, top to bottom, each a `<section class="wrap">` with an `h2`:
  1. **Colour.** One swatch per token (`--bg`, `--bg-raised`, `--surface`, `--fg`, `--muted`, `--line`, `--line-strong`, `--accent`, `--accent-fg`) showing name, hex and use. A large `--chrome` bar.
  2. **Type.** `.beat` sample using `heroBeats[1].heading`; `h1` using `studio.headline`; `h2` using `services[0].title`; `h3`; `.lead` using `studio.subline`; body using `founder.bio`; `.label` (Geist Mono) using `studio.heroLabels.join(' · ')`.
  3. **Hero beats.** All four `heroBeats` stacked as they will appear with reduced motion: heading in `.display`, text below, CTA button from `ctas[cta]` when present. The last beat's heading uses `.chrome-text`.
  4. **Buttons.** `.btn.primary` with `ctas.startProject`, `.btn.ghost` with `ctas.seeWork`, plus a disabled example.
  5. **Tags.** The first service's deliverables as `.tags`, one `.tag.accent` with `studio.tag`.
  6. **Card.** One card per `aiBenefits` item (title + text), max two, plus one work card from `publicView(featuredWork[0])` showing `labelText(item.label)`, title and summary.
  7. **Form.** Three `.field`s from `contactCopy.formLabels`: name (with `.help` text "So we know who to reply to."), email with `aria-invalid="true"` and `.error` text "Enter an email like name@example.com", service `<select>` from `services`; plus a disabled submit `.btn.primary` with `contactCopy.formLabels.submit`.
  8. **Brand.** `Monogram` component at two sizes on `--bg` and on `--surface`, next to the wordmark `studio.name` in `.display .chrome-text`.

  All visible text must come from the data modules or be one of the two short helper strings named above (add both to `contactCopy` as `nameHelp` and `emailError` rather than hard-coding them, and extend the guard test call in `tests/studio.test.ts` accordingly).

- [ ] **Step 3:** `npm test` → PASS. `npm run build` → `Complete!`.
- [ ] **Step 4: Visual check.** Start the dev server (`.claude/launch.json` config `portfolio`, served at `http://localhost:4321/portfolio/styleguide`). Screenshot at desktop width and at 375px. Fix anything that overflows, wraps a button label, or puts body text under 4.5:1.
- [ ] **Step 5: Commit** `git add src/pages/styleguide.astro src/styles/global.css src/data/studio.ts tests && git commit -m "feat: rebuild style guide for the chrome-futurist system"`

---

### Task 5: Design review and hand-off

- [ ] **Step 1:** Run the `impeccable` critique (controller) on `/styleguide` and the home page, checking against the taste pre-flight items that apply to a design system: one accent, shape lock, contrast, zero em/en dashes, no neon glows, grain on a fixed layer, condensed display only on h1/h2/beats/wordmark.
- [ ] **Step 2:** Dispatch one fix pass for any Critical/Important finding; re-run `npm test` and `npm run build`.
- [ ] **Step 3:** Hand back to Derrick with desktop and mobile screenshots of `/styleguide` and a one-line list of what to approve: accent hex, display face, button style, grain strength.
