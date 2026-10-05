# Phase 1: Content & Brand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Write all the Ndiga Dee Creative Co. copy and project data as typed, tested data modules, and rewrite the project docs and Flow prompts. Derrick can then start generating hero clips while Phases 2–3 proceed.

**Architecture:**
- New content lives in **new** data modules (`studio.ts`, `services.ts`, `process.ts`, `work.ts`) next to the old ones. The current components keep building unchanged until Phase 3 rewires them and deletes the old modules.
- A small pure guard module (`src/lib/guards.ts`) enforces the copy rules: no placeholders, no phone numbers, exact `#longliveAI` spelling.
- Tests run on Node 24's built-in test runner with native TypeScript stripping, so no new dependencies.

**Tech Stack:** Astro 7, TypeScript data modules, `node:test` + `node:assert/strict` (Node ≥ 24, already installed: v24.11.1).

**Spec:** `docs/superpowers/specs/2026-10-04-ndiga-dee-creative-co-design.md`

## Global Constraints
- Studio name is exactly `Ndiga Dee Creative Co.`; tag is exactly `#longliveAI`.
- Founder line: `Derrick Ndiga, Founder · Full-Stack & AI Engineer`.
- AI is the studio's method, not a sold service. Exactly three services: Websites & Web Apps, Brand & Creative, Growth (SEO & Analytics).
- Speed claims are qualitative or backed by Derrick's real data. **Never invent a percentage, multiplier or metric.**
- No `[brackets]`, `TODO` or `TBD` in shipped copy. **No phone number anywhere.**
- All copy lives in `src/data/*.ts`; components never hard-code copy.
- Logo: the existing DN monogram in `brand/`. No new mark.
- Bazaar Cleaning is an unapproved proposal. It must render as an anonymous "Concept" with no client name and no live link until `clientApproved: true`.
- Data modules must not import Astro or `import.meta.env`, so `node --test` can load them directly. Type-only syntax only (no `enum`, no `namespace`).
- Commit messages use conventional format (`feat:`, `docs:`, `test:`, `chore:`).

---

### Task 0: Protect the uncommitted work and branch off

There are 11 files of uncommitted changes (Header, Hero, Pipeline, global.css, etc.) from an earlier session. They must not be lost or mixed into Phase 1 commits.

**Files:** none created

- [ ] **Step 1: Ask Derrick** whether the uncommitted changes should be kept. Show `git diff --stat` and wait for an answer. Do not proceed without one.
- [ ] **Step 2 (if keep):** commit them as-is on `main`:

```bash
git add -A
git commit -m "chore: snapshot pre-rebrand work in progress"
```

  **(If discard):** `git stash push -u -m "pre-rebrand WIP"`. This keeps the work recoverable instead of deleting it.
- [ ] **Step 3: Create the phase branch**

```bash
git checkout -b rebrand/phase-1-content
```

- [ ] **Step 4: Confirm the build still works before changing anything**

Run: `npm run build`
Expected: exits 0 and prints `Complete!`.

---

### Task 1: Copy guard helpers and test runner

**Files:**
- Create: `src/lib/guards.ts`
- Create: `tests/guards.test.ts`
- Modify: `package.json` (`scripts`)

**Interfaces:**
- Produces:
  - `collectStrings(value: unknown, path?: string): Array<{ path: string; text: string }>`
  - `findContentIssues(value: unknown): string[]` returns human-readable issue lines like `"$.services[0].summary: placeholder"`; an empty array means clean.
  - `LONG_LIVE_TAG = '#longliveAI'`.

- [ ] **Step 1: Add the test script** to `package.json` `scripts`:

```json
"test": "node --test \"tests/**/*.test.ts\""
```

- [ ] **Step 2: Write the failing test** `tests/guards.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { collectStrings, findContentIssues, LONG_LIVE_TAG } from '../src/lib/guards.ts';

test('collectStrings walks nested objects and arrays with paths', () => {
  const found = collectStrings({ a: 'x', b: [{ c: 'y' }], n: 3 });
  assert.deepEqual(found, [
    { path: '$.a', text: 'x' },
    { path: '$.b[0].c', text: 'y' },
  ]);
});

test('flags bracket placeholders, TODO and TBD', () => {
  const issues = findContentIssues({ a: '[stack]', b: 'TODO', c: 'tbd later', d: 'fine' });
  assert.equal(issues.length, 3);
  assert.ok(issues.every((line) => line.endsWith('placeholder')));
});

test('flags Kenyan and international phone numbers', () => {
  assert.equal(findContentIssues({ a: 'Call 0712 345 678' }).length, 1);
  assert.equal(findContentIssues({ a: 'Call +254 712 345 678' }).length, 1);
  assert.equal(findContentIssues({ a: 'Call +1 415 555 0100' }).length, 1);
});

test('does not flag years, ranges or URLs', () => {
  assert.deepEqual(findContentIssues({ a: '2023 - 2025', b: 'https://dre-ai.github.io/Lumora/' }), []);
});

test('flags any misspelling of the tag', () => {
  assert.equal(findContentIssues({ a: '#LongLiveAI' }).length, 1);
  assert.equal(findContentIssues({ a: '#longliveai' }).length, 1);
  assert.deepEqual(findContentIssues({ a: `Built with care. ${LONG_LIVE_TAG}` }), []);
});
```

