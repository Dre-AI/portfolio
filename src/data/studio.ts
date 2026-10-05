// Studio-level copy for Ndiga Dee Creative Co. Phone number is intentionally omitted everywhere.
// Speed claims stay qualitative unless backed by a real before/after from Derrick.

export const studio = {
  name: 'Ndiga Dee Creative Co.',
  shortName: 'Ndiga Dee',
  city: 'Nairobi, Kenya',
  headline: 'Creative work, engineered with AI.',
  subline:
    'Websites, ads and design that sell, plus the marketing to back them. Made by a person, faster with AI.',
  heroLabels: ['Web, design & marketing', 'Freelance creative'],
  address: { locality: 'Nairobi', country: 'KE' },
  footerNote: 'Designed and built in Nairobi by Derrick, with AI.',
};

// Opening statement of the AI-benefits section; the four aiBenefits sit beside it.
export const manifesto = {
  statement: 'Faster, and better for it.',
  support: 'AI takes the routine drafting, exploring and checking, so my hours go into the decisions that make the work good.',
};

// Accessible names for page chrome.
export const a11y = { skip: 'Skip to content', primaryNav: 'Primary' };

// Hero copy that changes with the film as you scroll (spec §5). `at` = scroll progress where the beat starts.
export const heroBeats: { at: number; heading: string; text?: string; ctas?: ('startProject' | 'seeWork')[] }[] = [
  { at: 0, heading: studio.headline, text: studio.subline, ctas: ['startProject', 'seeWork'] },
  { at: 0.3, heading: 'Taste is human.', text: 'I make every call myself, and I care how it lands.' },
  { at: 0.6, heading: 'Speed is the machine’s.', text: 'AI drafts, explores and checks, so you see real options sooner and launch sooner.' },
  { at: 0.85, heading: studio.name, text: 'Let’s build what’s next.', ctas: ['startProject'] },
];

// The core promise: AI shortens the time to finished work. Qualitative on purpose: no invented numbers.
export const aiBenefits = [
  {
    title: 'Real options, early',
    text: 'AI explores many directions in hours, so you react to real designs early in the project, and the result is better for it: the strongest idea wins, not the first one.',
  },
  {
    title: 'Finished work sooner',
    text: 'AI clears the routine drafting in code, design and copy, so my time goes into the parts that matter.',
  },
  {
    title: 'Fewer rounds of fixes',
    text: 'Problems are caught while they are cheap, so revisions go into improvements, not repairs.',
  },
  {
    title: 'A person stays in charge',
    text: 'I review every design, every ad and every line of code before it reaches you.',
  },
];

export const founder = {
  name: 'Derrick Ndiga',
  role: 'Freelance Web Developer & Digital Creative',
  bio: 'I design, build and market for businesses: websites and web apps, ad creatives and product photos, and the campaigns that put them in front of customers. I started in hands-on IT, setting up machines, networks and company email, and that still shapes how I work: things should keep working on a Monday morning. I use AI to move faster without lowering the bar, and I finish every piece by hand. I work under the Ndiga Dee Creative Co. name, and I am also studying Cyber Security & Digital Forensics.',
  photoAlt: 'Derrick Ndiga',
  email: 'ndigaderrick6@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/derrick-ndiga-76a119311/',
    github: 'https://github.com/Dre-AI',
  },
  linkLabels: { email: 'Email Derrick', linkedin: 'LinkedIn', github: 'GitHub', booking: 'Book a free call' },
};

export const ctas = {
  startProject: 'Start a project',
  seeWork: 'See the work',
  bookCall: 'Book a free call',
  visitLive: 'Visit live site',
  viewCode: 'View code',
  nextProject: 'Next project',
  emailUs: 'Email me',
  about: 'About me',
  caseStudy: 'Read the case study',
};

export const contactCopy = {
  heading: 'Have something worth building?',
  intro: 'Tell me about the project. I reply within two working days.',
  formLabels: {
    name: 'Your name',
    email: 'Email',
    service: 'What do you need?',
    budget: 'Budget range',
    timeline: 'When do you want to launch?',
    message: 'Tell me about the project',
    submit: 'Send the brief',
  },
  budgets: ['Under KES 100k', 'KES 100k-300k', 'KES 300k-750k', 'KES 750k+', 'Not sure yet'],
  timelines: ['As soon as possible', 'Within 1 month', '1-3 months', 'Just exploring'],
  nameHelp: 'So I know who to reply to.',
  errors: {
    name: 'Please add your name.',
    email: 'Enter an email like name@example.com',
    message: 'A sentence or two about the project helps.',
  },
  fallbackNote: 'This opens your email app with your brief filled in.',
  directHeading: 'Or reach me directly',
  sending: 'Sending...',
  success: 'Thanks, your brief is in. I will reply within two working days.',
  error: `Something went wrong sending that. Please email ${founder.email} instead.`,
};

// Section headings for the home page.
export const sections = {
  services: 'What I make',
  work: 'Selected work',
  moreBuilds: 'More builds',
  about: 'Who you work with',
  contact: contactCopy.heading,
  experience: 'Experience',
  education: 'Education',
  capabilities: 'What I work with',
  case: {
    brief: 'The brief',
    approach: 'What I built',
    result: 'Result',
    stack: 'Stack',
    ai: 'Where AI saved time',
    back: 'All work',
    coverAlt: 'Screenshot of the live site',
    coverAltPrefix: 'Screenshot of',
    duration: 'Delivered in',
    weeks: 'weeks',
  },
};

export const notFound = {
  heading: 'This page drifted off.',
  text: 'The link may be old. Everything I make starts from the home page.',
  cta: 'Back to home',
};

// Header navigation. Hrefs are relative to the site base.
export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: 'about/' },
  { label: 'Contact', href: '#contact' },
];
