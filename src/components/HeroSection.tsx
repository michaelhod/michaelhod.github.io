
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [nameOpacity, setNameOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.querySelector('[data-section="about"]');
      if (aboutSection) {
        const aboutRect = aboutSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate opacity based on how close the about section is to the viewport
        // Start fading when about section is at 65% of viewport and fully hide at 50%
        const fadeStartPoint = viewportHeight * 0.7;
        const fadeEndPoint = viewportHeight * 0.5;
        
        if (aboutRect.top > fadeStartPoint) {
          setNameOpacity(1);
        } else if (aboutRect.top < fadeEndPoint) {
          setNameOpacity(0);
        } else {
          // Calculate gradual fade between start and end points
          const fadeRange = fadeStartPoint - fadeEndPoint;
          const currentPosition = aboutRect.top - fadeEndPoint;
          const opacity = currentPosition / fadeRange;
          setNameOpacity(Math.max(0, Math.min(1, opacity)));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section data-section="hero" className="sticky top-0 h-screen flex items-center justify-center overflow-hidden z-0">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/45 via-background/5 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="inline-block px-8 py-4 bg-background/0 rounded-lg transition-opacity duration-300"
        style={{ opacity: nameOpacity, textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
          <h1 
            className="hero-text font-semibold text-4xl sm:text-7xl md:text-7xl lg:text-8xl text-orange-100 text-foreground font-gilda" >
            Michael Hodgins
          </h1>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <a href="#about" 
        className="absolute bottom-8 transform z-10 text-center"
        style={{ opacity: nameOpacity }}
      >
        <ChevronUp className="w-8 h-8 text-orange-100 mx-auto animate-bounce" />
        <div className="px-2 py-1 bg-black/20 backdrop-blur-md rounded-lg">
          <p className="text-orange-100 text-md font-semibold">Scroll up</p>
        </div>
      </a>
    </section>
  );
};

export default HeroSection;