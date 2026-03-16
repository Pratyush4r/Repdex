import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({
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
    const trimmedSearch = search.trim().toLowerCase();

    if (!trimmedSearch) return;

    try {
      const exercisesData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises',
        exerciseOptions,
      );
      const safeExercises = Array.isArray(exercisesData) ? exercisesData : [];
      const searchedExercises = safeExercises.filter(
        (exercise) => exercise.name.toLowerCase().includes(trimmedSearch)
          || exercise.bodyPart.toLowerCase().includes(trimmedSearch)
          || exercise.target.toLowerCase().includes(trimmedSearch)
          || exercise.equipment.toLowerCase().includes(trimmedSearch),
      );

      setExercises(searchedExercises);
      setBodyPart('all');
      setSearchTerm(trimmedSearch);
      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
    } catch (_error) {
      setExercises([]);
      setSearchTerm(trimmedSearch);
    }
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
        sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        mb="49px"
        textAlign="center"
      >
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Stack
        direction={{ lg: 'row', xs: 'column' }}
        spacing={2}
        sx={{ width: '100%', maxWidth: '900px', mb: '72px' }}
      >
        <TextField
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by exercise, body part, target muscle or equipment"
          variant="outlined"
          fullWidth
          onKeyDown={(event) => {
            if (event.key === 'Enter') handleSearch();
          }}
          sx={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
          }}
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: '#FF2625',
            color: '#fff',
            width: { lg: '175px', xs: '100%' },
            fontSize: { lg: '20px', xs: '16px' },
            height: '56px',
            '&:hover': {
              bgcolor: '#d92020',
              color: '#fff !important',
            },
          }}
          onClick={handleSearch}
        >
          Search
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
