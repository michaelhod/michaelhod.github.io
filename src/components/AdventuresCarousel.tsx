import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { taiwanImages, taiwanCover } from "@/assets/Taiwan";
import { turkiye8Images, turkiye8Cover } from "@/assets/Sailing8";
import { switzerlandImages, switzerlandCover } from "@/assets/Switzerland";
import { turkiye7Images, turkiye7Cover } from "@/assets/Sailing7";
import { greeceImages, greeceCover } from "@/assets/Greece";
const AdventuresCarousel = () => {
  const [selectedAdventure, setSelectedAdventure] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const adventures = [{
    id: 1,
    name: "Roadtrip",
    description: "Motorbiking Through Mountains and Along Oceans",
    location: "Taipei • Hsinchu • Hualien • Taitung • Taroko • Tainan",
    year: "2024",
    image: taiwanCover,
    videoUrl: "https://www.youtube.com/embed/wg_VC9qqzxc?controls=0",
    images: taiwanImages
  }, {
    id: 2,
    name: "Sailing",
    description: "Sailing in the Turkish Riviera",
    location: "Mediterranean Sea, Turkiye",
    year: "2023",
    image: turkiye8Cover,
    videoUrl: "https://youtube.com/embed/7BSKO2uSsgE?controls=0",
    images: turkiye8Images
  }, {
    id: 3,
    name: "Hiking",
    description: "Hiking Throughout Mountain Peaks",
    location: "Swiss Alps, Switzerland",
    year: "2023",
    image: switzerlandCover,
    videoUrl: "https://youtube.com/embed/tiffsB6QSao?controls=0",
    images: switzerlandImages
  }, {
    id: 4,
    name: "Relaxing",
    description: "Relaxing by the Water",
    location: "Ναύπλιο, Greece",
    year: "2023",
    image: greeceCover,
    videoUrl: "https://youtube.com/embed/6vAJ7Igp6GI?controls=0",
    images: greeceImages
  }, {
    id: 5,
    name: "Sailing",
    description: "Sailing in the Turkish Riviera",
    location: "Mediterranean Sea, Turkiye",
    year: "2023",
    image: turkiye7Cover,
    videoUrl: "https://youtube.com/embed/Rb0Y-k4RuXg?controls=0",
    images: turkiye7Images
  }];
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const viewportWidth = window.innerWidth;
        const cardWidth = Math.min(viewportWidth - 48, 640); // responsive width up to max 640px
        const gap = window.innerWidth < 1400 ? 24 : 0; // gap based on viewport width
        const newActiveIndex = Math.round(scrollLeft / (cardWidth + gap));
        setActiveIndex(Math.min(newActiveIndex, adventures.length - 1));
      }
    };
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [adventures.length]);

  // Scroll to expanded image (but not for video interactions)
  useEffect(() => {
    if (expandedImageIndex !== null && expandedImageIndex > 0 && imageRefs.current[expandedImageIndex]) {
      setTimeout(() => {
        imageRefs.current[expandedImageIndex]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 350); // Minimal delay for immediate scroll
    }
  }, [expandedImageIndex]);
  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const viewportWidth = window.innerWidth;
      const cardWidth = Math.min(viewportWidth - 48, 640); // responsive width up to max 640px
      const gap = window.innerWidth < 1400 ? 24 : 0; // gap based on viewport width

      // Check if small phone screen (< 768px)
      const isSmallPhone = window.innerWidth < 768;

      // Calculate position to left-align the card accounting for gaps
      // For small phones, align with viewport left edge by subtracting padding
      const paddingOffset = isSmallPhone ? 24 : 0;
      const scrollPosition = index * (cardWidth + gap) - paddingOffset;
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };
  return <section data-section="adventures" className="py-20 bg-cream-light">
      <div className="w-full">
        <div className="text-center">
          <h2 className="section-title mb-4">Travel & Adventures</h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto px-[2px]">
            A collection of the most colourful
            and beautiful places I have been lucky enough to visit.
          </p>
        </div>
        
        <div className="carousel-container relative">
          {/* Scroll Indicator */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
            <p className="text-md font-light shimmer">Scroll across →</p>
          </div>
          <div ref={scrollRef} className="carousel-scroll pb-4 pt-16 px-[24px]">
            {adventures.map(adventure => <div key={adventure.id} className="flex-shrink-0 w-[calc(100vw-48px)] max-w-[640px]">
                <div className="group overflow-hidden rounded-lg card-elegant aspect-[4/3] relative cursor-pointer" onClick={() => setSelectedAdventure(adventure)}>
                  {!loadedImages.has(`card-${adventure.id}`) && (
                    <Skeleton className="absolute inset-0 w-full h-full" />
                  )}
                  <img 
                    src={adventure.image} 
                    alt={adventure.description} 
                    width="640" 
                    height="480" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    loading="lazy"
                    onLoad={() => setLoadedImages(prev => new Set(prev).add(`card-${adventure.id}`))}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-hero-overlay/70 to-transparent" />
                  <div className="absolute bottom-2 left-4 right-4 text-white transition-transform duration-300 group-hover:-translate-y-2">
                    <h3 className="text-2xl font-normal text-white mb-1 transition-colors duration-300 group-hover:text-orange-500">{adventure.name}</h3>
                    <p className="text-base opacity-95 font-light">{adventure.description}</p>
                    <p className="text-sm opacity-85 mt-1">{adventure.location} • {adventure.year}</p>
                    <div className="opacity-0 translate-y-2 group-hover:translate-y-1 group-hover:opacity-100 transition-all duration-300">
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-orange-500/50 text-sm text-white">
                        <span>See More</span>
                        <svg 
                          className="w-4 h-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7" 
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
          
          {/* Mobile scroll indicator */}
          <div className="flex justify-center mt-4 md:hidden h-3">
            <div className="flex items-center">
              {adventures.map((_, index) => <div key={index} className="w-5 flex justify-center">
                  <div className={`rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-orange-500 w-3 h-3' : 'bg-muted-foreground/30 w-2 h-2'}`}></div>
                </div>)}
            </div>
          </div>
        </div>
      </div>

      {/* Adventure Modal */}
      <Dialog open={selectedAdventure !== null} onOpenChange={() => {
      setSelectedAdventure(null);
      setExpandedImageIndex(null);
    }}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto w-full md:w-[calc(100vw-3rem)] md:left-1/2 md:-translate-x-1/2">
          {selectedAdventure && <>
              <DialogHeader className="pb-6">
                <DialogTitle className="text-3xl text-left font-light">{selectedAdventure.name}</DialogTitle>
                <div className="flex items-center text-left gap-4 text-muted-foreground">
                  <span>{selectedAdventure.location}</span>
                  <span>•</span>
                  <span>{selectedAdventure.year}</span>
                </div>
              </DialogHeader>
              
              <div className="space-y-6">
                
                
                {/* Gallery */}
                <div className="space-y-4">

                  {/* Images Flex Container */}
                  <div className="flex flex-wrap justify-between gap-4">
                    {selectedAdventure.images.slice(1).map((image: string, index: number) => <div key={index + 1} ref={el => imageRefs.current[index + 1] = el} className={`rounded-lg overflow-hidden transition-all duration-500 ease-in-out relative ${expandedImageIndex === index + 1 ? 'w-full aspect-video' : 'aspect-square'}`} style={{
                  flexBasis: expandedImageIndex === index + 1 ? '100%' : 'calc(33.333% - 1rem)',
                  minWidth: expandedImageIndex === index + 1 ? '100%' : 'calc(33.333% - 1rem)'
                }}>
                        {!loadedImages.has(`modal-${selectedAdventure.id}-${index + 1}`) && (
                          <Skeleton className="absolute inset-0 w-full h-full" />
                        )}
                        <img 
                          src={image} 
                          alt={`${selectedAdventure.name} - Image ${index + 2}`} 
                          width="400" 
                          height="400" 
                          className="w-full h-full object-cover cursor-pointer transition-all duration-200 hover:brightness-110" 
                          loading="lazy"
                          onLoad={() => setLoadedImages(prev => new Set(prev).add(`modal-${selectedAdventure.id}-${index + 1}`))}
                          onClick={() => setExpandedImageIndex(expandedImageIndex === index + 1 ? null : index + 1)} 
                        />
                      </div>)}
                  </div>

                  {/* Video */}
                  <div className="rounded-lg overflow-hidden aspect-video">
                    <iframe width="3840" height="2160" src={selectedAdventure.videoUrl} title={`${selectedAdventure.name} - Video`} frameBorder="0" className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </div>
                </div>
              </div>
            </>}
        </DialogContent>
      </Dialog>

    </section>;
};
export default AdventuresCarousel;