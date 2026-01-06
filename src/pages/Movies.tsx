import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { AnimeCard } from '@/components/anime/AnimeCard';
import { animeList } from '@/data/mockData';

const movies = animeList.filter((a) => a.type === 'movie' || a.episodes === 1);

export default function Movies() {
  return (
    <>
      <Helmet>
        <title>Anime Movies | AniStream</title>
        <meta
          name="description"
          content="Watch the best anime movies in HD. From action-packed adventures to emotional dramas, find your next favorite anime film."
        />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-secondary/20" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <span className="text-6xl mb-4 block animate-float">🎬</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Anime Movies
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience epic anime adventures in full movie format. 
              From timeless classics to the latest releases.
            </p>
          </div>
        </section>

        {/* Content Grid */}
        <section className="container mx-auto px-4 py-12">
          {movies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {movies.map((anime, index) => (
                <div
                  key={anime.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <AnimeCard anime={anime} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎥</div>
              <h3 className="text-xl font-semibold mb-2">
                Movies coming soon!
              </h3>
              <p className="text-muted-foreground">
                We're adding anime movies to our collection. Check back soon!
              </p>
            </div>
          )}
        </section>
      </Layout>
    </>
  );
}
