import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const normalizeSearchValue = (value) => value
  .toLowerCase()
  .replace(/[^a-z0-9\s]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const getSearchableExerciseText = (exercise) => normalizeSearchValue(
  `${exercise.name} ${exercise.bodyPart} ${exercise.target} ${exercise.equipment}`,
);

const SearchExercises = ({
  allExercises,
  bodyPart,
  setBodyPart,
  setExercises,
  setSearchTerm,
}) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        const bodyPartsData = await fetchData(
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

    let sourceExercises = allExercises;

    if (!sourceExercises.length) {
      try {
        const exercisesData = await fetchData(
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

  const handleBodyPartSelect = (selectedBodyPart) => {
    setSearch('');
    setSearchTerm('');
    setBodyPart(selectedBodyPart);
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{
          fontSize: { lg: '50px', xs: '36px' },
          color: 'var(--text-primary)',
        }}
        mb="49px"
        textAlign="center"
      >
        Find the Right Exercise Fast
      </Typography>
      <Typography
        sx={{
          fontSize: { lg: '24px', xs: '19px' },
          color: 'var(--text-secondary)',
          mb: '28px',
          textAlign: 'center',
        }}
      >
        Search by name, body part, target muscle, or equipment.
      </Typography>
      <Stack
        direction={{ lg: 'row', xs: 'column' }}
        spacing={2}
        sx={{ width: '100%', maxWidth: '980px', mb: '72px' }}
      >
        <TextField
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Type an exercise name, body part, target muscle, or equipment"
          variant="outlined"
          fullWidth
          onKeyDown={(event) => {
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
            },
          }}
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: 'var(--accent)',
            color: '#fff',
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
