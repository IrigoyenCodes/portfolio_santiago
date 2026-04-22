/** Shared type for a project entry. Consumed by server helpers and client components via props. */
export type ProjectDetails = {
  slug: string;
  order: number; // controls display order in the Projects carousel
  title: string;
  subtitle: string;
  about: string; // paragraphs separated by \n\n
  challenge: {
    title: string;
    description: string;
    cards: { title: string; description: string }[];
  };
  solution: {
    title: string;
    description: string;
    features: { title: string; description: string }[];
  };
  techStack: {
    title: string;
    description: string;
    categories: { name: string; description: string }[];
  };
  results: { title: string; description: string }[];
  image: string;
  gallery: string[];
  stats: string[];
  liveDemo?: string;
};
