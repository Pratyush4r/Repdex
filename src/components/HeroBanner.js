import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const HeroBanner = () => (
  <Box
    sx={{
      mt: { lg: '100px', xs: '60px' },
      px: { xs: '24px', sm: '48px' },
      py: '60px',
      borderRadius: '20px',
      border: '1px solid var(--border-color)',
      background:
        'linear-gradient(140deg, var(--surface-color) 65%, var(--muted-surface))',
      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.06)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Typography
      variant="h5"
      sx={{
        fontWeight: 600,
        color: 'var(--accent)',
        mb: 1,
        fontSize: { xs: '22px', sm: '26px' },
      }}
    >
      Health & Fitness App
    </Typography>

    <Typography
      variant="h2"
      sx={{
        fontWeight: 800,
        fontSize: { xs: '38px', sm: '52px', lg: '62px' },
        lineHeight: 1.3,
        color: 'var(--text-primary)',
        mb: 2,
      }}
    >
      Sweat, Smile, <br />
      and Repeat.
    </Typography>

    <Typography
      variant="body1"
      sx={{
        fontSize: { xs: '20px', sm: '24px' },
        lineHeight: 1.7,
        color: 'var(--text-secondary)',
        maxWidth: '600px',
        mb: 4,
      }}
    >
      Unlock your potential with effective workouts tailored to your fitness
      goals.
    </Typography>

    <Button
      href="#exercises"
      sx={{
        backgroundColor: 'var(--accent)',
        color: '#fff',
        fontSize: { xs: '20px', sm: '22px' },
        fontWeight: 700,
        px: '30px',
        py: '12px',
        borderRadius: '12px',
        boxShadow: '0 8px 20px rgba(255, 38, 37, 0.3)',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'var(--accent-strong)',
        },
      }}
    >
      Explore Exercises
    </Button>

    {/* Decorative Background Text */}
    <Typography
      fontWeight={700}
      color="var(--accent)"
      sx={{
        position: 'absolute',
        top: '-20px',
        right: '20px',
        fontSize: '180px',
        opacity: 0.07,
        userSelect: 'none',
        display: { xs: 'none', lg: 'block' },
      }}
    >
      EXERCISE
    </Typography>
  </Box>
);

export default HeroBanner;
