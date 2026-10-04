// Studio-level copy for Ndiga Dee Creative Co. Phone number is intentionally omitted everywhere.
// Speed claims stay qualitative unless backed by a real before/after from Derrick.

export const studio = {
  name: 'Ndiga Dee Creative Co.',
  shortName: 'Ndiga Dee',
  descriptor: 'AI-native creative studio',
  location: 'Nairobi, Kenya',
  city: 'Nairobi, Kenya',
  tag: '#longliveAI',
  headline: 'Creative work, engineered with AI.',
  subline:
    'Websites, brands and growth for ambitious businesses. Designed by a person, built faster with AI.',
  heroLabels: ['AI-native studio', '#longliveAI'],
  manifesto:
    'Taste is human. Speed is the machine’s. On every project, AI drafts, explores and checks, so my hours go into the decisions that make the work good. You see real options sooner, launch sooner and skip the shortcuts. #longliveAI',
  footerNote: 'Designed and built in Nairobi by Derrick, with AI. #longliveAI',
};

// Hero copy that changes with the film as you scroll (spec §5). `at` = scroll progress where the beat starts.
export const heroBeats: { at: number; heading: string; text?: string; ctas?: ('startProject' | 'seeWork')[] }[] = [
  { at: 0, heading: studio.headline, text: studio.subline, ctas: ['startProject', 'seeWork'] },
  { at: 0.3, heading: 'Taste is human.', text: 'I make every design and decision myself, and I care how it lands.' },
  { at: 0.6, heading: 'Speed is the machine’s.', text: 'AI drafts, explores and checks, so you see real options sooner and launch sooner.' },
  { at: 0.85, heading: studio.name, text: studio.tag, ctas: ['startProject'] },
];

// The core promise: AI shortens the time to finished work. Qualitative on purpose: no invented numbers.
export const aiBenefits = [
  {
    title: 'Real options, early',
    text: 'AI explores many directions in hours, so you react to real designs early in the project, and the result is better for it: the strongest idea wins, not the first one.',
  },
  {
    title: 'Working builds sooner',
    text: 'AI-assisted scaffolding and code review clear the routine work, so engineering time goes into the parts that matter.',
  },
  {
    title: 'Fewer rounds of fixes',
    text: 'Automated checks for accessibility, performance and SEO catch problems before launch.',
  },
  {
    title: 'A person stays in charge',
    text: 'I review every design and every line of code before it reaches you.',
  },
];

export const founder = {
  name: 'Derrick Ndiga',
  role: 'Freelance Full-Stack & AI Developer',
  bio: 'I started in hands-on IT, setting up machines, networks and company email, and that still shapes how I build: things should keep working on a Monday morning. Today I design and build websites, web apps and brands, using AI to move faster without lowering the bar. I work under the Ndiga Dee Creative Co. name, and I am also studying Cyber Security & Digital Forensics.',
  photoAlt: 'Derrick Ndiga',
  email: 'ndigaderrick6@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/derrick-ndiga-76a119311/',
    github: 'https://github.com/Dre-AI',
  },
  linkLabels: { linkedin: 'LinkedIn', github: 'GitHub' },
};

export const ctas = {
  startProject: 'Start a project',
  seeWork: 'See the work',
  bookCall: 'Book a free call',
  visitLive: 'Visit live site',
  viewCode: 'View code',
  nextProject: 'Next project',
  aboutFounder: 'More about Derrick',
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
  emailError: 'Enter an email like name@example.com',
  success: 'Thanks, your brief is in. I will reply within two working days.',
  error: 'Something went wrong sending that. Please email ndigaderrick6@gmail.com instead.',
};

// Section headings for the home page.
export const sections = {
  services: 'What I make',
  work: 'Selected work',
  moreBuilds: 'More builds',
  about: 'Who you work with',
  contact: contactCopy.heading,
};

// Header navigation. Hrefs are relative to the site base.
export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: 'about/' },
  { label: 'Contact', href: '#contact' },
];
