/** Module: fetchData.ts */
/**
 * Shared API options and fetch helper.
 * This module centralizes request configuration so API behavior is predictable
 * across pages and easier to maintain.
 *
 * NOTE: The ExerciseDB API no longer returns `gifUrl` in exercise responses.
 * Images are hosted on a public CDN at https://v2.exercisedb.io/image/{id}.
 * This URL is publicly accessible and does not require authentication.
 */
import type { ExerciseRecord } from '../types';

export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'youtube138.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const hasApiKey = Boolean(process.env.REACT_APP_RAPID_API_KEY);

/**
 * Build a direct-use GIF src URL for an exercise.
 *
 * The public CDN at https://v2.exercisedb.io/image/{id} hosts all exercise GIFs.
 * This URL is publicly accessible and does not require authentication.
 */
export const exerciseGifUrl = (id: string | number): string =>
  `https://v2.exercisedb.io/image/${id}`;

/**
 * Attach a `gifUrl` to a single exercise record if it is missing.
 * The API no longer includes this field, so we derive it from the `id`.
 */
const withGifUrl = (exercise: ExerciseRecord): ExerciseRecord => (
  exercise.gifUrl ? exercise : { ...exercise, gifUrl: exerciseGifUrl(exercise.id) }
);

/**
 * Normalise an API payload so every exercise record contains a `gifUrl`.
 * Handles both single-object and array responses transparently.
 */
const normaliseExercisePayload = (data: unknown): unknown => {
  if (Array.isArray(data)) {
    return data.map((item: unknown) => (
      item && typeof item === 'object' && 'id' in item
        ? withGifUrl(item as ExerciseRecord)
        : item
    ));
  }
  if (data && typeof data === 'object' && 'id' in data) {
    return withGifUrl(data as unknown as ExerciseRecord);
  }
  return data;
};

type FetchError = Error & {
  status?: number;
  data?: unknown;
};

export const fetchData = async <T = unknown>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  // Fail fast on missing API credentials to avoid ambiguous UI states.
  const rapidApiKey = new Headers(options?.headers).get('X-RapidAPI-Key');
  if (!rapidApiKey) {
    throw new Error(
      'RapidAPI key is missing. Set REACT_APP_RAPID_API_KEY in .env',
    );
  }

  const res = await fetch(url, options);
  let data: unknown;

  try {
    data = await res.json();
  } catch (_error) {
    data = null;
  }

  if (!res.ok) {
    const error = new Error(
      `Request failed with status ${res.status}`,
    ) as FetchError;
    error.status = res.status;
    error.data = data;
    throw error;
  }

  // Inject gifUrl for ExerciseDB responses that no longer include it.
  const isExerciseDb = url.includes('exercisedb.p.rapidapi.com');
  return (isExerciseDb ? normaliseExercisePayload(data) : data) as T;
};
