// Usage: node scripts/check-dist.mjs  (run after `astro build`; Node 22.18+ for .ts imports)
// Fails when the retired #longliveAI tag, or the unapproved cleaning concept's client name, leaks into any built text file.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { featuredWork } from '../src/data/work.ts';

const dist = fileURLToPath(new URL('../dist', import.meta.url));
const TEXT = new Set(['.html', '.js', '.mjs', '.css', '.json', '.xml', '.txt', '.webmanifest']);
const CLIENT_NAME = /bazaar/i;

if (!existsSync(dist)) {
  console.error('check-dist: dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

const walkText = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walkText(full) : [full];
  }).filter((file) => TEXT.has(extname(file).toLowerCase()));

const tagLeaks = walkText(dist).filter((file) => /longlive/i.test(readFileSync(file, 'utf8')));
if (tagLeaks.length) {
  console.error('check-dist: retired #longliveAI tag found in:');
  tagLeaks.forEach((file) => console.error(`  ${file}`));
  process.exit(1);
}

const concept = featuredWork.find((item) => item.slug === 'cleaning-concept');
if (concept?.clientApproved) {
  console.log('check-dist: cleaning concept is approved, skipping client-name check.');
  process.exit(0);
}

const offenders = walkText(dist)
  .filter((file) => CLIENT_NAME.test(readFileSync(file, 'utf8')));

if (offenders.length) {
  console.error('check-dist: unapproved client name found in:');
  offenders.forEach((file) => console.error(`  ${file}`));
  process.exit(1);
}
console.log('check-dist: dist/ is clean.');
