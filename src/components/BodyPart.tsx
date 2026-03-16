/** Module: BodyPart.tsx */
import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

type BodyPartProps = {
  item: string;
  setBodyPart: (value: string) => void;
  bodyPart: string;
};

const BodyPart = ({ item, setBodyPart, bodyPart }: BodyPartProps) => (
  <Stack
    component="button"
    type="button"
    alignItems="center"
    justifyContent="center"
    className="bodyPart-card"
    sx={
      bodyPart === item
        ? {
          borderTop: '4px solid var(--accent)',
          borderRadius: '20px',
          width: '270px',
          height: '220px',
          cursor: 'pointer',
          gap: '14px',
        }
        : {
          borderRadius: '20px',
          width: '270px',
          height: '220px',
          cursor: 'pointer',
          gap: '14px',
        }
    }
    onClick={() => {
      setBodyPart(item);
      // Keep behavior consistent with search CTA: selection jumps to results.
      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
    }}
  >
    <Box
      sx={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        border: '1px solid var(--border-color)',
        bgcolor: 'var(--muted-surface)',
        color: 'var(--accent-gold)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: '18px',
        textTransform: 'uppercase',
      }}
    >
      {String(item).slice(0, 2)}
    </Box>
    <Typography
      fontSize={{ lg: '32px', xs: '24px' }}
      fontWeight="bold"
      color="var(--text-primary)"
      textTransform="capitalize"
    >
      {item}
    </Typography>
    <Typography sx={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
      Tap to view exercises
    </Typography>
  </Stack>
);

export default BodyPart;
