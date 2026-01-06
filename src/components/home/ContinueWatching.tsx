import { Link } from 'react-router-dom';
import { Play, X } from 'lucide-react';
import { animeList } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Mock continue watching data
const continueWatching = animeList.slice(0, 4).map((anime, i) => ({
  ...anime,
  progress: Math.floor(Math.random() * 80) + 10,
  lastEpisode: Math.floor(Math.random() * 10) + 1,
}));

export function ContinueWatching() {
  if (continueWatching.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Continue Watching</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {continueWatching.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "group relative rounded-xl overflow-hidden glass hover-lift",
              "animate-slide-up"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Remove Button */}
            <button
              className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
              onClick={(e) => {
                e.preventDefault();
                // Handle remove
              }}
            >
              <X className="w-4 h-4" />
            </button>

            <Link to={`/watch/${item.id}/${item.lastEpisode}`}>
              {/* Thumbnail */}
              <div className="relative aspect-video">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="glow" size="icon" className="rounded-full w-12 h-12">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0">
                  <Progress value={item.progress} className="h-1 rounded-none" />
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Episode {item.lastEpisode} • {item.progress}% complete
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
