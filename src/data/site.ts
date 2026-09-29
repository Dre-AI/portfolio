// Page copy that isn't about a person, project or job: navigation, section headings, CTAs.
export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const cta = {
  work: 'See my work',
  cv: 'Download CV',
  email: 'Email me',
  live: 'View live',
  github: 'More on GitHub',
  linkedin: 'LinkedIn',
  githubProfile: 'GitHub',
};

export const pipeline = {
  heading: 'How my automations work',
  intro: 'The email triage bot, one message at a time.',
  steps: [
    { title: 'Email arrives', text: 'The bot picks up new mail as it lands.' },
    { title: 'An LLM reads it', text: 'It classifies intent and urgency, and filters spam and phishing.' },
    { title: 'It routes and drafts', text: 'The message goes to the right person with a suggested reply.' },
    { title: 'A human approves', text: 'People stay in control of what gets sent.' },
  ],
};

export const sections = {
  proof: 'Results',
  work: { heading: 'Selected work', more: 'More builds' },
  about: { heading: 'About' },
  experience: { heading: 'Experience', education: 'Education' },
  contact: {
    heading: 'Have work that should run itself?',
    intro: "I'm open to AI and automation roles, remote or in Nairobi.",
  },
};
