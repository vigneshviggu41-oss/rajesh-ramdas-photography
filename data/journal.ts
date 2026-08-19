export type JournalEntry = { slug: string; title: string; category: string; date: string; excerpt: string; image: string; href: string };

export const journal: JournalEntry[] = [
  { slug: "waiting-for-the-frame", title: "Waiting for the Frame", category: "Field note", date: "01", excerpt: "The photograph often begins before the camera is raised: in the decision to stay still.", image: "/portfolio/nature/flower-in-focus.jpg", href: "/stories/between-moments" },
  { slug: "light-on-the-river", title: "Light on the River", category: "Observation", date: "02", excerpt: "At dusk, water keeps the light a little longer than the land.", image: "/portfolio/nature/river-horizon.jpg", href: "/stories/the-river-keeps-moving" },
  { slug: "under-a-wide-sky", title: "Under a Wide Sky", category: "Travel note", date: "03", excerpt: "Sometimes scale is the story: one person, looking up.", image: "/portfolio/travel/night-sky-silhouette.jpg", href: "/stories/under-the-same-sky" },
];
