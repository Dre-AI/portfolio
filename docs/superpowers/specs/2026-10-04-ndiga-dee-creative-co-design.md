# Ndiga Dee Creative Co. — Site Redesign Spec

**Date:** 2026-10-04 · **Status:** awaiting user review · **Supersedes:** `docs/BRIEF.md` positioning (that file gets rewritten in Phase 1)

## 1. Goal
Turn the personal portfolio into the site for **Ndiga Dee Creative Co.**, a founder-led, AI-native creative studio. A prospective client should understand within 10 seconds what the studio does, why AI makes it faster, and how to start a project.

**Primary conversion:** submit a project brief or book a discovery call.

## 2. Positioning
- **Who:** Derrick Ndiga, a **freelance** full-stack and AI developer who works under the brand **Ndiga Dee Creative Co.** (decided 2026-10-04). It is a one-person business, presented honestly, and the brand can grow into a studio later.
- **Voice:** first person singular. All copy says "I" and "my", never "we", "our" or "the team". Clients hire Derrick directly.
- **Founder line:** Derrick Ndiga, Freelance Web Developer & Digital Creative (was "Freelance Full-Stack & AI Developer" until 2026-10-05). Ndiga Dee Creative Co. is the brand name used in the nav, footer, hero final beat and legal/contact details.
- **Role of AI:** AI is the studio's *method*, not a service it sells. Every page should reinforce one benefit: **work is delivered in less time without cutting quality**, because AI handles drafting, code scaffolding, visual exploration and QA, and Derrick handles judgement, design and engineering.
- **Headline direction:** "Creative work, engineered with AI." Final copy comes from the brand-voice pass in Phase 1.
- **Signature tag:** retired on 2026-10-05 at Derrick's request. `#longliveAI` no longer appears anywhere on the site; older mentions below are historical.
- **Tone:** confident, plain, specific. No buzzword stacks.

### AI speed claims: honesty rule
Speed claims must be framed as process benefits ("first designs in days, not weeks") or backed by a real comparison Derrick supplies. Never invent a percentage or multiplier. Placeholder numbers never ship.

## 3. Services (three)
**Updated 2026-10-05:** Derrick's goal is client work in websites and web apps, graphic design and digital marketing, and he wants the site to sell him as a creative (ads, product photos). The services are now **Websites & Web Apps**, **Graphic Design & Content** (ad creatives, product photos, social posts, short-form video, logos) and **Digital Marketing** (Google Ads, TikTok, email, SEO, analytics). His role line is now "Freelance Web Developer & Digital Creative". His tools: Photoshop, Canva, CapCut, Figma, Google Ads, TikTok, Mailchimp, ChatGPT, Nano Banana, Kling and Runway, plus the dev stack in `src/data/tools.ts`. A creative gallery gets built from the samples he sends. The table below is the original version.

| Service | Example deliverables | AI speed angle |
|---|---|---|
| Websites & Web Apps | Marketing sites, custom web apps (React/Django, Laravel, Astro), CMS, integrations | AI-assisted scaffolding and testing means working builds sooner |
| Brand & Creative | Identity refresh, social content, AI-assisted visuals and video | Many visual directions explored in hours, then refined by hand |
| Growth (SEO & Analytics) | Technical SEO, performance, analytics setup, conversion work | Automated audits and content briefs mean faster fixes |

## 4. Brand assets
- **Logo:** the **existing logo** in `brand/` (DN monogram set and favicon set) stays. No new mark gets designed. The wordmark "Ndiga Dee Creative Co." is set in the display typeface next to the monogram.
- **Mood: chrome futurist.** Near-black base, silver/chrome gradients for highlights, **one** electric accent, fine film grain.
- **Accent:** pale cyan (chosen 2026-10-04), matching the glow in the hero film. Exact value set and AA-checked in Phase 2.
- **Type:** a condensed display face for headlines and Geist Mono for labels and meta. Body is Geist or whatever the taste pass picks.
- **Themes:** dark-first. A light theme is optional and not required at launch.

