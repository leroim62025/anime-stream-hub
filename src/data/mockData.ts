export interface Anime {
  id: string;
  title: string;
  titleJapanese?: string;
  description: string;
  coverImage: string;
  bannerImage?: string;
  rating: number;
  year: number;
  status: 'ongoing' | 'completed' | 'upcoming';
  episodes: number;
  currentEpisode?: number;
  genres: string[];
  ageRating: 'kids' | 'teens' | 'adults' | 'all';
  type: 'anime' | 'cartoon' | 'movie';
  languages: {
    audio: string[];
    subtitles: string[];
  };
  studio?: string;
  featured?: boolean;
}

export interface Episode {
  id: string;
  animeId: string;
  number: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  releaseDate: string;
  season: number;
}

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'action', name: 'Action', nameAr: 'أكشن', icon: '⚔️' },
  { id: 'adventure', name: 'Adventure', nameAr: 'مغامرة', icon: '🗺️' },
  { id: 'fantasy', name: 'Fantasy', nameAr: 'فانتازيا', icon: '✨' },
  { id: 'comedy', name: 'Comedy', nameAr: 'كوميديا', icon: '😄' },
  { id: 'romance', name: 'Romance', nameAr: 'رومانسي', icon: '💕' },
  { id: 'sci-fi', name: 'Sci-Fi', nameAr: 'خيال علمي', icon: '🚀' },
  { id: 'horror', name: 'Horror', nameAr: 'رعب', icon: '👻' },
  { id: 'kids', name: 'Kids', nameAr: 'أطفال', icon: '🧸' },
];

