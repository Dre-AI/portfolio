// Pure validation for the project brief form. No Astro imports, so node --test can load it.
import { contactCopy } from '../data/studio.ts';

export type BriefField = 'name' | 'email' | 'message';
export type BriefErrors = Partial<Record<BriefField, string>>;

export const MIN_MESSAGE_LENGTH = 10;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateBrief(input: Record<BriefField, string>): BriefErrors {
  const errors: BriefErrors = {};
  if (input.name.trim().length === 0) errors.name = contactCopy.errors.name;
  if (!EMAIL_PATTERN.test(input.email.trim())) errors.email = contactCopy.errors.email;
  if (input.message.trim().length < MIN_MESSAGE_LENGTH) errors.message = contactCopy.errors.message;
  return errors;
}
