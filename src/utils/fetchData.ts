/** Module: fetchData.ts */
/**
 * Shared API options and fetch helper.
 * This module centralizes request configuration so API behavior is predictable
 * across pages and easier to maintain.
 */
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
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key':
      process.env.REACT_APP_YOUTUBE_RAPID_API_KEY
      || process.env.REACT_APP_RAPID_API_KEY,
  },
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
      'RapidAPI key is missing. Set REACT_APP_* API keys in .env',
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

  return data as T;
};
