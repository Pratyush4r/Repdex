import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Logo from '../assets/images/Logo.png';

const Footer = () => (
  <Box
    mt="80px"
    bgcolor="var(--muted-surface)"
    borderTop="1px solid var(--border-color)"
  >
    <Stack
      gap="40px"
      sx={{ alignItems: 'center' }}
      flexWrap="wrap"
      px="40px"
      pt="24px"
    >
      <img src={Logo} alt="logo" style={{ height: '41px' }} />
    </Stack>
    <Typography
      variant="h5"
      sx={{
        fontSize: { lg: '30px', xs: '22px' },
        color: 'var(--text-primary)',
      }}
      mt="41px"
      textAlign="center"
      pb="40px"
    >
      Made by BCA 2022-25
    </Typography>
  </Box>
);

export default Footer;
