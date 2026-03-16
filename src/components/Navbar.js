import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

import Logo from '../assets/images/Logo.png';

const Navbar = ({ isDarkMode, onToggleTheme }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      sx={{
        gap: { sm: '123px', xs: '40px' },
        mt: { sm: '32px', xs: '20px' },
        justifyContent: 'none',
        alignItems: 'center',
        background: 'var(--surface-color)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        py: '10px',
      }}
      px="20px"
    >
      <Link to="/">
        <img
          src={Logo}
          alt="logo"
          style={{ width: '48px', height: '48px', margin: '0px 20px' }}
        />
      </Link>
      <Stack
        direction="row"
        gap="40px"
        fontFamily="'Nunito', sans-serif"
        fontSize={{ lg: '26px', xs: '20px' }}
        alignItems="center"
      >
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: 'var(--text-primary)',
            borderBottom:
              currentPath === '/' ? '3px solid var(--accent)' : 'none',
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
