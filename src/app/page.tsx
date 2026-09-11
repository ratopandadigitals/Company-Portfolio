import AboutHeroSection from "@/components/sections/about/AboutHome";
import AboutStatement from "@/components/sections/about/AboutStatement";
import ClientProof from "@/components/sections/about/ClientProof";
import HeroSection  from "@/components/sections/home/HeroSection";
import Marquee from "@/components/sections/home/Marquee";
import SectionTwo from "@/components/sections/home/SectionTwo";
import TrustedLogos from "@/components/sections/home/TrustedLogos";
import ServiceItem from "@/components/sections/services/ServiceItem";
import SelectedWork from "@/components/sections/works/SelectedWork";
import AboutheroSection from "@/components/sections/about/AboutHome";

import WhyUs from "@/components/sections/about/WhyUs";
import FaqSection from "@/components/sections/Faq/FaqSection";
import Cta from "@/components/sections/contact/Cta";
import AboutHome from "@/components/sections/about/AboutHome";
import { WORK_ITEMS } from "@/data/works";

const Home = () => {
  const featuredProjects = WORK_ITEMS.slice(0, 3)
  return (
    <div >
      <HeroSection />
      <SectionTwo />
      <TrustedLogos />
       <AboutHome />
        <ServiceItem />
      <Marquee />
      <WhyUs />
    <SelectedWork title="Selected Works" items={featuredProjects} />
    <ClientProof />
    <FaqSection />
    <Cta />
    </div>
  )
}

export default Home