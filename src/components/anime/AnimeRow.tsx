import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Anime } from '@/data/mockData';
import { AnimeCard } from './AnimeCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimeRowProps {
  title: string;
  subtitle?: string;
  animes: Anime[];
  className?: string;
}

export function AnimeRow({ title, subtitle, animes, className }: AnimeRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className={cn("relative group/row", className)}>
      {/* Header */}
      <div className="container mx-auto px-4 mb-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            {subtitle && (
              <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
            )}
          </div>
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="opacity-0 group-hover/row:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="opacity-0 group-hover/row:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="w-[calc(50vw-1rem)] md:w-0 flex-shrink-0" />
        {animes.map((anime, index) => (
          <div
            key={anime.id}
            className="flex-shrink-0 w-[180px] md:w-[200px] snap-start"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <AnimeCard anime={anime} />
          </div>
        ))}
        <div className="w-[calc(50vw-1rem)] md:w-0 flex-shrink-0" />
      </div>
    </section>
  );
}
