/** Module: SimilarExercises.tsx */
import React from 'react';
import { Typography, Box, Stack } from '@mui/material';

import HorizontalScrollbar from './HorizontalScrollbar';
import type { ExerciseRecord } from '../types';

type SimilarExercisesProps = {
  targetMuscleExercises: ExerciseRecord[];
  equipmentExercises: ExerciseRecord[];
};

const SimilarExercises = ({
  targetMuscleExercises,
  equipmentExercises,
}: SimilarExercisesProps) => (
  <Box sx={{ mt: { lg: '100px', xs: '0px' } }}>
    <Typography
      sx={{
        fontSize: { lg: '3rem', xs: '2rem' },
        ml: '20px',
        color: 'var(--text-primary)',
      }}
      fontWeight={700}
      mb="33px"
    >
      More exercises for the{' '}
      <span style={{ color: 'var(--accent)' }}>same muscle group</span>
    </Typography>
    <Stack direction="row" sx={{ p: 2, position: 'relative' }}>
      {targetMuscleExercises.length !== 0 ? (
        <HorizontalScrollbar data={targetMuscleExercises} />
      ) : (
        <Typography
          sx={{
            color: 'var(--text-secondary)',
            fontSize: { lg: '1.375rem', xs: '1.125rem' },
          }}
        >
          No similar target-muscle exercises found.
        </Typography>
      )}
    </Stack>
    <Typography
      sx={{
        fontSize: { lg: '3rem', xs: '2rem' },
        ml: '20px',
        mt: { lg: '100px', xs: '60px' },
        color: 'var(--text-primary)',
      }}
      fontWeight={700}
      mb="33px"
    >
      More exercises using the{' '}
      <span style={{ color: 'var(--accent)' }}>same equipment</span>
    </Typography>
    <Stack direction="row" sx={{ p: 2, position: 'relative' }}>
      {equipmentExercises.length !== 0 ? (
        <HorizontalScrollbar data={equipmentExercises} />
      ) : (
        <Typography
          sx={{
            color: 'var(--text-secondary)',
            fontSize: { lg: '1.375rem', xs: '1.125rem' },
          }}
        >
          No similar equipment exercises found.
        </Typography>
      )}
    </Stack>
  </Box>
);

export default SimilarExercises;
