import { useState, useEffect } from "react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar when user starts scrolling (after 50px)
      setIsVisible(window.scrollY > 50);

      // Determine current section - prioritize non-hero sections
      const sections = ["about", "projects", "adventures", "music"];
      const scrollPosition = window.scrollY + 100;
      let foundActiveSection = false;

      // Check non-hero sections first
      for (const sectionId of sections) {
        const element = document.querySelector(`[data-section="${sectionId}"]`);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = window.scrollY + rect.top;
          const elementBottom = elementTop + rect.height;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setCurrentSection(sectionId);
            foundActiveSection = true;
            break;
          }
        }
      }

      // Only set hero as active if no other section is active and we're near the top
      if (!foundActiveSection) {
        if (window.scrollY < 200) {
          setCurrentSection("hero");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(`[data-section="${sectionId}"]`);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "music", label: "Music" },
    { id: "adventures", label: "Places" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-500 transform ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-center">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-lg font-gilda tracking-wide cursor-pointer transition-all duration-300 hover:scale-105 ${
                  currentSection === item.id ? 'text-accent' : 'hover-orange'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;