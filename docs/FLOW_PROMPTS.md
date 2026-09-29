# Google Flow — hero sequence prompts

**Do Phase 2 first.** Then swap `ACCENT` below for your chosen accent colour and name (e.g. `#2F5BEA cobalt blue`) so the video matches the site.

**Budget plan (free tier, 50 credits/day, no rollover):**
- **Day 1:** generate the 4 keyframe images and pick the best.
- **Days 2–3:** test each clip on Veo 3.1 Lite (about 10 credits each).
- **Day 4:** re-render the best takes on Fast (about 20 credits each).

**Format:** 16:9, 720p, ~8s per clip, no audio needed.

## Storyboard

| Shot | What happens | Start frame | End frame |
|---|---|---|---|
| A | Scattered points of light drift in a calm graphite space | K1 | K2 |
| B | The points start linking with fine lines; a network forms | K2 | K3 |
| C | The network settles into an ordered grid; camera pulls back to quiet empty space | K3 | K4 |

Shared end/start frames (K2, K3) are what make it feel like one continuous flight.

## Style lock (paste at the start of EVERY prompt)
> Minimal premium product-film aesthetic, like an Apple keynote interstitial. Matte graphite-to-charcoal background with soft studio falloff, very subtle film grain. Small luminous points and hair-thin lines in soft white and ACCENT. Shallow depth of field, gentle bokeh. Calm, precise, expensive. No text, no logos, no people, no faces, no hands, no screens, no circuit boards, no robots, no neon, no lens flares.

## Keyframe images

**K1 (opening):** [style lock] Wide shot. A few dozen tiny glowing points float at different depths in a vast dark space, randomly scattered, some softly out of focus. Lots of negative space on the left third for a headline.

**K2 (first links):** [style lock] Same space, camera slightly closer. The points have drifted nearer; several pairs are now joined by hair-thin luminous lines, a loose, incomplete web. A couple of lines glow ACCENT.

**K3 (network formed):** [style lock] Closer again. The points form a clear, elegant network graph: nodes joined by thin lines, with a few pulses of ACCENT light travelling along the connections. Balanced, orderly, still mostly dark.

**K4 (resolve):** [style lock] Camera pulled far back. The network is now a small, perfectly ordered grid of points glowing softly in the lower centre, surrounded by wide calm dark space. Feels finished and quiet.

Tip: generate K1 first, then create K2–K4 by **editing the previous image** ("same scene, same lighting, now …") so the world stays consistent.

## Video prompts (frames-to-video)

**Clip A (K1 → K2):** [style lock] Slow, smooth forward dolly through the space. The floating points drift gently toward each other and the first thin lines of light connect between them. Continuous camera move, no cuts, constant speed.

**Clip B (K2 → K3):** [style lock] The camera keeps gliding forward at the same speed. More lines connect until a complete network graph forms; small ACCENT pulses begin travelling along the lines. No cuts.

**Clip C (K3 → K4):** [style lock] The camera eases into a slow pull-back and slight rise. The network reorganises itself into a neat, calm grid as the view widens to reveal empty dark space around it. Motion decelerates to a gentle stop.

## When clips come back
- Reject any clip with morphing, flicker or sudden speed changes; scroll-scrubbing makes these very obvious.
- Download at the highest resolution available and save as `hero-src/a.mp4`, `b.mp4`, `c.mp4`.
- If there's a visible watermark, note the corner. Phase 5 can crop it or cover it with UI.
