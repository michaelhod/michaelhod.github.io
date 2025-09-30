import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import AdventuresCarousel from "@/components/AdventuresCarousel";
import MusicCarousel from "@/components/MusicCarousel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-screen">
          <AboutSection />
          <ProjectsCarousel />
          <MusicCarousel />
          <AdventuresCarousel />
        </div>
      </div>
    </div>
  );
};

export default Index;
