// Featured case studies and the "more builds" grid.
// Render through publicView() only: it hides unapproved client names and links.
// Results stay qualitative until Derrick supplies a real metric. aiNote is optional and is
// added in Phase 3 only from Derrick's own account of where AI saved time.

export type WorkLabel = 'client' | 'studio' | 'concept' | 'built-for';

export type WorkItem = {
  slug: string;
  label: WorkLabel;
  title: string;
  conceptTitle?: string; // shown instead of title while a concept is unapproved
  clientApproved?: boolean; // concepts only
  services: string[]; // Service slugs from services.ts
  summary: string;
  brief: string;
  approach: string;
  result: string;
  aiNote?: string;
  durationWeeks?: number; // real figure from Derrick only; drives the "Delivered in X weeks" badge
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  cover: string; // public/work/<slug>.webp, captured in Phase 3
};

// cover is optional here: publicView drops it for an unapproved concept (no screenshot of a client's site).
export type PublicWorkItem = Omit<WorkItem, 'conceptTitle' | 'clientApproved' | 'cover'> & { cover?: string };

export type BuildTile = { title: string; summary: string; stack: string[]; repoUrl?: string };

const LABEL_TEXT: Record<WorkLabel, string> = { client: 'Client', studio: 'Studio build', concept: 'Concept', 'built-for': 'Built for' };
export const labelText = (label: WorkLabel): string => LABEL_TEXT[label];

export function publicView(item: WorkItem): PublicWorkItem {
  const { conceptTitle, clientApproved, ...rest } = item;
  if (item.label !== 'concept' || clientApproved) return { ...rest };
  return { ...rest, title: conceptTitle ?? 'Concept project', liveUrl: undefined, cover: undefined };
}

export const featuredWork: WorkItem[] = [
  {
    slug: 'keton-consulting',
    label: 'built-for',
    title: 'Keton Consulting',
    services: ['websites', 'marketing'],
    summary: 'A fast, findable website for a clinical lab-equipment distributor.',
    brief: 'Keton needed laboratory buyers to find it on search and trust it enough to get in touch.',
    approach:
      'Designed and built a mobile-first React site with clear product pages, privacy and legal pages, and contact forms, then ran the SEO strategy and analytics tracking.',
    result: 'Live at ketonconsulting.com, with SEO and analytics running on every page.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'SEO', 'Analytics'],
    liveUrl: 'https://ketonconsulting.com',
    cover: 'work/keton-consulting.webp',
  },
  {
    slug: 'lumora',
    label: 'studio',
    title: 'Lumora',
    services: ['websites'],
    summary: 'A full-stack e-commerce store, from product grid to confirmed order.',
    brief: 'A showcase of what a modern Kenyan online shop can feel like, with prices in KES and a checkout that does not get in the way.',
    approach:
      'Built a React and TypeScript storefront with its own design system, a Node and Express API with SQLite, JWT accounts and a multi-step checkout (address, delivery, payment, review).',
    result: 'Live demo with accounts, cart and checkout working end to end. Payments are mocked by design.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'SQLite', 'JWT'],
    liveUrl: 'https://dre-ai.github.io/Lumora/',
    repoUrl: 'https://github.com/Dre-AI/Lumora',
    cover: 'work/lumora.webp',
  },
  {
    slug: 'insightforge',
    label: 'studio',
    title: 'InsightForge',
    services: ['websites'],
    summary: 'A privacy-first machine-learning playground: upload a CSV, get trained models.',
    brief: 'Make machine learning approachable for people with data but no data-science team, without sending that data anywhere.',
    approach:
      'Built a Streamlit app that trains a set of scikit-learn models on an uploaded CSV, compares their metrics and explains which features matter, with a sample dataset for an instant demo.',
    result: 'Live app anyone can try in the browser with their own data or the bundled sample.',
    stack: ['Python', 'Streamlit', 'scikit-learn', 'pandas'],
    liveUrl: 'https://insightf0rge.streamlit.app/',
    repoUrl: 'https://github.com/Dre-AI/insightforge',
    cover: 'work/insightforge.webp',
  },
  {
    slug: 'cleaning-concept',
    label: 'concept',
    title: 'Bazaar Cleaning & Car Wash',
    conceptTitle: 'Cleaning & car-wash brand',
    clientApproved: false,
    services: ['websites', 'design'],
    summary: 'A 3D scroll-animated website concept for a cleaning and car-wash business.',
    brief: 'Show a local service business how a website can feel premium and memorable, not like a template.',
    approach:
      'Designed and built a scroll-driven site where 3D motion walks visitors through the services, in plain HTML, CSS and JavaScript so it stays fast.',
    result: 'Proposal delivered as a working site.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Scroll animation'],
    liveUrl: 'https://bazaar-cleaning-website.vercel.app',
    cover: 'work/cleaning-concept.webp',
  },
];

export const moreBuilds: BuildTile[] = [
  {
    title: 'LLM email triage bot',
    summary: 'Reads incoming mail, classifies intent and urgency, routes it and drafts a reply for a human to approve.',
    stack: ['Python', 'OpenRouter', 'Gmail'],
  },
  {
    title: 'Company intranet',
    summary: 'One place for every company document, instead of files scattered across inboxes and personal drives.',
    stack: ['Web app', 'Document management'],
  },
  {
    title: 'TaskPilot',
    summary: 'A Python automation engine that discovers job modules, runs scraping and schedules, with a FastAPI dashboard.',
    stack: ['Python', 'FastAPI', 'BeautifulSoup'],
    repoUrl: 'https://github.com/Dre-AI/taskpilot',
  },
  {
    title: 'Industrial attachment management system',
    summary: 'Replaces paper logbooks and manual assessment forms across the student internship lifecycle.',
    stack: ['Laravel', 'Tailwind CSS', 'MySQL'],
  },
  {
    title: 'FundiLink',
    summary: 'A mobile-first platform connecting skilled artisans with customers in Africa.',
    stack: ['JavaScript', 'Mobile-first web'],
  },
];
