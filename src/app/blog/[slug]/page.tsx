import { notFound } from "next/navigation";
import { ArticleContentSection } from "@/components/sections/blog/ArticleContentSection";
import { findArticle } from "@/data/content";

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) { const { slug } = await params; const article = findArticle(slug); if (!article) notFound(); return <ArticleContentSection article={article} />; }
