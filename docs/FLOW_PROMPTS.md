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
