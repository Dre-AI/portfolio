Flow clips live here (see docs/FLOW_PROMPTS.md). Video files are git-ignored.

Hero ("human → visitor") uses a.mp4 → b.mp4 → c.mp4, all 1920×1080, 24 fps, 8 s:
- a.mp4: K1 → K2 (turn, smile calms, glow wakes). Use in full.
- b.mp4: starts from A's last frame → K3. Flow drops the faint glow on its first frames, so start B at 2.25 s and crossfade 0.4 s from the end of A.
- c.mp4: must start from B's last frame (hero-src/seams/B-last-frame.png) → K4. Re-render pending.

1.mp4–3.mp4 are the old graphite/points-of-light hero, kept until Phase 5 replaces it.
