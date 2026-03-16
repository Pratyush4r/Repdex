/** Module: HeroBanner.tsx */
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
        'linear-gradient(140deg, var(--surface-color) 58%, var(--muted-surface))',
      boxShadow: 'var(--shadow-soft)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Typography
      variant="h5"
      sx={{
        fontWeight: 600,
        color: 'var(--accent-gold)',
        mb: 1,
        fontSize: { xs: '22px', sm: '26px' },
      }}
    >
      Repdex
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
      Exercise Catalog, <br />
      BMI, and Timers.
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
      Browse by body part, target muscle, and equipment. Use quick timers while
      training and check BMI anytime.
    </Typography>

    <Button
      href="#exercises"
      sx={{
        backgroundColor: 'var(--accent)',
        color: 'var(--accent-text)',
        fontSize: { xs: '20px', sm: '22px' },
        fontWeight: 700,
        px: '30px',
        py: '12px',
        borderRadius: '12px',
        boxShadow: '0 8px 20px rgba(69, 57, 33, 0.32)',
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
      color="var(--accent-gold)"
      sx={{
        position: 'absolute',
        top: '-20px',
        right: '20px',
        fontSize: '180px',
        opacity: 0.06,
        userSelect: 'none',
        display: { xs: 'none', lg: 'block' },
      }}
    >
      REPDEX
    </Typography>
  </Box>
);

export default HeroBanner;
