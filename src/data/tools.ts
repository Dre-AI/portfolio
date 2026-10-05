// The tools Derrick builds with, shown on the home page after the process section.
// `brand` is a simple-icons slug (brand logo); `glyph` is a Phosphor icon name for tools without a published logo.
// Tool groups are cards with a `use` line; `compact` groups are the tech stack, shown as logo chips.
// The stack is taken from the dependency files in Derrick's GitHub repos (checked 2026-10-05).
export type Tool = { name: string; use?: string; brand?: string; glyph?: string };
export type ToolGroup = { group: string; compact?: boolean; tools: Tool[] };

export const toolsSection = {
  heading: 'Stack & tools',
  intro: 'The kit behind the work: design, marketing and code. AI does the heavy lifting, and every result still passes through my hands.',
};

export const toolGroups: ToolGroup[] = [
  {
    group: 'Design & content',
    tools: [
      { name: 'Photoshop', use: 'Product photos, retouching and ad creatives', glyph: 'image' },
      { name: 'Canva', use: 'Social posts, ads and brand assets', glyph: 'palette' },
      { name: 'CapCut', use: 'Short videos for Reels and TikTok', glyph: 'film-slate' },
      { name: 'Figma', use: 'Layouts, prototypes and handoff', brand: 'figma' },
    ],
  },
  {
    group: 'Marketing',
    tools: [
      { name: 'Google Ads', use: 'Search and display campaigns', brand: 'googleads' },
      { name: 'TikTok', use: 'Short-form content that gets seen', brand: 'tiktok' },
      { name: 'Mailchimp', use: 'Email campaigns and newsletters', brand: 'mailchimp' },
      { name: 'Google Analytics', use: 'Tracking what actually works', brand: 'googleanalytics' },
      { name: 'Search Console', use: 'Search visibility and SEO fixes', brand: 'googlesearchconsole' },
    ],
  },
  {
    group: 'AI',
    tools: [
      { name: 'ChatGPT', use: 'Ad copy, ideas and first drafts', glyph: 'chat-circle-dots' },
      { name: 'Nano Banana', use: 'AI product shots and image edits', brand: 'googlegemini' },
      { name: 'Kling & Runway', use: 'AI video clips for ads', glyph: 'video-camera' },
      { name: 'Google Flow', use: 'AI video for films like the hero', glyph: 'film-strip' },
      { name: 'Claude', use: 'Planning, code and reviews', brand: 'claude' },
      { name: 'Codex', use: 'Second pair of eyes on code', glyph: 'terminal-window' },
      { name: 'OpenRouter', use: 'Models inside the apps I ship', brand: 'openrouter' },
      { name: 'n8n', use: 'Automations and AI workflows', brand: 'n8n' },
    ],
  },
  {
    group: 'Build & ship',
    tools: [
      { name: 'VS Code', use: 'Where the code gets written', glyph: 'code' },
      { name: 'GitHub', use: 'Code, reviews and deploys', brand: 'github' },
      { name: 'Docker', use: 'The same setup on every machine', brand: 'docker' },
      { name: 'Vercel', use: 'Hosting and preview links', brand: 'vercel' },
    ],
  },
  {
    group: 'Frontend',
    compact: true,
    tools: [
      { name: 'React', brand: 'react' },
      { name: 'TypeScript', brand: 'typescript' },
      { name: 'JavaScript', brand: 'javascript' },
      { name: 'Tailwind CSS', brand: 'tailwindcss' },
      { name: 'Vite', brand: 'vite' },
      { name: 'React Router', brand: 'reactrouter' },
      { name: 'Framer Motion', brand: 'framer' },
      { name: 'GSAP', brand: 'gsap' },
      { name: 'Astro', brand: 'astro' },
      { name: 'MUI', brand: 'mui' },
      { name: 'Alpine.js', brand: 'alpinedotjs' },
      { name: 'Sass', brand: 'sass' },
      { name: 'HTML', brand: 'html5' },
      { name: 'CSS', brand: 'css' },
    ],
  },
  {
    group: 'Backend',
    compact: true,
    tools: [
      { name: 'Node.js', brand: 'nodedotjs' },
      { name: 'Express', brand: 'express' },
      { name: 'Python', brand: 'python' },
      { name: 'Django REST', brand: 'django' },
      { name: 'FastAPI', brand: 'fastapi' },
      { name: 'Laravel', brand: 'laravel' },
      { name: 'PHP', brand: 'php' },
      { name: 'JWT auth', brand: 'jsonwebtokens' },
      { name: 'Zod', brand: 'zod' },
      { name: 'Pydantic', brand: 'pydantic' },
    ],
  },
  {
    group: 'Data & ML',
    compact: true,
    tools: [
      { name: 'PostgreSQL', brand: 'postgresql' },
      { name: 'Supabase', brand: 'supabase' },
      { name: 'MySQL', brand: 'mysql' },
      { name: 'SQLite', brand: 'sqlite' },
      { name: 'Drizzle', brand: 'drizzle' },
      { name: 'pandas', brand: 'pandas' },
      { name: 'NumPy', brand: 'numpy' },
      { name: 'scikit-learn', brand: 'scikitlearn' },
      { name: 'Streamlit', brand: 'streamlit' },
    ],
  },
  {
    group: 'Testing & shipping',
    compact: true,
    tools: [
      { name: 'Vitest', brand: 'vitest' },
      { name: 'Testing Library', brand: 'testinglibrary' },
      { name: 'ESLint', brand: 'eslint' },
      { name: 'Prettier', brand: 'prettier' },
      { name: 'Git', brand: 'git' },
      { name: 'GitHub Actions', brand: 'githubactions' },
      { name: 'Netlify', brand: 'netlify' },
      { name: 'PWA', brand: 'pwa' },
    ],
  },
];
