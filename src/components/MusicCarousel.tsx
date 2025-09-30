import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, Music } from "lucide-react";
import bgImage from "@/assets/piano.jpg";
import mcgillIcon from "@/assets/mcgill.webp";

const MusicCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const musicTracks = [{
    id: 1,
    title: "Late Night Summer",
    affiliate: mcgillIcon,
    date: "April 2023",
    description: "Lead the recording session, and mixed and mastered this track",
    duration: "Contessa",
    spotifyUrl: "https://open.spotify.com/track/5Qf5Gqj2YNUhw9rjNwzPxC?si=eab1754f9d2d4d5b",
//  }, {
//    id: 2,
//    title: "Digital Horizons",
//    date: "January 2024",
//    description: "Upbeat synthwave track with retro-futuristic vibes and driving basslines",
//    duration: "3:45",
//    spotifyUrl: "https://open.spotify.com/track/example2",
  }];
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const cardWidth = Math.min(window.innerWidth - 48, 360);
        const newActiveIndex = Math.round(scrollLeft / cardWidth);
        setActiveIndex(Math.min(newActiveIndex, musicTracks.length - 1));
      }
    };
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [musicTracks.length]);
  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = Math.min(window.innerWidth - 48, 360);
      const gap = 24;
      const isSmallPhone = window.innerWidth < 768;
      const paddingOffset = isSmallPhone ? 24 : 0;
      const scrollPosition = index * (cardWidth + gap) - paddingOffset;
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };
  return <section data-section="music" className="relative py-20 bg-background bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${bgImage})` }}>
        
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/65 via-orange-500/10 to-transparent" />

      <div className="relative z-10 w-full">
        <div className="text-center mb-16">
          <div className="inline-block px-8 py-4 bg-card/85 backdrop-blur-sm rounded-lg mb-4">
            <h2 className="section-title mb-4">Music</h2>
            <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto px-[2px]">
              Some of the music I have helped bring into the world. Enjoy!
            </p>
          </div>
        </div>
        
        <div className="carousel-container relative">
          {/* Scroll Indicator HIDDEN FOR NOW WHILE NOT ENOUGH ELEMENTS*/}
          <div className="hidden absolute top-8 right-8 z-20">
            <p className="text-md font-light shimmer">Scroll across →</p>
          </div>
          <div ref={scrollRef} className="carousel-scroll pb-4 pt-2 px-[24px]">
            {musicTracks.map(track => <div key={track.id} className="flex-shrink-0 w-[calc(100vw-48px)] max-w-[480px]">
                <Card className="card-elegant group cursor-pointer h-full hover:border-orange-500 transition-all duration-300 bg-card/85 backdrop-blur-sm">
                  <a href={track.spotifyUrl} target="_blank" rel="noopener noreferrer" className="block h-full flex flex-col">
                    <CardHeader className="pb-1 flex-grow">
                      {/* Top row: Icon + Affiliate image */}
                        <div className="flex justify-between items-start mb-2">
                          {/* Icon */}
                          <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                            <Music className="w-6 h-6 text-orange-500" />
                          </div>

                          {/* Affiliate image (only render if available) */}
                          {track.affiliate && (
                            <img
                              src={track.affiliate}
                              alt={`${track.title} affiliate`}
                              className="w-12 h-12 object-contain rounded-lg"
                            />
                          )}
                        </div>
                      <CardTitle className="text-lg font-normal flex items-center justify-between">
                        {track.title}
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-orange-500 transition-colors" />
                      </CardTitle>
                      <CardDescription className="text-sm text-orange-600 font-medium">
                        {track.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 pb-6 mt-auto">
                      <div className="flex items-center justify-between text-muted-foreground text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {track.date}
                        </div>
                        <span className="text-xs">{track.duration}</span>
                      </div>
                    </CardContent>
                  </a>
                </Card>
              </div>)}
          </div>
          
          {/* Mobile scroll indicator */}
          <div className="flex justify-center mt-4 md:hidden h-3">
            <div className="flex items-center justify-center">
              {musicTracks.map((_, index) => <div key={index} className="w-5 flex justify-center">
                  <div className={`rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-orange-500 w-3 h-3' : 'bg-muted-foreground/30 w-2 h-2'}`} />
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default MusicCarousel;