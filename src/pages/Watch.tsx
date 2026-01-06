import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  SkipBack,
  SkipForward,
  ChevronLeft,
  ChevronRight,
  Languages,
  Subtitles,
  Monitor,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { animeList, episodes, languages } from '@/data/mockData';
import { cn } from '@/lib/utils';

const qualityOptions = ['Auto', '1080p', '720p', '480p', '360p'];
const playbackSpeeds = ['0.5x', '0.75x', '1x', '1.25x', '1.5x', '2x'];

export default function Watch() {
  const { animeId, episodeNum } = useParams<{
    animeId: string;
    episodeNum: string;
  }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [showControls, setShowControls] = useState(true);
  const [selectedAudio, setSelectedAudio] = useState('Japanese');
  const [selectedSubtitle, setSelectedSubtitle] = useState('English');
  const [selectedQuality, setSelectedQuality] = useState('Auto');

  const anime = animeList.find((a) => a.id === animeId);
  const currentEpisode = episodes.find(
    (ep) => ep.animeId === animeId && ep.number.toString() === episodeNum
  );
  const episodeNumber = parseInt(episodeNum || '1');

  if (!anime) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Anime not found</h1>
          <Link to="/browse">
            <Button>Browse Anime</Button>
          </Link>
        </div>
      </div>
    );
  }

  const hasPrevEpisode = episodeNumber > 1;
  const hasNextEpisode = episodeNumber < anime.episodes;

  return (
    <>
      <Helmet>
        <title>
          {anime.title} - Episode {episodeNumber} | AniStream
        </title>
        <meta
          name="description"
          content={`Watch ${anime.title} Episode ${episodeNumber} in HD with multiple audio and subtitle options.`}
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Video Player Section */}
        <div
          className="relative w-full aspect-video bg-black group"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* Video Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={currentEpisode?.thumbnail || anime.coverImage}
              alt={anime.title}
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <Button
                variant="glow"
                size="xl"
                className="rounded-full w-20 h-20"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-current" />
                ) : (
                  <Play className="w-8 h-8 fill-current ml-1" />
                )}
              </Button>
              <p className="text-muted-foreground">
                Video player demo - Click to simulate play/pause
              </p>
            </div>
          </div>

          {/* Top Bar */}
          <div
            className={cn(
              'absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-background/80 to-transparent transition-opacity duration-300',
              showControls ? 'opacity-100' : 'opacity-0'
            )}
          >
            <div className="flex items-center justify-between">
              <Link
                to={`/anime/${anime.id}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="font-medium">{anime.title}</span>
              </Link>
              <div className="text-muted-foreground">
                Episode {episodeNumber}
                {currentEpisode && `: ${currentEpisode.title}`}
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div
            className={cn(
              'absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent transition-opacity duration-300',
              showControls ? 'opacity-100' : 'opacity-0'
            )}
          >
            {/* Progress Bar */}
            <div className="mb-4">
              <Slider
                value={[progress]}
                onValueChange={([value]) => setProgress(value)}
                max={100}
                step={0.1}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>
                  {Math.floor((progress / 100) * 23)}:
                  {String(Math.floor(((progress / 100) * 40) % 60)).padStart(2, '0')}
                </span>
                <span>23:40</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* Play/Pause */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </Button>

                {/* Skip Back */}
                <Button variant="ghost" size="icon">
                  <SkipBack className="w-5 h-5" />
                </Button>

                {/* Skip Forward */}
                <Button variant="ghost" size="icon">
                  <SkipForward className="w-5 h-5" />
                </Button>

                {/* Volume */}
                <div className="flex items-center gap-2 group/volume">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </Button>
                  <div className="w-0 overflow-hidden group-hover/volume:w-24 transition-all duration-300">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      onValueChange={([value]) => {
                        setVolume(value);
                        if (value > 0) setIsMuted(false);
                      }}
                      max={100}
                      className="w-24"
                    />
                  </div>
                </div>

                {/* Episode Navigation */}
                <div className="hidden md:flex items-center gap-1 ml-4">
                  <Link
                    to={
                      hasPrevEpisode
                        ? `/watch/${anime.id}/${episodeNumber - 1}`
                        : '#'
                    }
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={!hasPrevEpisode}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Prev
                    </Button>
                  </Link>
                  <Link
                    to={
                      hasNextEpisode
                        ? `/watch/${anime.id}/${episodeNumber + 1}`
                        : '#'
                    }
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={!hasNextEpisode}
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Audio Selection */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Languages className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Audio Track</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {anime.languages.audio.map((lang) => (
                      <DropdownMenuItem
                        key={lang}
                        onClick={() => setSelectedAudio(lang)}
                        className={cn(
                          selectedAudio === lang && 'text-primary'
                        )}
                      >
                        {lang}
                        {selectedAudio === lang && ' ✓'}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Subtitle Selection */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Subtitles className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Subtitles</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setSelectedSubtitle('Off')}
                      className={cn(
                        selectedSubtitle === 'Off' && 'text-primary'
                      )}
                    >
                      Off {selectedSubtitle === 'Off' && ' ✓'}
                    </DropdownMenuItem>
                    {anime.languages.subtitles.map((lang) => (
                      <DropdownMenuItem
                        key={lang}
                        onClick={() => setSelectedSubtitle(lang)}
                        className={cn(
                          selectedSubtitle === lang && 'text-primary'
                        )}
                      >
                        {lang}
                        {selectedSubtitle === lang && ' ✓'}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Quality */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Monitor className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Quality</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {qualityOptions.map((quality) => (
                      <DropdownMenuItem
                        key={quality}
                        onClick={() => setSelectedQuality(quality)}
                        className={cn(
                          selectedQuality === quality && 'text-primary'
                        )}
                      >
                        {quality}
                        {selectedQuality === quality && ' ✓'}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Settings */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Settings className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Playback Speed</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {playbackSpeeds.map((speed) => (
                      <DropdownMenuItem key={speed}>{speed}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Fullscreen */}
                <Button variant="ghost" size="icon">
                  <Maximize className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Episode Info */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <Link
                    to={`/anime/${anime.id}`}
                    className="text-primary hover:underline"
                  >
                    {anime.title}
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <span>Episode {episodeNumber}</span>
                </div>
                <h1 className="text-2xl font-bold mb-4">
                  {currentEpisode?.title || `Episode ${episodeNumber}`}
                </h1>
                <p className="text-muted-foreground">
                  {currentEpisode?.description || anime.description}
                </p>
              </div>

              {/* Current Settings */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="glass rounded-lg px-4 py-2 text-sm">
                  <span className="text-muted-foreground">Audio: </span>
                  <span className="text-primary">{selectedAudio}</span>
                </div>
                <div className="glass rounded-lg px-4 py-2 text-sm">
                  <span className="text-muted-foreground">Subtitles: </span>
                  <span className="text-primary">{selectedSubtitle}</span>
                </div>
                <div className="glass rounded-lg px-4 py-2 text-sm">
                  <span className="text-muted-foreground">Quality: </span>
                  <span className="text-primary">{selectedQuality}</span>
                </div>
              </div>
            </div>

            {/* Episode List Sidebar */}
            <div className="w-full md:w-80">
              <h3 className="font-semibold mb-4">Episodes</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                {Array.from({ length: Math.min(anime.episodes, 12) }).map(
                  (_, i) => {
                    const epNum = i + 1;
                    const isActive = epNum === episodeNumber;
                    return (
                      <Link
                        key={epNum}
                        to={`/watch/${anime.id}/${epNum}`}
                        className={cn(
                          'flex items-center gap-3 p-3 rounded-lg transition-all',
                          isActive
                            ? 'bg-primary/20 border border-primary/50'
                            : 'glass hover:bg-muted/50'
                        )}
                      >
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">
                          {epNum}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              'text-sm font-medium truncate',
                              isActive && 'text-primary'
                            )}
                          >
                            Episode {epNum}
                          </p>
                        </div>
                        {isActive && (
                          <Play className="w-4 h-4 text-primary fill-current" />
                        )}
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
