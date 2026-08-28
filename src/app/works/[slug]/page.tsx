import { notFound } from "next/navigation";
import { ProjectDetailSection } from "@/components/sections/works/ProjectDetailSection";
import { findWork } from "@/data/content";

export default async function WorkPage({ params }: PageProps<"/works/[slug]">) { const { slug } = await params; const work = findWork(slug); if (!work) notFound(); return <ProjectDetailSection work={work} />; }
