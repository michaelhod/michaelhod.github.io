import { Github, Linkedin, Download, Youtube } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" data-section="about" className="py-20 bg-cream-light">
      <div className="w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title mb-8 font-gilda">About Me</h2>
          
          <p className="text-lg text-muted-foreground mb-8 font-light leading-relaxed max-w-3xl mx-auto">
            I am a machine learning engineer and full-stack developer specialising in building systems that address real-world challenges.
            Just completed a Master’s in Artificial Intelligence and Machine Learning at Imperial College London.
          </p>
          
          <p className="text-lg text-muted-foreground mb-12 font-light leading-relaxed max-w-3xl mx-auto">
            This site serves as a portfolio of my work, showcasing projects and fun creations that I have made.
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a 
              href="https://github.com/michaelhod" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-social hover:bg-accent hover:text-accent-foreground"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>
            
            <a 
              href="https://www.linkedin.com/in/michael-hodgins/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-social hover:bg-accent hover:text-accent-foreground"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
            
            <a 
              href="https://www.youtube.com/@monkee_m00" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-social hover:bg-accent hover:text-accent-foreground"
              aria-label="YouTube Channel"
            >
              <Youtube size={20} />
            </a>
            
            <a 
              href="/MichaelHodginsCV.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-social hover:bg-accent hover:text-accent-foreground"
              aria-label="Download Resume"
            >
              <span className="text-base font-medium">CV</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;