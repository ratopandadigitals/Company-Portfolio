
import ClientProof from "@/components/sections/about/ClientProof";
import HeroSection  from "@/components/sections/home/HeroSection";
import Marquee from "@/components/sections/home/Marquee";
// import SectionTwo from "@/components/sections/home/CollageSection";
// import TrustedLogos from "@/components/sections/home/TrustedLogos";
import ServiceItem from "@/components/sections/services/ServiceItem";
import SelectedWork from "@/components/sections/works/SelectedWork";
import WhyUs from "@/components/sections/about/WhyUs";
import FaqSection from "@/components/sections/Faq/FaqSection";
import Cta from "@/components/sections/contact/Cta";
import AboutHome from "@/components/sections/about/AboutHome";
import Homeprocess from "@/components/sections/services/HomeProcess";
import clientPromise from '@/lib/mongodb'
import type { StatDocument, TestimonialDocument } from '@/types/database'

const Home = async () => {
  const client = await clientPromise
  const db = client.db('rato_panda_portfolio')
  const [stats, testimonials] = await Promise.all([
    db.collection<StatDocument>('stats').find({}).sort({ id: 1 }).toArray(),
    db.collection<TestimonialDocument>('testimonials').find({}).sort({ id: 1 }).toArray(),
  ])

  return (
    <div >
      <HeroSection />
      {/* <SectionTwo /> */}
      {/* <TrustedLogos /> */}
       <AboutHome />
        <ServiceItem />
      <Marquee />
      <WhyUs />
    <SelectedWork title="Selected Works" showFilter={false} limit={3} />
    <Homeprocess />
    <ClientProof
      stats={stats.map(({ id, value, label }) => ({ id, value, label }))}
      testimonials={testimonials.map(({ id, quote, name, role, bgImage }) => ({
        id,
        quote,
        name,
        role,
        bgImage,
      }))}
    />
    <FaqSection />
    <Cta />
    </div>
  )
}

export default Home