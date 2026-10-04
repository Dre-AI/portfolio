// The three services the studio sells. AI is how we work, so it shows up as each service's aiAngle, never as its own service.
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
    slug: 'brand',
    title: 'Brand & Creative',
    summary: 'Identity, visuals and motion that make a business look as good as it is.',
    deliverables: ['Logo & identity refresh', 'Social content', 'AI-assisted visuals', 'Motion & video', 'Brand guidelines'],
    aiAngle: 'We explore many visual directions in hours, then refine the best one by hand.',
    icon: 'pen-nib',
  },
  {
    slug: 'growth',
    title: 'Growth (SEO & Analytics)',
    summary: 'Get found on search, measure what works, and turn visitors into enquiries.',
    deliverables: ['Technical SEO', 'Performance tuning', 'Analytics setup', 'Content briefs', 'Conversion fixes'],
    aiAngle: 'Automated audits and AI-drafted content briefs mean fixes ship sooner.',
    icon: 'chart-line-up',
  },
];
