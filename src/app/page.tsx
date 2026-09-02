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
import { div } from "framer-motion/m";
import WhyUs from "@/components/sections/about/WhyUs";
import FaqSection from "@/components/sections/Faq/FaqSection";
import Cta from "@/components/sections/contact/Cta";
import AboutHome from "@/components/sections/about/AboutHome";

const Home = () => {
  return (
    <div >
      <HeroSection />
      <SectionTwo />
      <TrustedLogos />
       <AboutHome />
      <Marquee />
    
      <ClientProof />
      <SelectedWork />
      <ServiceItem />
   
    <WhyUs />
    <FaqSection />
    <Cta />
    </div>
  )
}

export default Home