export const animeList: Anime[] = [
  {
    id: '1',
    title: 'Demon Slayer',
    titleJapanese: '鬼滅の刃',
    description: 'Tanjiro Kamado sets out to become a demon slayer to avenge his family and cure his sister.',
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=1920&h=800&fit=crop',
    rating: 9.2,
    year: 2019,
    status: 'ongoing',
    episodes: 55,
    currentEpisode: 55,
    genres: ['action', 'fantasy', 'adventure'],
    ageRating: 'teens',
    type: 'anime',
    languages: {
      audio: ['Japanese', 'English', 'Arabic'],
      subtitles: ['English', 'Arabic', 'French', 'German', 'Russian', 'Chinese'],
    },
    studio: 'ufotable',
    featured: true,
  },
  {
    id: '2',
    title: 'Attack on Titan',
    titleJapanese: '進撃の巨人',
    description: 'Humanity fights for survival against giant humanoid Titans that prey on humans.',
    coverImage: 'https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=400&h=600&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=800&fit=crop',
    rating: 9.5,
    year: 2013,
    status: 'completed',
    episodes: 87,
    genres: ['action', 'horror', 'fantasy'],
    ageRating: 'adults',
    type: 'anime',
    languages: {
      audio: ['Japanese', 'English'],
      subtitles: ['English', 'Arabic', 'French', 'German'],
    },
    studio: 'MAPPA',
    featured: true,
  },
  {
    id: '3',
    title: 'My Hero Academia',
    titleJapanese: '僕のヒーローアカデミア',
    description: 'A boy without superpowers dreams of becoming a hero in a world where most people have abilities.',
    coverImage: 'https://images.unsplash.com/photo-1560972550-aba3456b5564?w=400&h=600&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=800&fit=crop',
    rating: 8.8,
    year: 2016,
    status: 'ongoing',
    episodes: 138,
    currentEpisode: 138,
    genres: ['action', 'comedy', 'adventure'],
    ageRating: 'teens',
    type: 'anime',
    languages: {
      audio: ['Japanese', 'English', 'Arabic'],
      subtitles: ['English', 'Arabic', 'French', 'German', 'Russian'],
    },
    studio: 'Bones',
  },
  {
    id: '4',
    title: 'SpongeBob SquarePants',
    description: 'The adventures of a friendly sea sponge and his friends in the underwater city of Bikini Bottom.',
    coverImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=600&fit=crop',
    rating: 8.5,
    year: 1999,
    status: 'ongoing',
    episodes: 280,
    currentEpisode: 280,
    genres: ['comedy', 'kids'],
    ageRating: 'kids',
    type: 'cartoon',
    languages: {
      audio: ['English', 'Arabic', 'French', 'German'],
      subtitles: ['English', 'Arabic', 'French', 'German', 'Russian'],
    },
  },
  {
    id: '5',
    title: 'Jujutsu Kaisen',
    titleJapanese: '呪術廻戦',
    description: 'A high school student joins a secret organization of Jujutsu Sorcerers to kill a powerful Curse.',
    coverImage: 'https://images.unsplash.com/photo-1607604276583-c860fbab90e5?w=400&h=600&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&h=800&fit=crop',
    rating: 9.1,
    year: 2020,
    status: 'ongoing',
    episodes: 47,
    currentEpisode: 47,
    genres: ['action', 'fantasy', 'horror'],
    ageRating: 'teens',
    type: 'anime',
    languages: {
      audio: ['Japanese', 'English'],
      subtitles: ['English', 'Arabic', 'French', 'German', 'Russian', 'Chinese'],
    },
    studio: 'MAPPA',
    featured: true,
  },
  {
    id: '6',
    title: 'One Piece',
    titleJapanese: 'ワンピース',
    description: 'Monkey D. Luffy and his pirate crew search for the ultimate treasure, the One Piece.',
    coverImage: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&h=600&fit=crop',
    rating: 9.3,
    year: 1999,
    status: 'ongoing',
    episodes: 1100,
    currentEpisode: 1100,
    genres: ['action', 'adventure', 'comedy'],
    ageRating: 'teens',
    type: 'anime',
    languages: {
      audio: ['Japanese', 'English', 'Arabic'],
      subtitles: ['English', 'Arabic', 'French', 'German', 'Russian', 'Chinese'],
    },
    studio: 'Toei Animation',
  },
  {
    id: '7',
    title: 'Naruto Shippuden',
    titleJapanese: 'ナルト 疾風伝',
    description: 'Naruto continues his quest to become Hokage and bring back his friend Sasuke.',
    coverImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=600&fit=crop',
    rating: 9.0,
    year: 2007,
    status: 'completed',
    episodes: 500,
    genres: ['action', 'adventure', 'fantasy'],
    ageRating: 'teens',
    type: 'anime',
    languages: {
      audio: ['Japanese', 'English', 'Arabic'],
      subtitles: ['English', 'Arabic', 'French', 'German'],
    },
    studio: 'Pierrot',
  },
  {
    id: '8',
    title: 'Adventure Time',
    description: 'Finn the Human and Jake the Dog go on adventures in the magical Land of Ooo.',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=600&fit=crop',
    rating: 8.7,
    year: 2010,
    status: 'completed',
    episodes: 283,
    genres: ['adventure', 'fantasy', 'comedy'],
    ageRating: 'kids',
    type: 'cartoon',
    languages: {
      audio: ['English', 'Arabic', 'French'],
      subtitles: ['English', 'Arabic', 'French', 'German'],
    },
  },
];

export const episodes: Episode[] = [
  {
    id: 'ep1-1',
    animeId: '1',
    number: 1,
    title: 'Cruelty',
    description: 'Tanjiro returns home to find his family slaughtered by a demon.',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=225&fit=crop',
    duration: '23:40',
    releaseDate: '2019-04-06',
    season: 1,
  },
  {
    id: 'ep1-2',
    animeId: '1',
    number: 2,
    title: 'Trainer Sakonji Urokodaki',
    description: 'Tanjiro meets a demon slayer who agrees to train him.',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=225&fit=crop',
    duration: '23:40',
    releaseDate: '2019-04-13',
    season: 1,
  },
  {
    id: 'ep1-3',
    animeId: '1',
    number: 3,
    title: 'Sabito and Makomo',
    description: 'Tanjiro trains rigorously to pass the Final Selection.',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=225&fit=crop',
    duration: '23:40',
    releaseDate: '2019-04-20',
    season: 1,
  },
];

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', dir: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', dir: 'ltr' },
];
