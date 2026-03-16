import React, { useState } from 'react';
import { Box } from '@mui/material';

import Exercises from '../components/Exercises';
import SearchExercises from '../components/SearchExercises';
import HeroBanner from '../components/HeroBanner';

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Box sx={{ mt: { lg: '100px', xs: '30px' } }}>
      <HeroBanner />

      <Box mt="40px" px="20px">
        <SearchExercises
          setExercises={setExercises}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          setSearchTerm={setSearchTerm}
        />
      </Box>

      <Box mt="60px" px="20px">
        <Exercises
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
