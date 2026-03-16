/** Module: Footer.tsx */
import React from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => (
  <Box
    mt="80px"
    width="100%"
    bgcolor="var(--surface-color)"
    border="1px solid var(--border-color)"
    borderRadius="0"
    borderLeft="none"
    borderRight="none"
    boxShadow="var(--shadow-soft)"
  >
    <Stack
      gap="24px"
      sx={{ alignItems: 'center' }}
      flexWrap="wrap"
      px="40px"
      py="30px"
    >
      <Typography
        sx={{
          color: 'var(--text-primary)',
          fontSize: { lg: '24px', xs: '18px' },
          fontWeight: 700,
        }}
      >
        Repdex helps you find exercises, run timers, and track your BMI
        baseline.
      </Typography>
      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="X profile"
          component="a"
          href="https://x.com/Pratyush4r"
          target="_blank"
          rel="noreferrer"
          sx={{
            color: 'var(--text-primary)',
            '&:hover': { color: 'var(--accent)' },
          }}
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          aria-label="GitHub profile"
          component="a"
          href="https://github.com/Pratyush4r"
          target="_blank"
          rel="noreferrer"
          sx={{
            color: 'var(--text-primary)',
            '&:hover': { color: 'var(--accent)' },
          }}
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          aria-label="LinkedIn profile"
          component="a"
          href="https://www.linkedin.com/in/Pratyush4r/"
          target="_blank"
          rel="noreferrer"
          sx={{
            color: 'var(--text-primary)',
            '&:hover': { color: 'var(--accent)' },
          }}
        >
          <LinkedInIcon />
        </IconButton>
      </Stack>
    </Stack>
  </Box>
);

export default Footer;
