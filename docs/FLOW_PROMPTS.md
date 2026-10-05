# Google Flow: hero sequence ("human → visitor")

The hero is three ~8s clips chained frames-to-video. As you scroll, Derrick turns towards the headline while faint pale-cyan light awakens under his skin, then the light leaves him and gathers into one glowing cluster. The real DN monogram fades in **on the website** over the last frames; AI video can't draw a logo reliably.

## Keyframes (done)
Generated with GPT Image 2 on kie.ai from Derrick's real photo (`scripts/kie-keyframes.mjs`, prompts in `scripts/keyframe-prompts.mjs`). Files live in `hero-src/keyframes/` (git-ignored):

| Frame | What it shows |
|---|---|
| `K1.png` | Real Derrick, big smile, facing camera, right half of frame, charcoal backdrop, silver rim light |
| `K2.png` | Camera orbited to a three-quarter view; calm closed smile; fine pale-cyan lines at temple and cheekbone |
| `K3.png` | Close to side profile; the cyan lines branch across cheekbone, past the ear and down the neck |
| `K4.png` | Wide, empty dark space; one small cluster of pale-cyan light slightly below centre |

## Style lock (paste at the start of EVERY Flow prompt)
> Photorealistic editorial film, real person, real skin texture. Deep charcoal studio backdrop falling off to near-black, soft frontal light, faint cool silver rim light from behind on the right, light film grain. Slow, calm, precise, premium. Keep the man's face, features and skin tone exactly as in the start frame. No text, no logos, no extra people, no lens flares, no glitch effects, no colour other than charcoal, silver, white and soft pale cyan.

## Video prompts (frames-to-video, 16:9, ~8s, no audio)
**Clip A (K1 → K2):** [style lock] One continuous, smooth camera orbit at constant speed around the man as he slowly turns his head towards the left of the frame. His big smile relaxes into a calm, confident closed-mouth smile. Very fine lines of soft pale-cyan light slowly appear under the skin at his temple and cheekbone, as if waking up. No cuts.

**Clip B (K2 → K3):** [style lock] The orbit continues in the same direction at the same speed until he is close to a side profile. The pale-cyan lines grow and branch gently across his cheekbone, past his ear and down his neck, glowing softly beneath real skin. His expression stays calm. No cuts; he stays the same person throughout.

**Clip C (K3 → K4):** [style lock] The camera eases into a slow pull-back. The pale-cyan light lifts away from his skin as tiny points of light, and he fades into the darkness while the points stream inward and gather into one small glowing cluster slightly below the centre of empty dark space. Motion decelerates to a gentle stop.

## Budget and process
- Test each clip on Veo Lite first; re-render only the best take on Fast.
- Reject any take where his face changes identity, flickers, morphs or jumps speed. Scroll-scrubbing makes these very obvious.
- Save the keepers as `hero-src/a.mp4`, `hero-src/b.mp4` and `hero-src/c.mp4` (the old `1/2/3.mp4` can stay until Phase 5).
- Note any visible watermark and its corner; Phase 5 crops it or covers it with UI.
