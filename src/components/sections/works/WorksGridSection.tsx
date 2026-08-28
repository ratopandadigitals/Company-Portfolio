import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
import { works } from "@/data/content";
export function WorksGridSection() { return <section className="py-24"><Container><Heading as="h1" eyebrow="Selected work">Useful work for people with something to say.</Heading><div className="mt-12 grid gap-6 md:grid-cols-2">{works.map((work) => <Link key={work.slug} href={`/works/${work.slug}`} className="rounded-2xl border border-slate-200 p-7 transition hover:-translate-y-1 hover:border-rose-300"><Badge>{work.category}</Badge><h2 className="mt-14 text-3xl font-bold text-slate-950">{work.title}</h2><p className="mt-3 text-slate-600">{work.summary}</p><p className="mt-6 text-sm font-semibold text-rose-700">View case study →</p></Link>)}</div></Container></section>; }
