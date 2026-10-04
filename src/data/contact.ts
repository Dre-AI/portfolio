// Paste the Web3Forms access key and Cal.com link here when ready; until then the form falls back to email and the booking button is hidden.
export const contactConfig = { web3formsKey: '', calLink: '' };

export const hasForm = (c = contactConfig) => c.web3formsKey.trim().length > 0;
export const hasBooking = (c = contactConfig) => /^https:\/\/cal\.com\//.test(c.calLink);
