import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Calendar, ExternalLink, Github, Brain, LineChart, Cpu,
  Activity, Share2, 
  Code2, Terminal, Wrench, Bot, Globe, Monitor,
  Trees, TreePine, TreeDeciduous,
  ShieldHalf
} from "lucide-react";
import iaeaIcon from "@/assets/IAEA.png";
import imperialIcon from "@/assets/imperial.jpg";
import e2vIcon from "@/assets/e2vLogo.webp";
import mylogo from "@/assets/myLOGO.ico";
const ProjectsCarousel = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const projects = [{
    id: 1,
    icon: ShieldHalf,
    affiliate: mylogo,
    title: "Info-Protect",
    date: "Present",
    oneLiner: "Founded a company using AI to take down content that infringes upon IP or hurts an individual's personal image.",
    description: "Building an Agentic AI, SaaS hosted on GCP that allows both businesses and individuals to remove content and products online that infringes their IP or hurts their personal brand. This avoids the expensive and continuous process of our customers to scan the internet themselves, notify their (expensive) lawyer and ask them to take down this infringing activity. Through automated webscraping and identification of infringement with AI, this service automatically removes any damaging activity before it can meaningfully damage the company or personal brand.",
    technologies: ["Agentic AI", "GCP", "Cloud Computing", "Docker", "Image recognition", "SaaS"],
    challenges: "Companies need to remove products online that infringe their IP. Individuals need to remove content online that hurts their personal brand. This involves a lawyer, is an expensive process, and continuously occurs.",
    github: "https://github.com/Info-Protect"
  }, {
    id: 2,
    icon: Share2,
    affiliate: iaeaIcon,
    title: "Dissertation - HTML Fact-Extraction",
    date: "September 2025",
    oneLiner: "Using ML to help the IAEA with effective surveillance over nuclear material.",
    description: "Developed a pipline that extracted facts from and HTML using a graph transformer, FLAN-T5 and traditional graph algorithms. The project involved researching state-of-the-art techniques, designing a novel architecture to improve upon them, and optimizing model performance through hyperparameter tuning. Outperformed state-of-the-art GraphScholarBERT by raising F1 score from 0.75 to 0.85. This pipeline takes approximately 1 minute 15 seconds to run and costs appropriately $0.002US per average news article.",
    technologies: ["PyTorch", "GNNs", "HuggingFace", "BERT", "Python", "Git"],
    challenges: "The IAEA needed a cheap way to extract facts from a large set of websites to create a fact database. ChatGPT was too expensive.",
    github: "https://github.com/michaelhod/IAEA-thesis"
  }, {
    id: 3,
    icon: Activity,
    affiliate: imperialIcon,
    title: "Flagging Acute Kidney Injury (AKI)",
    date: "April 2025",
    oneLiner: "Creating, integrating and maintaining an ML system to integrate into the NHS emergency room.",
    description: "Our team built an end-to-end machine learning software MVP to reduce the strain on the ER and increase diagnosis accuracy. It was built to be plugged straight into an NHS hospital: including listening to live HL7 messages, AKI detection, and notifying positives to the hospital's paging system. It integrated with grafana to provide real-time insights through interactive dashboards. We cut down diagnosis times from minutes to under a second, and improved on the NHS’ 73% accuracy baseline to 95%.",
    technologies: ["Docker", "Kubernetes", "Scikit-learn", "Decision Trees", "Neural Networks", "Grafana", "Python", "Git"],
    challenges: "Acute kidney injury (AKI) is associated with 100,000 deaths in emergency room patients a year. 30% of these deaths could be prevented with the right care and treatment. The NHS detects AKI cases manually using a flow chart which correctly detects 73% of cases.",
    github: "https://github.com/michaelhod/NHSAKI",
  }, {
    id: 4,
    icon: Trees,
    affiliate: e2vIcon,
    title: "eco2Veritas",
    date: "2023-2024",
    oneLiner: "A platform providing monitoring, certification, compliance, and traceability across material flows.",
    description: "Helped build the eco2Veritas platform; a Blazor application hosted on Azure. Led the development of automated UI testing using xUnit, Selenium, and Gherkin-based BDD tests, integrating them into Azure DevOps pipelines to enhance reliability and streamline debugging. Also supervised a project to build a client-facing data visualization solution, evaluating tools such as PowerBI and Grafana before implementing Grafana dashboards and supporting APIs into the platform. Working in a start-up environment allowed me to take initiative across projects, strengthening my skills in agile development, cloud services, and stakeholder-focused solutions.",
    technologies: ["Azure", "Selenium", "xUnit", "Gherkin", "C#", "JS", "Grafana", "HTML/CSS"],
    challenges: "Organizations want to demonstrate genuine environmental responsibility to meet growing regulatory and consumer demands. eco₂Veritas helps organisations substantiate their sustainability claims with transparent, verifiable data.",
    demo: "https://www.eco2veritas.com/"
  }, {
    id: 5,
    icon: Bot,
    affiliate: imperialIcon,
    title: "Robot Learning",
    date: "March 2025",
    oneLiner: "Built a \"robot brain\" to teach itself the quickest path through varied rough terrain.",
    description: "Developed a behavioral cloning approach using demonstrations to train four independent neural networks for action prediction. Designed an uncertainty detection system by comparing model outputs, triggering new demonstrations to improve accuracy. Enhanced reliability by incorporating high-reward actions into training and correcting cases where the robot stalled despite high confidence. Optimized performance through systematic resets and robust handling of edge cases, ensuring consistent goal completion.",
    technologies: ["RL", "Imitation Learning", "Neural Networks", "PyTorch", "Python"],
    challenges: "A fun project to help a robot learn its surrounding and navigate quickly through a terrain varying in resistance to a finish line.",
    github: "https://github.com/michaelhod/Robot-Path-Learning"
  }, {
    id: 6,
    icon: Brain,
    affiliate: imperialIcon,
    title: "Brain Graph Super-Resolution",
    date: "April 2025",
    oneLiner: "Generated high-resolution (HR) brain graphs from low-resolution (LR) brain graphs using generative graph neural networks.",
    description: "Since access to a high quality MRI machine is restricted for some, our team trained a generative GNN developing a graph super-resolution model to upscale low-resolution brain graphs into higher-resolution ones. We implemented a modified version of Pragya Singh and Islem Rekik's STP-GSR model, adding intermediate steps in edge initialization and residual connections, providing stability and better generalization. The model demonstrated strong performance across most evaluation metrics, outperforming STP-GSR, though at higher computational cost.",
    technologies: ["Graph Super-Resolution", "Generative GNNs", "PyTorch", "Python", "Git"],
    challenges: "MRI scans can vary in quality, depending on MRI machine. High resolution images of brain scans can only be taken with expensive and rare MRI machines.",
    github: "https://github.com/michaelhod/Generative-GNN-Brain-Graphs",
    demo: "https://arxiv.org/abs/2411.02525"
  // }, {
  //   id: 6,
  //   icon: Globe,
  //   title: "This webstie!",
  //   date: "September 2025",
  //   oneLiner: "A personal hub to collect some of the things I have done in one place.",
  //   description: "Designed and built this website from scratch. Prototyped a rough version using AI tooling (Lovable), then refined and polished it into a clean and responsive final product within a few days.",
  //   technologies: ["React", "Lovable", "Tailwind CSS"],
  //   challenges: "I wanted a dedicated space to share my creations in one place, rather than scattering them across different platforms.",
  //   github: "#",
  //   demo: "#"
  }];
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const cardWidth = Math.min(window.innerWidth - 48, 480); // 75% of doubled size
        const newActiveIndex = Math.round(scrollLeft / cardWidth);
        setActiveIndex(Math.min(newActiveIndex, projects.length - 1));
      }
    };
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [projects.length]);
  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = Math.min(window.innerWidth - 48, 480); // 75% of doubled size
      const gap = 24; // default gap-6 = 24px

      // Check if small phone screen (< 768px)
      const isSmallPhone = window.innerWidth < 768;

      // Calculate position to left-align the card with 24px offset from left
      // For small phones, align with viewport left edge by subtracting padding
      const paddingOffset = isSmallPhone ? 24 : 0;
      const scrollPosition = index * (cardWidth + gap) - paddingOffset;
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };
  return <section data-section="projects" className="py-20 bg-background">
      <div className="w-full">
        <div className="text-center">
          <h2 className="section-title mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto px-[2px]">
            A overview of some of the machine learning and software projects I have been involved with.
          </p>
        </div>
        
        <div className="carousel-container relative">
          {/* Scroll Indicator */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
            <p className="text-md font-light shimmer">Scroll across →</p>
          </div>
          <div ref={scrollRef} className="carousel-scroll pb-4 pt-16 px-[24px]">
            {projects.map(project => {
            const Icon = project.icon;
            return <div key={project.id} className="flex-shrink-0 w-[calc(100vw-48px)] max-w-[480px]">
                  <Card className="card-elegant group cursor-pointer h-full hover:border-orange-500 transition-all duration-300" onClick={() => setSelectedProject(project)}>
                    <CardHeader className="pb-4">
                      {/* Top row: Icon + Affiliate image */}
                        <div className="flex justify-between items-start mb-4">
                          {/* Icon */}
                          <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                            <Icon className="w-6 h-6 text-orange-500" />
                          </div>

                          {/* Affiliate image (only render if available) */}
                          {project.affiliate && (
                            <img
                              src={project.affiliate}
                              alt={`${project.title} affiliate`}
                              className="w-12 h-12 object-contain rounded-lg"
                            />
                          )}
                        </div>
                      <CardTitle className="text-lg font-normal">{project.title}</CardTitle>
                      <CardDescription className="text-sm text-orange-600 font-medium">
                        {project.oneLiner}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-muted-foreground text-sm mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        {project.date}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, index) => <Badge key={index} variant="secondary" className="text-xs font-light">
                            {tech}
                          </Badge>)}
                        {project.technologies.length > 3 && <Badge variant="outline" className="text-xs font-light">
                            +{project.technologies.length - 3}
                          </Badge>}
                      </div>
                    </CardContent>
                  </Card>
                </div>;
          })}
          </div>
          
          {/* Mobile scroll indicator */}
          <div className="flex justify-center mt-4 md:hidden h-3">
            <div className="flex items-center">
              {projects.map((_, index) => <div key={index} className="w-5 flex justify-center">
                  <div className={`rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-orange-500 w-3 h-3' : 'bg-muted-foreground/30 w-2 h-2'}`}></div>
                </div>)}
            </div>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto w-full md:w-[calc(100vw-3rem)] md:left-1/2 md:-translate-x-1/2">
          {selectedProject && <>
              <DialogHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <DialogTitle className="text-2xl font-normal">{selectedProject.title}</DialogTitle>
                  <div className="flex items-center justify-center gap-4 my-0 mx-[15px]">
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {selectedProject.date}
                    </div>
                    {(selectedProject.github && selectedProject.github !== "#") || (selectedProject.demo && selectedProject.demo !== "#") ? (
                      <div className="flex gap-2">
                        {selectedProject.github && selectedProject.github !== "#" && (
                          <a href={selectedProject.github} className="text-muted-foreground hover:text-orange-500 transition-colors" aria-label="View GitHub repository">
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {selectedProject.demo && selectedProject.demo !== "#" && (
                          <a href={selectedProject.demo} className="text-muted-foreground hover:text-orange-500 transition-colors" aria-label="View live demo">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
                
                <p className="text-base text-orange-600 font-medium">
                  {selectedProject.oneLiner}
                </p>
              </DialogHeader>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2 text-destructive">Why?</h4>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    {selectedProject.challenges}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-orange-600">Solution</h4>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech: string, index: number) => <Badge key={index} variant="secondary" className="font-light">
                        {tech}
                      </Badge>)}
                  </div>
                </div>
              </div>
            </>}
        </DialogContent>
      </Dialog>
    </section>;
};
export default ProjectsCarousel;