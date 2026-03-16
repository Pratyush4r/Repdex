/** Module: Favorites.tsx */
import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import ExerciseCard from '../components/ExerciseCard';
import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
  const { favorites, clearFavorites } = useFavorites();

  return (
    <Box sx={{ mt: { lg: '44px', xs: '24px' }, px: { xs: 1, sm: 2 }, pb: 2 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.2}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        mb={3}
      >
        <Box>
          <Typography
            sx={{
              fontSize: { lg: '42px', xs: '32px' },
              fontWeight: 800,
              color: 'var(--text-primary)',
            }}
          >
            Favorite Exercises
          </Typography>
          <Typography sx={{ color: 'var(--text-secondary)', fontSize: '17px' }}>
            Saved locally on this device.
          </Typography>
        </Box>
        {!!favorites.length && (
          <Button
            onClick={clearFavorites}
            sx={{
              textTransform: 'none',
              border: '1px solid var(--border-color)',
              bgcolor: 'var(--muted-surface)',
              color: 'var(--text-primary)',
              fontWeight: 700,
              px: 2,
            }}
          >
            Clear All
          </Button>
        )}
      </Stack>

      {!favorites.length ? (
        <Box
          sx={{
            border: '1px solid var(--border-color)',
            background: 'var(--surface-color)',
            borderRadius: '18px',
            p: { xs: 2.2, sm: 3 },
            boxShadow: 'var(--shadow-soft)',
          }}
        >
          <Typography sx={{ color: 'var(--text-primary)', fontSize: '22px', fontWeight: 700 }}>
            No favorites yet.
          </Typography>
          <Typography sx={{ color: 'var(--text-secondary)', mt: 1.2, mb: 2 }}>
            Tap the bookmark icon on any exercise card to save it here.
          </Typography>
          <Button
            component={RouterLink}
            to="/"
            sx={{
              textTransform: 'none',
              bgcolor: 'var(--accent)',
              color: 'var(--accent-text)',
              fontWeight: 700,
              px: 2,
              '&:hover': {
                bgcolor: 'var(--accent-strong)',
              },
            }}
          >
            Browse Exercises
          </Button>
        </Box>
      ) : (
        <Stack
          direction="row"
          sx={{ gap: { lg: '42px', xs: '28px' } }}
          flexWrap="wrap"
          justifyContent="center"
        >
          {favorites.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Favorites;
