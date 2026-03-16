import React from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => (
  <Box
    mt="80px"
    bgcolor="var(--muted-surface)"
    borderTop="1px solid var(--border-color)"
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
        Stay consistent. Small sessions build big strength.
      </Typography>
      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="X profile"
          component="a"
          href="https://x.com/Pratyush4r"
          target="_blank"
          rel="noreferrer"
          sx={{ color: 'var(--text-primary)' }}
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          aria-label="GitHub profile"
          component="a"
          href="https://github.com/Pratyush4r"
          target="_blank"
          rel="noreferrer"
          sx={{ color: 'var(--text-primary)' }}
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          aria-label="LinkedIn profile"
          component="a"
          href="https://www.linkedin.com/in/Pratyush4r/"
          target="_blank"
          rel="noreferrer"
          sx={{ color: 'var(--text-primary)' }}
        >
          <LinkedInIcon />
        </IconButton>
      </Stack>
    </Stack>
  </Box>
);

export default Footer;
