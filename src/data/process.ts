// The pinned "why AI is faster" section. Each step contrasts the usual way with mine. Qualitative only: no invented numbers.
export type ProcessStep = { title: string; usual: string; withAI: string; icon: string };

export const processSection = {
  heading: 'Why I finish sooner',
  usualLabel: 'Usually',
  withAILabel: 'With AI',
  intro: 'Same craft, less waiting. Here is where AI takes time out of a project.',
  steps: [
    {
      title: 'Discover',
      usual: 'Weeks of back-and-forth before anyone sees a plan.',
      withAI: 'AI-assisted research and competitor scans give me a clear brief in the first conversations.',
      icon: 'magnifying-glass',
    },
    {
      title: 'Design',
      usual: 'One concept, then a long wait for the next round.',
      withAI: 'Several real directions early, so you choose instead of waiting.',
      icon: 'pen-nib',
    },
    {
      title: 'Build with AI',
      usual: 'Routine code written slowly by hand.',
      withAI: 'AI handles scaffolding and first drafts; I review every line and engineer the hard parts.',
      icon: 'code',
    },
    {
      title: 'Launch & grow',
      usual: 'Problems found by your customers after launch.',
      withAI: 'Automated accessibility, speed and SEO checks run before launch, not after your customers find the problems.',
      icon: 'rocket-launch',
    },
  ] satisfies ProcessStep[],
};
