// Studio-level copy for Ndiga Dee Creative Co. Phone number is intentionally omitted everywhere.
// Speed claims stay qualitative unless backed by a real before/after from Derrick.

export const studio = {
  name: 'Ndiga Dee Creative Co.',
  shortName: 'Ndiga Dee',
  descriptor: 'AI-native creative studio',
  location: 'Nairobi, Kenya',
  tag: '#longliveAI',
  headline: 'Creative work, engineered with AI.',
  subline:
    'Websites, brands and growth for ambitious businesses. Designed by people, built faster with AI.',
  heroLabels: ['AI-native studio', '#longliveAI'],
  manifesto:
    'Taste is human. Speed is the machine’s. On every project, AI drafts, explores and checks, so our hours go into the decisions that make the work good. You see real options sooner, launch sooner and skip the shortcuts. #longliveAI',
  footerNote: 'Designed and built in Nairobi with people and AI. #longliveAI',
};

// Hero copy that changes with the film as you scroll (spec §5). `at` = scroll progress where the beat starts.
export const heroBeats: { at: number; heading: string; text?: string; cta?: 'startProject' | 'seeWork' }[] = [
  { at: 0, heading: studio.headline, text: studio.subline, cta: 'startProject' },
  { at: 0.3, heading: 'Taste is human.', text: 'Every design and decision is made by people who care how it lands.' },
  { at: 0.6, heading: 'Speed is the machine’s.', text: 'AI drafts, explores and checks, so you see real options sooner and launch sooner.' },
  { at: 0.85, heading: studio.name, text: studio.tag, cta: 'startProject' },
];

// The core promise: AI shortens the time to finished work. Qualitative on purpose: no invented numbers.
export const aiBenefits = [
  {
    title: 'Real options, early',
    text: 'AI explores many directions in hours, so you react to real designs in the first week instead of waiting on one.',
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
    title: 'People stay in charge',
    text: 'Every design and every line of code is reviewed by a human before it reaches you.',
  },
];

export const founder = {
  name: 'Derrick Ndiga',
  role: 'Founder · Full-Stack & AI Engineer',
  bio: 'I started in hands-on IT, setting up machines, networks and company email, and that still shapes how I build: things should keep working on a Monday morning. Today I design and build websites, web apps and brands, using AI to move faster without lowering the bar. I am also studying Cyber Security & Digital Forensics.',
  email: 'ndigaderrick6@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/derrick-ndiga-76a119311/',
    github: 'https://github.com/Dre-AI',
  },
};

export const ctas = {
  startProject: 'Start a project',
  seeWork: 'See the work',
  bookCall: 'Book a free call',
  visitLive: 'Visit live site',
  viewCode: 'View code',
  nextProject: 'Next project',
  aboutFounder: 'More about Derrick',
  emailUs: 'Email the studio',
};

export const contactCopy = {
  heading: 'Have something worth building?',
  intro: 'Tell us about the project. You will hear back within two working days.',
  formLabels: {
    name: 'Your name',
    email: 'Email',
    service: 'What do you need?',
    budget: 'Budget range',
    timeline: 'When do you want to launch?',
    message: 'Tell us about the project',
    submit: 'Send the brief',
  },
  budgets: ['Under KES 100k', 'KES 100k-300k', 'KES 300k-750k', 'KES 750k+', 'Not sure yet'],
  timelines: ['As soon as possible', 'Within 1 month', '1-3 months', 'Just exploring'],
  success: 'Thanks, your brief is in. We will reply within two working days.',
  error: 'Something went wrong sending that. Please email ndigaderrick6@gmail.com instead.',
};