- [ ] **Step 3: Run it to confirm it fails**

Run: `npm test`
Expected: FAIL with `Cannot find module` / `ERR_MODULE_NOT_FOUND` for `src/lib/guards.ts`.

- [ ] **Step 4: Implement** `src/lib/guards.ts`:

```ts
// Copy rules from CLAUDE.md, enforced by tests: no placeholders, no phone numbers, exact tag spelling.
// Pure module: no Astro imports, so node --test can load it.

export const LONG_LIVE_TAG = '#longliveAI';

const PLACEHOLDER = /\[|\]|\bTODO\b|\bTBD\b/i;
const PHONE = /(?:\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4}\b/;
const TAG_LIKE = /#long\s*live\s*ai\b/gi;

export type FoundString = { path: string; text: string };

export function collectStrings(value: unknown, path = '$'): FoundString[] {
  if (typeof value === 'string') return [{ path, text: value }];
  if (Array.isArray(value)) return value.flatMap((item, i) => collectStrings(item, `${path}[${i}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => collectStrings(item, `${path}.${key}`));
  }
  return [];
}

function issuesFor({ path, text }: FoundString): string[] {
  const withoutUrls = text.replace(/https?:\/\/\S+/g, '');
  const issues: string[] = [];
  if (PLACEHOLDER.test(withoutUrls)) issues.push(`${path}: placeholder`);
  if (PHONE.test(withoutUrls)) issues.push(`${path}: phone number`);
  const tags = withoutUrls.match(TAG_LIKE) ?? [];
  if (tags.some((tag) => tag !== LONG_LIVE_TAG)) issues.push(`${path}: tag must be ${LONG_LIVE_TAG}`);
  return issues;
}

export function findContentIssues(value: unknown): string[] {
  return collectStrings(value).flatMap(issuesFor);
}
```

- [ ] **Step 5: Run the tests**

Run: `npm test`
Expected: PASS, 5 tests. If the "years, ranges" test fails, tighten `PHONE` so it needs at least 9 digits. Never loosen the tests to make them pass.

- [ ] **Step 6: Commit**

```bash
git add package.json src/lib/guards.ts tests/guards.test.ts
git commit -m "test: add copy guard helpers and node test runner"
```

---

### Task 2: Studio identity, hero, manifesto and founder copy

**Files:**
- Create: `src/data/studio.ts`
- Create: `tests/studio.test.ts`

**Interfaces:**
- Consumes: `findContentIssues`, `LONG_LIVE_TAG` from `src/lib/guards.ts`
- Produces: `export const studio`, `export const aiBenefits`, `export const founder`, `export const ctas`, `export const contactCopy`. The shapes are shown in Step 3; Phase 3 components read these exact keys.

- [ ] **Step 1: Write the failing test** `tests/studio.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { studio, aiBenefits, founder, ctas, contactCopy } from '../src/data/studio.ts';
import { findContentIssues, LONG_LIVE_TAG } from '../src/lib/guards.ts';

test('studio copy passes the copy guard', () => {
  assert.deepEqual(findContentIssues({ studio, aiBenefits, founder, ctas, contactCopy }), []);
});

test('studio name and tag are exact', () => {
  assert.equal(studio.name, 'Ndiga Dee Creative Co.');
  assert.equal(studio.tag, LONG_LIVE_TAG);
  assert.ok(studio.heroLabels.includes(LONG_LIVE_TAG));
  assert.ok(studio.manifesto.endsWith(LONG_LIVE_TAG));
});

test('founder line matches the spec', () => {
  assert.equal(`${founder.name}, ${founder.role}`, 'Derrick Ndiga, Founder · Full-Stack & AI Engineer');
});

