/** Module: FavoritesContext.tsx */
import React, {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ExerciseId, ExerciseRecord } from '../types';

const FAVORITES_STORAGE_KEY = 'repdex-favorite-exercises';

type FavoritesContextValue = {
  favorites: ExerciseRecord[];
  isFavorite: (exerciseId: ExerciseId) => boolean;
  toggleFavorite: (exercise: Partial<ExerciseRecord>) => void;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const normalizeExerciseForStorage = (
  exercise: Partial<ExerciseRecord>,
): ExerciseRecord => ({
  id: String(exercise?.id || ''),
  name: exercise?.name || '',
  gifUrl: exercise?.gifUrl || '',
  bodyPart: exercise?.bodyPart || '',
  target: exercise?.target || '',
  equipment: exercise?.equipment || '',
});

const parseFavoritesFromStorage = (): ExerciseRecord[] => {
  try {
    const rawValue = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!rawValue) return [];
    const parsedValue = JSON.parse(rawValue);
    if (!Array.isArray(parsedValue)) return [];

    return parsedValue
      .map((item) => normalizeExerciseForStorage(item))
      .filter((item) => Boolean(item.id));
  } catch (_error) {
    return [];
  }
};

type FavoritesProviderProps = {
  children: ReactNode;
};

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<ExerciseRecord[]>(() => parseFavoritesFromStorage());

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const favoriteIds = useMemo(
    () => new Set(favorites.map((exercise) => String(exercise.id))),
    [favorites],
  );

  const isFavorite = useCallback(
    (exerciseId: ExerciseId) => favoriteIds.has(String(exerciseId)),
    [favoriteIds],
  );

  const toggleFavorite = useCallback((exercise: Partial<ExerciseRecord>) => {
    const normalizedExercise = normalizeExerciseForStorage(exercise);
    if (!normalizedExercise.id) return;

    setFavorites((currentFavorites) => {
      const exists = currentFavorites.some(
        (item) => String(item.id) === normalizedExercise.id,
      );
      if (exists) {
        return currentFavorites.filter(
          (item) => String(item.id) !== normalizedExercise.id,
        );
      }

      return [normalizedExercise, ...currentFavorites];
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      clearFavorites,
    }),
    [favorites, isFavorite, toggleFavorite, clearFavorites],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};