## 5. Information architecture
### Home (`/`), one scroll story
1. **Hero (pinned, ~300vh):** scroll-scrubbed Flow sequence (§6). The copy changes with the film in four beats, so scrolling tells the manifesto while Derrick transforms:
   | Scroll | Film | Copy |
   |---|---|---|
   | 0–30% | Real Derrick, smiling | Headline "Creative work, engineered with AI.", subline, CTAs ("Start a project", "See the work"), label row `AI-native studio · #longliveAI` (Nairobi appears in the footer and contact section, not the hero) |
   | 30–60% | Glow wakes | "Taste is human." + "Every design and decision is made by people who care how it lands." |
   | 60–85% | Glow spreads, near profile | "Speed is the machine's." + "AI drafts, explores and checks, so you see real options sooner and launch sooner." |
   | 85–100% | Light cluster, DN monogram fades in | "Ndiga Dee Creative Co." + `#longliveAI` + "Start a project" |
   Beat copy lives in `src/data/studio.ts`. With reduced motion, all four beats show as a static stacked list over the poster frame.
2. **Manifesto:** large text that reveals word by word. Human taste + AI speed. Ends with `#longliveAI`.
3. **Services:** the three services from §3, each with deliverables and its AI speed angle.
4. **Why AI = faster (pinned process):** Discover → Design → Build with AI → Launch & grow. Each step shows the old way vs the AI-assisted way (e.g. "Concepts: weeks → days"), with no invented numbers. Reuses the existing pipeline motion hooks.
5. **Selected work:** case-study cards that glide past horizontally (reference: getlayers "Creative Director").
6. **Proof strip:** real metrics only. Fewer is fine. Delete any metric Derrick can't back up.
7. **Founder:** a still photo, a short bio and a link to `/about`.
8. **Contact:** brief form + booking link + email.

### Other pages
- **`/work/[slug]`:** one page per featured project. Layout: cover → brief → approach → where AI saved time → stack → result → gallery → next project. Buttons: "Visit live site" and, for public repos, "View code".

### Work lineup
| # | Project | Label | Live | Code | Proves |
|---|---|---|---|---|---|
| 1 | Keton Consulting website & SEO | Client | https://ketonconsulting.com | private | Websites + Growth |
| 2 | Lumora: full-stack e-commerce MVP | Studio build | https://dre-ai.github.io/Lumora/ | github.com/Dre-AI/Lumora | Web apps |
| 3 | InsightForge: privacy-first ML playground | Studio build | https://insightf0rge.streamlit.app/ | github.com/Dre-AI/insightforge | AI / engineering depth |
| 4 | Bazaar Cleaning & Car Wash: 3D scroll site | Concept / proposal | https://bazaar-cleaning-website.vercel.app | private | Brand & Creative, scroll craft |

- **Bazaar rule:** the client hasn't approved the proposal yet. Until they do, the client name and logo stay off the site, the card is labelled "Concept: cleaning & car-wash brand", and it doesn't link to the live URL. It moves to "Client" (with name and link) only once Derrick confirms approval. This is the `clientApproved` flag in `src/data/work.ts`; pages render work only through `publicView()`.
- **More builds** (grid tiles, no separate pages): LLM email triage bot, company intranet, TaskPilot, Industrial Attachment Management System (IAMS), FundiLink. Each tile links to code only where the repo is public.
- **Screenshots:** Claude captures them from the live URLs in Phase 3 and saves them as WebP in `public/work/`. Derrick supplies images for private-only items.
- **Results:** use a real metric where Derrick has one. Otherwise use a qualitative outcome (e.g. "Live, mobile-first, ranks for X"), never a placeholder.
- **`/about`:** founder story, experience timeline (reuses the timeline component), education, stack.
- **`404`:** on-brand.

### Contact
- **Project brief form:** name, email, service, budget range, timeline, message. Posts to Web3Forms (or Formspree), so there's no backend. It has a honeypot field, client-side validation, and clear success and error states.
- **Booking:** a Cal.com link for a free discovery call.
- **Email:** `ndigaderrick6@gmail.com`, plus LinkedIn and GitHub.
- **No phone number anywhere.**

## 6. Hero: "human → visitor"
Built from three Flow clips of ~8s each, chained frames-to-video so each clip's last frame is the next one's first. (Changed 2026-10-04 from a chrome "human → digital" look, which Derrick rejected.)

