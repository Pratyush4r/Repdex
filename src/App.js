import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BmiCalculator from './pages/BmiCalculator';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('fitness-theme');
    return savedMode === 'dark';
  });

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('fitness-theme', theme);
  }, [isDarkMode]);

  return (
    <Box
      sx={{
        maxWidth: '1488px',
        width: '100%',
        mx: 'auto',
        px: { xs: 2, sm: 3 },
      }}
    >
      <Navbar
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
        <Route path="/bmi" element={<BmiCalculator />} />
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;
