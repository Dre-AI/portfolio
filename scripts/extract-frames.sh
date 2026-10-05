#!/usr/bin/env bash
# Turn Flow clips into scroll-scrub WebP frame sets in public/hero/.
# Needs ffmpeg + ffprobe with libwebp.
#
# Usage: bash scripts/extract-frames.sh [-f desktop_fps] [-m mobile_fps] [-q desktop_quality] [-Q mobile_quality] [-c crop] clip [clip ...]
# Example: bash scripts/extract-frames.sh -f 20 -m 12 hero-src/1.mp4 hero-src/2.mp4
# Watermark trim: add -c "crop=iw*0.94:ih*0.94:0:0"
#
# Clips are joined in the order given. They should share end/start frames, so one frame
# repeats at each joint (invisible when scrubbing).
set -euo pipefail

DESKTOP_FPS=20
MOBILE_FPS=12
CROP=""
DESKTOP_Q=72
MOBILE_Q=68
while getopts "f:m:q:Q:c:" opt; do
  case "$opt" in
    f) DESKTOP_FPS="$OPTARG" ;;
    m) MOBILE_FPS="$OPTARG" ;;
    q) DESKTOP_Q="$OPTARG" ;;
    Q) MOBILE_Q="$OPTARG" ;;
    c) CROP="$OPTARG" ;;
    *) echo "Usage: $0 [-f desktop_fps] [-m mobile_fps] [-q desktop_quality] [-Q mobile_quality] [-c crop] clip [clip ...]" >&2; exit 2 ;;
  esac
done
shift $((OPTIND - 1))
[ "$#" -ge 1 ] || { echo "Give at least one clip, e.g. hero-src/1.mp4 hero-src/2.mp4" >&2; exit 2; }

DESKTOP_WIDTH=1280
MOBILE_WIDTH=800
BUDGET_DESKTOP_KB=6144 # 6 MB
BUDGET_MOBILE_KB=2560  # 2.5 MB
OUT=public/hero
TMP=hero-src/.tmp # git-ignored; relative paths keep native Windows ffmpeg happy

rm -rf "$OUT/desktop" "$OUT/mobile" "$TMP"
mkdir -p "$OUT/desktop" "$OUT/mobile" "$TMP"
trap 'rm -rf "$TMP"' EXIT

# concat resolves entries relative to the list file, which lives two levels below the repo root.
for clip in "$@"; do
  [ -f "$clip" ] || { echo "Missing clip: $clip" >&2; exit 1; }
  printf "file '../../%s'\n" "$clip"
done > "$TMP/list.txt"
ffmpeg -y -loglevel error -f concat -safe 0 -i "$TMP/list.txt" -an -c:v libx264 -crf 12 "$TMP/joined.mp4"

# Never upscale: cap each width at the (cropped) source width.
PROBE="$TMP/joined.mp4"
if [ -n "$CROP" ]; then
  ffmpeg -y -loglevel error -i "$TMP/joined.mp4" -vf "$CROP" -frames:v 1 "$TMP/cropped.png"
  PROBE="$TMP/cropped.png"
fi
SRC_WIDTH=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$PROBE")
cap() { [ "$1" -lt "$SRC_WIDTH" ] && echo "$1" || echo "$SRC_WIDTH"; }
DW=$(cap "$DESKTOP_WIDTH")
MW=$(cap "$MOBILE_WIDTH")

PRE=""
[ -n "$CROP" ] && PRE="${CROP},"
ffmpeg -y -loglevel error -i "$TMP/joined.mp4" -vf "${PRE}fps=${DESKTOP_FPS},scale=${DW}:-2" -c:v libwebp -quality "$DESKTOP_Q" "$OUT/desktop/%04d.webp"
ffmpeg -y -loglevel error -i "$TMP/joined.mp4" -vf "${PRE}fps=${MOBILE_FPS},scale=${MW}:-2" -c:v libwebp -quality "$MOBILE_Q" "$OUT/mobile/%04d.webp"

# Poster = the final desktop frame, i.e. the state the sequence resolves to.
LAST=$(ls "$OUT/desktop" | sort | tail -n 1)
cp "$OUT/desktop/$LAST" "$OUT/poster.webp"

count() { ls "$1" | wc -l | tr -d ' '; }
height() { ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$1/0001.webp"; }
kb() { du -sk "$1" | cut -f1; }
DC=$(count "$OUT/desktop"); MC=$(count "$OUT/mobile")
DKB=$(kb "$OUT/desktop"); MKB=$(kb "$OUT/mobile")

cat > "$OUT/frames.json" <<EOF
{
  "desktop": { "count": $DC, "fps": $DESKTOP_FPS, "width": $DW, "height": $(height "$OUT/desktop"), "pattern": "desktop/{n}.webp", "kb": $DKB },
  "mobile": { "count": $MC, "fps": $MOBILE_FPS, "width": $MW, "height": $(height "$OUT/mobile"), "pattern": "mobile/{n}.webp", "kb": $MKB },
  "pad": 4,
  "poster": "poster.webp",
  "breakpoint": 768
}
EOF

report() { # name kb budget_kb
  awk -v n="$1" -v k="$2" -v b="$3" 'BEGIN { printf "%-8s %6.2f MB of %.1f MB budget  %s\n", n, k/1024, b/1024, (k <= b ? "OK" : "OVER BUDGET") }'
}
echo "desktop: $DC frames at ${DW}px/${DESKTOP_FPS}fps"
echo "mobile:  $MC frames at ${MW}px/${MOBILE_FPS}fps"
report desktop "$DKB" "$BUDGET_DESKTOP_KB"
report mobile "$MKB" "$BUDGET_MOBILE_KB"
if [ "$DKB" -gt "$BUDGET_DESKTOP_KB" ] || [ "$MKB" -gt "$BUDGET_MOBILE_KB" ]; then
  echo "Over budget: lower fps (-f / -m) or quality." >&2
  exit 1
fi
