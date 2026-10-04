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

## Phases (Ndiga Dee Creative Co. rebuild)

Each phase starts from a written plan in `docs/superpowers/plans/`. Run one phase per session, review it, then commit.

1. **Content & brand:** studio copy, services, AI process, work lineup, docs, Flow prompts. *(this plan)*
2. **Design system:** tokens, type, chrome treatment, accent picked from three, `/styleguide`. Skills: design-taste-frontend, impeccable.
3. **Static build:** home, `/work/[slug]`, `/about`, `404` with real content and no animation; screenshots captured from the live URLs; old data modules removed.
4. **Motion layer:** reveals, manifesto word reveal, pinned process, horizontal work glide.
5. **Hero sequence:** Flow clips → frames → canvas scrubber, monogram overlay, poster and reduced-motion fallback (or the still-photo fallback).
6. **Ship:** Web3Forms brief form, Cal.com, SEO and JSON-LD, Lighthouse 90+, custom-domain config, deploy.
