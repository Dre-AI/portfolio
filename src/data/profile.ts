// Single source of truth for personal info. Phone number is intentionally omitted.
export const profile = {
  name: 'Derrick Ndiga',
  role: 'AI & Automation Engineer',
  location: 'Nairobi, Kenya',
  headline: 'I build AI automations that do the work.',
  subline:
    'LLM agents, n8n workflows and full-stack apps that run in production, not just in demos.',
  email: 'd9812705@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/derrick-ndiga-76a119311/',
    github: 'https://github.com/Dre-AI',
  },
  cvFile: 'cv/Derrick_Ndiga_CV.pdf', // drop the PDF into public/cv/
  about:
    'I started in hands-on IT: setting up machines, CCTV, networks and corporate email. That grounding shapes how I build automation today. I care less about clever demos and more about systems that keep running on a Monday morning. Right now I build LLM-powered workflows, agents and web apps, and I am studying Cyber Security & Digital Forensics.',
};

// Proof strip. Replace every TODO with a real, honest number before launch.
// Delete any metric you can't back up. Three strong numbers beat five weak ones.
export const metrics = [
  { value: 'TODO', label: 'inbound emails triaged by my LLM bot each week' },
  { value: 'TODO', label: 'hours of manual work automated per week' },
  { value: 'TODO', label: 'growth in organic leads after the Keton rebuild' },
  { value: '99%+', label: 'uptime on the domain and email infrastructure I run' },
];
