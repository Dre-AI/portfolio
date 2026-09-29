# Portfolio Brief — Derrick Ndiga

> Put this file in the repo root as `CLAUDE.md` (or `docs/BRIEF.md` and reference it from CLAUDE.md) so Claude Code reads it every session.

## 1. Goal
A premium, scroll-animated personal portfolio that makes a hiring manager think "this person ships real AI systems" within 10 seconds. Motion should support the story and never get in the way of the content.

## 2. Positioning
- **Lead identity:** AI & Automation Engineer
- **Supporting proof:** full-stack development (React/Django, Laravel), IT infrastructure, SEO/analytics, currently studying Cyber Security & Digital Forensics
- **Hero line (draft):** "I build AI automations that do the work." Subline: "AI & Automation Engineer in Nairobi. LLM agents, n8n workflows and full-stack apps that run in production."
- **Tone:** confident, plain, specific. No buzzword stacks and no "passionate about technology".

## 3. Design direction
- **Style:** clean minimal premium, in the spirit of Apple and Linear. Mostly neutral palette, ONE accent color, large confident type, generous whitespace, fine 1px borders, subtle grain or gradient glow at most.
- **Lead skill:** Taste Skill (anti-slop design direction). Use it to set tokens, type and layout.
- **Review skill:** UI UX Pro Max. After each phase, run it as a checklist for accessibility, contrast, spacing and states. Don't let it override Taste Skill's aesthetic decisions.
- **ECC:** use it for the planning, code-review and verification workflows only. Install only the modules needed so the context doesn't bloat.
- **Logo Design Skill:** designs a personal "DN" monogram. The same mark is used for the nav logo, favicon set, OG image and CV header. Let it stop at its concept checkpoint, pick a direction, then ask for the kit.
- **Not using:** scroll-world's paid generators (Monid/Higgsfield). We borrow the same idea, a video scrubbed by scroll, but generate the footage free in Google Flow (see §10).
- Dark and light themes via CSS tokens; default to the system setting.
- Typography: one geometric/grotesk sans (e.g. Inter Tight, Geist or Manrope) plus a mono for code and labels.

## 4. Tech stack
- **Astro** with static output. Content ships as real HTML, which matters for SEO; the current site renders mostly client-side.
- **GSAP + ScrollTrigger** for scroll-scrubbed animation, and **Lenis** for smooth scroll.
- **Hero:** Google Flow video, extracted to a WebP frame sequence and drawn to a `<canvas>`, with GSAP scrubbing frames on scroll (the Apple product-page technique). No Three.js unless we need a fallback.
- Tailwind or plain CSS with design tokens (the skill decides).
- **Hosting:** GitHub Pages via GitHub Actions.
  - The current repo `Dre-AI/portfolio` serves at `/portfolio/`, so set `base: '/portfolio'` in the Astro config.
  - Optional: rename or create a repo called `Dre-AI.github.io` to serve at the root URL.

## 5. Scroll narrative (sections in order)
1. **Hero:** name, role, hero line, CTAs ("See my work", "Download CV"). Behind them, a scroll-scrubbed Flow sequence plays: the camera glides through a calm, minimal space as scattered points of light link into a network, a metaphor for automation. The headline fades out as the sequence resolves into the next section.
2. **Proof strip:** 3–4 animated counters with real metrics (see §8).
3. **"How my automations work" (pinned section):** scrolling scrubs a pipeline diagram: *Inbox → LLM classifies → routes / drafts reply → human review*. Built as SVG + GSAP, based on the email triage bot.
4. **Selected work:** 4 flagship case studies, each on its own card that reveals on scroll. Each case study covers problem, what I built, stack, result, a screenshot and a link.
   - LLM Email Triage Bot (Python, OpenRouter)
   - AI Agents & n8n Automations (Gmail workflows, web-scraping agents)
   - Keton Consulting Website + SEO (performance, analytics, lead conversion)
   - Company Intranet (document centralisation)
5. **More builds:** compact grid with the React + Django app, the Laravel Internship Management System and GitHub repos.
6. **Capabilities:** grouped stack (AI & Automation / Full-Stack / Infra & Security / Growth). Tags only, no skill-percentage bars.
7. **Experience:** vertical timeline whose line draws on scroll. Covers NdigaDee Creative, Keton, Alignturn, Hi-Specs, JKUAT, Safaricom.
8. **Education & certs:** BSc Cyber Security & Digital Forensics (OUK, in progress) and Diploma IT (Co-op University).
9. **Contact:** email, LinkedIn, GitHub and CV download, with a large closing statement.

