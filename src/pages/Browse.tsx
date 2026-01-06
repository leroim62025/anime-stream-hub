import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Filter, Grid, List, X } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { AnimeCard } from '@/components/anime/AnimeCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { animeList, categories } from '@/data/mockData';
import { cn } from '@/lib/utils';

const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018];
const ageRatings = [
  { value: 'all', label: 'All Ages' },
  { value: 'kids', label: 'Kids' },
  { value: 'teens', label: 'Teens' },
  { value: 'adults', label: 'Adults' },
];
const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
  { value: 'az', label: 'A-Z' },
];

export default function Browse() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedAgeRating, setSelectedAgeRating] = useState<string>('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAnimes = useMemo(() => {
    let result = [...animeList];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (anime) =>
          anime.title.toLowerCase().includes(query) ||
          anime.description.toLowerCase().includes(query)
      );
    }

    // Genre filter
    if (selectedGenres.length > 0) {
      result = result.filter((anime) =>
        selectedGenres.some((genre) => anime.genres.includes(genre))
      );
    }

    // Year filter
    if (selectedYear && selectedYear !== 'all') {
      result = result.filter((anime) => anime.year.toString() === selectedYear);
    }

    // Age rating filter
    if (selectedAgeRating !== 'all') {
      result = result.filter((anime) => anime.ageRating === selectedAgeRating);
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'az':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedGenres, selectedYear, selectedAgeRating, sortBy]);

  const toggleGenre = (genreId: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((g) => g !== genreId)
        : [...prev, genreId]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenres([]);
    setSelectedYear('all');
    setSelectedAgeRating('all');
    setSortBy('popular');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedGenres.length > 0 ||
    selectedYear !== 'all' ||
    selectedAgeRating !== 'all';

  return (
    <>
      <Helmet>
        <title>Browse Anime & Cartoons | AniStream</title>
        <meta
          name="description"
          content="Browse our complete collection of anime and cartoons. Filter by genre, year, and age rating. Find your next favorite series."
        />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Browse</h1>
            <p className="text-muted-foreground">
              Discover anime and cartoons from our extensive library
            </p>
          </div>

          {/* Filters */}
          <div className="space-y-4 mb-8">
            {/* Search & Sort Row */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search anime..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted border-border"
                />
              </div>
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px] bg-muted border-border">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="hidden md:flex gap-1 border border-border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[120px] bg-muted border-border">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedAgeRating}
                onValueChange={setSelectedAgeRating}
              >
                <SelectTrigger className="w-[120px] bg-muted border-border">
                  <SelectValue placeholder="Age" />
                </SelectTrigger>
                <SelectContent>
                  {ageRatings.map((rating) => (
                    <SelectItem key={rating.value} value={rating.value}>
                      {rating.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="h-9 w-px bg-border mx-2 hidden md:block" />

              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={
                    selectedGenres.includes(category.id) ? 'default' : 'outline'
                  }
                  className={cn(
                    'cursor-pointer transition-all hover:scale-105',
                    selectedGenres.includes(category.id) &&
                      'bg-primary text-primary-foreground'
                  )}
                  onClick={() => toggleGenre(category.id)}
                >
                  {category.icon} {category.name}
                </Badge>
              ))}

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear all
                </Button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="mb-4 text-muted-foreground">
            {filteredAnimes.length} results found
          </div>

          {filteredAnimes.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search query
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div
              className={cn(
                'grid gap-4',
                viewMode === 'grid'
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
                  : 'grid-cols-1'
              )}
            >
              {filteredAnimes.map((anime, index) => (
                <div
                  key={anime.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <AnimeCard anime={anime} />
                </div>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
