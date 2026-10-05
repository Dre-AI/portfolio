// Web3Forms access keys are public by design (they ship in the form markup); the key only lets the form send to Derrick's inbox.
// Clear either value to fall back: no key = the form opens the visitor's email app; no link = the booking button is hidden.
export const contactConfig = {
  web3formsKey: '5c3f0994-62a1-4d8d-8272-506b4cf3e9cf',
  calLink: 'https://cal.com/derrick-ndiga-j9ooko',
};

export const hasForm = (c = contactConfig) => c.web3formsKey.trim().length > 0;
export const hasBooking = (c = contactConfig) => /^https:\/\/cal\.com\//.test(c.calLink);
