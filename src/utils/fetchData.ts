/** Module: fetchData.ts */
/**
 * Shared API options and fetch helper.
 * This module centralizes request configuration so API behavior is predictable
 * across pages and easier to maintain.
 *
 * NOTE: The ExerciseDB API no longer returns `gifUrl` in exercise responses.
 * Images are served via the /image endpoint which requires authentication.
 * To work on both localhost and Netlify, we use a public image proxy.
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
 * Build a proxied GIF src URL for an exercise.
 *
 * We use images.weserv.nl as a public image proxy that strips CORP headers.
 * This allows images to load on both localhost and Netlify.
 * The original image URL includes the API key for authentication.
 */
export const exerciseGifUrl = (id: string | number): string => {
  const apiKey = process.env.REACT_APP_RAPID_API_KEY ?? '';
  const originalUrl = `https://exercisedb.p.rapidapi.com/image?exerciseId=${id}&resolution=180&rapidapi-key=${apiKey}`;
  // Use images.weserv.nl to proxy and strip CORP headers
  return `https://images.weserv.nl/?url=${encodeURIComponent(originalUrl)}`;
};

/**
 * Attach a `gifUrl` to a single exercise record if it is missing.
 * The API no longer includes this field, so we derive it from the `id`.
 */
const withGifUrl = (exercise: ExerciseRecord): ExerciseRecord => {
  if (exercise.gifUrl) {
    return exercise;
  }
  return { ...exercise, gifUrl: exerciseGifUrl(exercise.id) };
};

/**
 * Normalise an API payload so every exercise record contains a `gifUrl`.
 * Handles both single-object and array responses transparently.
 */
const normaliseExercisePayload = (data: unknown): unknown => {
  if (Array.isArray(data)) {
    return data.map((item: unknown) => {
      if (item && typeof item === 'object' && 'id' in item) {
        return withGifUrl(item as ExerciseRecord);
      }
      return item;
    });
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
