import { Badge } from "@/components/atoms/Badge";
import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
const events = [["Open studio: product critique", "August 28, 2026", "Kathmandu"], ["Making systems feel human", "September 12, 2026", "Online"]];
export function EventsSection() { return <section className="py-24"><Container><Heading as="h1" eyebrow="Events">Meet us in the room.</Heading><div className="mt-12 divide-y divide-slate-200">{events.map(([title, date, place]) => <article key={title} className="grid gap-4 py-7 sm:grid-cols-[1fr_auto]"><div><Badge>{date}</Badge><h2 className="mt-4 text-2xl font-bold">{title}</h2></div><p className="self-center text-slate-600">{place}</p></article>)}</div></Container></section>; }
