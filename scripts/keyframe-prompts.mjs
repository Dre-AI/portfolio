// Hero keyframe prompts ("human → visitor": subtle otherworldly glow, not chrome), written to the AI Video Creator Course anatomy:
// shot/angle → subject → clothing → environment → lighting (behaviour, not equipment) → realism block → camera last.
// Continuity rules: same key/rim light direction in every frame, camera orbits one way only (180° rule),
// shot size progresses gradually. The video stays neutral (black, chrome, silver); the accent lives in the UI.

const REALISM =
  'Ensure facial consistency is identical to the reference image with hyper realistic skin texture and open pores, with the same facial spots, facial hair and symmetry exactly as the reference image. Exact same facial structure, skin tone, hairline and short coily hair as the reference.';

const NEGATIVE =
  'No text, no logos, no extra people, no neon signs, no lens flares, no glitch effects, no colour accents other than silver and cool white.';

const CAMERA = 'Shot on Sony A7IV, 85mm f/1.8, RAW photograph, subtle film grain, cinematic 16:9 frame.';

const LIGHT =
  'Same lighting as the last attached image: soft frontal light on his face, and a faint cool silver rim light along the edge of his hair and shoulders from behind on the right, against the same deep charcoal backdrop falling off to near-black at the edges.';

export const keyframes = {
  K1: {
    usesPrevious: false,
    prompt: [
      'Edit the attached photograph. Keep the man exactly as he is: do not change his face, smile, teeth, eyes, skin, skin tone, hair, beard, ears, head size, pose, suit or shirt in any way. Every facial detail must stay identical to the original photo.',
      'Change only two things. First, replace the bright blurred office background with a plain, deep charcoal-grey studio backdrop that falls off to near-black at the edges, with a subtle smooth gradient and no objects.',
      'Second, widen the composition: extend the backdrop on the left so he sits in the right half of a 16:9 frame, with calm empty dark space filling the left half. Keep his framing from mid-chest up and do not crop his head.',
      'Relight gently to match the new backdrop: keep the soft frontal light on his face as in the original, and add a faint cool silver rim light along the edge of his hair and shoulders from behind on the right.',
      'Real photograph, true-to-life colour, natural skin texture, no smoothing, no beauty filter, no HDR, light film grain. No text, no logos.',
    ].join(' '),
  },
  K2: {
    usesPrevious: true,
    prompt: [
      'Continue from the last attached image: the exact same man as in both attached photos, same suit, same charcoal studio backdrop. The camera has clearly orbited around him: this is a true three-quarter view, with his head and shoulders turned about 35 degrees so his face points towards the empty left side of the frame. His far ear is hidden and we see more of his near cheek and jaw. The camera is slightly closer, framed from upper chest up, and he stays in the right half of the frame.',
      'He is subtly otherworldly: very fine, faint lines of soft pale-cyan bioluminescent light have just begun to appear under his skin at his temples and along the top of his cheekbones, thin and elegant like a delicate natural pattern, glowing gently. His eyes keep their natural dark brown colour, with only a tiny cyan glint in the catchlight. Everything else is unchanged: real human skin with pores and natural texture, same face, same hair, same beard.',
      'His big smile has relaxed into a calm, confident, closed-mouth slight smile; no teeth showing.',
      LIGHT,
      `${REALISM} The glow must be subtle and photographic, not makeup, not paint, not a costume, not CGI.`,
      NEGATIVE.replace('no colour accents other than silver and cool white', 'no colour accents other than silver, cool white and the soft pale-cyan glow'),
      CAMERA,
    ].join(' '),
  },
  K3: {
    usesPrevious: true,
    prompt: [
      'Continue from the last attached image: same man, same suit, same backdrop, same light direction and rim light. The camera has orbited about 30 degrees further in the same direction, so he is now close to a side profile facing the left side of the frame, framed from upper chest up and still in the right half of the frame.',
      'The soft pale-cyan bioluminescent lines under his skin have spread: they now trace his temple, cheekbone, jawline and down the side of his neck in fine, elegant, symmetrical lines like a quiet constellation, glowing softly from beneath real skin. His eye keeps its natural dark brown colour with only a tiny cyan glint in the catchlight. He is still unmistakably the same real person, with real skin texture and pores.',
      'Calm, confident slight smile, lips relaxed, same as the last attached image.',
      LIGHT,
      `${REALISM} The glow must be subtle and photographic, not makeup, not paint, not a costume, not CGI.`,
      NEGATIVE.replace('no colour accents other than silver and cool white', 'no colour accents other than silver, cool white and the soft pale-cyan glow'),
      CAMERA,
    ].join(' '),
  },
  K4: {
    usesPrevious: true,
    prompt: [
      'Continue from the last attached image: same charcoal studio backdrop falling off to near-black, same cool silver tone. The camera has pulled far back into a wide shot.',
      'The man is gone. Thousands of tiny points of the same soft pale-cyan and white light have gathered into one small, bright, softly glowing cluster in the centre of the frame, slightly below the middle, surrounded by vast calm dark space. A faint haze around the cluster catches its light. Very still and quiet.',
      'No text, no logos, no people, no lens flares.',
      'Shot on Sony A7IV, 35mm f/1.8, RAW photograph, subtle film grain, cinematic 16:9 frame.',
    ].join(' '),
  },
};
