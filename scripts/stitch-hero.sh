#!/usr/bin/env bash
# Join the three Flow clips into one hero video with short crossfades at the seams.
# Flow drops the faint cyan glow on the first frames of B and C, so both are trimmed to where
# the glow is back, then crossfaded from the previous clip (see hero-src/README.md).
# Usage: bash scripts/stitch-hero.sh   → hero-src/hero.mp4, then run extract-frames.sh on it.
set -euo pipefail

B_START=2.25 # seconds trimmed off the start of b.mp4
C_START=1.25 # seconds trimmed off the start of c.mp4
FADE=0.4     # crossfade length at each seam
CLIP=8       # every Flow clip is 8 s

A_LEN=$CLIP
B_LEN=$(awk "BEGIN{print $CLIP-$B_START}")
OFF_AB=$(awk "BEGIN{print $A_LEN-$FADE}")
OFF_BC=$(awk "BEGIN{print $A_LEN+$B_LEN-2*$FADE}")

ffmpeg -y -loglevel error \
  -i hero-src/a.mp4 -ss "$B_START" -i hero-src/b.mp4 -ss "$C_START" -i hero-src/c.mp4 \
  -filter_complex "[0:v]settb=AVTB,fps=24[a];[1:v]settb=AVTB,fps=24,setpts=PTS-STARTPTS[b];[2:v]settb=AVTB,fps=24,setpts=PTS-STARTPTS[c];\
[a][b]xfade=transition=fade:duration=$FADE:offset=$OFF_AB[ab];\
[ab][c]xfade=transition=fade:duration=$FADE:offset=$OFF_BC,format=yuv420p[v]" \
  -map "[v]" -an -c:v libx264 -crf 14 hero-src/hero.mp4

ffprobe -v error -show_entries format=duration -of csv=p=0 hero-src/hero.mp4
