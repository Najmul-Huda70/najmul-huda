import Hero from "@/components/pages/Hero";
import AboutSection from "@/components/pages/AboutSection";
import TopProjects from "@/components/pages/TopProjects";
import StatsSection from "@/components/pages/StatsSection";
import JourneySection from "@/components/pages/JourneySection";


export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <TopProjects />
      <StatsSection />
      <JourneySection />
    </>
  );
}
