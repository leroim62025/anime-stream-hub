import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { HeroBanner } from '@/components/home/HeroBanner';
import { ContinueWatching } from '@/components/home/ContinueWatching';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { AnimeRow } from '@/components/anime/AnimeRow';
import { animeList } from '@/data/mockData';

const trendingAnimes = animeList.filter((a) => a.rating >= 9);
const newReleases = animeList.filter((a) => a.status === 'ongoing');
const kidsContent = animeList.filter((a) => a.ageRating === 'kids');
const actionAnimes = animeList.filter((a) => a.genres.includes('action'));

export default function Index() {
  return (
    <>
      <Helmet>
        <title>AniStream - Watch Anime & Cartoons Online | Free Streaming</title>
        <meta
          name="description"
          content="Stream thousands of anime and cartoons in multiple languages. Watch popular series like Demon Slayer, Attack on Titan, and more. Free HD streaming with subtitles."
        />
        <meta name="keywords" content="anime streaming, watch anime online, cartoons, anime series, subbed anime, dubbed anime" />
      </Helmet>

      <Layout>
        <HeroBanner />
        
        <div className="space-y-12 py-8">
          <ContinueWatching />
          
          <CategoryGrid />
          
          <AnimeRow
            title="🔥 Trending Now"
            subtitle="Most popular this week"
            animes={trendingAnimes}
          />
          
          <AnimeRow
            title="✨ New Releases"
            subtitle="Latest episodes just dropped"
            animes={newReleases}
          />
          
          <AnimeRow
            title="⚔️ Action & Adventure"
            subtitle="Thrilling battles await"
            animes={actionAnimes}
          />
          
          <AnimeRow
            title="🧸 For Kids"
            subtitle="Fun and safe content for children"
            animes={kidsContent}
          />
        </div>
      </Layout>
    </>
  );
}
