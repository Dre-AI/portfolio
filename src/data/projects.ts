// Flagship case studies. Copy is drafted from the CV.
// Replace [brackets] with specifics. Never publish a placeholder.
export type Project = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  built: string;
  result: string;
  stack: string[];
  image?: string; // put screenshots in public/work/<slug>.webp
  link?: string;
  flagship: boolean;
};

export const projects: Project[] = [
  {
    slug: 'email-triage-bot',
    title: 'LLM email triage bot',
    summary: 'An inbox that sorts, routes and drafts replies on its own.',
    problem:
      'Inbound email at Keton (orders, support, supplier mail and spam) was sorted by hand, so urgent requests waited behind noise.',
    built:
      'A Python service that reads new mail, uses an LLM through OpenRouter to classify intent and urgency, routes each message to the right person and drafts a first reply for a human to approve.',
    result: '[e.g. handles ~N emails/week and cut first-response time from X to Y].',
    stack: ['Python', 'OpenRouter', 'LLMs', 'Gmail'],
    image: 'work/email-triage-bot.webp',
    flagship: true,
  },
  {
    slug: 'agents-and-n8n',
    title: 'AI agents & n8n automations',
    summary: 'Workflows and agents that collect, clean and act on information.',
    problem: 'Repetitive research and email handling took hours of copy-paste work each week.',
    built:
      'n8n workflows connected to Gmail, plus web-scraping agents that gather information online, built across Hermes Agent, Grok bots and OpenClaw with LLMs integrated via OpenRouter.',
    result: '[e.g. N workflows in daily use, replacing ~X hours of manual work a week].',
    stack: ['n8n', 'Gmail API', 'Hermes Agent', 'OpenClaw', 'OpenRouter'],
    image: 'work/agents-and-n8n.webp',
    flagship: true,
  },
  {
    slug: 'keton-website',
    title: 'Keton Consulting website & SEO',
    summary: 'A fast, findable site that turns search traffic into leads.',
    problem:
      'A clinical lab-equipment distributor needed buyers to find it on search and trust it enough to get in touch.',
    built:
      'Rebuilt the company website with mobile-first, fast-loading pages and proper privacy and legal pages, then ran the SEO strategy and analytics tracking.',
    result: '[e.g. organic traffic up X%, N enquiries/month from search].',
    stack: ['Web development', 'SEO', 'Analytics'],
    image: 'work/keton-website.webp',
    link: 'https://ketonconsulting.com',
    flagship: true,
  },
  {
    slug: 'intranet',
    title: 'Company intranet',
    summary: 'One place for every company document.',
    problem: 'Company documents lived across inboxes and personal drives, so finding them took longer than it should.',
    built: 'Designed and built an internal intranet that centralises documents and makes them easy to find.',
    result: '[e.g. used by N staff; replaced X shared folders].',
    stack: ['[stack]'],
    image: 'work/intranet.webp',
    flagship: true,
  },
  {
    slug: 'react-django-app',
    title: 'React + Django web app',
    summary: 'A full-stack app with a REST API, database and authentication.',
    problem: '', built: '', result: '',
    stack: ['React', 'Django', 'REST', 'MySQL'],
    link: 'https://github.com/Dre-AI',
    flagship: false,
  },
  {
    slug: 'internship-system',
    title: 'Internship management system',
    summary: 'Led development at JKUAT Industrial Park to run internship workflows.',
    problem: '', built: '', result: '',
    stack: ['Laravel', 'Tailwind CSS', 'MySQL'],
    flagship: false,
  },
];
