import { Container } from "@/components/atoms/Container";
import { Heading } from "@/components/atoms/Heading";
const captions = ["Workshop notes", "Interface explorations", "In the studio", "Field research", "Print tests", "Launch day"];
export function GallerySection() { return <section className="py-24"><Container><Heading as="h1" eyebrow="Gallery">Pieces of the process.</Heading><div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">{captions.map((caption, index) => <figure key={caption} className={`flex aspect-square items-end rounded-2xl p-5 ${index % 2 ? "bg-rose-100" : "bg-slate-200"}`}><figcaption className="text-sm font-semibold text-slate-800">{caption}</figcaption></figure>)}</div></Container></section>; }
