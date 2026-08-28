export type Work = { slug: string; title: string; client: string; category: string; year: string; summary: string; challenge: string; outcome: string; services: string[] };
export type Article = { slug: string; title: string; excerpt: string; publishedAt: string; readTime: string; body: string[] };

export const works: Work[] = [
  { slug: "field-notes", title: "Field Notes", client: "Alta Studio", category: "Brand platform", year: "2026", summary: "A flexible editorial system for a studio documenting place and process.", challenge: "Turn a growing archive into a calm, useful publishing experience.", outcome: "A modular identity and site system that lets the team publish new stories without redesigning every page.", services: ["Strategy", "Visual identity", "Web design"] },
  { slug: "common-ground", title: "Common Ground", client: "Civic Lab", category: "Digital product", year: "2025", summary: "A public-facing service that helps neighbours find local initiatives.", challenge: "Make a dense set of local opportunities easy to scan and act upon.", outcome: "A clear discovery experience that connects residents with small, practical ways to participate.", services: ["UX design", "Interface design", "Front-end"] },
  { slug: "slow-bloom", title: "Slow Bloom", client: "Mara Botanics", category: "Commerce", year: "2025", summary: "A gentle online home for a small-batch botanical care brand.", challenge: "Make product education feel as considered as the products themselves.", outcome: "An editorial commerce direction that gives each ingredient and ritual room to breathe.", services: ["Art direction", "E-commerce", "Content design"] },
];

export const articles: Article[] = [
  { slug: "designing-for-clarity", title: "Designing for clarity, not noise", excerpt: "Three decisions that help a digital experience earn attention instead of demanding it.", publishedAt: "June 12, 2026", readTime: "4 min read", body: ["Clarity is not a lack of personality. It is the discipline of deciding what matters before adding what looks impressive.", "We start with the job a visitor needs to complete, then make hierarchy, language, and interaction support that path."] },
  { slug: "small-systems-big-impact", title: "Small systems, big impact", excerpt: "Why a few well-named components can make a growing site much easier to maintain.", publishedAt: "May 28, 2026", readTime: "5 min read", body: ["A system does not need to begin as a large library. It can begin with the small, repeated decisions that deserve a shared home.", "Naming and reusing those decisions makes future work faster and gives every new page a familiar foundation."] },
  { slug: "a-better-project-kickoff", title: "A better project kickoff", excerpt: "The questions that make the first week of a design partnership more productive.", publishedAt: "April 16, 2026", readTime: "3 min read", body: ["The best projects make room for shared context early. We ask what must change, who it serves, and how success will be noticed.", "A clear kickoff does not remove discovery; it gives discovery a useful direction."] },
];

export const findWork = (slug: string) => works.find((work) => work.slug === slug);
export const findArticle = (slug: string) => articles.find((article) => article.slug === slug);
