/** Module: Home.tsx */
import React, { useState } from 'react';
import { Box } from '@mui/material';

import Exercises from '../components/Exercises';
import SearchExercises from '../components/SearchExercises';
import HeroBanner from '../components/HeroBanner';
import type { ExerciseRecord } from '../types';

const Home = () => {
  const [allExercises, setAllExercises] = useState<ExerciseRecord[]>([]);
  const [exercises, setExercises] = useState<ExerciseRecord[]>([]);
  const [bodyPart, setBodyPart] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Box sx={{ mt: { lg: '44px', xs: '24px' }, pb: { xs: 2, sm: 3 } }}>
      <HeroBanner />

      <Box mt="54px" px={{ xs: '8px', sm: '14px' }}>
        <SearchExercises
          allExercises={allExercises}
          setExercises={setExercises}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          setSearchTerm={setSearchTerm}
        />
      </Box>

      <Box mt="48px" px={{ xs: '8px', sm: '14px' }}>
        <Exercises
          setAllExercises={setAllExercises}
          setExercises={setExercises}
          exercises={exercises}
          bodyPart={bodyPart}
          searchTerm={searchTerm}
        />
      </Box>
    </Box>
  );
};

export default Home;
