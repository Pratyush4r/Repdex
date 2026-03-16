/** Module: Navbar.tsx */
import React from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MonitorWeightRoundedIcon from '@mui/icons-material/MonitorWeightRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

const navItems = [
  { to: '/', label: 'Home', icon: <HomeRoundedIcon sx={{ fontSize: 19 }} /> },
  {
    to: '/timers',
    label: 'Timers',
    icon: <AccessTimeRoundedIcon sx={{ fontSize: 19 }} />,
  },
  {
    to: '/bmi',
    label: 'BMI',
    icon: <MonitorWeightRoundedIcon sx={{ fontSize: 19 }} />,
  },
  {
    to: '/favorites',
    label: 'Favorites',
    icon: <BookmarkRoundedIcon sx={{ fontSize: 19 }} />,
  },
  {
    to: '/settings',
    label: 'Settings',
    icon: <SettingsRoundedIcon sx={{ fontSize: 19 }} />,
  },
];

type NavbarProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

const Navbar = ({ isDarkMode, onToggleTheme }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isPathActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const scrollToSearchSection = () => {
    const searchPanel = document.getElementById('search-panel');
    if (searchPanel) {
      const prefersReducedMotion = document.body.getAttribute('data-motion') === 'reduced';
      searchPanel.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  const handleSearchShortcut = () => {
    if (location.pathname === '/') {
      scrollToSearchSection();
      return;
    }
    navigate('/');
    window.setTimeout(scrollToSearchSection, 250);
  };

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        width: '100%',
        borderBottom: '1px solid var(--border-color)',
        background: 'var(--surface-color)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          width: '100%',
          maxWidth: '1488px',
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          py: { xs: 1.1, sm: 1.25 },
          gap: { xs: 1.8, sm: 2.4 },
          flexWrap: 'wrap',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 1.4, sm: 2.2 }}
        >
          <RouterLink to="/" style={{ textDecoration: 'none' }}>
            <Stack spacing={0.2}>
              <Typography
                sx={{
                  color: 'var(--accent)',
                  fontWeight: 800,
                  letterSpacing: '0.02em',
                  fontSize: { xs: '24px', sm: '28px' },
                  lineHeight: 1,
                }}
              >
                Repdex
              </Typography>
              <Typography
                sx={{
                  color: 'var(--accent-gold)',
                  fontSize: '11px',
                  fontWeight: 700,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Exercise catalog, BMI, and timers.
              </Typography>
            </Stack>
          </RouterLink>

          <Stack direction="row" spacing={1.2} flexWrap="wrap">
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={RouterLink}
                to={item.to}
                startIcon={item.icon}
                sx={{
                  height: 'calc(40px * var(--ui-scale))',
                  px: 'calc(14px * var(--ui-scale))',
                  borderRadius: 'calc(10px * var(--ui-scale))',
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: 'calc(15px * var(--ui-scale))',
                  border: '1px solid var(--border-color)',
                  color: isPathActive(item.to)
                    ? 'var(--accent-text)'
                    : 'var(--text-primary)',
                  bgcolor: isPathActive(item.to)
                    ? 'var(--accent)'
                    : 'transparent',
                  '&:hover': {
                    bgcolor: isPathActive(item.to)
                      ? 'var(--accent-strong)'
                      : 'var(--muted-surface)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title="Jump to search">
            <IconButton
              aria-label="Jump to search"
              onClick={handleSearchShortcut}
              sx={{
                width: 'calc(40px * var(--ui-scale))',
                height: 'calc(40px * var(--ui-scale))',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--muted-surface)',
                '&:hover': {
                  backgroundColor: 'var(--surface-color)',
                  color: 'var(--accent)',
                },
              }}
            >
              <SearchRoundedIcon sx={{ fontSize: 22 }} />
            </IconButton>
          </Tooltip>
          <Button
            onClick={onToggleTheme}
            startIcon={
              isDarkMode ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />
            }
            sx={{
              minWidth: 'calc(138px * var(--ui-scale))',
              height: 'calc(40px * var(--ui-scale))',
              px: 'calc(14px * var(--ui-scale))',
              borderRadius: 'calc(10px * var(--ui-scale))',
              fontSize: 'calc(15px * var(--ui-scale))',
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
    </Box>
  );
};

export default Navbar;
