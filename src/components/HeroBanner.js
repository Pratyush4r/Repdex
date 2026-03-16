import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const HeroBanner = () => (
  <Box
    sx={{
      mt: { lg: '100px', xs: '60px' },
      px: { xs: '24px', sm: '48px' },
      py: '60px',
      borderRadius: '16px',
      background: 'linear-gradient(135deg, #fefefe 60%, #fff5f5)',
      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.06)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Typography
      variant="h5"
      sx={{
        fontWeight: 600,
        color: '#FF2625',
        mb: 1,
      }}
    >
      Health & Fitness App
    </Typography>

    <Typography
      variant="h2"
      sx={{
        fontWeight: 800,
        fontSize: { xs: '36px', sm: '48px', lg: '56px' },
        lineHeight: 1.3,
        color: '#111',
        mb: 2,
      }}
    >
      Sweat, Smile, <br />
      and Repeat.
    </Typography>

    <Typography
      variant="body1"
      sx={{
        fontSize: '20px',
        lineHeight: 1.8,
        color: '#555',
        maxWidth: '600px',
        mb: 4,
      }}
    >
      Unlock your potential with effective workouts tailored to your fitness goals.
    </Typography>

    <Button
      href="#exercises"
      sx={{
        backgroundColor: '#FF2625',
        color: '#fff',
        fontSize: '18px',
        px: '30px',
        py: '12px',
        borderRadius: '8px',
        boxShadow: '0 8px 20px rgba(255, 38, 37, 0.3)',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#e41e1e',
        },
      }}
    >
      Explore Exercises
    </Button>

    {/* Decorative Background Text */}
    <Typography
      fontWeight={700}
      color="#FF2625"
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
