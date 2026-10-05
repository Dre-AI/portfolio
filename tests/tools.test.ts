import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import * as simpleIcons from 'simple-icons';
import { toolGroups, toolsSection } from '../src/data/tools.ts';

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const brandSlugs = new Set(Object.values(simpleIcons).map((i) => (i as { slug: string }).slug));
const allTools = toolGroups.flatMap((g) => g.tools);

test('tools section has a heading and non-empty groups', () => {
  assert.ok(toolsSection.heading.length > 0);
  assert.ok(toolGroups.length >= 2);
  for (const g of toolGroups) assert.ok(g.tools.length > 0, `${g.group} is empty`);
});

test('the tools Derrick named are listed', () => {
  const names = allTools.map((t) => t.name);
  for (const name of ['Claude', 'Codex', 'Figma', 'Docker', 'Canva', 'Photoshop', 'CapCut', 'Google Ads', 'TikTok', 'Mailchimp', 'ChatGPT']) assert.ok(names.includes(name), `${name} missing`);
});

test('tool cards have a use line; stack chips are compact and cover the core stack', () => {
  for (const g of toolGroups) for (const t of g.tools) {
    if (!g.compact) assert.ok(t.use, `${t.name} needs a use line`);
  }
  const stack = toolGroups.filter((g) => g.compact).flatMap((g) => g.tools.map((t) => t.name));
  for (const name of ['React', 'TypeScript', 'Laravel', 'Django REST', 'FastAPI', 'PostgreSQL', 'scikit-learn']) {
    assert.ok(stack.includes(name), `${name} missing from the stack`);
  }
  const names = allTools.map((t) => t.name);
  assert.equal(new Set(names).size, names.length, 'duplicate tool names');
});

test('every tool has exactly one icon source, and each one exists', () => {
  for (const t of allTools) {
    assert.ok(Boolean(t.brand) !== Boolean(t.glyph), `${t.name} needs a brand or a glyph, not both`);
    if (t.brand) assert.ok(brandSlugs.has(t.brand), `${t.name}: unknown simple-icons slug ${t.brand}`);
    if (t.glyph) assert.ok(
      existsSync(new URL(`../node_modules/@phosphor-icons/core/assets/regular/${t.glyph}.svg`, import.meta.url)),
      `${t.name}: unknown Phosphor glyph ${t.glyph}`,
    );
  }
});

test('Tools renders the data with visible names and hidden icons, after the process section', () => {
  const src = read('src/components/Tools.astro');
  assert.match(src, /toolGroups\.map/);
  assert.match(src, /toolsSection\.heading/);
  assert.match(src, /\{tool\.name\}/);
  assert.match(src, /g\.compact/);
  assert.match(src, /brandIcon\(tool\.brand\)/);
  const home = read('src/pages/index.astro');
  assert.match(home, /<Pipeline \/>\s*<Tools \/>/);
  const icons = read('src/lib/icons.ts');
  assert.match(icons, /export const brandIcon/);
  assert.match(icons, /aria-hidden="true"/);
});
