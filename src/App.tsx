/** Module: App.tsx */
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BmiCalculator from './pages/BmiCalculator';
import Timers from './pages/Timers';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';
import { useAccessibility } from './context/AccessibilityContext';

const THEME_STORAGE_KEY = 'repdex-theme';
const LEGACY_THEME_STORAGE_KEY = 'fitness-theme';

const App = () => {
  const { reducedMotion } = useAccessibility();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Migrate from legacy key so existing users keep their preference.
    const savedMode = localStorage.getItem(THEME_STORAGE_KEY)
      || localStorage.getItem(LEGACY_THEME_STORAGE_KEY);
    if (!savedMode) return true;
    return savedMode === 'dark';
  });

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    localStorage.removeItem(LEGACY_THEME_STORAGE_KEY);
  }, [isDarkMode]);

  useEffect(() => {
    document.title = 'Repdex';

    const faviconPath = `${process.env.PUBLIC_URL || ''}/favicon.svg?v=2`;
    let iconLink = document.querySelector("link[rel='icon']");

    if (!iconLink) {
      iconLink = document.createElement('link');
      iconLink.setAttribute('rel', 'icon');
      document.head.appendChild(iconLink);
    }

    iconLink.setAttribute('type', 'image/svg+xml');
    iconLink.setAttribute('href', faviconPath);
  }, []);

  useEffect(() => {
    let frame: number | null = null;

    if (reducedMotion) {
      document.documentElement.style.setProperty('--cursor-x', '50%');
      document.documentElement.style.setProperty('--cursor-y', '50%');
      return undefined;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (frame !== null) return;

      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;

      frame = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--cursor-x', `${x}%`);
        document.documentElement.style.setProperty('--cursor-y', `${y}%`);
        frame = null;
      });
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
      />
      <Box
        component="main"
        sx={{
          flex: 1,
          width: '100%',
          maxWidth: '1488px',
          mx: 'auto',
          px: { xs: 2, sm: 3 },
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
          <Route path="/bmi" element={<BmiCalculator />} />
          <Route path="/timers" element={<Timers />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route
            path="/settings"
            element={(
              <Settings
                isDarkMode={isDarkMode}
                onToggleTheme={() => setIsDarkMode((prev) => !prev)}
              />
            )}
          />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
