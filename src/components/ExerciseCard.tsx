/** Module: ExerciseCard.tsx */
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';

import { useFavorites } from '../context/FavoritesContext';
import type { ExerciseRecord } from '../types';

type ExerciseCardProps = {
  exercise: ExerciseRecord;
};

const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const bookmarked = isFavorite(exercise.id);

  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
      <IconButton
        aria-label={bookmarked ? 'Remove from favorites' : 'Save to favorites'}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          toggleFavorite(exercise);
        }}
        sx={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 2,
          width: '40px',
          height: '40px',
          border: '1px solid var(--border-color)',
          bgcolor: 'var(--surface-color)',
          color: bookmarked ? 'var(--accent)' : 'var(--text-secondary)',
          '&:hover': {
            bgcolor: 'var(--muted-surface)',
            color: 'var(--accent)',
          },
        }}
      >
        {bookmarked ? <BookmarkRoundedIcon /> : <BookmarkBorderRoundedIcon />}
      </IconButton>
      <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
      <Stack direction="row" spacing={1.2} sx={{ ml: '21px' }}>
        <Box
          sx={{
            color: '#fff',
            background: 'var(--chip-primary)',
            fontSize: '14px',
            borderRadius: '999px',
            textTransform: 'capitalize',
            px: '12px',
            py: '5px',
            fontWeight: 700,
          }}
        >
          {exercise.bodyPart}
        </Box>
        <Box
          sx={{
            color: 'var(--accent-text)',
            background: 'var(--chip-secondary)',
            fontSize: '14px',
            borderRadius: '999px',
            textTransform: 'capitalize',
            px: '12px',
            py: '5px',
            fontWeight: 700,
          }}
        >
          {exercise.target}
        </Box>
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
};

export default ExerciseCard;
