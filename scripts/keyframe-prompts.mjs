// Hero keyframe prompts ("human → digital"), written to the AI Video Creator Course anatomy:
// shot/angle → subject → clothing → environment → lighting (behaviour, not equipment) → realism block → camera last.
// Continuity rules: same key/rim light direction in every frame, camera orbits one way only (180° rule),
// shot size progresses gradually. The video stays neutral (black, chrome, silver); the accent lives in the UI.

const REALISM =
  'Ensure facial consistency is identical to the reference image with hyper realistic skin texture and open pores, with the same facial spots, facial hair and symmetry exactly as the reference image. Exact same facial structure, skin tone, hairline and short coily hair as the reference.';

const NEGATIVE =
  'No text, no logos, no extra people, no neon signs, no lens flares, no glitch effects, no colour accents other than silver and cool white.';

const CAMERA = 'Shot on Sony A7IV, 85mm f/1.8, RAW photograph, subtle film grain, cinematic 16:9 frame.';

const LIGHT =
  'A cool chrome-silver rim light traces the edge of his face, ear and shoulders from behind on the right; the key light is soft and low, falling off quickly into darkness on the shadow side of his face; a faint haze in the air catches the rim light.';

export const keyframes = {
  K1: {
    usesPrevious: false,
    prompt: [
      'A cinematic three-quarter portrait, camera at eye level positioned to the left of the male, capturing him from a 3/4 angle, framed from mid-chest up and placed in the right half of the frame. The left third of the frame is empty dark space.',
      'The male from the reference images looks calmly just past the camera with a composed, confident expression, mouth closed.',
      'He wears the same dark navy suit jacket and crisp white open-collar shirt as the reference, fine wool texture visible.',
      'Environment: a near-black seamless studio void, nothing else.',
      LIGHT,
      REALISM,
      NEGATIVE,
      CAMERA,
    ].join(' '),
  },
  K2: {
    usesPrevious: true,
    prompt: [
      'Continue from the last attached image: same male, same suit, same near-black studio void, same light direction and the same rim light. The camera has orbited about 30 degrees further around him in the same direction and moved slightly closer, framed from upper chest up.',
      'A thin horizontal line of white holographic light crosses his face at cheekbone height. Below the line, his jaw, neck and the near shoulder have become polished liquid chrome with a fine glowing wireframe mesh etched into the surface, reflecting the rim light. Above the line his eyes, forehead and hair remain fully human with real skin.',
      'His expression is unchanged: calm, composed, mouth closed.',
      LIGHT,
      `For the human part of the face: ${REALISM}`,
      NEGATIVE,
      CAMERA,
    ].join(' '),
  },
  K3: {
    usesPrevious: true,
    prompt: [
      'Continue from the last attached image: same scene, same light direction, same rim light. The camera has orbited about 30 degrees further in the same direction, now close to a side profile, framed from upper chest up.',
      'The male is now almost entirely polished liquid chrome with a fine glowing wireframe mesh, still clearly the same person: exact same face shape, nose, lips, ears and hairline as the reference. The outer edges of his shoulders and hair are breaking apart into thousands of tiny points of white light drifting backwards into the darkness.',
      'Still and calm, mouth closed.',
      LIGHT,
      NEGATIVE,
      CAMERA,
    ].join(' '),
  },
  K4: {
    usesPrevious: true,
    prompt: [
      'Continue from the last attached image: same near-black studio void, same cool silver tone. The camera has pulled far back into a wide shot.',
      'The male is gone. Thousands of tiny points of white light have gathered into one small, bright, softly glowing cluster in the centre of the frame, slightly below the middle, surrounded by vast calm dark space. A faint haze around the cluster catches its light. Very still and quiet.',
      NEGATIVE,
      'Shot on Sony A7IV, 35mm f/1.8, RAW photograph, subtle film grain, cinematic 16:9 frame.',
    ].join(' '),
  },
};
