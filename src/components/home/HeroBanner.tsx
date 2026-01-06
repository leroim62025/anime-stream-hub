import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { animeList } from '@/data/mockData';
import { cn } from '@/lib/utils';

const featuredAnimes = animeList.filter((a) => a.featured);

export function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentAnime = featuredAnimes[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredAnimes.length);
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === 0 ? featuredAnimes.length - 1 : prev - 1
      );
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Background Image */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isTransitioning ? "opacity-0" : "opacity-100"
        )}
      >
        <img
          src={currentAnime.bannerImage || currentAnime.coverImage}
          alt={currentAnime.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        {/* Glow Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 gradient-glow opacity-50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div
          className={cn(
            "max-w-2xl transition-all duration-500",
            isTransitioning
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0"
          )}
        >
          {/* Badges */}
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-primary/90 text-primary-foreground px-3 py-1">
              <Star className="w-3 h-3 mr-1 fill-current" />
              {currentAnime.rating}
            </Badge>
            <Badge variant="outline" className="border-border/50">
              {currentAnime.year}
            </Badge>
            <Badge variant="outline" className="border-border/50">
              {currentAnime.episodes} Episodes
            </Badge>
            {currentAnime.status === 'ongoing' && (
              <Badge className="bg-accent text-accent-foreground animate-pulse-glow">
                Ongoing
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-2 leading-tight">
            {currentAnime.title}
          </h1>
          {currentAnime.titleJapanese && (
            <p className="text-xl text-muted-foreground mb-4">
              {currentAnime.titleJapanese}
            </p>
          )}

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-6 line-clamp-3 md:line-clamp-4">
            {currentAnime.description}
          </p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-8">
            {currentAnime.genres.map((genre) => (
              <Badge
                key={genre}
                variant="outline"
                className="bg-muted/50 border-border/50 capitalize"
              >
                {genre}
              </Badge>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link to={`/watch/${currentAnime.id}/1`}>
              <Button variant="hero" size="xl">
                <Play className="w-5 h-5 fill-current" />
                Watch Now
              </Button>
            </Link>
            <Link to={`/anime/${currentAnime.id}`}>
              <Button variant="glass" size="xl">
                <Info className="w-5 h-5" />
                More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-1/2 left-4 right-4 flex justify-between items-center pointer-events-none z-20">
        <Button
          variant="glass"
          size="icon"
          onClick={handlePrev}
          className="pointer-events-auto opacity-50 hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="glass"
          size="icon"
          onClick={handleNext}
          className="pointer-events-auto opacity-50 hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {featuredAnimes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentIndex
                ? "w-8 bg-primary"
                : "bg-muted-foreground/50 hover:bg-muted-foreground"
            )}
          />
        ))}
      </div>
    </section>
  );
}
