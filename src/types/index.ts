/** Domain types shared across pages, components, and context providers. */

export type ExerciseId = string | number;

export type ExerciseRecord = {
  id: ExerciseId;
  name: string;
  bodyPart: string;
  target: string;
  equipment: string;
  gifUrl: string;
  [key: string]: unknown;
};

export type YoutubeThumbnail = {
  url: string;
};

export type YoutubeVideo = {
  videoId: string;
  title: string;
  channelName: string;
  thumbnails: YoutubeThumbnail[];
};

export type YoutubeVideoItem = {
  video: YoutubeVideo;
  [key: string]: unknown;
};

export type YoutubeSearchResponse = {
  contents?: YoutubeVideoItem[];
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