## 6. Motion rules
- Every animation has a purpose: reveal, explain or guide. No animation just for show.
- Keep timings short (300–700ms) with ease-out curves, and stagger reveals subtly.
- Respect `prefers-reduced-motion`: disable the scrub and show static final states.
- On mobile, simplify: no pinned sections longer than one screen. The hero loads a lighter frame set (fewer frames, smaller size), or a single poster image on slow connections.
- No layout shift, and no scroll-jacking that fights the user.

## 7. Quality bar
- Lighthouse 90+ on all four categories, on mobile.
- Semantic HTML, keyboard navigable, visible focus, WCAG AA contrast.
- SEO: unique title and meta, OG image, `Person` JSON-LD schema, sitemap, robots.txt.
- Images in WebP/AVIF, lazy-loaded, with explicit width and height.
- **Privacy:** do NOT publish the phone number. Use email and LinkedIn only.

## 8. Content still needed from Derrick
- [ ] Metrics for each flagship project (hours saved, emails handled per day, traffic or lead growth, users)
- [ ] Screenshots and live links for each project
- [ ] Professional headshot (optional; the minimal style works without one)
- [ ] Final CV PDF for download
- [ ] Preferred accent color (or let Taste Skill propose 3)
- [ ] Chosen DN monogram direction from Logo Design Skill
- [ ] Hero Flow clips (see §10)
- [ ] 3–5 reference sites with notes on what to borrow (see §11)

## 9. Build phases (one Claude Code session each; commit after each)
1. **Setup:** Astro scaffold, GitHub Actions deploy to Pages, install skills, add this brief.
1b. **Identity:** Logo Design Skill creates the DN monogram, then exports the favicon and manifest set into `/public`.
2. **Design system:** Taste Skill defines tokens, type scale, colors, spacing and components. Build a `/styleguide` page to review them.
3. **Static build:** all sections with real content and zero animation. It must look great standing still.
4. **Motion layer:** Lenis, GSAP reveals, the pinned pipeline section, the timeline draw and counters.
5. **Hero sequence:** extract Flow clips to WebP frames (ffmpeg), build the canvas scrubber with preloading and a mobile frame set, and add the poster fallback plus reduced-motion handling.
6. **Polish & ship:** UI UX Pro Max review, Lighthouse, reduced-motion, SEO, OG image, deploy.

## 10. Google Flow hero workflow (free tier)
**Budget:** the free tier refreshes 50 credits a day with no rollover. That's about 5 Veo 3.1 Lite clips or 2 Fast clips a day, at 720p max. Plan the prompts first, then generate over 3–4 days.

1. **Write the storyboard:** 3 connected shots, about 8s each. For example:
   - (a) soft graphite void with drifting points of light
   - (b) the points begin linking with thin glowing lines
   - (c) the network settles into a calm, ordered grid, and the camera pulls back to empty space for the next section
   
   No people, faces or text; AI video handles these badly.
2. **Generate keyframes first** as images, matching the site palette (neutral plus the one accent color). Images are cheap; video is not.
3. **Use frames-to-video** so each clip's last frame is the next clip's first frame. That's what makes the flight feel continuous.
4. **Test on Lite** and only re-render the best take on Fast.
5. **Download the clips** and hand them to Claude Code:
   - `ffmpeg` extracts about 24–30 fps into WebP (desktop ~1600px wide, mobile ~800px)
   - target under 6 MB total for desktop and under 2.5 MB for mobile

**Check before relying on it:**
- Confirm Flow works in Kenya on your account; availability is region-dependent.
- Check whether free-tier clips carry a visible watermark. If they do, crop or mask it, or place the watermark area under UI.

## 11. Reference sites (Webflow "Made in Webflow", most liked)
Use these for motion patterns, not visual copying. Screenshot them into `/references` with a one-line note each.
- **GSAP ScrollTrigger Tutorial** (Timothy Ricks): scroll-reveal timing
- **Sticky On Scroll** (Memberstack): pinned "how my automations work" section
- **Relume Timeline**: experience timeline that draws on scroll
- **20 Line Hover Animations** (Dhruv Sachdev): nav and link hovers
- **Daily Direction Micro Interactions** (Joseph Berry): button and card feel
- Also browse the Portfolio and Animation filters on that page for personal-site layouts.
