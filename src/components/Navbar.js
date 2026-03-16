import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

const Navbar = ({ isDarkMode, onToggleTheme }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        gap: { sm: '24px', xs: '12px' },
        mt: { sm: '32px', xs: '20px' },
        alignItems: 'center',
        background: 'var(--surface-color)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        py: '12px',
        px: { xs: '14px', sm: '22px' },
      }}
    >
      <Stack
        direction="row"
        gap={{ lg: '34px', xs: '20px' }}
        alignItems="center"
        flexWrap="wrap"
      >
        <Link style={{ textDecoration: 'none' }} to="/">
          <Typography
            sx={{
              color: 'var(--accent)',
              fontWeight: 800,
              fontSize: { lg: '30px', xs: '24px' },
            }}
          >
            MoveWell
          </Typography>
        </Link>
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: 'var(--text-primary)',
            borderBottom:
              currentPath === '/' ? '3px solid var(--accent)' : 'none',
            fontWeight: 700,
            fontSize: '20px',
          }}
        >
          Home
        </Link>
        <Link
          to="/bmi"
          style={{
            textDecoration: 'none',
            color: 'var(--text-primary)',
            borderBottom:
              currentPath === '/bmi' ? '3px solid var(--accent)' : 'none',
            fontWeight: 700,
            fontSize: '20px',
          }}
        >
          BMI Calculator
        </Link>
        <Button
          onClick={onToggleTheme}
          startIcon={
            isDarkMode ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />
          }
          sx={{
            minWidth: '165px',
            px: '18px',
            py: '10px',
            borderRadius: '12px',
            fontSize: { lg: '18px', xs: '16px' },
            fontWeight: 700,
            textTransform: 'none',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--muted-surface)',
            '&:hover': {
              backgroundColor: 'var(--surface-color)',
            },
          }}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Navbar;
