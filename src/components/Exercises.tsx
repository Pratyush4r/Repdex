/** Module: Exercises.tsx */
import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';
import Loader from './Loader';
import type { ExerciseRecord } from '../types';

type ExercisesProps = {
  exercises: ExerciseRecord[];
  setAllExercises: Dispatch<SetStateAction<ExerciseRecord[]>>;
  setExercises: Dispatch<SetStateAction<ExerciseRecord[]>>;
  bodyPart: string;
  searchTerm: string;
};

const Exercises = ({
  exercises,
  setAllExercises,
  setExercises,
  bodyPart,
  searchTerm,
}: ExercisesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [bodyPart, searchTerm, exercises.length]);

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(false);
      setLoadError(false);
      return;
    }

    const fetchExercisesData = async () => {
      try {
        setIsLoading(true);
        setLoadError(false);
        let exercisesData: ExerciseRecord[] = [];

        if (bodyPart === 'all') {
          const allExercisesData = await fetchData<ExerciseRecord[]>(
            'https://exercisedb.p.rapidapi.com/exercises?limit=1500',
            exerciseOptions,
          );
          exercisesData = Array.isArray(allExercisesData)
            ? allExercisesData
            : [];
          setAllExercises(exercisesData);
        } else {
          const filteredExercisesData = await fetchData<ExerciseRecord[]>(
            `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
            exerciseOptions,
          );
          exercisesData = Array.isArray(filteredExercisesData)
            ? filteredExercisesData
            : [];
        }

        setExercises(exercisesData);
      } catch (_error) {
        setLoadError(true);
        setExercises([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercisesData();
  }, [bodyPart]);

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise,
  );

  const paginate = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  if (isLoading) return <Loader />;

  if (loadError) {
    return (
      <Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
        <Typography variant="h5" textAlign="center" color="var(--text-primary)">
          Could not load exercises right now. Please check your API key and try
          again.
        </Typography>
      </Box>
    );
  }

  if (!currentExercises.length) {
    return (
      <Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
        <Typography variant="h5" textAlign="center" color="var(--text-primary)">
          No exercises found for this filter.
        </Typography>
      </Box>
    );
  }

  return (
    <Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          fontSize: { lg: '44px', xs: '32px' },
          color: 'var(--text-primary)',
        }}
        mb="34px"
      >
        Your Exercise Matches
      </Typography>
      <Stack
        direction="row"
        sx={{ gap: { lg: '42px', xs: '28px' } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </Stack>
      <Stack sx={{ mt: { lg: '114px', xs: '70px' } }} alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'var(--text-primary)',
                borderColor: 'var(--border-color)',
              },
              '& .Mui-selected': {
                backgroundColor: 'var(--accent) !important',
                color: 'var(--accent-text)',
              },
            }}
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
