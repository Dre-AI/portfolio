// Ads and product photos Derrick made as spec work (AI image tools, finished in Photoshop and Canva).
// None of these brands commissioned the work, so the section note says so and every alt text starts with "Spec".
// Images live in public/creative/<slug>.webp (grid) and <slug>-full.webp (full size); source files are in samples/.
export type CreativePiece = {
  slug: string;
  brand: string;
  kind: string;
  alt: string;
  width: number;
  height: number;
};

export const creativeSection = {
  heading: 'Ads & product photos',
  intro: 'Campaign ideas, art direction and finishing by me, with AI image tools doing the heavy lifting. This is the kind of work I make for your brand.',
  note: 'Spec work, made to show what I can do. None of these brands commissioned it, and I am not affiliated with them.',
  viewFull: 'View full size',
};

export const creativePieces: CreativePiece[] = [
  // Ordered for CSS columns, which fill top to bottom: each column gets a mix, and the top row is the strongest ads.
  { slug: 'coca-cola', brand: 'Coca-Cola', kind: 'Print ad', width: 960, height: 1200,
    alt: 'Spec ad for Coca-Cola: a woman with bottle caps as hair rollers holds a glass bottle, headline Pop. Set. Refresh.' },
  { slug: 'ouai-1', brand: 'OUAI', kind: 'Product photo', width: 900, height: 1200,
    alt: 'Spec product photo of OUAI fragrance mist on a travertine shelf with a hairbrush, silk scarf and gold jewellery.' },
  { slug: 'crocs', brand: 'Crocs', kind: 'Print ad', width: 960, height: 1200,
    alt: 'Spec ad for Crocs: a giant green clog holds a tiny forest campsite with a waterfall, headline Comfort that takes you places.' },
  { slug: 'fenty-gloss-set', brand: 'Fenty Beauty', kind: 'Campaign set', width: 670, height: 1200,
    alt: 'Spec campaign set for Fenty Beauty lip gloss: nine pink frames pairing the gloss with strawberries, cream and meringue.' },
  { slug: 'ameer-al-arab-2', brand: 'Ameer Al Arab', kind: 'Product photo', width: 900, height: 502,
    alt: 'Spec product photo of Ameer Al Arab perfume: the black bottle lit against a dark backdrop.' },
  { slug: 'kitkat', brand: 'KitKat', kind: 'Social ad', width: 1200, height: 1200,
    alt: 'Spec ad for KitKat: a young man snaps a KitKat bar towards the camera over a chocolate splash, headline Break Time.' },
  { slug: 'dior-sauvage', brand: 'Dior Sauvage', kind: 'Campaign shot', width: 798, height: 1200,
    alt: 'Spec campaign shot for Dior Sauvage: a man in sunglasses and a black suit holds the bottle towards the camera with silver claw rings.' },
  { slug: 'ouai-2', brand: 'OUAI', kind: 'Product photo', width: 900, height: 1200,
    alt: 'Spec product photo of OUAI fragrance mist held in two hands on white bedding.' },
  { slug: 'nivea-men', brand: 'Nivea Men', kind: 'Social ad', width: 960, height: 1200,
    alt: 'Spec ad for Nivea Men oil control face wash: a man splashed with water beside the tube, headline Stay Fresh.' },
  { slug: 'vaseline', brand: 'Vaseline', kind: 'Product photo', width: 960, height: 1200,
    alt: 'Spec product photo of Vaseline Cocoa Radiant body oil on a stone tray in warm light.' },
  { slug: 'ameer-al-arab-1', brand: 'Ameer Al Arab', kind: 'Product photo', width: 900, height: 502,
    alt: 'Spec product photo of Ameer Al Arab perfume on a marble floor in a candlelit arched hall.' },
  { slug: 'gopro', brand: 'GoPro', kind: 'Print ad', width: 960, height: 1200,
    alt: 'Spec ad for GoPro: a mountain goat wearing a GoPro on a cliff edge above the clouds, headline Go where others won’t.' },
  { slug: 'porsche', brand: 'Porsche', kind: 'Poster', width: 800, height: 1200,
    alt: 'Spec poster for the Porsche 911 GT3 RS: a yellow car under a giant Porsche wordmark with a performance panel.' },
  { slug: 'ouai-3', brand: 'OUAI', kind: 'Product photo', width: 900, height: 1200,
    alt: 'Spec lifestyle photo for OUAI: a woman in jeans sprays the fragrance mist onto her wrist.' },
  { slug: 'vaseline-set', brand: 'Vaseline', kind: 'Campaign set', width: 960, height: 1200,
    alt: 'Spec campaign set for Vaseline Cocoa Radiant body oil: nine frames of the bottle, skin, cocoa and oil textures.' },
  { slug: 'ouai-4', brand: 'OUAI', kind: 'Product photo', width: 900, height: 1200,
    alt: 'Spec product photo of OUAI fragrance mist on a vanity with gold earrings in soft window light.' },
];
