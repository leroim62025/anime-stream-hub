import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Play,
  Plus,
  Share2,
  Star,
  Calendar,
  Tv,
  Globe,
  Volume2,
  Subtitles,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimeRow } from '@/components/anime/AnimeRow';
import { animeList, episodes } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function AnimeDetail() {
  const { id } = useParams<{ id: string }>();
  const anime = animeList.find((a) => a.id === id);

  if (!anime) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Anime not found</h1>
          <Link to="/browse">
            <Button>Browse All Anime</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const animeEpisodes = episodes.filter((ep) => ep.animeId === id);
  const similarAnimes = animeList
    .filter(
      (a) =>
        a.id !== id && a.genres.some((g) => anime.genres.includes(g))
    )
    .slice(0, 8);

  const ageRatingColors = {
    kids: 'bg-green-500/20 text-green-400',
    teens: 'bg-yellow-500/20 text-yellow-400',
    adults: 'bg-red-500/20 text-red-400',
    all: 'bg-primary/20 text-primary',
  };

  return (
    <>
      <Helmet>
        <title>{anime.title} - Watch on AniStream</title>
        <meta name="description" content={anime.description} />
      </Helmet>

      <Layout>
        {/* Hero Section */}
        <section className="relative min-h-[60vh] md:min-h-[70vh]">
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src={anime.bannerImage || anime.coverImage}
              alt={anime.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 relative z-10 pt-20 pb-12">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Cover Image */}
              <div className="flex-shrink-0">
                <div className="w-48 md:w-64 rounded-xl overflow-hidden shadow-2xl glow mx-auto md:mx-0">
                  <img
                    src={anime.coverImage}
                    alt={anime.title}
                    className="w-full h-auto"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-4">
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge className={ageRatingColors[anime.ageRating]}>
                    {anime.ageRating.toUpperCase()}
                  </Badge>
                  {anime.status === 'ongoing' && (
                    <Badge className="bg-primary text-primary-foreground">
                      Ongoing
                    </Badge>
                  )}
                  <Badge variant="outline" className="border-border/50">
                    {anime.type.toUpperCase()}
                  </Badge>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-bold">{anime.title}</h1>
                {anime.titleJapanese && (
                  <p className="text-xl text-muted-foreground">
                    {anime.titleJapanese}
                  </p>
                )}

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold text-lg">{anime.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {anime.year}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Tv className="w-4 h-4" />
                    {anime.episodes} Episodes
                  </div>
                  {anime.studio && (
                    <div className="text-muted-foreground">
                      Studio: {anime.studio}
                    </div>
                  )}
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2">
                  {anime.genres.map((genre) => (
                    <Badge
                      key={genre}
                      variant="outline"
                      className="capitalize border-border/50"
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  {anime.description}
                </p>

                {/* Languages */}
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Audio:</span>
                    <span>{anime.languages.audio.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Subtitles className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Subtitles:</span>
                    <span>{anime.languages.subtitles.join(', ')}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <Link to={`/watch/${anime.id}/1`}>
                    <Button variant="hero" size="lg">
                      <Play className="w-5 h-5 fill-current" />
                      Start Watching
                    </Button>
                  </Link>
                  <Button variant="glass" size="lg">
                    <Plus className="w-5 h-5" />
                    Add to List
                  </Button>
                  <Button variant="ghost" size="lg">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Episodes & More */}
        <section className="container mx-auto px-4 py-8">
          <Tabs defaultValue="episodes" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="episodes">Episodes</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="related">Related</TabsTrigger>
            </TabsList>

            <TabsContent value="episodes" className="space-y-4">
              {animeEpisodes.length > 0 ? (
                <div className="grid gap-4">
                  {animeEpisodes.map((episode, index) => (
                    <Link
                      key={episode.id}
                      to={`/watch/${anime.id}/${episode.number}`}
                      className={cn(
                        "flex gap-4 p-4 rounded-xl glass hover:bg-muted/50 transition-all group animate-slide-up"
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="relative w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={episode.thumbnail}
                          alt={episode.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-8 h-8 fill-current" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-primary font-medium">
                            Episode {episode.number}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {episode.duration}
                          </span>
                        </div>
                        <h3 className="font-semibold mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                          {episode.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {episode.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No episodes available yet. Check back soon!
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="details">
              <div className="glass rounded-xl p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Information</h4>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Type</dt>
                        <dd className="capitalize">{anime.type}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Episodes</dt>
                        <dd>{anime.episodes}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Status</dt>
                        <dd className="capitalize">{anime.status}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Year</dt>
                        <dd>{anime.year}</dd>
                      </div>
                      {anime.studio && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Studio</dt>
                          <dd>{anime.studio}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Languages</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Audio: </span>
                        <span>{anime.languages.audio.join(', ')}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Subtitles: </span>
                        <span>{anime.languages.subtitles.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="related">
              <div className="py-4">
                <AnimeRow
                  title="You might also like"
                  animes={similarAnimes}
                />
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </Layout>
    </>
  );
}
