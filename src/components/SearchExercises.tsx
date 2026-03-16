/** Module: SearchExercises.tsx */
import React, { useEffect, useState } from 'react';
import type { Dispatch, KeyboardEvent, SetStateAction } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';
import type { ExerciseRecord } from '../types';

const normalizeSearchValue = (value: string) => value
  .toLowerCase()
  .replace(/[^a-z0-9\s]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const getSearchableExerciseText = (exercise: ExerciseRecord) => normalizeSearchValue(
  `${exercise.name} ${exercise.bodyPart} ${exercise.target} ${exercise.equipment}`,
);

type SearchExercisesProps = {
  allExercises: ExerciseRecord[];
  bodyPart: string;
  setBodyPart: Dispatch<SetStateAction<string>>;
  setExercises: Dispatch<SetStateAction<ExerciseRecord[]>>;
  setSearchTerm: Dispatch<SetStateAction<string>>;
};

const SearchExercises = ({
  allExercises,
  bodyPart,
  setBodyPart,
  setExercises,
  setSearchTerm,
}: SearchExercisesProps) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState<string[]>([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        const bodyPartsData = await fetchData<string[]>(
          'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
          exerciseOptions,
        );
        const safeBodyParts = Array.isArray(bodyPartsData) ? bodyPartsData : [];

        setBodyParts(['all', ...safeBodyParts]);
      } catch (_error) {
        // If the API call fails, keep the default 'all' option so UI still renders
        setBodyParts(['all']);
      }
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    const trimmedSearch = normalizeSearchValue(search);

    if (!trimmedSearch) return;

    let sourceExercises: ExerciseRecord[] = allExercises;

    if (!sourceExercises.length) {
      try {
        const exercisesData = await fetchData<ExerciseRecord[]>(
          'https://exercisedb.p.rapidapi.com/exercises?limit=1500',
          exerciseOptions,
        );
        sourceExercises = Array.isArray(exercisesData) ? exercisesData : [];
      } catch (_error) {
        sourceExercises = [];
      }
    }

    const compactSearch = trimmedSearch.replace(/\s/g, '');
    const searchedExercises = sourceExercises.filter((exercise) => {
      const searchableExerciseText = getSearchableExerciseText(exercise);
      const compactExerciseText = searchableExerciseText.replace(/\s/g, '');

      return (
        searchableExerciseText.includes(trimmedSearch)
        || compactExerciseText.includes(compactSearch)
      );
    });

    setExercises(searchedExercises);
    setBodyPart('all');
    setSearchTerm(trimmedSearch);
    window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
  };

  const handleClear = () => {
    setSearch('');
    setSearchTerm('');
    setBodyPart('all');
    setExercises(allExercises);
    window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
  };

  const handleBodyPartSelect = (selectedBodyPart: string) => {
    setSearch('');
    setSearchTerm('');
    setBodyPart(selectedBodyPart);
  };

  return (
    <Stack
      id="search-panel"
      alignItems="center"
      mt="37px"
      justifyContent="center"
      p="20px"
      sx={{ scrollMarginTop: { xs: '110px', sm: '126px' } }}
    >
      <Typography
        fontWeight={700}
        sx={{
          fontSize: { lg: '44px', xs: '34px' },
          color: 'var(--text-primary)',
        }}
        mb="22px"
        textAlign="center"
      >
        Find Exercises Fast
      </Typography>
      <Typography
        sx={{
          fontSize: { lg: '24px', xs: '19px' },
          color: 'var(--text-secondary)',
          mb: '28px',
          textAlign: 'center',
        }}
      >
        Search by name, body area, target muscle, or equipment.
      </Typography>
      <Stack
        direction={{ lg: 'row', xs: 'column' }}
        spacing={2}
        sx={{
          width: '100%',
          maxWidth: '980px',
          mb: '72px',
          p: { xs: '14px', sm: '16px' },
          borderRadius: '16px',
          background: 'var(--surface-color)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-soft)',
        }}
      >
        <TextField
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Type an exercise name, body part, target muscle, or equipment"
          variant="outlined"
          fullWidth
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') handleSearch();
          }}
          sx={{
            backgroundColor: 'var(--surface-color)',
            borderRadius: '12px',
            '& .MuiInputBase-input': {
              fontSize: { lg: '22px', xs: '18px' },
              color: 'var(--text-primary)',
              py: '16px',
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              '& fieldset': {
                borderColor: 'var(--border-color)',
                borderWidth: '2px',
              },
              '&:hover fieldset': {
                borderColor: 'var(--accent)',
              },
            },
          }}
        />
        <Button
          className="search-btn"
          startIcon={<SearchRoundedIcon />}
          sx={{
            bgcolor: 'var(--accent)',
            color: 'var(--accent-text)',
            width: { lg: '200px', xs: '100%' },
            fontSize: { lg: '22px', xs: '18px' },
            fontWeight: 800,
            borderRadius: '12px',
            height: '60px',
            '&:hover': {
              bgcolor: 'var(--accent-strong)',
            },
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button
          startIcon={<RestartAltRoundedIcon />}
          sx={{
            bgcolor: 'var(--muted-surface)',
            color: 'var(--text-primary)',
            width: { lg: '160px', xs: '100%' },
            fontSize: { lg: '20px', xs: '18px' },
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            height: '60px',
            '&:hover': {
              bgcolor: 'var(--surface-color)',
              borderColor: 'var(--accent-gold)',
            },
          }}
          onClick={handleClear}
        >
          Reset
        </Button>
      </Stack>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyParts
          setBodyPart={handleBodyPartSelect}
          bodyPart={bodyPart}
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
