import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';

const ExerciseCard = ({ exercise }) => (
  <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
    <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
    <Stack direction="row">
      <Button
        sx={{
          ml: '21px',
          color: '#fff',
          background: 'var(--chip-primary)',
          fontSize: '16px',
          borderRadius: '20px',
          textTransform: 'capitalize',
          px: '12px',
          py: '4px',
        }}
      >
        {exercise.bodyPart}
      </Button>
      <Button
        sx={{
          ml: '21px',
          color: '#fff',
          background: 'var(--chip-secondary)',
          fontSize: '16px',
          borderRadius: '20px',
          textTransform: 'capitalize',
          px: '12px',
          py: '4px',
        }}
      >
        {exercise.target}
      </Button>
    </Stack>
    <Typography
      ml="21px"
      color="var(--text-primary)"
      fontWeight="bold"
      sx={{ fontSize: { lg: '28px', xs: '22px' }, lineHeight: 1.25 }}
      mt="11px"
      pb="10px"
      textTransform="capitalize"
    >
      {exercise.name}
    </Typography>
  </Link>
);

export default ExerciseCard;
