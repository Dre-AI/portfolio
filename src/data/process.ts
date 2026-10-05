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
      usual: 'Routine code and design work done slowly by hand.',
      withAI: 'AI handles first drafts of code, layouts and visuals; I review every piece and craft the parts that matter.',
      icon: 'code',
    },
    {
      title: 'Launch & grow',
      usual: 'Problems found by your customers after launch.',
      withAI: 'Automated speed and SEO checks run before launch, then campaigns bring the right people in.',
      icon: 'rocket-launch',
    },
  ] satisfies ProcessStep[],
};
