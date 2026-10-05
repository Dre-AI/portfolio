import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { findContentIssues } from './guards';

/** True when copy is filled in: never publish [bracket] placeholders or TODO (CLAUDE.md). */
export const isReady = (text?: string): text is string => !!text && findContentIssues(text).length === 0;

/** True when a file exists in public/, so we never link to a missing CV or screenshot. */
export const publicFileExists = (path?: string): path is string =>
  !!path && existsSync(join(process.cwd(), 'public', path));

/** The site base URL with exactly one trailing slash, e.g. '/portfolio/'. */
export const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
