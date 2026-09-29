#!/usr/bin/env bash
# Turn hero-src/{a,b,c}.mp4 into scroll-scrub WebP frame sets.
# Needs ffmpeg with libwebp. Usage: bash scripts/extract-frames.sh [fps] [crop]
# Example with a bottom-right watermark trimmed: bash scripts/extract-frames.sh 24 "crop=iw*0.94:ih*0.94:0:0"
set -euo pipefail
FPS="${1:-24}"
CROP="${2:-}"
SRC=hero-src
OUT=public/hero
mkdir -p "$OUT/desktop" "$OUT/mobile"

# Join clips. They share end/start frames, so one frame repeats at each joint (invisible when scrubbing).
printf "file '%s'\n" "$PWD/$SRC/a.mp4" "$PWD/$SRC/b.mp4" "$PWD/$SRC/c.mp4" > /tmp/hero-list.txt
ffmpeg -y -loglevel error -f concat -safe 0 -i /tmp/hero-list.txt -an -c:v libx264 -crf 12 /tmp/hero-joined.mp4

VF="fps=${FPS}"
[ -n "$CROP" ] && VF="${CROP},${VF}"

ffmpeg -y -loglevel error -i /tmp/hero-joined.mp4 -vf "${VF},scale=1600:-2" -c:v libwebp -quality 72 "$OUT/desktop/%04d.webp"
ffmpeg -y -loglevel error -i /tmp/hero-joined.mp4 -vf "${VF},fps=$((FPS/2)),scale=800:-2" -c:v libwebp -quality 68 "$OUT/mobile/%04d.webp"
cp "$OUT/desktop/0001.webp" "$OUT/poster.webp"

echo "desktop: $(ls $OUT/desktop | wc -l) frames, $(du -sh $OUT/desktop | cut -f1)"
echo "mobile:  $(ls $OUT/mobile | wc -l) frames, $(du -sh $OUT/mobile | cut -f1)"
echo "Budget: desktop ≤ 6 MB, mobile ≤ 2.5 MB. Over budget? Lower fps or quality."