| Clip | What happens |
|---|---|
| A | Derrick's real portrait (big smile, charcoal backdrop, silver rim light). The camera orbits as he turns towards the headline; his smile calms and faint pale-cyan lines wake up under the skin at his temple and cheekbone. |
| B | The orbit continues to near profile; the pale-cyan lines branch across his cheekbone, past his ear and down his neck. Still clearly a real person. |
| C | The light lifts off him as points that gather into one small glowing cluster while the camera pulls back into darkness. The **existing DN monogram** is faded in over the final frames by the website (UI overlay), not drawn by the video model. |

- **Keyframes:** K1–K4 generated with GPT Image 2 on kie.ai from Derrick's real photo (`scripts/kie-keyframes.mjs`); Flow animates between them. Prompts live in `docs/FLOW_PROMPTS.md`.
- **Pipeline:** `scripts/extract-frames.sh` → WebP frames (desktop and mobile sets) → the existing canvas scrubber in `src/scripts/motion/hero.ts`.
- **Reject takes** with face drift, flicker or speed jumps. Scrubbing makes these obvious.
- **Fallback:** if Flow drifts identity or refuses a real-person image, build the hero from the still photo instead, using a depth-map parallax and a soft cyan glow (WebGL/CSS).
- **Reduced motion and slow connections:** a static poster frame, with all content visible.
- **Budgets:** frames ≤ 6 MB desktop / ≤ 2.5 MB mobile.

## 7. Technical approach
- **Keep:** Astro (static output), GSAP + ScrollTrigger, Lenis, the canvas frame scrubber and frame extraction script, data-driven content in `src/data/*.ts`, and the existing motion `data-*` hooks.
- **Change:**
  - Remove the `/portfolio/` base and build for a custom domain at `/`, with GitHub Pages as the interim host. URLs still come from `import.meta.env.BASE_URL`.
  - Add content collections or data files for services and case studies.
- **New motion:** horizontal work glide (pinned on desktop; vertical stack on mobile) and the manifesto word reveal.
- **Optional, only if Phase 5 needs it:** a light WebGL grain/shimmer layer over the hero.
- **Not doing:** Next.js/R3F rebuild, blog, CMS, an AI service offering.

## 8. Quality bar
- Lighthouse 90+ in all categories on mobile. Semantic HTML, keyboard navigation, visible focus, WCAG AA contrast.
- Motion respects `prefers-reduced-motion` and never hides content. No pinned section on mobile is longer than one screen.
- **SEO:** unique titles and meta, OG image (featuring `#longliveAI`), `Organization` + `Person` JSON-LD, sitemap, robots.txt.
- No copy in components, no `[brackets]` or `TODO` published, no phone number.

## 9. Phases (one session each; review + verification at the end of each)
| # | Phase | Skills |
|---|---|---|
| 1 | Content & brand: copy deck (studio, services, AI speed messaging, `#longliveAI`), rewrite BRIEF/CLAUDE.md, new Flow prompts | brand-voice, copywriting |
| 2 | Design system + `/styleguide`, with accent chosen from 3 | design-taste-frontend, impeccable |
| 3 | Static build of all pages with real content and no animation | taste, ecc planning + code review |
| 4 | Motion layer: reveals, manifesto, pinned process, work glide | GSAP, ecc motion |
| 5 | Hero sequence from Flow clips (or fallback) | scrubber + ffmpeg |
| 6 | Form + booking, SEO, Lighthouse, deploy | ui-ux-pro-max review, ecc verification, seo |

## 10. Needed from Derrick
- Photos for the hero and founder section; the Flow clips (after Phase 1)
- Real metrics, screenshots and links per case study; any brand/creative samples
- Any honest before/after timing examples for the AI speed messaging
- Cal.com link, Web3Forms access key, domain name (when bought)
- Accent pick in Phase 2

## 11. Risks
- **Flow and real faces:** identity drift, or region and policy limits on uploading a real person's photo. Mitigated by the §6 fallback.
- **Free-tier watermark:** crop it, or place it under UI.
- **Thin client portfolio:** lead with quality case studies over quantity. Creative samples can be studio concept work, labelled honestly.
