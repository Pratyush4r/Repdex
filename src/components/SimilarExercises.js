import React from 'react';
import { Typography, Box, Stack } from '@mui/material';

import HorizontalScrollbar from './HorizontalScrollbar';

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => (
  <Box sx={{ mt: { lg: '100px', xs: '0px' } }}>
    <Typography
      sx={{
        fontSize: { lg: '50px', xs: '34px' },
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
            fontSize: { lg: '22px', xs: '18px' },
          }}
        >
          No similar target-muscle exercises found.
        </Typography>
      )}
    </Stack>
    <Typography
      sx={{
        fontSize: { lg: '50px', xs: '34px' },
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
            fontSize: { lg: '22px', xs: '18px' },
          }}
        >
          No similar equipment exercises found.
        </Typography>
      )}
    </Stack>
  </Box>
);

export default SimilarExercises;
