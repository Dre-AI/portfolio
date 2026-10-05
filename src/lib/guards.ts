// Copy rules from CLAUDE.md, enforced by tests: no placeholders, no phone numbers, exact tag spelling.
// Pure module: no Astro imports, so node --test can load it.

export const LONG_LIVE_TAG = '#longliveAI';

const PLACEHOLDER = /\[|\]|\bTODO\b|\bTBD\b|\blorem\b|\bX{2,}\b|\{\{/i;
const PHONE = /(?<!\d)(?:\+\d[\d\s-]{8,14}\d|0[17]\d{8}|\(?\d{3,4}\)?[\s-]\d{3}[\s-]?\d{3,4})(?!\d)/;
const TAG_LIKE = /#?long[\s_-]*live[\s_-]*a\.?i\w*/gi;

export type FoundString = { path: string; text: string };

export function collectStrings(value: unknown, path = '$'): FoundString[] {
  if (typeof value === 'string') return [{ path, text: value }];
  if (Array.isArray(value)) return value.flatMap((item, i) => collectStrings(item, `${path}[${i}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => collectStrings(item, `${path}.${key}`));
  }
  return [];
}

function issuesFor({ path, text }: FoundString): string[] {
  const withoutUrls = text.replace(/https?:\/\/\S+/g, '');
  const issues: string[] = [];
  if (PLACEHOLDER.test(withoutUrls)) issues.push(`${path}: placeholder`);
  if (PHONE.test(withoutUrls)) issues.push(`${path}: phone number`);
  const tags = withoutUrls.match(TAG_LIKE) ?? [];
  if (tags.some((tag) => tag !== LONG_LIVE_TAG)) issues.push(`${path}: tag must be ${LONG_LIVE_TAG}`);
  if (/[–—]/.test(withoutUrls)) issues.push(`${path}: em or en dash (use a hyphen)`);
  if ((withoutUrls.match(/·/g) ?? []).length > 1) issues.push(`${path}: more than one middle dot`);
  return issues;
}

export function findContentIssues(value: unknown): string[] {
  return collectStrings(value).flatMap(issuesFor);
}
