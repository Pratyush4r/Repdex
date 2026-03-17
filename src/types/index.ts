/** Domain types shared across pages, components, and context providers. */

export type ExerciseId = string | number;

export type ExerciseRecord = {
  id: ExerciseId;
  name: string;
  bodyPart: string;
  target: string;
  equipment: string;
  gifUrl?: string; // Made optional as it may not be in API response
  secondaryMuscles?: string[];
  instructions?: string[];
  description?: string;
  difficulty?: string;
  category?: string;
  [key: string]: unknown;
};

export type YoutubeThumbnail = {
  url: string;
  width?: number;
  height?: number;
};

export type YoutubeAuthor = {
  title: string; // Channel name
  channelId?: string;
  canonicalBaseUrl?: string;
  [key: string]: unknown;
};

export type YoutubeVideo = {
  videoId: string;
  title: string;
  descriptionSnippet?: string;
  author: YoutubeAuthor;
  thumbnails: YoutubeThumbnail[];
  publishedTimeText?: string; // e.g., "8 hours ago"
  stats?: {
    views?: number;
    [key: string]: unknown;
  };
  lengthSeconds?: number; // Duration in seconds
  isLiveNow?: boolean;
  movingThumbnails?: YoutubeThumbnail[];
  badges?: string[];
  [key: string]: unknown;
};

export type YoutubeVideoItem = {
  type: string; // "video"
  video: YoutubeVideo;
  [key: string]: unknown;
};

export type YoutubeSearchResponse = {
  contents?: YoutubeVideoItem[];
  cursorNext?: string;
  didYouMean?: unknown;
  estimatedResults?: number;
  filterGroups?: unknown[];
  refinements?: unknown[];
  [key: string]: unknown;
};

export type DurationInput = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type HiitInput = {
  work: DurationInput;
  rest: DurationInput;
  rounds: number;
};

export type HiitPhase = 'work' | 'rest' | 'done';

export type HiitState = {
  phase: HiitPhase;
  timeLeft: number;
  round: number;
  done: boolean;
};

// Helper function to format duration
export const formatDuration = (seconds?: number): string => {
  if (!seconds) return '';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Helper function to format view count
export const formatViewCount = (views?: number): string => {
  if (!views) return '';
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M views`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K views`;
  return `${views} views`;
};
