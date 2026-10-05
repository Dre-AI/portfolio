// The tools Derrick builds with, shown on the home page after the process section.
// `brand` is a simple-icons slug (brand logo); `glyph` is a Phosphor icon name for tools without a published logo.
export type Tool = { name: string; use: string; brand?: string; glyph?: string };
export type ToolGroup = { group: string; tools: Tool[] };

export const toolsSection = {
  heading: 'Tools I build with',
  intro: 'The kit behind the speed. AI does the heavy lifting, and every result still passes through my hands.',
};

export const toolGroups: ToolGroup[] = [
  {
    group: 'AI',
    tools: [
      { name: 'Claude', use: 'Planning, code and reviews', brand: 'claude' },
      { name: 'Codex', use: 'Second pair of eyes on code', glyph: 'terminal-window' },
      { name: 'OpenRouter', use: 'Models inside the apps I ship', brand: 'openrouter' },
      { name: 'n8n', use: 'Automations and AI workflows', brand: 'n8n' },
      { name: 'Google Flow', use: 'AI video for films like the hero', glyph: 'film-strip' },
    ],
  },
  {
    group: 'Design & build',
    tools: [
      { name: 'Figma', use: 'Layouts, prototypes and handoff', brand: 'figma' },
      { name: 'VS Code', use: 'Where the code gets written', glyph: 'code' },
      { name: 'GitHub', use: 'Code, reviews and deploys', brand: 'github' },
      { name: 'Docker', use: 'The same setup on every machine', brand: 'docker' },
      { name: 'Vercel', use: 'Hosting and preview links', brand: 'vercel' },
    ],
  },
];