test('AI benefits are about time saved and contain no invented numbers', () => {
  assert.ok(aiBenefits.length >= 3);
  for (const b of aiBenefits) assert.doesNotMatch(`${b.title} ${b.text}`, /\d+\s?(%|x\b|×)/);
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test`
Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `src/data/studio.ts`.

- [ ] **Step 3: Implement** `src/data/studio.ts`:

```ts
// Studio-level copy for Ndiga Dee Creative Co. Phone number is intentionally omitted everywhere.
// Speed claims stay qualitative unless backed by a real before/after from Derrick.

export const studio = {
  name: 'Ndiga Dee Creative Co.',
  shortName: 'Ndiga Dee',
  descriptor: 'AI-native creative studio',
  location: 'Nairobi, Kenya',
  tag: '#longliveAI',
  headline: 'Creative work, engineered with AI.',
  subline:
    'Websites, brands and growth for ambitious businesses. Designed by people, built faster with AI.',
  heroLabels: ['Nairobi', 'AI-native studio', '#longliveAI'],
  manifesto:
    'Taste is human. Speed is the machine’s. On every project, AI drafts, explores and checks, so our hours go into the decisions that make the work good. You see real options sooner, launch sooner and skip the shortcuts. #longliveAI',
  footerNote: 'Designed and built in Nairobi with people and AI. #longliveAI',
};

// The core promise: AI shortens the time to finished work. Qualitative on purpose: no invented numbers.
export const aiBenefits = [
  {
    title: 'Real options, early',
    text: 'AI explores many directions in hours, so you react to real designs in the first week instead of waiting on one.',
  },
  {
    title: 'Working builds sooner',
    text: 'AI-assisted scaffolding and code review clear the routine work, so engineering time goes into the parts that matter.',
  },
  {
    title: 'Fewer rounds of fixes',
    text: 'Automated checks for accessibility, performance and SEO catch problems before you ever see them.',
  },
  {
    title: 'People stay in charge',
    text: 'Every design and every line of code is reviewed by a human before it reaches you.',
  },
];

export const founder = {
  name: 'Derrick Ndiga',
  role: 'Founder · Full-Stack & AI Engineer',
  bio: 'I started in hands-on IT, setting up machines, networks and company email, and that still shapes how I build: things should keep working on a Monday morning. Today I design and build websites, web apps and brands, using AI to move faster without lowering the bar. I am also studying Cyber Security & Digital Forensics.',
  email: 'ndigaderrick6@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/derrick-ndiga-76a119311/',
    github: 'https://github.com/Dre-AI',
  },
};

export const ctas = {
  startProject: 'Start a project',
  seeWork: 'See the work',
  bookCall: 'Book a free call',
  visitLive: 'Visit live site',
  viewCode: 'View code',
  nextProject: 'Next project',
  aboutFounder: 'More about Derrick',
  emailUs: 'Email the studio',
};

export const contactCopy = {
  heading: 'Have something worth building?',
  intro: 'Tell us about the project. You will hear back within two working days.',
  formLabels: {
    name: 'Your name',
    email: 'Email',
    service: 'What do you need?',
    budget: 'Budget range',
    timeline: 'When do you want to launch?',
    message: 'Tell us about the project',
    submit: 'Send the brief',
  },
  budgets: ['Under KES 100k', 'KES 100k – 300k', 'KES 300k – 750k', 'KES 750k+', 'Not sure yet'],
  timelines: ['As soon as possible', 'Within 1 month', '1–3 months', 'Just exploring'],
  success: 'Thanks, your brief is in. We will reply within two working days.',
  error: 'Something went wrong sending that. Please email ndigaderrick6@gmail.com instead.',
};
```

- [ ] **Step 4: Run the tests**

Run: `npm test`
Expected: PASS (all guard and studio tests).

- [ ] **Step 5: Commit**

```bash
git add src/data/studio.ts tests/studio.test.ts
git commit -m "feat: add Ndiga Dee Creative Co. studio copy"
```

> **Review note for Derrick:** the budget bands and the "two working days" reply promise are business decisions. Confirm or change them at the end-of-phase review.

---

### Task 3: Services and the "why AI is faster" process

**Files:**
- Create: `src/data/services.ts`
- Create: `src/data/process.ts`
- Create: `tests/offer.test.ts`

**Interfaces:**
- Consumes: `findContentIssues` from `src/lib/guards.ts`
- Produces:
  - `export type Service = { slug: string; title: string; summary: string; deliverables: string[]; aiAngle: string; icon: string }` and `export const services: Service[]`
  - `export type ProcessStep = { title: string; usual: string; withAI: string; icon: string }` and `export const processSection: { heading: string; intro: string; steps: ProcessStep[] }`
  - `icon` values are Phosphor icon names (the `@phosphor-icons/core` package already installed).

- [ ] **Step 1: Write the failing test** `tests/offer.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { services } from '../src/data/services.ts';
import { processSection } from '../src/data/process.ts';
import { findContentIssues } from '../src/lib/guards.ts';

test('exactly the three agreed services, in order', () => {
  assert.deepEqual(services.map((s) => s.title), [
    'Websites & Web Apps',
    'Brand & Creative',
    'Growth (SEO & Analytics)',
  ]);
});

test('AI is a method, not a service', () => {
  assert.ok(services.every((s) => !/^AI\b/i.test(s.title)));
  assert.ok(services.every((s) => s.aiAngle.length > 0));
});

test('process has the four agreed steps', () => {
  assert.deepEqual(processSection.steps.map((s) => s.title), ['Discover', 'Design', 'Build with AI', 'Launch & grow']);
});

test('offer copy passes the guard and has no invented numbers', () => {
  assert.deepEqual(findContentIssues({ services, processSection }), []);
  const all = JSON.stringify({ services, processSection });
  assert.doesNotMatch(all, /\d+\s?(%|x\b|×)/);
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test`
Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `src/data/services.ts`.

- [ ] **Step 3: Implement** `src/data/services.ts`:

```ts
// The three services the studio sells. AI is how we work, so it shows up as each service's aiAngle, never as its own service.
export type Service = {
  slug: string;
  title: string;
  summary: string;
  deliverables: string[];
  aiAngle: string;
  icon: string; // Phosphor icon name
};

export const services: Service[] = [
  {
    slug: 'websites',
    title: 'Websites & Web Apps',
    summary: 'Fast, findable websites and custom web apps that are built to last and easy to run.',
    deliverables: ['Marketing websites', 'Custom web apps', 'E-commerce', 'CMS & integrations', 'Hosting & domains'],
    aiAngle: 'AI-assisted scaffolding and testing get a working build in front of you sooner.',
    icon: 'browsers',
  },
  {
    slug: 'brand',
    title: 'Brand & Creative',
    summary: 'Identity, visuals and motion that make a business look as good as it is.',
    deliverables: ['Logo & identity refresh', 'Social content', 'AI-assisted visuals', 'Motion & video', 'Brand guidelines'],
    aiAngle: 'We explore many visual directions in hours, then refine the best one by hand.',
    icon: 'pen-nib',
  },
  {
    slug: 'growth',
    title: 'Growth (SEO & Analytics)',
    summary: 'Get found on search, measure what works, and turn visitors into enquiries.',
    deliverables: ['Technical SEO', 'Performance tuning', 'Analytics setup', 'Content briefs', 'Conversion fixes'],
    aiAngle: 'Automated audits and AI-drafted content briefs mean fixes ship sooner.',
    icon: 'chart-line-up',
  },
];
```

- [ ] **Step 4: Implement** `src/data/process.ts`:

```ts
// The pinned "why AI is faster" section. Each step contrasts the usual way with ours. Qualitative only: no invented numbers.
export type ProcessStep = { title: string; usual: string; withAI: string; icon: string };

export const processSection = {
  heading: 'Why we finish sooner',
  intro: 'Same craft, less waiting. Here is where AI takes time out of a project.',
  steps: [
    {
      title: 'Discover',
      usual: 'Weeks of back-and-forth before anyone sees a plan.',
      withAI: 'AI-assisted research and competitor scans give us a clear brief in the first conversations.',
      icon: 'magnifying-glass',
    },
    {
      title: 'Design',
      usual: 'One concept, then a long wait for the next round.',
      withAI: 'Several real directions early, so you choose instead of waiting.',
      icon: 'pen-nib',
    },
    {
      title: 'Build with AI',
      usual: 'Routine code written slowly by hand.',
      withAI: 'AI handles scaffolding and first drafts; we review every line and engineer the hard parts.',
      icon: 'code',
    },
    {
      title: 'Launch & grow',
      usual: 'Problems found by your customers after launch.',
      withAI: 'Automated accessibility, speed and SEO checks run before launch, and keep running after it.',
      icon: 'rocket-launch',
    },
  ] satisfies ProcessStep[],
};
```

- [ ] **Step 5: Run the tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 6: Check the icon names exist** (the components will fail at build time on a missing icon):

```bash
for i in browsers pen-nib chart-line-up magnifying-glass code rocket-launch; do test -f node_modules/@phosphor-icons/core/assets/regular/$i.svg && echo "ok $i" || echo "MISSING $i"; done
```

Expected: six `ok` lines. Swap any `MISSING` name for the closest existing icon in that folder.

- [ ] **Step 7: Commit**

```bash
git add src/data/services.ts src/data/process.ts tests/offer.test.ts
git commit -m "feat: add services and AI process copy"
```

---

### Task 4: Work lineup with concept-privacy rule

**Files:**
- Create: `src/data/work.ts`
- Create: `tests/work.test.ts`

**Interfaces:**
- Consumes: `findContentIssues` from `src/lib/guards.ts`
- Produces:
  - `export type WorkLabel = 'client' | 'studio' | 'concept'`
  - `export type WorkItem` (fields in Step 3)
  - `export const featuredWork: WorkItem[]` (order = display order)
  - `export const moreBuilds: BuildTile[]`
  - `export function publicView(item: WorkItem): PublicWorkItem` returns a **new** object; it never mutates. Phase 3 pages render `publicView(item)` only, never raw items.

- [ ] **Step 1: Write the failing test** `tests/work.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { featuredWork, moreBuilds, publicView } from '../src/data/work.ts';
import { findContentIssues } from '../src/lib/guards.ts';

test('featured lineup and order match the spec', () => {
  assert.deepEqual(featuredWork.map((w) => w.slug), ['keton-consulting', 'lumora', 'insightforge', 'cleaning-concept']);
});

test('slugs are unique and URL-safe', () => {
  const slugs = featuredWork.map((w) => w.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.ok(slugs.every((s) => /^[a-z0-9-]+$/.test(s)));
});

test('work copy passes the copy guard', () => {
  assert.deepEqual(findContentIssues({ featuredWork, moreBuilds }), []);
});

test('unapproved concept hides client name and live link', () => {
  const concept = featuredWork.find((w) => w.slug === 'cleaning-concept')!;
  assert.equal(concept.clientApproved, false);
  const shown = publicView(concept);
  assert.equal(shown.liveUrl, undefined);
  assert.equal(shown.title, concept.conceptTitle);
  assert.doesNotMatch(JSON.stringify(shown), /bazaar/i);
});

test('approved concept shows client name and link', () => {
  const concept = featuredWork.find((w) => w.slug === 'cleaning-concept')!;
  const shown = publicView({ ...concept, clientApproved: true });
  assert.equal(shown.title, concept.title);
  assert.equal(shown.liveUrl, concept.liveUrl);
});

test('publicView does not mutate its input', () => {
  const concept = featuredWork.find((w) => w.slug === 'cleaning-concept')!;
  const before = JSON.stringify(concept);
  publicView(concept);
  assert.equal(JSON.stringify(concept), before);
});

test('studio builds are labelled studio and link public code', () => {
  for (const slug of ['lumora', 'insightforge']) {
    const item = featuredWork.find((w) => w.slug === slug)!;
    assert.equal(item.label, 'studio');
    assert.match(item.repoUrl ?? '', /^https:\/\/github\.com\/Dre-AI\//);
  }
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test`
Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `src/data/work.ts`.

- [ ] **Step 3: Implement** `src/data/work.ts`:

```ts
// Featured case studies and the "more builds" grid.
// Render through publicView() only: it hides unapproved client names and links.
// Results stay qualitative until Derrick supplies a real metric. aiNote is optional and is
// added in Phase 3 only from Derrick's own account of where AI saved time.

export type WorkLabel = 'client' | 'studio' | 'concept';

export type WorkItem = {
  slug: string;
  label: WorkLabel;
  title: string;
  conceptTitle?: string; // shown instead of title while a concept is unapproved
  clientApproved?: boolean; // concepts only
  services: string[]; // Service slugs from services.ts
  summary: string;
  brief: string;
  approach: string;
  result: string;
  aiNote?: string;
  durationWeeks?: number; // real figure from Derrick only; drives the "Delivered in X weeks" badge
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  cover: string; // public/work/<slug>.webp, captured in Phase 3
};

export type PublicWorkItem = Omit<WorkItem, 'conceptTitle' | 'clientApproved'>;

export type BuildTile = { title: string; summary: string; stack: string[]; repoUrl?: string };

const LABEL_TEXT: Record<WorkLabel, string> = { client: 'Client', studio: 'Studio build', concept: 'Concept' };
export const labelText = (label: WorkLabel): string => LABEL_TEXT[label];

export function publicView(item: WorkItem): PublicWorkItem {
  const { conceptTitle, clientApproved, ...rest } = item;
  if (item.label !== 'concept' || clientApproved) return { ...rest };
  return { ...rest, title: conceptTitle ?? 'Concept project', liveUrl: undefined };
}

export const featuredWork: WorkItem[] = [
  {
    slug: 'keton-consulting',
    label: 'client',
    title: 'Keton Consulting',
    services: ['websites', 'growth'],
    summary: 'A fast, findable website for a clinical lab-equipment distributor.',
    brief: 'Keton needed laboratory buyers to find it on search and trust it enough to get in touch.',
    approach:
      'Designed and built a mobile-first React site with clear product pages, privacy and legal pages, and contact forms, then ran the SEO strategy and analytics tracking.',
    result: 'Live at ketonconsulting.com, with SEO and analytics running on every page.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'SEO', 'Analytics'],
    liveUrl: 'https://ketonconsulting.com',
    cover: 'work/keton-consulting.webp',
  },
  {
    slug: 'lumora',
    label: 'studio',
    title: 'Lumora',
    services: ['websites'],
    summary: 'A full-stack e-commerce store, from product grid to confirmed order.',
    brief: 'A showcase of what a modern Kenyan online shop can feel like, with prices in KES and a checkout that does not get in the way.',
    approach:
      'Built a React and TypeScript storefront with its own design system, a Node and Express API with SQLite, JWT accounts and a multi-step checkout (address, delivery, payment, review).',
    result: 'Live demo with accounts, cart and checkout working end to end. Payments are mocked by design.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'SQLite', 'JWT'],
    liveUrl: 'https://dre-ai.github.io/Lumora/',
    repoUrl: 'https://github.com/Dre-AI/Lumora',
    cover: 'work/lumora.webp',
  },
  {
    slug: 'insightforge',
    label: 'studio',
    title: 'InsightForge',
    services: ['websites'],
    summary: 'A privacy-first machine-learning playground: upload a CSV, get trained models.',
    brief: 'Make machine learning approachable for people with data but no data-science team, without sending that data anywhere.',
    approach:
      'Built a Streamlit app that trains a set of scikit-learn models on an uploaded CSV, compares their metrics and explains which features matter, with a sample dataset for an instant demo.',
    result: 'Live app anyone can try in the browser with their own data or the bundled sample.',
    stack: ['Python', 'Streamlit', 'scikit-learn', 'pandas'],
    liveUrl: 'https://insightf0rge.streamlit.app/',
    repoUrl: 'https://github.com/Dre-AI/insightforge',
    cover: 'work/insightforge.webp',
  },
  {
    slug: 'cleaning-concept',
    label: 'concept',
    title: 'Bazaar Cleaning & Car Wash',
    conceptTitle: 'Cleaning & car-wash brand',
    clientApproved: false,
    services: ['websites', 'brand'],
    summary: 'A 3D scroll-animated website concept for a cleaning and car-wash business.',
    brief: 'Show a local service business how a website can feel premium and memorable, not like a template.',
    approach:
      'Designed and built a scroll-driven site where 3D motion walks visitors through the services, in plain HTML, CSS and JavaScript so it stays fast.',
    result: 'Proposal delivered as a working site.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Scroll animation'],
    liveUrl: 'https://bazaar-cleaning-website.vercel.app',
    cover: 'work/cleaning-concept.webp',
  },
];

export const moreBuilds: BuildTile[] = [
  {
    title: 'LLM email triage bot',
    summary: 'Reads incoming mail, classifies intent and urgency, routes it and drafts a reply for a human to approve.',
    stack: ['Python', 'OpenRouter', 'Gmail'],
  },
  {
    title: 'Company intranet',
    summary: 'One place for every company document, so finding a file takes seconds.',
    stack: ['Web app', 'Document management'],
  },
  {
    title: 'TaskPilot',
    summary: 'A Python automation engine that discovers job modules, runs scraping and schedules, with a FastAPI dashboard.',
    stack: ['Python', 'FastAPI', 'BeautifulSoup'],
    repoUrl: 'https://github.com/Dre-AI/taskpilot',
  },
  {
    title: 'Industrial attachment management system',
    summary: 'Replaces paper logbooks and manual assessment forms across the student internship lifecycle.',
    stack: ['Laravel', 'Tailwind CSS', 'MySQL'],
  },
  {
    title: 'FundiLink',
    summary: 'A mobile-first platform connecting skilled artisans with customers in Africa.',
    stack: ['JavaScript', 'Mobile-first web'],
  },
];
```

- [ ] **Step 4: Run the tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/work.ts tests/work.test.ts
git commit -m "feat: add work lineup with concept privacy rule"
```


---

### Task 5: Rewrite project docs and the Flow hero prompts

**Files:**
- Modify (full rewrite): `CLAUDE.md`
- Modify (full rewrite): `docs/BRIEF.md`
- Modify (full rewrite): `docs/FLOW_PROMPTS.md`
- Modify: `docs/PROMPTS.md`. Replace everything after the Step 0 section with the six phases from spec §9.
- Create: `tests/docs.test.ts`

**Interfaces:** none (docs only).

- [ ] **Step 1: Write the failing test** `tests/docs.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (p: string) => readFileSync(p, 'utf8');

test('CLAUDE.md reflects the studio and the copy rules', () => {
  const doc = read('CLAUDE.md');
  assert.match(doc, /Ndiga Dee Creative Co\./);
  assert.match(doc, /#longliveAI/);
  assert.match(doc, /Never add a phone number/);
  assert.match(doc, /2026-10-04-ndiga-dee-creative-co-design\.md/);
});

test('BRIEF.md no longer positions Derrick as a job seeker', () => {
  const doc = read('docs/BRIEF.md');
  assert.doesNotMatch(doc, /hiring manager/i);
  assert.match(doc, /AI-native creative studio/);
});

test('Flow prompts describe the human-to-digital hero', () => {
  const doc = read('docs/FLOW_PROMPTS.md');
  for (const key of ['K1', 'K2', 'K3', 'K4', 'Clip A', 'Clip B', 'Clip C', 'hero-src/a.mp4']) assert.ok(doc.includes(key), key);
  assert.doesNotMatch(doc, /ACCENT/); // video stays neutral; the accent lives in the UI
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test`
Expected: FAIL on all three docs tests.

- [ ] **Step 3: Rewrite** `CLAUDE.md`:

```markdown
# Ndiga Dee Creative Co. — Studio Site

Source of truth: `docs/superpowers/specs/2026-10-04-ndiga-dee-creative-co-design.md`. Read it before any design or build work. `docs/BRIEF.md` is the short version.

## Ground rules
- One phase per session (see `docs/PROMPTS.md`), from a written plan in `docs/superpowers/plans/`. Commit at the end of each phase.
- All copy lives in `src/data/*.ts`. Never hard-code copy in components. Never publish `[brackets]`, `TODO` or `TBD`. `npm test` enforces this.
- Never add a phone number anywhere on the site.
- The tag is always written exactly `#longliveAI`.
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
```

- [ ] **Step 4: Rewrite** `docs/BRIEF.md`:

```markdown
# Brief: Ndiga Dee Creative Co.

Short version of `docs/superpowers/specs/2026-10-04-ndiga-dee-creative-co-design.md`. If they disagree, the spec wins.

## Goal
The site for **Ndiga Dee Creative Co.**, an AI-native creative studio in Nairobi led by Derrick Ndiga (Founder · Full-Stack & AI Engineer). A prospective client should understand within 10 seconds what the studio does, why AI makes it faster, and how to start a project. Conversion: submit a project brief or book a call.

## Positioning
- Services: Websites & Web Apps · Brand & Creative · Growth (SEO & Analytics).
- AI is the method, not a product: work is finished sooner without cutting quality. Signature tag: `#longliveAI`.
- Tone: confident, plain, specific. No buzzword stacks.

## Look
Chrome futurist: near-black, silver/chrome highlights, one electric accent (picked in Phase 2), fine grain, condensed display type + Geist Mono labels. Existing DN monogram as the logo.

## Pages
Home (pinned human→digital hero, manifesto, services, "why we finish sooner" process, work glide, proof, founder, contact) · `/work/[slug]` · `/about` · `404`.

## Work
Keton Consulting (client) · Lumora (studio build) · InsightForge (studio build) · cleaning & car-wash concept (anonymous until approved). More builds: triage bot, intranet, TaskPilot, IAMS, FundiLink.

## Stack
Astro (static) · GSAP + ScrollTrigger · Lenis · canvas frame scrubber for the hero · Web3Forms + Cal.com for contact · custom domain at `/` (GitHub Pages until then).

## Quality
Lighthouse 90+ mobile, WCAG AA, reduced-motion support, Organization + Person JSON-LD, sitemap, OG image with `#longliveAI`. No phone number.
```

- [ ] **Step 5: Rewrite** `docs/FLOW_PROMPTS.md`:

```markdown
# Google Flow: hero sequence prompts ("human → digital")

The hero is three ~8s clips chained frames-to-video. Scrolling plays them through: you, then a chrome scan, then you dissolve into light. The real DN monogram fades in **on the website** over the last frames, because AI video can't draw a logo reliably, so the video only needs to end on a soft cluster of light.

**Colour:** keep the video neutral (black, chrome, silver, cool white). The site's accent colour is added in the UI, so you can generate now without waiting for Phase 2.

**Budget (free tier, ~50 credits/day, no rollover):** Day 1 keyframes → Days 2–3 test clips on Veo Lite → Day 4 re-render the best takes on Fast. Format: 16:9, highest resolution available, ~8s, no audio.

## Your photo (input P)
One sharp, high-res photo of you: 3/4 angle, shoulders up, plain or simple background, even light, no sunglasses unless you want them in every frame. Upload it as the reference image for K1.

## Style lock (paste at the start of EVERY prompt)
> Cinematic futuristic portrait film. Near-black studio with soft falloff, cool chrome-silver rim light, subtle film grain, shallow depth of field. Calm, slow, precise, premium. Keep the person's face, features, skin tone and hairstyle exactly as in the reference photo. No text, no logos, no extra people, no neon signs, no lens flares, no glitch effects.

## Keyframes (images first; they are cheap)
**K1 (human):** [style lock] Portrait of the person from the reference photo, 3/4 view, shoulders up, placed in the right half of the frame. The left third is empty dark space for a headline. Chrome rim light traces the edge of the face and shoulders.

**K2 (the scan):** [style lock] Same person, same lighting, camera has orbited about 30 degrees to the side. A thin horizontal line of white holographic light crosses the face. Below and behind the line, half of the face and one shoulder have become polished liquid chrome with a fine wireframe mesh; the rest is still human.

**K3 (digital):** [style lock] Same scene, camera has orbited about 60 degrees. The person is now almost entirely polished chrome and fine wireframe, still clearly the same face. The edges of the shoulders and hair are breaking into tiny points of white light drifting backwards.

**K4 (resolve):** [style lock] Camera pulled far back. The person is gone; thousands of tiny points of light have gathered into one small, bright, softly glowing cluster in the centre of a vast dark space. Very still and quiet.

Tip: make K2–K4 by **editing the previous keyframe** ("same scene, same lighting, now …") so the world stays consistent.

## Video prompts (frames-to-video)
**Clip A (K1 → K2):** [style lock] Slow, smooth orbit around the person at constant speed. A thin line of holographic light sweeps across the face, turning the area it passes into polished chrome with a fine mesh. Continuous move, no cuts.

**Clip B (K2 → K3):** [style lock] The orbit continues at the same speed. The chrome spreads until the person is almost fully chrome and wireframe, and the edges start to break into drifting points of light. No cuts, the face stays the same person.

**Clip C (K3 → K4):** [style lock] The camera eases into a slow pull-back. The chrome figure dissolves into points of light that stream inward and gather into one small glowing cluster in the centre of empty dark space. Motion decelerates to a gentle stop.

## When clips come back
- Reject any take where your face changes identity, flickers, morphs or jumps speed. Scroll-scrubbing makes these very obvious.
- Save the keepers as `hero-src/a.mp4`, `hero-src/b.mp4` and `hero-src/c.mp4` (the old `1/2/3.mp4` can stay until Phase 5).
- Note any visible watermark and which corner it's in. Phase 5 crops it or covers it with UI.
- If Flow refuses your photo or can't keep your face consistent, tell Claude. Phase 5 has a fallback built from your still photo.
```

- [ ] **Step 6: Update** `docs/PROMPTS.md`. Keep the "Step 0" setup section. Replace the old phase list after it with:

```markdown
## Phases (Ndiga Dee Creative Co. rebuild)

Each phase starts from a written plan in `docs/superpowers/plans/`. Run one phase per session, review it, then commit.

1. **Content & brand:** studio copy, services, AI process, work lineup, docs, Flow prompts. *(this plan)*
2. **Design system:** tokens, type, chrome treatment, accent picked from three, `/styleguide`. Skills: design-taste-frontend, impeccable.
3. **Static build:** home, `/work/[slug]`, `/about`, `404` with real content and no animation; screenshots captured from the live URLs; old data modules removed.
4. **Motion layer:** reveals, manifesto word reveal, pinned process, horizontal work glide.
5. **Hero sequence:** Flow clips → frames → canvas scrubber, monogram overlay, poster and reduced-motion fallback (or the still-photo fallback).
6. **Ship:** Web3Forms brief form, Cal.com, SEO and JSON-LD, Lighthouse 90+, custom-domain config, deploy.
```

- [ ] **Step 7: Run the tests**

Run: `npm test`
Expected: PASS (all suites).

- [ ] **Step 8: Commit**

```bash
git add CLAUDE.md docs/BRIEF.md docs/FLOW_PROMPTS.md docs/PROMPTS.md tests/docs.test.ts
git commit -m "docs: reposition project docs and Flow prompts for the studio"
```

---

### Task 6: Phase verification

**Files:** none

- [ ] **Step 1: Full test run**

Run: `npm test`
Expected: all suites pass, 0 failures.

- [ ] **Step 2: Build still works** (old components are untouched and still compile)

Run: `npm run build`
Expected: exits 0 with `Complete!`.

- [ ] **Step 3: Nothing stray**

Run: `git status --short`
Expected: empty.

- [ ] **Step 4: Code review.** Dispatch `ecc:code-reviewer` on `git diff main...HEAD`. Fix any CRITICAL/HIGH findings, re-run Steps 1–2, and commit the fixes.

- [ ] **Step 5: Hand back to Derrick** with:
  - A link to `docs/FLOW_PROMPTS.md` so he can start generating keyframes.
  - Decisions to confirm: budget bands, the "two working days" reply promise, and the founder bio wording.
  - Content still needed for Phase 3: a real metric and duration per featured project, intranet stack, and screenshots for the triage bot and intranet.
```
