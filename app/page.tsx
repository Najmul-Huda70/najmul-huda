import Hero from "@/components/pages/Hero";
import AboutSection from "@/components/pages/AboutSection";
import TopWork from "@/components/pages/TopWork";
import StatsSection from "@/components/pages/StatsSection";
import JourneySection from "@/components/pages/JourneySection";
import TopBlog from "@/components/pages/TopBlog";


export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <TopWork />
      <TopBlog />
      <StatsSection />
      <JourneySection />
      
    </>
  );
}
