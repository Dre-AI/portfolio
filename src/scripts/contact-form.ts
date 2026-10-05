import { validateBrief, type BriefField } from '../lib/validateBrief.ts';

const FIELDS: BriefField[] = ['name', 'email', 'message'];
const ENDPOINT = 'https://api.web3forms.com/submit';

function setup(form: HTMLFormElement): void {
  const status = document.getElementById('contact-status') as HTMLElement;
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const useWeb3 = form.dataset.mode === 'web3forms';
  const messages = {
    success: form.dataset.success ?? '',
    error: form.dataset.error ?? '',
    sending: form.dataset.sending ?? '',
  };
  const control = (f: BriefField) => form.elements.namedItem(f) as HTMLInputElement | HTMLTextAreaElement;
  const errorEl = (f: BriefField) => document.getElementById(`contact-${f}-error`) as HTMLElement;

  const render = (errors: Partial<Record<BriefField, string>>): HTMLElement | null => {
    let first: HTMLElement | null = null;
    for (const f of FIELDS) {
      const input = control(f);
      const msg = errors[f];
      errorEl(f).textContent = msg ?? '';
      if (msg) {
        input.setAttribute('aria-invalid', 'true');
        first ??= input;
      } else {
        input.removeAttribute('aria-invalid');
      }
    }
    return first;
  };

  const read = () => ({ name: control('name').value, email: control('email').value, message: control('message').value });

  for (const f of FIELDS) {
    control(f).addEventListener('input', () => {
      if (control(f).getAttribute('aria-invalid') !== 'true') return;
      const e = validateBrief(read());
      errorEl(f).textContent = e[f] ?? '';
      if (!e[f]) control(f).removeAttribute('aria-invalid');
    });
  }

  form.addEventListener('submit', async (event) => {
    const first = render(validateBrief(read()));
    if (first) {
      event.preventDefault();
      status.textContent = '';
      first.focus();
      return;
    }
    if (!useWeb3) return; // mailto mode: native submit proceeds
    event.preventDefault();
    button.disabled = true;
    status.textContent = messages.sending;
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error('rejected');
      form.reset();
      status.textContent = messages.success;
    } catch {
      status.textContent = messages.error;
    } finally {
      button.disabled = false;
    }
  });
}

const form = document.getElementById('contact-form');
if (form instanceof HTMLFormElement) setup(form);
