import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { AnimeCard } from '@/components/anime/AnimeCard';
import { animeList } from '@/data/mockData';

const kidsContent = animeList.filter((a) => a.ageRating === 'kids');

export default function Kids() {
  return (
    <>
      <Helmet>
        <title>Kids Zone - Safe Anime & Cartoons | AniStream</title>
        <meta
          name="description"
          content="Safe and fun anime and cartoons for children. Age-appropriate content with parental controls."
        />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-background to-blue-500/20" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <span className="text-6xl mb-4 block animate-float">🧸</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Kids Zone
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A safe space for children to explore fun and educational cartoons.
              All content is carefully curated for young viewers.
            </p>
          </div>
        </section>

        {/* Content Grid */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {kidsContent.map((anime, index) => (
              <div
                key={anime.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <AnimeCard anime={anime} />
              </div>
            ))}
          </div>

          {kidsContent.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-xl font-semibold mb-2">
                More content coming soon!
              </h3>
              <p className="text-muted-foreground">
                We're adding more kid-friendly content every day.
              </p>
            </div>
          )}
        </section>
      </Layout>
    </>
  );
}
