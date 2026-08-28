import AboutHeroSection from "@/components/sections/about/AboutHeroSection";
import AboutStatement from "@/components/sections/about/AboutStatement";
import ClientProof from "@/components/sections/about/ClientProof";
import HeroSection  from "@/components/sections/home/HeroSection";
import Marquee from "@/components/sections/home/Marquee";
import SectionTwo from "@/components/sections/home/SectionTwo";
import TrustedLogos from "@/components/sections/home/TrustedLogos";
import ServiceItem from "@/components/sections/services/ServiceItem";
import SelectedWork from "@/components/sections/works/SelectedWork";
import AboutheroSection from "@/components/sections/about/AboutHeroSection";
import { div } from "framer-motion/m";


const Home = () => {
  return (
    <div >
      <HeroSection />
      <SectionTwo />
      <TrustedLogos />
      <Marquee />
      <AboutStatement />
      <ClientProof />
      <SelectedWork />
    <ServiceItem />
    <AboutHeroSection />
    </div>
  )
}

export default Home