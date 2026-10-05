// The three services I sell. AI is how I work, so it shows up as each service's aiAngle, never as its own service.
export type Service = {
  slug: string;
  title: string;
  summary: string;
  deliverables: string[];
  aiAngle: string;
  icon: string; // Phosphor icon name
};

export const services: Service[] = [
  {
    slug: 'websites',
    title: 'Websites & Web Apps',
    summary: 'Fast, findable websites and custom web apps that are built to last and easy to run.',
    deliverables: ['Marketing websites', 'Custom web apps', 'E-commerce', 'CMS & integrations', 'Hosting & domains'],
    aiAngle: 'AI-assisted scaffolding and testing get a working build in front of you sooner.',
    icon: 'browsers',
  },
  {
    slug: 'design',
    title: 'Graphic Design & Content',
    summary: 'Ads, product photos and social content that make people stop scrolling and buy.',
    deliverables: ['Ad creatives', 'Product photos', 'Social media posts', 'Short-form video', 'Logos & brand identity'],
    aiAngle: 'AI image and video tools let me test many concepts in hours, then I finish the best one by hand.',
    icon: 'paint-brush',
  },
  {
    slug: 'marketing',
    title: 'Digital Marketing',
    summary: 'Campaigns that put your business in front of the right people, and numbers that show what works.',
    deliverables: ['Google Ads campaigns', 'TikTok content', 'Email campaigns', 'SEO', 'Analytics & reporting'],
    aiAngle: 'AI drafts ad and email variations to test, so campaigns launch and improve sooner.',
    icon: 'megaphone',
  },
];
