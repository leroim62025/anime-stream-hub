import { Link } from 'react-router-dom';
import { Play, Star, Info } from 'lucide-react';
import { Anime } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AnimeCardProps {
  anime: Anime;
  featured?: boolean;
  className?: string;
}

export function AnimeCard({ anime, featured = false, className }: AnimeCardProps) {
  const ageRatingColors = {
    kids: 'bg-green-500/20 text-green-400 border-green-500/30',
    teens: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    adults: 'bg-red-500/20 text-red-400 border-red-500/30',
    all: 'bg-primary/20 text-primary border-primary/30',
  };

  return (
    <Link
      to={`/anime/${anime.id}`}
      className={cn(
        "group relative block rounded-xl overflow-hidden hover-lift",
        featured ? "aspect-[2/3]" : "aspect-[2/3]",
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={anime.coverImage}
          alt={anime.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <Badge
            variant="outline"
            className={cn("text-xs", ageRatingColors[anime.ageRating])}
          >
            {anime.ageRating.toUpperCase()}
          </Badge>
          {anime.status === 'ongoing' && (
            <Badge className="bg-primary/90 text-primary-foreground text-xs animate-pulse-glow">
              NEW
            </Badge>
          )}
        </div>

        {/* Play Button - appears on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="glow"
            size="lg"
            className="rounded-full w-16 h-16 p-0"
          >
            <Play className="w-6 h-6 fill-current ml-1" />
          </Button>
        </div>

        {/* Info */}
        <div className="relative z-10 space-y-2">
          <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {anime.title}
          </h3>
          {anime.titleJapanese && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              {anime.titleJapanese}
            </p>
          )}
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              <span className="font-medium">{anime.rating}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{anime.year}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{anime.episodes} eps</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
